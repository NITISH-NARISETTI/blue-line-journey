import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";

import { chapters } from "@/components/about/chapters";
import strip from "@/assets/about-me-strip.svg.asset.json";
import lines from "@/assets/about-me-lines.svg.asset.json";

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
  const lenisRef = useRef<{ scrollTo: (t: number, o?: object) => void } | null>(null);
  const [scrollX, setScrollX] = useState(0);
  const [viewport, setViewport] = useState(1280);
  const [scale, setScale] = useState(1);
  const [reduced, setReduced] = useState(false);
  const [artLoaded, setArtLoaded] = useState(false);
  const [lineArt, setLineArt] = useState("");

  const trackWidth = CANVAS.w * scale;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // The ten line vectors, loaded separately so they can be recoloured on scroll.
  useEffect(() => {
    let alive = true;
    fetch(lines.url)
      .then((r) => r.text())
      .then((text) => {
        if (!alive) return;
        const inner = text.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
        setLineArt(inner);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
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

  // Lenis: smooth, eased horizontal travel driven by vertical wheel input.
  useEffect(() => {
    const el = scrollerRef.current;
    const content = el?.firstElementChild as HTMLElement | null;
    if (!el || !content || reduced) return;

    let alive = true;
    let raf = 0;
    let lenis: { raf: (t: number) => void; destroy: () => void; scrollTo: (t: number, o?: object) => void } | null =
      null;

    import("lenis").then(({ default: Lenis }) => {
      if (!alive) return;
      lenis = new Lenis({
        wrapper: el,
        content,
        orientation: "horizontal",
        gestureOrientation: "both",
        smoothWheel: true,
        lerp: 0.085,
        wheelMultiplier: 1.1,
        syncTouch: false,
      }) as unknown as typeof lenis;
      lenisRef.current = lenis;
      const loop = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });

    return () => {
      alive = false;
      if (raf) cancelAnimationFrame(raf);
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el) return;
    const step = el.clientWidth * 0.8;
    let target = el.scrollLeft;
    if (e.key === "ArrowRight" || e.key === "PageDown") target += step;
    else if (e.key === "ArrowLeft" || e.key === "PageUp") target -= step;
    else return;
    e.preventDefault();
    if (lenisRef.current) lenisRef.current.scrollTo(target, { duration: 1.1 });
    else el.scrollLeft = target;
  }, []);

  // How far the spread has been revealed, in canvas units.
  const drawnTo = reduced
    ? CANVAS.w
    : Math.max(0, (scrollX + viewport * 0.85) / Math.max(scale, 0.01));

  // Where the grey-to-blue colour front currently sits.
  const front = reduced
    ? CANVAS.w + 1200
    : Math.max(0, (scrollX + viewport * 0.55) / Math.max(scale, 0.01));

  // Soft, blurred reveal edge instead of a hard cut.
  const fade = 520;
  const softMask = reduced
    ? "none"
    : `linear-gradient(to right, rgba(0,0,0,1) 0px, rgba(0,0,0,1) ${Math.max(
        0,
        drawnTo - fade,
      )}px, rgba(0,0,0,0.85) ${Math.max(0, drawnTo - fade * 0.62)}px, rgba(0,0,0,0.45) ${Math.max(
        0,
        drawnTo - fade * 0.3,
      )}px, rgba(0,0,0,0) ${Math.max(0, drawnTo)}px)`;


  return (
    <main className="relative bg-[#EEEEEE] text-ink">
      <h1 className="sr-only">About me — a designer's timeline</h1>

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
                maskImage: softMask,
                WebkitMaskImage: softMask,
              }}
            >
              <img
                ref={(el) => {
                  if (el?.complete) setArtLoaded(true);
                }}
                src={strip.url}
                alt=""
                aria-hidden
                width={CANVAS.w}
                height={CANVAS.h}
                decoding="async"
                onLoad={() => setArtLoaded(true)}
                className={`block select-none transition-opacity duration-1000 ease-out ${
                  artLoaded ? "opacity-100" : "opacity-0"
                }`}
                draggable={false}
              />
            </div>

            {/* Grey copy of the ten line vectors, wiped away by the scroll front
                so the blue underneath fills in from left to right. */}
            {lineArt && (
              <svg
                aria-hidden
                className="fade-in-soft pointer-events-none absolute left-0 top-0"
                width={CANVAS.w}
                height={CANVAS.h}
                viewBox={`0 0 ${CANVAS.w} ${CANVAS.h}`}
                style={{
                  zIndex: 1,
                  maskImage: softMask,
                  WebkitMaskImage: softMask,
                }}
              >
                <defs>
                  <linearGradient
                    id="line-sweep"
                    gradientUnits="userSpaceOnUse"
                    x1={front - 420}
                    y1={0}
                    x2={front + 220}
                    y2={0}
                  >
                    <stop offset="0%" stopColor="black" />
                    <stop offset="100%" stopColor="white" />
                  </linearGradient>
                  <mask id="line-sweep-mask">
                    <rect
                      x={0}
                      y={0}
                      width={CANVAS.w}
                      height={CANVAS.h}
                      fill="url(#line-sweep)"
                    />
                  </mask>
                </defs>
                <g
                  mask="url(#line-sweep-mask)"
                  dangerouslySetInnerHTML={{ __html: lineArt }}
                />
              </svg>
            )}

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
