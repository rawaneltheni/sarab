import ChatLauncher from './ChatLauncher';
import ChatWindow from './ChatWindow';
import { useChatWidget } from '../hooks/useChatWidget';

export default function ChatbotWidget() {
  const {
    isOpen,
    isBooting,
    isSending,
    hasConnectionError,
    snapshot,
    messages,
    labels,
    currentPath,
    closeChat,
    toggleChat,
    sendMessage,
    retryMessage,
    triggerHumanTakeover,
    handleRedirect,
  } = useChatWidget();

  return (
    <div className="chatbot-root">
      <ChatWindow
        currentPath={currentPath}
        hasConnectionError={hasConnectionError}
        isBooting={isBooting}
        isOpen={isOpen}
        isSending={isSending}
        labels={labels}
        messages={messages}
        presence={snapshot?.presence ?? 'bot'}
        suggestions={snapshot?.suggestions ?? []}
        onClose={closeChat}
        onRedirect={handleRedirect}
        onRetry={retryMessage}
        onSend={sendMessage}
        onTakeover={triggerHumanTakeover}
      />

      <ChatLauncher
        isOpen={isOpen}
        unreadCount={snapshot?.unreadCount ?? 0}
        label={labels.launcher}
        onClick={toggleChat}
      />
    </div>
  );
}

