import { useEffect, useRef } from 'react';
import { Bot, LoaderCircle, ShieldCheck, UserRound } from 'lucide-react';

import ChatComposer from './ChatComposer';
import ChatMessageBubble from './ChatMessageBubble';
import ChatStatusBanner from './ChatStatusBanner';
import { ChatMessage, ChatPresence, ChatSuggestion } from '../types';

interface ChatWindowProps {
  currentPath: string;
  hasConnectionError: boolean;
  isBooting: boolean;
  isOpen: boolean;
  isSending: boolean;
  labels: {
    title: string;
    subtitleBot: string;
    subtitleHuman: string;
    composerPlaceholder: string;
    send: string;
    handoff: string;
    humanJoining: string;
    humanLive: string;
    poweredBy: string;
    redirectCurrent: string;
    emptyState: string;
  };
  messages: ChatMessage[];
  presence: ChatPresence;
  suggestions: ChatSuggestion[];
  onClose: () => void;
  onRedirect: (path: string) => void;
  onRetry: (messageId: string) => Promise<void>;
  onSend: (text: string) => Promise<void>;
  onTakeover: () => Promise<void>;
}

export default function ChatWindow({
  currentPath,
  hasConnectionError,
  isBooting,
  isOpen,
  isSending,
  labels,
  messages,
  presence,
  suggestions,
  onClose,
  onRedirect,
  onRetry,
  onSend,
  onTakeover,
}: ChatWindowProps) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const node = listRef.current;

    if (!node) {
      return;
    }

    node.scrollTo({
      top: node.scrollHeight,
      behavior: 'smooth',
    });
  }, [isOpen, messages]);

  const subtitle = presence === 'human' ? labels.subtitleHuman : labels.subtitleBot;
  const PresenceIcon = presence === 'human' ? UserRound : Bot;

  return (
    <section className={`chatbot-window ${isOpen ? 'chatbot-window--open' : ''}`} aria-hidden={!isOpen}>
      <header className="chatbot-window__header">
        <div className="chatbot-window__identity">
          <div className="chatbot-window__avatar">
            <PresenceIcon size={18} />
          </div>
          <div>
            <h2>{labels.title}</h2>
            <p>{subtitle}</p>
          </div>
        </div>
        <button type="button" className="chatbot-window__close" onClick={onClose} aria-label="Close chat">
          <ShieldCheck size={18} />
        </button>
      </header>

      <div className="chatbot-window__topline">
        <span>{labels.poweredBy}</span>
        {hasConnectionError ? <span className="chatbot-window__warning">Connection issue. Retry queued messages.</span> : null}
      </div>

      <ChatStatusBanner
        presence={presence}
        humanJoiningLabel={labels.humanJoining}
        humanLiveLabel={labels.humanLive}
      />

      <div ref={listRef} className="chatbot-window__messages">
        {isBooting ? (
          <div className="chatbot-window__loading">
            <LoaderCircle size={18} className="animate-spin" />
            <span>Loading conversation...</span>
          </div>
        ) : null}

        {!isBooting && messages.length === 0 ? <div className="chatbot-window__empty">{labels.emptyState}</div> : null}

        {messages.map((message) => (
          <ChatMessageBubble
            key={message.id}
            currentPath={currentPath}
            message={message}
            redirectCurrentLabel={labels.redirectCurrent}
            onRedirect={onRedirect}
            onRetry={onRetry}
          />
        ))}
      </div>

      <div className="chatbot-window__actions">
        {presence === 'bot' ? (
          <button type="button" className="chatbot-window__takeover" onClick={() => void onTakeover()}>
            {labels.handoff}
          </button>
        ) : null}

        {suggestions.map((suggestion) => (
          <button
            key={suggestion.id}
            type="button"
            className="chatbot-window__suggestion"
            onClick={() => void onSend(suggestion.message)}
          >
            {suggestion.label}
          </button>
        ))}
      </div>

      <ChatComposer
        disabled={isBooting}
        isSending={isSending}
        placeholder={labels.composerPlaceholder}
        sendLabel={labels.send}
        onSend={onSend}
      />
    </section>
  );
}

