import type { RefObject } from 'react';
import { useEffect, useState } from 'react';

export const useOutsideClick = (
  ref: RefObject<HTMLDivElement>,
  callback?: () => void,
  callback2?: () => void,
): { clickedOutside: boolean } => {
  const [clickedOutside, setClickedOutside] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      const referencesContainTarget = (): boolean => !(ref.current && ref.current.contains(event.target as Node));
      const clickedOutsideReference: boolean = (ref.current && referencesContainTarget()) || false;

      if (!clickedOutsideReference) {
        callback?.();
      } else {
        callback2?.();
      }
      setClickedOutside(clickedOutsideReference);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref.current]);

  return { clickedOutside };
};
