import { useCleanupOnDismount } from '@/common/hooks/useCleanupOnDismount';
import { useRef, useState } from 'react';

const DEFAULT_TIME_IN_MS_TO_RESET = 2000;

type useTextOnActionAndResetAfterDelayType = {
  referenceText: string;
  alternativeText: string;
  timeResetInMs?: number;
};

/**
 * Custom hook that switches between two texts when an action happens
 * , and returns to the reference text after a while
 *
 * @param {string} referenceText - The initial text to display and to which the text will reset.
 * @param {string} alternativeText - The alt text that will be displayed when action is called
 * @param {number} [timeResetInMs=DEFAULT_TIME_IN_MS_TO_RESET] - Delay in milliseconds before resetting the text.
 * @returns {object} An object that contains the text which and the action function to trigger the text change.
 */
export const useTextOnActionAndResetAfterDelay = ({
  referenceText,
  alternativeText,
  timeResetInMs = DEFAULT_TIME_IN_MS_TO_RESET,
}: useTextOnActionAndResetAfterDelayType) => {
  const [text, setText] = useState(referenceText);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useCleanupOnDismount(() => clearTimeout(timeoutRef.current));

  const action = () => {
    clearTimeout(timeoutRef.current);

    setText(alternativeText);
    timeoutRef.current = setTimeout(() => {
      setText(referenceText);
    }, timeResetInMs);
  };

  return {
    action,
    text,
  };
};
