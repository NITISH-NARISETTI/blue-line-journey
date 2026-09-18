import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { chapters } from "@/components/about/chapters";
import { blocks } from "@/components/about/panels";
import { CANVAS, LINE_DOTS, LINE_POINTS, buildWavePath } from "@/components/about/spine";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "About — Nitish Narisetti, Graphic & Visual Communication Designer" },
      {
        name: "description",
        content:
          "A horizontal, hand-drawn timeline through the work of an Indian graphic and visual communication designer: podcasts, campaigns, communities, competitions and a studio called Deezign.",
      },
      { property: "og:title", content: "About — Nitish Narisetti, Designer" },
      {
        property: "og:description",
        content:
          "Scroll sideways through a design journey: college campaigns, Config24 HYD, Levyug, Variance and the Deezign studio.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutSpread,
});

function AboutSpread() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [scrollX, setScrollX] = useState(0);
  const [viewport, setViewport] = useState(1280);
  const [scale, setScale] = useState(1);
  const [reduced, setReduced] = useState(false);

  const path = useMemo(() => buildWavePath(LINE_POINTS), []);
  const trackWidth = CANVAS.w * scale;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let frame = 0;
    const read = () => {
      frame = 0;
      setScrollX(el.scrollLeft);
      setViewport(el.clientWidth);
      setScale(Math.max(0.55, Math.min(1.7, el.clientHeight / CANVAS.h)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", read);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", read);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Vertical wheel input drives horizontal travel on desktop.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (el.clientWidth < 768) return;
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el) return;
    const step = el.clientWidth * 0.8;
    if (e.key === "ArrowRight" || e.key === "PageDown") el.scrollLeft += step;
    if (e.key === "ArrowLeft" || e.key === "PageUp") el.scrollLeft -= step;
  }, []);

  // How far the line has been drawn, in canvas units.
  const drawnTo = reduced
    ? CANVAS.w
    : Math.max(0, (scrollX + viewport * 0.85) / Math.max(scale, 0.01));
  const progress = Math.min(
    1,
    trackWidth > viewport ? scrollX / (trackWidth - viewport) : 1,
  );

  return (
    <main className="relative bg-paper text-ink">
      <div className="fixed left-0 top-0 z-30 hidden h-[3px] w-full bg-ink/10 md:block">
        <div
          className="h-full bg-electric transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Desktop: one fixed canvas, scrolled sideways */}
      <div
        ref={scrollerRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="hide-scrollbar relative hidden h-screen w-full overflow-x-auto overflow-y-hidden outline-none md:block"
      >
        <div className="relative h-full" style={{ width: trackWidth }}>
          <div
            className="absolute left-0"
            style={{
              width: CANVAS.w,
              height: CANVAS.h,
              top: `calc(50% - ${(CANVAS.h * scale) / 2}px)`,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
          >
            <svg
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 z-[1]"
              width={CANVAS.w}
              height={CANVAS.h}
              viewBox={`0 0 ${CANVAS.w} ${CANVAS.h}`}
              fill="none"
            >
              <defs>
                <clipPath id="line-reveal">
                  <rect x="0" y="-200" width={drawnTo} height={CANVAS.h + 400} />
                </clipPath>
              </defs>
              <g clipPath="url(#line-reveal)">
                <path
                  d={path}
                  stroke="var(--electric)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="1 10"
                  fill="none"
                />
                {LINE_DOTS.map(([x, y]) => (
                  <circle key={`${x}-${y}`} cx={x} cy={y} r="6" fill="var(--electric)" />
                ))}
              </g>
            </svg>

            {blocks.map((b) => {
              const revealed = reduced || b.x - 200 <= drawnTo;
              return (
                <div
                  key={b.id}
                  className={`absolute transition-all duration-700 ease-out ${
                    revealed ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`}
                  style={{
                    left: b.x,
                    top: b.y,
                    width: b.w,
                    zIndex: b.z ?? 1,
                    textAlign: b.align === "center" ? "center" : "left",
                    transform: b.rotate ? `rotate(${b.rotate}deg)` : undefined,
                  }}
                >
                  {b.node}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile: the same story, stacked */}
      <div className="md:hidden">
        {chapters.map((c) => (
          <section
            key={c.id}
            aria-label={c.id}
            className="relative border-b border-ink/10 px-6 py-14"
          >
            <span className="mb-5 block font-mono text-[11px] tracking-[0.3em] text-electric">
              {c.marker}
            </span>
            {c.content}
            <span
              aria-hidden
              className="absolute left-2 top-0 block h-full border-l-2 border-dotted border-electric/50"
            />
          </section>
        ))}
      </div>

      <div
        className={`pointer-events-none fixed bottom-8 left-1/2 z-30 hidden -translate-x-1/2 items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-ink/50 transition-opacity duration-500 md:flex ${
          scrollX > 40 ? "opacity-0" : "opacity-100"
        }`}
      >
        Scroll
        <span className="inline-block h-px w-14 bg-electric" />
        <span className="text-electric">→</span>
      </div>
    </main>
  );
}
