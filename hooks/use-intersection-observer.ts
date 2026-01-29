import { RefObject, useEffect, useState } from 'react';

type Options = {
  elementRef: RefObject<HTMLElement | null>;
  threshold: number;
};

function useIntersectionObserver({ elementRef, threshold = 1.0 }: Options) {
  const [isVisible, setVisible] = useState(false);

  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    if (!isVisible && entries[0].isIntersecting) {
      setVisible(true);
    }
  };

  useEffect(() => {
    const node = elementRef?.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      threshold
    });

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [elementRef]);

  return [isVisible];
}

export default useIntersectionObserver;
