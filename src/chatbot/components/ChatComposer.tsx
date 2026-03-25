import { FormEvent, useState } from 'react';
import { SendHorizonal } from 'lucide-react';

interface ChatComposerProps {
  disabled: boolean;
  isSending: boolean;
  placeholder: string;
  sendLabel: string;
  onSend: (text: string) => Promise<void>;
}

export default function ChatComposer({
  disabled,
  isSending,
  placeholder,
  sendLabel,
  onSend,
}: ChatComposerProps) {
  const [value, setValue] = useState('');

  async function submitCurrentValue() {
    const nextValue = value.trim();

    if (!nextValue || disabled) {
      return;
    }

    setValue('');
    await onSend(nextValue);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    await submitCurrentValue();
  }

  return (
    <form className="chatbot-composer" onSubmit={handleSubmit}>
      <textarea
        rows={1}
        className="chatbot-composer__input"
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            void submitCurrentValue();
          }
        }}
      />
      <button
        type="submit"
        className="chatbot-composer__send"
        disabled={disabled || isSending || value.trim().length === 0}
        aria-label={sendLabel}
      >
        <SendHorizonal size={16} />
      </button>
    </form>
  );
}
