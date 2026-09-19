"use client";

import { useEffect, useRef, useState, RefObject } from "react";

/**
 * Custom hook that triggers a visibility class when element scrolls into view.
 * Returns a ref to attach + a boolean for visibility state.
 */
export function useScrollReveal(threshold = 0.15): [RefObject<HTMLElement | null>, boolean] {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
}
