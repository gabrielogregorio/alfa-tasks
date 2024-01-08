import { useCallback } from 'react';

export const useReadFromClipboard = (): {
  readClipboard: () => Promise<string>;
} => {
  const readClipboard = useCallback(async () => {
    return navigator.clipboard
      .readText()
      .then((text) => text)
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error('Could not read clipboard: ', err);
        return '';
      });
  }, []);

  return { readClipboard };
};
