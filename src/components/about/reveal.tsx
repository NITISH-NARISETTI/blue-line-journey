import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Fades its children in the first time they scroll into view.
 * Respects prefers-reduced-motion by showing content immediately.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  root,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  root?: Element | null;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { root: root ?? null, rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [root]);

  return (
    <div
      ref={ref}
      className={`${className} ${shown ? "fade-in-soft" : "opacity-0"}`}
      style={shown && delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
