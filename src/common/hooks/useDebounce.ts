import { useEffect, useRef } from 'react';

/**
 * Custom hook for debouncing function calls based on dependency changes.
 *
 * @param callback The function to be debounced and called after the specified delay.
 * @param deps An array of dependencies that, when changed, trigger the call to the debounced function.
 * @param timeInMs The debounce waiting time in milliseconds before the callback is executed.
 */
export const useDebounce = (callback: () => void, deps: unknown[], timeInMs: number) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const timer = setTimeout(() => callbackRef.current(), timeInMs);

    return () => clearTimeout(timer);
  }, [...deps, timeInMs]);
};
