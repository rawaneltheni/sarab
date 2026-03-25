import { MessageCircleMore, X } from 'lucide-react';

interface ChatLauncherProps {
  isOpen: boolean;
  unreadCount: number;
  label: string;
  onClick: () => void;
}

export default function ChatLauncher({ isOpen, unreadCount, label, onClick }: ChatLauncherProps) {
  return (
    <button
      type="button"
      className="chatbot-launcher"
      onClick={onClick}
      aria-label={label}
      aria-expanded={isOpen}
    >
      <span className="chatbot-launcher__halo" aria-hidden="true" />
      <span className="chatbot-launcher__icon">
        {isOpen ? <X size={22} /> : <MessageCircleMore size={22} />}
      </span>
      {!isOpen && unreadCount > 0 ? <span className="chatbot-launcher__badge">{unreadCount}</span> : null}
    </button>
  );
}

