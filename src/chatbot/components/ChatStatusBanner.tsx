import { Bot, Sparkles, UserRound } from 'lucide-react';

import { ChatPresence } from '../types';

interface ChatStatusBannerProps {
  presence: ChatPresence;
  humanJoiningLabel: string;
  humanLiveLabel: string;
}

export default function ChatStatusBanner({
  presence,
  humanJoiningLabel,
  humanLiveLabel,
}: ChatStatusBannerProps) {
  if (presence === 'bot') {
    return (
      <div className="chatbot-banner">
        <Bot size={16} />
        <span>Automated assistant is active.</span>
      </div>
    );
  }

  if (presence === 'handoff_pending') {
    return (
      <div className="chatbot-banner chatbot-banner--pending">
        <Sparkles size={16} />
        <span>{humanJoiningLabel}</span>
      </div>
    );
  }

  return (
    <div className="chatbot-banner chatbot-banner--human">
      <UserRound size={16} />
      <span>{humanLiveLabel}</span>
    </div>
  );
}

