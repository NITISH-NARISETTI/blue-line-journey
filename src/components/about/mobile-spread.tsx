import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { chapters } from "@/components/about/chapters";
import { Reveal } from "@/components/about/reveal";

/** Horizontal placement of the line at each chapter, as a fraction of width. */
const LANES = [0.16, 0.3, 0.12, 0.34, 0.2, 0.36, 0.14, 0.32, 0.18, 0.34, 0.15, 0.26];

type Pt = { x: number; y: number };

function lane(i: number) {
  return LANES[i % LANES.length] ?? 0.2;
}

function buildPath(points: Pt[]) {
  if (points.length < 2) return "";
  const first = points[0]!;
  let d = `M ${first.x} ${first.y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]!;
    const cur = points[i]!;
    const dy = (cur.y - prev.y) / 2;
    d += ` C ${prev.x} ${prev.y + dy}, ${cur.x} ${cur.y - dy}, ${cur.x} ${cur.y}`;
  }
  return d;
}

export function MobileSpread() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);
  const [size, setSize] = useState({ w: 390, h: 4000 });
  const [anchors, setAnchors] = useState<{ x: number; y: number }[]>([]);
  const [scrollY, setScrollY] = useState(0);
  const [viewH, setViewH] = useState(800);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Measure the stack and each chapter so the line's dots land on their chapter.
  useLayoutEffect(() => {
    const measure = () => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const rect = wrap.getBoundingClientRect();
      const w = rect.width;
      const h = wrap.offsetHeight;
      setSize({ w, h });
      setViewH(window.innerHeight);
      const pts = sectionRefs.current.map((el, i) => {
        const lane = LANES[i % LANES.length] * w;
        if (!el) return { x: lane, y: (h / chapters.length) * (i + 0.5) };
        return { x: lane, y: el.offsetTop + el.offsetHeight * 0.32 };
      });
      setAnchors(pts);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 400);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      setScrollY(window.scrollY);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const wrapTop = wrapRef.current?.offsetTop ?? 0;
  // How far down the stack has been revealed / coloured, in local coordinates.
  const drawnTo = reduced ? size.h : Math.max(0, scrollY + viewH * 0.88 - wrapTop);
  const front = reduced ? size.h + 600 : Math.max(0, scrollY + viewH * 0.6 - wrapTop);

  const fade = 160;
  const softMask = reduced
    ? "none"
    : `linear-gradient(to bottom, rgba(0,0,0,1) 0px, rgba(0,0,0,1) ${Math.max(
        0,
        drawnTo - fade,
      )}px, rgba(0,0,0,0.5) ${Math.max(0, drawnTo - fade * 0.4)}px, rgba(0,0,0,0) ${Math.max(
        0,
        drawnTo,
      )}px)`;

  const points = anchors.length
    ? [
        { x: anchors[0].x, y: 0 },
        ...anchors,
        { x: anchors[anchors.length - 1].x, y: size.h },
      ]
    : [];
  const d = buildPath(points);

  return (
    <div ref={wrapRef} className="relative bg-[#EEEEEE] md:hidden">
      {/* The blue spine, drawn behind the copy */}
      {d && (
        <svg
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 z-0"
          width={size.w}
          height={size.h}
          viewBox={`0 0 ${size.w} ${size.h}`}
          style={{ maskImage: softMask, WebkitMaskImage: softMask }}
        >
          <defs>
            <linearGradient
              id="m-line-sweep"
              gradientUnits="userSpaceOnUse"
              x1={0}
              y1={front - 260}
              x2={0}
              y2={front + 140}
            >
              <stop offset="0%" stopColor="white" />
              <stop offset="100%" stopColor="black" />
            </linearGradient>
            <mask id="m-line-mask">
              <rect x={0} y={0} width={size.w} height={size.h} fill="url(#m-line-sweep)" />
            </mask>
          </defs>
          <path
            d={d}
            fill="none"
            stroke="#4E5875"
            strokeWidth={2}
            strokeLinecap="round"
            strokeDasharray="2 9"
          />
          <g mask="url(#m-line-mask)">
            <path
              d={d}
              fill="none"
              stroke="#0000FF"
              strokeWidth={2}
              strokeLinecap="round"
              strokeDasharray="2 9"
            />
            {anchors.map((p, i) => (
              <circle key={`dot-${i}`} cx={p.x} cy={p.y} r={4} fill="#0000FF" />
            ))}
          </g>
        </svg>
      )}

      {/* Scroll hint */}
      <div
        className={`pointer-events-none absolute left-1/2 top-6 z-20 flex -translate-x-1/2 items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-ink/50 transition-opacity duration-500 ${
          scrollY > 40 ? "opacity-0" : "opacity-100"
        }`}
      >
        Scroll
        <span className="inline-block h-6 w-px bg-electric" />
        <span className="text-electric">↓</span>
      </div>

      <div className="relative z-10 pt-24">
        {chapters.map((c, i) => (
          <section
            key={c.id}
            ref={(el) => {
              sectionRefs.current[i] = el;
            }}
            aria-label={c.id}
            className="px-6 py-16"
            style={{
              paddingLeft: `${(LANES[i % LANES.length] + 0.1) * 100}%`,
              paddingRight: i % 2 === 0 ? "1.25rem" : "2.5rem",
            }}
          >
            <Reveal>
              <span className="mb-4 block font-mono text-[11px] tracking-[0.3em] text-electric">
                {c.marker}
              </span>
            </Reveal>
            <Reveal delay={140}>
              <div className="mobile-chapter">{c.content}</div>
            </Reveal>
          </section>
        ))}
      </div>
    </div>
  );
}
