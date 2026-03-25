import { ExternalLink, RotateCcw } from 'lucide-react';

import { ChatMessage } from '../types';

interface ChatMessageBubbleProps {
  currentPath: string;
  message: ChatMessage;
  redirectCurrentLabel: string;
  onRedirect: (path: string) => void;
  onRetry: (messageId: string) => Promise<void>;
}

function formatTime(timestamp: number) {
  return new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  }).format(timestamp);
}

export default function ChatMessageBubble({
  currentPath,
  message,
  redirectCurrentLabel,
  onRedirect,
  onRetry,
}: ChatMessageBubbleProps) {
  const isUser = message.author === 'user';
  const isHuman = message.author === 'human';
  const isCurrentRoute = message.redirect?.path === currentPath;

  return (
    <div className={`chatbot-message ${isUser ? 'chatbot-message--user' : ''}`}>
      <div className={`chatbot-message__bubble ${isUser ? 'chatbot-message__bubble--user' : ''}`}>
        {!isUser ? (
          <div className="chatbot-message__author">{isHuman ? 'SARAB Team' : 'Assistant'}</div>
        ) : null}
        <p>{message.text}</p>

        {message.redirect ? (
          <button
            type="button"
            className="chatbot-redirect-card"
            onClick={() => {
              if (!isCurrentRoute) {
                onRedirect(message.redirect!.path);
              }
            }}
            disabled={isCurrentRoute}
          >
            <span className="chatbot-redirect-card__label">{message.redirect.label}</span>
            <span className="chatbot-redirect-card__description">
              {isCurrentRoute ? redirectCurrentLabel : message.redirect.description}
            </span>
            <span className="chatbot-redirect-card__icon">
              <ExternalLink size={14} />
            </span>
          </button>
        ) : null}

        <div className="chatbot-message__meta">
          <span>{formatTime(message.createdAt)}</span>
          {isUser && message.status === 'sending' ? <span>Sending...</span> : null}
          {isUser && message.status === 'failed' ? (
            <button type="button" className="chatbot-retry-button" onClick={() => void onRetry(message.id)}>
              <RotateCcw size={12} />
              Retry
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
