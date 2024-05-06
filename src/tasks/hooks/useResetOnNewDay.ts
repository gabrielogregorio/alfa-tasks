import { useEffect } from 'react';
import { isInNewDay } from '@/tasks/hooks/useHandleTasks';

const TIME_ON_MS_TO_CHECK_IF_S_NEW_DAY = 2000;

export const useResetOnNewDay = () => {
  useEffect(() => {
    const timeout = setInterval(() => {
      if (isInNewDay()) {
        window.location.reload();
      }
    }, TIME_ON_MS_TO_CHECK_IF_S_NEW_DAY);

    return () => {
      return clearInterval(timeout);
    };
  }, []);
};
