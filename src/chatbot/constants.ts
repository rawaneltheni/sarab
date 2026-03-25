import { ChatSuggestion } from './types';

export const CHAT_POLL_INTERVAL_MS = 2500;

export const CHAT_STORAGE_KEY = 'sarab-chatbot-session';

export const DEFAULT_SUGGESTIONS: ChatSuggestion[] = [
  {
    id: 'pricing',
    label: 'Pricing',
    message: 'Can you help me with pricing?',
  },
  {
    id: 'demo',
    label: 'Book a demo',
    message: 'I want to book a demo.',
  },
  {
    id: 'human',
    label: 'Talk to a human',
    message: 'I want to talk to a human agent.',
  },
];

