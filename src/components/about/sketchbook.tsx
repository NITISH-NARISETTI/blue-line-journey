import { useState } from "react";

/**
 * Landscape sketchbook, spiral-bound along the top. Click (or Enter/Space)
 * flips the next page up over the binding; after the last page it closes again.
 * Replace the `src` values in PAGES with the real sketch photos.
 */
export type SketchPage = { src?: string; alt: string };

const PAGES: SketchPage[] = [
  { alt: "Sketchbook cover" },
  { alt: "Sketch page 1" },
  { alt: "Sketch page 2" },
  { alt: "Sketch page 3" },
  { alt: "Sketch page 4" },
];

/** Placement on the 8400x700 canvas. */
const BOOK = { left: 1515, top: 222, width: 380, height: 266 };

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
        return (
          <div
            key={i}
            className="absolute inset-0 motion-reduce:transition-none"
            style={{
              transformOrigin: "center top",
              transformStyle: "preserve-3d",
              transform: `rotateX(${isFlipped ? 180 : 0}deg) translateZ(${isFlipped ? i * 0.3 : (total - i) * 0.3}px)`,
              opacity: isFlipped ? 0 : 1,
              transition: isFlipped
                ? "transform 1s cubic-bezier(0.645, 0.045, 0.355, 1), opacity 0.35s ease 0.55s"
                : "transform 1s cubic-bezier(0.645, 0.045, 0.355, 1), opacity 0.2s ease",
              zIndex: isFlipped ? i : total - i,
            }}
          >
            <div
              className="absolute inset-0 overflow-hidden rounded-[6px] border border-ink/10"
              style={{ backfaceVisibility: "hidden" }}
            >
              <Face page={page} index={i} />
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
