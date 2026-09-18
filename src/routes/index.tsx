import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { chapters } from "@/components/about/chapters";
import { buildSpinePath, type Anchor } from "@/components/about/spine";

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
  component: AboutTimeline,
});

const CANVAS_HEIGHT = 760;
const PANEL_PADDING = 120;

function AboutTimeline() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [scrollX, setScrollX] = useState(0);
  const [viewport, setViewport] = useState(1280);
  const [reduced, setReduced] = useState(false);

  const { anchors, total } = useMemo(() => {
    let x = PANEL_PADDING;
    const list: Anchor[] = [];
    for (const c of chapters) {
      list.push({
        id: c.id,
        x: x + c.width * 0.42,
        y: c.y,
        ...(c.kind ? { kind: c.kind } : {}),
      });
      x += c.width;
    }
    return { anchors: list, total: x + PANEL_PADDING };
  }, []);

  const path = useMemo(() => buildSpinePath(anchors), [anchors]);

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

  // Translate vertical wheel input into horizontal travel (desktop only).
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

  const drawnTo = reduced ? total : Math.max(0, scrollX + viewport * 0.72);
  const progress = Math.min(1, total > viewport ? scrollX / (total - viewport) : 1);

  return (
    <main className="relative bg-paper text-ink">
      {/* Progress bar */}
      <div className="fixed left-0 top-0 z-30 hidden h-[3px] w-full bg-ink/10 md:block">
        <div
          className="h-full bg-electric transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div
        ref={scrollerRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="hide-scrollbar relative w-full outline-none md:h-screen md:overflow-x-auto md:overflow-y-hidden"
      >
        <div
          className="relative flex flex-col md:h-full md:flex-row"
          style={{ ["--track-width" as string]: `${total}px` }}
        >
          {/* The spine — desktop only */}
          <svg
            aria-hidden
            className="pointer-events-none absolute left-0 top-1/2 z-0 hidden -translate-y-1/2 md:block"
            width={total}
            height={CANVAS_HEIGHT}
            viewBox={`0 0 ${total} ${CANVAS_HEIGHT}`}
            fill="none"
          >
            <defs>
              <clipPath id="spine-reveal">
                <rect x="0" y="-200" width={drawnTo} height={CANVAS_HEIGHT + 400} />
              </clipPath>
            </defs>
            <g clipPath="url(#spine-reveal)">
              <path
                d={path}
                stroke="var(--electric)"
                strokeOpacity="0.18"
                strokeWidth="9"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d={path}
                stroke="var(--electric)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="1 11"
                fill="none"
              />
            </g>
            {anchors.map((a) => {
              const on = a.x <= drawnTo;
              return (
                <circle
                  key={a.id}
                  cx={a.x}
                  cy={a.y}
                  r={on ? 6 : 0}
                  fill="var(--electric)"
                  className="transition-all duration-500"
                />
              );
            })}
          </svg>

          {/* Chapters */}
          {chapters.map((c, i) => {
            const anchorX = anchors[i]?.x ?? 0;
            const revealed = reduced || anchorX - 260 <= drawnTo;
            return (
              <section
                key={c.id}
                aria-label={c.id}
                className="relative z-10 shrink-0 border-b border-ink/10 px-6 py-16 md:h-full md:border-b-0 md:px-16 md:py-0"
                style={{ width: undefined }}
                data-width={c.width}
              >
                <div
                  className="md:h-full"
                  style={{ width: "100%" }}
                >
                  <div
                    className="flex h-full items-center"
                    style={{ minWidth: 0 }}
                  >
                    <div
                      className={`w-full transition-all duration-700 ease-out ${
                        revealed ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                      }`}
                    >
                      <span className="mb-6 block font-mono text-[11px] tracking-[0.3em] text-electric md:mb-10">
                        {c.marker}
                      </span>
                      <div className="md:h-[600px]">{c.content}</div>
                    </div>
                  </div>
                </div>
                {/* Mobile vertical spine */}
                <span
                  aria-hidden
                  className="absolute left-2 top-0 block h-full border-l-2 border-dotted border-electric/50 md:hidden"
                />
              </section>
            );
          })}
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className={`pointer-events-none fixed bottom-8 left-1/2 z-30 hidden -translate-x-1/2 items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-ink/50 transition-opacity duration-500 md:flex ${
          scrollX > 40 ? "opacity-0" : "opacity-100"
        }`}
      >
        Scroll
        <span className="inline-block h-px w-14 bg-electric" />
        <span className="text-electric">→</span>
      </div>

      <style>{`
        section[data-width] { width: 100%; }
        @media (min-width: 768px) {
          ${chapters
            .map(
              (c) =>
                `section[data-width="${c.width}"][aria-label="${c.id}"] { width: ${c.width}px; }`,
            )
            .join("\n")}
        }
      `}</style>
    </main>
  );
}
