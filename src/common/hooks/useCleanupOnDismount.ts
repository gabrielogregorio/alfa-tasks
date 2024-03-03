import { useEffect } from 'react';

/**
 * Custom hook that triggers a function when the component has been unmounted.
 *
 * @param cleanupFunction The function that will be called when disassembling the component.
 */
export const useCleanupOnDismount = (cleanupFunction: () => void) => {
  useEffect(() => {
    return () => cleanupFunction();
  }, []);
};
