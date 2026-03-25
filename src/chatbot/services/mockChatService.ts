import { CHAT_STORAGE_KEY, DEFAULT_SUGGESTIONS } from '../constants';
import {
  ChatMessage,
  ChatPresence,
  ChatRedirect,
  ChatSessionSnapshot,
  ChatSuggestion,
} from '../types';

type PendingEvent =
  | {
      id: string;
      dueAt: number;
      type: 'message';
      message: ChatMessage;
    }
  | {
      id: string;
      dueAt: number;
      type: 'presence';
      presence: ChatPresence;
    }
  | {
      id: string;
      dueAt: number;
      type: 'suggestions';
      suggestions: ChatSuggestion[];
    };

interface StoredSession {
  sessionId: string;
  messages: ChatMessage[];
  presence: ChatPresence;
  unreadCount: number;
  suggestions: ChatSuggestion[];
  lastUpdatedAt: number;
  pendingEvents: PendingEvent[];
}

const SERVICE_DELAY_MS = 350;

function wait(ms = SERVICE_DELAY_MS) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function createId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function createMessage(
  author: ChatMessage['author'],
  text: string,
  options?: { redirect?: ChatRedirect; createdAt?: number },
): ChatMessage {
  return {
    id: createId(author),
    author,
    text,
    createdAt: options?.createdAt ?? Date.now(),
    status: 'sent',
    redirect: options?.redirect,
  };
}

function cloneSnapshot(session: StoredSession): ChatSessionSnapshot {
  return {
    sessionId: session.sessionId,
    messages: [...session.messages].sort((left, right) => left.createdAt - right.createdAt),
    presence: session.presence,
    unreadCount: session.unreadCount,
    suggestions: session.suggestions,
    lastUpdatedAt: session.lastUpdatedAt,
  };
}

function getInitialMessages() {
  const now = Date.now();

  return [
    createMessage(
      'assistant',
      'Hi, I am the SARAB assistant. I can help with pricing, demos, policies, or connect you to a teammate.',
      { createdAt: now - 14000 },
    ),
    createMessage(
      'assistant',
      'Ask anything, or use one of the quick actions below to move faster.',
      { createdAt: now - 9000 },
    ),
  ];
}

function createInitialSession(): StoredSession {
  return {
    sessionId: createId('session'),
    messages: getInitialMessages(),
    presence: 'bot',
    unreadCount: 0,
    suggestions: DEFAULT_SUGGESTIONS,
    lastUpdatedAt: Date.now(),
    pendingEvents: [],
  };
}

function loadSession(): StoredSession {
  const raw = window.localStorage.getItem(CHAT_STORAGE_KEY);

  if (!raw) {
    const session = createInitialSession();
    saveSession(session);
    return session;
  }

  try {
    const parsed = JSON.parse(raw) as StoredSession;

    if (!parsed.sessionId || !Array.isArray(parsed.messages) || !Array.isArray(parsed.pendingEvents)) {
      throw new Error('Invalid stored session');
    }

    return parsed;
  } catch {
    const session = createInitialSession();
    saveSession(session);
    return session;
  }
}

function saveSession(session: StoredSession) {
  window.localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(session));
}

function scheduleMessage(session: StoredSession, delayMs: number, message: ChatMessage) {
  session.pendingEvents.push({
    id: createId('event-message'),
    dueAt: Date.now() + delayMs,
    type: 'message',
    message,
  });
}

function schedulePresence(session: StoredSession, delayMs: number, presence: ChatPresence) {
  session.pendingEvents.push({
    id: createId('event-presence'),
    dueAt: Date.now() + delayMs,
    type: 'presence',
    presence,
  });
}

function scheduleSuggestions(session: StoredSession, delayMs: number, suggestions: ChatSuggestion[]) {
  session.pendingEvents.push({
    id: createId('event-suggestions'),
    dueAt: Date.now() + delayMs,
    type: 'suggestions',
    suggestions,
  });
}

function applyPendingEvents(session: StoredSession) {
  const now = Date.now();
  const dueEvents = session.pendingEvents
    .filter((event) => event.dueAt <= now)
    .sort((left, right) => left.dueAt - right.dueAt);

  if (dueEvents.length === 0) {
    return session;
  }

  session.pendingEvents = session.pendingEvents.filter((event) => event.dueAt > now);

  for (const event of dueEvents) {
    if (event.type === 'message') {
      session.messages.push(event.message);
      session.unreadCount += 1;
      session.lastUpdatedAt = Math.max(session.lastUpdatedAt, event.message.createdAt);
    }

    if (event.type === 'presence') {
      session.presence = event.presence;
      session.lastUpdatedAt = Math.max(session.lastUpdatedAt, event.dueAt);
    }

    if (event.type === 'suggestions') {
      session.suggestions = event.suggestions;
      session.lastUpdatedAt = Math.max(session.lastUpdatedAt, event.dueAt);
    }
  }

  saveSession(session);
  return session;
}

function queueAutomations(session: StoredSession, text: string) {
  const normalized = text.toLowerCase();

  if (/(human|agent|person|representative|specialist|موظف|بشر)/.test(normalized)) {
    session.presence = 'handoff_pending';
    session.suggestions = [];
    session.lastUpdatedAt = Date.now();

    scheduleMessage(
      session,
      900,
      createMessage('assistant', 'Bringing in a teammate now. Please give us a moment while I share the chat context.'),
    );
    schedulePresence(session, 2400, 'human');
    scheduleMessage(
      session,
      2600,
      createMessage('human', 'Hi, this is Maya from SARAB. I have joined the conversation and can take it from here.'),
    );
    scheduleSuggestions(session, 2700, [
      { id: 'scope', label: 'Project scope', message: 'I need help defining my project scope.' },
      { id: 'timeline', label: 'Timeline', message: 'Can you help estimate the timeline?' },
    ]);
    return;
  }

  if (/(price|pricing|cost|quote|budget)/.test(normalized)) {
    scheduleMessage(
      session,
      1200,
      createMessage('assistant', 'A quick way to get a tailored estimate is through our contact flow.', {
        redirect: {
          path: '/contact',
          label: 'Open contact page',
          description: 'Share your goals and we can route you to the right package.',
        },
      }),
    );
    scheduleSuggestions(session, 1300, [
      { id: 'demo-after-pricing', label: 'Book a demo', message: 'Before pricing, I want to see a demo.' },
      { id: 'human-after-pricing', label: 'Talk to sales', message: 'Connect me with a human agent.' },
    ]);
    return;
  }

  if (/(demo|meeting|consultation|book)/.test(normalized)) {
    scheduleMessage(
      session,
      1100,
      createMessage('assistant', 'You can jump straight into the contact page and request a demo there.', {
        redirect: {
          path: '/contact',
          label: 'Request a demo',
          description: 'We will follow up with a suitable time and scope questions.',
        },
      }),
    );
    return;
  }

  if (/(blog|article|post|content)/.test(normalized)) {
    scheduleMessage(
      session,
      1000,
      createMessage('assistant', 'I found a blog entry that is a good starting point.', {
        redirect: {
          path: '/blog/1',
          label: 'Read featured article',
          description: 'Open the highlighted blog post in the current site.',
        },
      }),
    );
    return;
  }

  if (/(security|privacy|policy|legal|terms)/.test(normalized)) {
    scheduleMessage(
      session,
      1200,
      createMessage('assistant', 'The policy pages in the site should answer that directly.', {
        redirect: {
          path: '/security',
          label: 'Open security policy',
          description: 'Navigate to the relevant legal page without leaving the site.',
        },
      }),
    );
    scheduleSuggestions(session, 1300, [
      { id: 'privacy', label: 'Privacy policy', message: 'Take me to the privacy policy.' },
      { id: 'terms', label: 'Terms', message: 'Show me the terms and conditions.' },
    ]);
    return;
  }

  if (session.presence === 'human') {
    scheduleMessage(
      session,
      1200,
      createMessage('human', 'Thanks, I have that. If you share your goals, stack, and timeline, I can suggest the next step.'),
    );
    return;
  }

  scheduleMessage(
    session,
    1400,
    createMessage(
      'assistant',
      'I can help route you faster. Ask about pricing, demos, blog content, or say that you want a human teammate.',
    ),
  );
  scheduleSuggestions(session, 1500, DEFAULT_SUGGESTIONS);
}

export async function initializeChatSession() {
  await wait();
  const session = applyPendingEvents(loadSession());
  return cloneSnapshot(session);
}

export async function pollChatSession(sessionId: string) {
  await wait(250);
  const session = applyPendingEvents(loadSession());

  if (session.sessionId !== sessionId) {
    return cloneSnapshot(createInitialSession());
  }

  return cloneSnapshot(session);
}

export async function sendChatMessage(sessionId: string, text: string) {
  await wait();
  const session = applyPendingEvents(loadSession());

  if (session.sessionId !== sessionId) {
    throw new Error('Chat session expired. Please refresh the page.');
  }

  const message = createMessage('user', text);
  session.messages.push(message);
  session.lastUpdatedAt = message.createdAt;
  queueAutomations(session, text);
  saveSession(session);

  return {
    acceptedMessage: message,
    session: cloneSnapshot(session),
  };
}

export async function markChatRead(sessionId: string) {
  await wait(120);
  const session = applyPendingEvents(loadSession());

  if (session.sessionId !== sessionId) {
    return cloneSnapshot(session);
  }

  session.unreadCount = 0;
  saveSession(session);

  return cloneSnapshot(session);
}

