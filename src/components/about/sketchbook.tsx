import { useState } from "react";

import s1 from "@/assets/sketch-1.jpg.asset.json";
import s2 from "@/assets/sketch-2.jpg.asset.json";
import s3 from "@/assets/sketch-3.jpg.asset.json";
import s4 from "@/assets/sketch-4.jpg.asset.json";
import s5 from "@/assets/sketch-5.jpg.asset.json";
import s6 from "@/assets/sketch-6.jpg.asset.json";
import s7 from "@/assets/sketch-7.jpg.asset.json";

/**
 * Landscape sketchbook, spiral-bound along the top. Click (or Enter/Space)
 * flips the next page up over the binding; after the last page it closes again.
 */
export type SketchPage = { src?: string; alt: string };

const PAGES: SketchPage[] = [
  { alt: "Sketchbook cover" },
  { src: s1.url, alt: "Pencil sketch of tulips" },
  { src: s2.url, alt: "Ink sketch of Krishna playing the flute beside Radha" },
  { src: s3.url, alt: "Two skulls, one in a hat and suit, one with headphones" },
  { src: s4.url, alt: "A butterfly formed from a pelvis bone" },
  { src: s5.url, alt: "A skull with flowers and arrows" },
  { src: s6.url, alt: "A knight in a helmet" },
  { src: s7.url, alt: "A crow pulling a tear from an eye" },
];

/** Placement on the 8400x700 canvas (75% of the original size, same centre). */
const BOOK = { left: 1563, top: 255, width: 285, height: 200 };

function Face({ page, index }: { page?: SketchPage; index: number }) {
  if (page?.src) {
    return (
      <img
        src={page.src}
        alt={page.alt}
        draggable={false}
        className="h-full w-full select-none object-cover"
        style={{ maxWidth: "none" }}
      />
    );
  }
  const cover = index === 0;
  return (
    <div
      className={`flex h-full w-full items-center justify-center font-mono text-[10px] uppercase tracking-[0.34em] ${
        cover ? "bg-electric text-[#EEEEEE]" : "bg-[#FBFAF6] text-ink/40"
      }`}
    >
      {cover ? "sketchbook" : `page ${index}`}
    </div>
  );
}

export function Sketchbook({ pages = PAGES }: { pages?: SketchPage[] }) {
  const [flipped, setFlipped] = useState(0);
  const total = pages.length;

  const next = () => setFlipped((f) => (f >= total ? 0 : f + 1));

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Sketchbook, page ${Math.min(flipped + 1, total)} of ${total}. Click to turn the page.`}
      onClick={next}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          e.stopPropagation();
          next();
        }
      }}
      className="absolute z-10 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-electric"
      style={{ ...BOOK, perspective: 1800 }}
    >
      {/* Back board */}
      <div
        className="absolute inset-0 rounded-[6px] bg-[#FBFAF6]"
        style={{ boxShadow: "0 18px 30px -18px rgba(17,17,17,0.45), 0 2px 6px rgba(17,17,17,0.12)" }}
      />

      {pages.map((page, i) => {
        const isFlipped = i < flipped;
        // When the book closes, pages fall back one after another, last page first.
        const returnDelay = flipped === 0 ? (total - 1 - i) * 70 : 0;
        return (
          <div
            key={i}
            className="absolute inset-0 motion-reduce:transition-none"
            style={{
              transformOrigin: "center top",
              transformStyle: "preserve-3d",
              transform: isFlipped
                ? "rotateX(178deg) translateZ(1px)"
                : "rotateX(0deg) translateZ(0px)",
              opacity: isFlipped ? 0 : 1,
              transition: isFlipped
                ? "transform 1.1s cubic-bezier(0.45, 0.05, 0.25, 1), opacity 0.4s ease 0.62s"
                : `transform 0.9s cubic-bezier(0.3, 0.7, 0.2, 1) ${returnDelay}ms, opacity 0.25s ease ${returnDelay}ms`,
              // A turning page always rides above the unturned stack beneath it.
              zIndex: isFlipped ? total + i + 1 : total - i,
            }}
          >
            <div
              className="absolute inset-0 overflow-hidden rounded-[6px] border border-ink/10"
              style={{ backfaceVisibility: "hidden" }}
            >
              <Face page={page} index={i} />
              {/* Shading as the page lifts off the book */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: "linear-gradient(to top, rgba(17,17,17,0.28), rgba(17,17,17,0) 70%)",
                  opacity: isFlipped ? 1 : 0,
                  transition: "opacity 0.55s ease",
                }}
              />
            </div>
            {/* Back of the page, seen once it has flipped over the binding */}
            <div
              className="absolute inset-0 rounded-[6px] border border-ink/10 bg-[#F4F2EC]"
              style={{ backfaceVisibility: "hidden", transform: "rotateX(180deg)" }}
            />
          </div>
        );
      })}

      {/* Spiral binding */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-4 right-4 flex justify-between"
        style={{ top: -9, zIndex: total * 2 + 2 }}
      >
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} className="block h-[18px] w-[6px] rounded-full border-2 border-ink/70 bg-transparent" />
        ))}
      </div>
    </div>
  );
}
