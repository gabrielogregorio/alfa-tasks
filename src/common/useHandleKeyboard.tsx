import { useEffect } from 'react';

export const useHandleKeyboard = (onPressKey: (key: string) => void) => {
  useEffect(() => {
    const handleKeyDown = (event: { key: string }) => {
      onPressKey(event.key);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
};
