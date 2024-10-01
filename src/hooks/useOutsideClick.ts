import React from 'react';

export const useOutsideClick = (callback: () => void) => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !e.composedPath().includes(ref.current)) {
        callback();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []); //[callback]

  return ref;
};
