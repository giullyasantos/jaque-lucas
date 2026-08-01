import { useEffect, useRef, useState } from 'react';

export function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isInViewport = () => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    };

    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);

    const showIfVisible = () => {
      if (isInViewport()) {
        setVisible(true);
        observer.disconnect();
      }
    };

    const frame = requestAnimationFrame(showIfVisible);
    const fallback = window.setTimeout(() => {
      setVisible(true);
      observer.disconnect();
    }, 700);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(fallback);
      observer.disconnect();
    };
  }, [threshold]);

  return [ref, visible];
}
