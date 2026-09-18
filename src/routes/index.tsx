import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { chapters } from "@/components/about/chapters";
import { slots } from "@/components/about/photos";
import { sections } from "@/components/about/sections";
import strip from "@/assets/about-me-strip.svg.asset.json";

const CANVAS = { w: 8400, h: 700 };

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
  const [artLoaded, setArtLoaded] = useState(false);

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

  const goTo = useCallback(
    (x: number) => {
      const el = scrollerRef.current;
      if (!el) return;
      const target = Math.max(0, x * scale - el.clientWidth * 0.12);
      el.scrollTo({ left: target, behavior: reduced ? "auto" : "smooth" });
    },
    [scale, reduced],
  );

  // How far the spread has been revealed, in canvas units.
  const drawnTo = reduced
    ? CANVAS.w
    : Math.max(0, (scrollX + viewport * 0.85) / Math.max(scale, 0.01));
  const progress = Math.min(
    1,
    trackWidth > viewport ? scrollX / (trackWidth - viewport) : 1,
  );

  // Section currently centred in the window.
  const activeIndex = useMemo(() => {
    const centre = (scrollX + viewport * 0.4) / Math.max(scale, 0.01);
    let idx = 0;
    sections.forEach((s, i) => {
      if (s.x <= centre) idx = i;
    });
    return idx;
  }, [scrollX, viewport, scale]);

  return (
    <main className="relative bg-[#EEEEEE] text-ink">
      <h1 className="sr-only">About me — a designer's timeline</h1>

      {/* Progress rail with a marker per chapter */}
      <div className="fixed left-0 top-0 z-30 hidden w-full md:block">
        <div className="relative h-[3px] w-full bg-ink/10">
          <div
            className="h-full bg-electric transition-[width] duration-150 ease-out"
            style={{ width: `${progress * 100}%` }}
          />
          {sections.map((s) => (
            <span
              key={`tick-${s.id}`}
              aria-hidden
              className={`absolute top-0 h-[3px] w-[2px] ${
                s.x / CANVAS.w <= progress ? "bg-electric" : "bg-ink/25"
              }`}
              style={{ left: `${(s.x / CANVAS.w) * 100}%` }}
            />
          ))}
        </div>
      </div>

      {/* Compact chapter navigation */}
      <nav
        aria-label="Timeline sections"
        className="fixed bottom-6 left-1/2 z-30 hidden max-w-[92vw] -translate-x-1/2 items-center gap-1 overflow-x-auto rounded-full border border-ink/10 bg-[#EEEEEE]/85 px-2 py-1.5 backdrop-blur md:flex"
      >
        {sections.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => goTo(s.x)}
            aria-current={i === activeIndex ? "true" : undefined}
            className={`whitespace-nowrap rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.18em] transition-colors ${
              i === activeIndex
                ? "bg-electric text-white"
                : "text-ink/55 hover:text-ink"
            }`}
          >
            {s.label}
          </button>
        ))}
        <span className="ml-1 pr-2 font-mono text-[10px] tabular-nums text-ink/40">
          {Math.round(progress * 100)}%
        </span>
      </nav>

      {/* Desktop: the exported spread on one canvas, scrolled sideways */}
      <div
        ref={scrollerRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="hide-scrollbar relative hidden h-screen w-full overflow-x-auto overflow-y-hidden bg-[#EEEEEE] outline-none md:block"
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
            <div
              className="absolute left-0 top-0"
              style={{
                width: CANVAS.w,
                height: CANVAS.h,
                clipPath: `inset(0 ${Math.max(0, CANVAS.w - drawnTo)}px 0 0)`,
              }}
            >
              <img
                src={strip.url}
                alt=""
                aria-hidden
                width={CANVAS.w}
                height={CANVAS.h}
                decoding="async"
                onLoad={() => setArtLoaded(true)}
                className={`block select-none transition-opacity duration-700 ${
                  artLoaded ? "opacity-100" : "opacity-0"
                }`}
                draggable={false}
              />
            </div>

            {/* Animated guide line: marches along and draws itself with the reveal */}
            <svg
              aria-hidden
              className="pointer-events-none absolute left-0 top-0"
              width={CANVAS.w}
              height={CANVAS.h}
              viewBox={`0 0 ${CANVAS.w} ${CANVAS.h}`}
              style={{ zIndex: 1 }}
            >
              <path
                d={`M0 ${CANVAS.h - 40} H ${CANVAS.w}`}
                fill="none"
                stroke="var(--color-electric, #0000FF)"
                strokeWidth={2}
                strokeLinecap="round"
                strokeDasharray="10 14"
                className="marching-line"
                style={{
                  clipPath: `inset(0 ${Math.max(0, CANVAS.w - drawnTo)}px 0 0)`,
                  opacity: 0.45,
                }}
              />
            </svg>

            {/* The drawing head at the reveal edge */}
            {!reduced && drawnTo < CANVAS.w && (
              <span
                aria-hidden
                className="reveal-edge absolute top-0 block w-[2px] bg-electric/50"
                style={{ left: drawnTo, height: CANVAS.h, zIndex: 3 }}
              />
            )}

            {slots.map((slot) => {
              const revealed = reduced || slot.x - 120 <= drawnTo;
              const near = reduced || slot.x - viewport * 1.6 <= drawnTo;
              return (
                <div
                  key={slot.id}
                  className={`absolute transition-all duration-700 ease-out ${
                    revealed ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`}
                  style={{ left: slot.x, top: slot.y, zIndex: 2 }}
                >
                  {near &&
                    slot.shots.map((s, i) => (
                      <img
                        key={`${slot.id}-${i}`}
                        src={s.src}
                        alt={s.alt}
                        loading="lazy"
                        decoding="async"
                        className="absolute rounded-[2px] object-cover shadow-[0_10px_30px_rgba(0,0,0,0.12)]"
                        style={{
                          left: s.x,
                          top: s.y,
                          width: s.w,
                          height: s.h,
                          maxWidth: "none",
                          transform: s.rotate ? `rotate(${s.rotate}deg)` : undefined,
                        }}
                        draggable={false}
                      />
                    ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Readable copy for search engines and screen readers */}
      <div className="sr-only md:block">
        {chapters.map((c) => (
          <section key={`sr-${c.id}`} aria-label={c.id} className="sr-only">
            {c.content}
          </section>
        ))}
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
        className={`pointer-events-none fixed bottom-20 left-1/2 z-30 hidden -translate-x-1/2 items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-ink/50 transition-opacity duration-500 md:flex ${
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
