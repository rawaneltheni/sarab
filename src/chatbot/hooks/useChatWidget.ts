import { useEffect, useEffectEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { useChatPolling } from './useChatPolling';
import { initializeChatSession, markChatRead, pollChatSession, sendChatMessage } from '../services/mockChatService';
import { ChatMessage, ChatSessionSnapshot } from '../types';

interface ChatLabels {
  title: string;
  subtitleBot: string;
  subtitleHuman: string;
  composerPlaceholder: string;
  send: string;
  handoff: string;
  humanJoining: string;
  humanLive: string;
  poweredBy: string;
  launcher: string;
  redirectCurrent: string;
  emptyState: string;
}

interface UseChatWidgetResult {
  isOpen: boolean;
  isBooting: boolean;
  isSending: boolean;
  hasConnectionError: boolean;
  snapshot: ChatSessionSnapshot | null;
  messages: ChatMessage[];
  labels: ChatLabels;
  currentPath: string;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
  sendMessage: (text: string) => Promise<void>;
  retryMessage: (messageId: string) => Promise<void>;
  triggerHumanTakeover: () => Promise<void>;
  handleRedirect: (path: string) => void;
}

function getLabels(isArabic: boolean): ChatLabels {
  if (isArabic) {
    return {
      title: 'مساعد سراب',
      subtitleBot: 'مساعد ذكي للرد السريع',
      subtitleHuman: 'تم تحويل المحادثة إلى الفريق',
      composerPlaceholder: 'اكتب رسالتك هنا...',
      send: 'إرسال',
      handoff: 'تحويل إلى موظف',
      humanJoining: 'جارٍ إدخال أحد أعضاء الفريق إلى المحادثة.',
      humanLive: 'أحد أعضاء الفريق موجود الآن في المحادثة.',
      poweredBy: 'واجهة تجريبية بدون خادم',
      launcher: 'فتح المحادثة',
      redirectCurrent: 'أنت داخل هذه الصفحة بالفعل',
      emptyState: 'ابدأ رسالة جديدة وسنرد داخل الواجهة التجريبية.',
    };
  }

  return {
    title: 'SARAB Assistant',
    subtitleBot: 'Instant frontend mock support',
    subtitleHuman: 'A teammate is in the conversation',
    composerPlaceholder: 'Type your message...',
    send: 'Send',
    handoff: 'Human takeover',
    humanJoining: 'A teammate is joining the conversation now.',
    humanLive: 'A SARAB teammate is active in this chat.',
    poweredBy: 'Frontend-only mock integration',
    launcher: 'Open chat',
    redirectCurrent: 'You are already on this page',
    emptyState: 'Start a new message and the mock workflow will respond here.',
  };
}

function sortMessages(messages: ChatMessage[]) {
  return [...messages].sort((left, right) => left.createdAt - right.createdAt);
}

export function useChatWidget(): UseChatWidgetResult {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [hasConnectionError, setHasConnectionError] = useState(false);
  const [snapshot, setSnapshot] = useState<ChatSessionSnapshot | null>(null);
  const [optimisticMessages, setOptimisticMessages] = useState<ChatMessage[]>([]);

  const labels = getLabels(i18n.language === 'ar');

  useEffect(() => {
    let isMounted = true;

    async function bootstrap() {
      try {
        const nextSnapshot = await initializeChatSession();

        if (!isMounted) {
          return;
        }

        setSnapshot(nextSnapshot);
        setHasConnectionError(false);
      } catch {
        if (isMounted) {
          setHasConnectionError(true);
        }
      } finally {
        if (isMounted) {
          setIsBooting(false);
        }
      }
    }

    void bootstrap();

    return () => {
      isMounted = false;
    };
  }, []);

  const refreshSnapshot = useEffectEvent(async () => {
    if (!snapshot) {
      return;
    }

    try {
      const nextSnapshot = await pollChatSession(snapshot.sessionId);
      setSnapshot(nextSnapshot);
      setHasConnectionError(false);
    } catch {
      setHasConnectionError(true);
    }
  });

  useChatPolling({
    enabled: Boolean(snapshot),
    onPoll: refreshSnapshot,
  });

  useEffect(() => {
    if (!isOpen || !snapshot || snapshot.unreadCount === 0) {
      return;
    }

    let isMounted = true;

    async function syncReadState() {
      const nextSnapshot = await markChatRead(snapshot.sessionId);

      if (isMounted) {
        setSnapshot(nextSnapshot);
      }
    }

    void syncReadState();

    return () => {
      isMounted = false;
    };
  }, [isOpen, snapshot]);

  const mergedMessages = sortMessages([...(snapshot?.messages ?? []), ...optimisticMessages]);

  async function submitMessage(rawText: string, retryId?: string) {
    if (!snapshot) {
      return;
    }

    const text = rawText.trim();

    if (!text) {
      return;
    }

    const optimisticId = retryId ?? `temp-${Date.now()}`;
    const optimisticMessage: ChatMessage = {
      id: optimisticId,
      author: 'user',
      text,
      createdAt: Date.now(),
      status: 'sending',
    };

    setIsSending(true);
    setHasConnectionError(false);
    setOptimisticMessages((current) => [
      ...current.filter((message) => message.id !== retryId),
      optimisticMessage,
    ]);

    try {
      const response = await sendChatMessage(snapshot.sessionId, text);
      setSnapshot(response.session);
      setOptimisticMessages((current) => current.filter((message) => message.id !== optimisticId));
      setIsOpen(true);
    } catch {
      setHasConnectionError(true);
      setOptimisticMessages((current) =>
        current.map((message) =>
          message.id === optimisticId
            ? {
                ...message,
                status: 'failed',
              }
            : message,
        ),
      );
    } finally {
      setIsSending(false);
    }
  }

  async function retryMessage(messageId: string) {
    const message = optimisticMessages.find((item) => item.id === messageId);

    if (!message) {
      return;
    }

    await submitMessage(message.text, messageId);
  }

  async function triggerHumanTakeover() {
    await submitMessage(i18n.language === 'ar' ? 'أريد التحدث مع موظف.' : 'I want to talk to a human agent.');
  }

  function handleRedirect(path: string) {
    navigate(path);
    setIsOpen(false);
  }

  function openChat() {
    setIsOpen(true);
  }

  function closeChat() {
    setIsOpen(false);
  }

  function toggleChat() {
    setIsOpen((current) => !current);
  }

  return {
    isOpen,
    isBooting,
    isSending,
    hasConnectionError,
    snapshot,
    messages: mergedMessages,
    labels,
    currentPath: location.pathname,
    openChat,
    closeChat,
    toggleChat,
    sendMessage: submitMessage,
    retryMessage,
    triggerHumanTakeover,
    handleRedirect,
  };
}

