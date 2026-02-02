import { useEffect, useRef } from 'react';

type Handler = (event: MouseEvent | TouchEvent) => void;

export const useClickOutside = <T extends HTMLElement = HTMLElement>(
  handler: Handler,
): React.RefObject<T | null> => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const { target } = event;
      if (!ref.current || (target instanceof Node && ref.current.contains(target))) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [handler]);

  return ref;
};
