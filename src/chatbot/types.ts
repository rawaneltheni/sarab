export type ChatAuthor = 'user' | 'assistant' | 'human' | 'system';

export type ChatPresence = 'bot' | 'handoff_pending' | 'human';

export type ChatDeliveryStatus = 'sending' | 'sent' | 'failed';

export interface ChatRedirect {
  path: string;
  label: string;
  description?: string;
}

export interface ChatSuggestion {
  id: string;
  label: string;
  message: string;
}

export interface ChatMessage {
  id: string;
  author: ChatAuthor;
  text: string;
  createdAt: number;
  status?: ChatDeliveryStatus;
  redirect?: ChatRedirect;
}

export interface ChatSessionSnapshot {
  sessionId: string;
  messages: ChatMessage[];
  presence: ChatPresence;
  unreadCount: number;
  suggestions: ChatSuggestion[];
  lastUpdatedAt: number;
}

