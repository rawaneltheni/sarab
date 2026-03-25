import { useEffect, useEffectEvent } from 'react';

import { CHAT_POLL_INTERVAL_MS } from '../constants';

interface UseChatPollingOptions {
  enabled: boolean;
  onPoll: () => Promise<void>;
  intervalMs?: number;
}

export function useChatPolling({ enabled, onPoll, intervalMs = CHAT_POLL_INTERVAL_MS }: UseChatPollingOptions) {
  const handlePoll = useEffectEvent(async () => {
    await onPoll();
  });

  useEffect(() => {
    if (!enabled) {
      return;
    }

    void handlePoll();

    const intervalId = window.setInterval(() => {
      void handlePoll();
    }, intervalMs);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [enabled, intervalMs, handlePoll]);
}

