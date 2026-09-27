import { useCallback, useState, type CSSProperties, type ReactNode } from "react";

type Face = ReactNode;

const page: CSSProperties = {
  position: "absolute",
  inset: 0,
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
  borderRadius: "0 8px 8px 0",
  overflow: "hidden",
  background: "#F7F7F5",
};

function TextPage({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div
      className="flex h-full flex-col justify-between p-5"
      style={{ fontFamily: "Urbanist, sans-serif", color: "#111" }}
    >
      <span className="font-mono text-[10px] tracking-[0.3em]" style={{ color: "#0000FF" }}>
        {n}
      </span>
      <div>
        <p className="mb-2 text-[20px] leading-[1.1]">{title}</p>
        <p className="text-[12px] leading-[1.4] opacity-70">{body}</p>
      </div>
    </div>
  );
}

/** Lightweight 5-page flip book: pure CSS 3D transforms, click / Enter to flip. */
export function FlipBook({
  cover,
  width,
  height,
  style,
  className,
}: {
  cover: { src: string; alt: string };
  width: number;
  height: number;
  style?: CSSProperties;
  className?: string;
}) {
  const faces: Face[] = [
    <img
      key="c"
      src={cover.src}
      alt={cover.alt}
      draggable={false}
      className="h-full w-full select-none object-cover"
      style={{ maxWidth: "none" }}
    />,
    <TextPage key="1" n="01" title="Designer" body="Graphic & visual communication, based in Hyderabad." />,
    <TextPage key="2" n="02" title="Podcasts & clubs" body="Started a university podcast, gave back to the design club." />,
    <TextPage key="3" n="03" title="Config24 HYD" body="Designed for community events across the city." />,
    <TextPage key="4" n="04" title="Deezign" body="A small studio for brands, culture and technology." />,
    <div key="b" className="h-full w-full" style={{ background: "#0000FF" }} />,
  ];
  const leaves = faces.length / 2;
  const [flipped, setFlipped] = useState(0);

  const next = useCallback(() => setFlipped((f) => (f >= leaves ? 0 : f + 1)), [leaves]);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Flip book, page ${flipped + 1} of ${leaves + 1}. Press to turn.`}
      onClick={next}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          e.stopPropagation();
          next();
        }
      }}
      className={`cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-[#0000FF] ${className ?? ""}`}
      style={{ width, height, perspective: 1600, ...style }}
    >
      <div
        className="relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped > 0 && flipped < leaves ? `translateX(${width / 2}px)` : undefined,
        }}
      >
        {Array.from({ length: leaves }, (_, i) => {
          const isFlipped = i < flipped;
          return (
            <div
              key={i}
              className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none"
              style={{
                transformOrigin: "left center",
                transformStyle: "preserve-3d",
                transform: `rotateY(${isFlipped ? -180 : 0}deg)`,
                zIndex: isFlipped ? i : leaves - i,
                boxShadow: i === 0 && flipped === 0 ? "4px 6px 14px rgba(0,0,0,0.18)" : undefined,
              }}
            >
              <div style={page}>{faces[i * 2]}</div>
              <div style={{ ...page, transform: "rotateY(180deg)", borderRadius: "8px 0 0 8px" }}>
                {faces[i * 2 + 1]}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
