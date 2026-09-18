export type SpineKind = "loop" | "spike" | "tangle";

export type Anchor = {
  id: string;
  x: number;
  y: number;
  kind?: SpineKind;
};

/**
 * Builds one continuous, deliberately imperfect path through every anchor.
 * Wobble is derived from the anchor x so the curve is stable across renders.
 */
export function buildSpinePath(anchors: Anchor[]): string {
  const first = anchors[0];
  if (!first) return "";

  let prev = { x: first.x - 340, y: first.y + 40 };
  let d = `M ${prev.x} ${prev.y}`;

  anchors.forEach((a, i) => {
    const dx = a.x - prev.x;
    const sign = i % 2 === 0 ? -1 : 1;
    const wob = 130 + ((Math.round(a.x) * 13) % 110);

    // Two cubics per gap, through a swung mid-point: dips and rises rather
    // than a straight run between milestones.
    const midX = prev.x + dx * 0.52;
    const midY = (prev.y + a.y) / 2 + sign * wob;

    d += ` C ${prev.x + dx * 0.26} ${prev.y + sign * wob * 0.5}, ${
      midX - dx * 0.16
    } ${midY}, ${midX} ${midY}`;
    d += ` C ${midX + dx * 0.16} ${midY}, ${a.x - dx * 0.2} ${
      a.y - sign * wob * 0.75
    }, ${a.x} ${a.y}`;


    if (a.kind === "loop") {
      d += ` a 46 46 0 1 1 10 3`;
      prev = { x: a.x + 10, y: a.y + 3 };
    } else if (a.kind === "spike") {
      d += ` l 44 -164 l 48 164`;
      prev = { x: a.x + 92, y: a.y };
    } else if (a.kind === "tangle") {
      d += ` c 55 -75 125 75 180 0 c 55 -75 125 75 180 0 c 40 -40 90 40 130 6`;
      prev = { x: a.x + 490, y: a.y + 6 };
    } else {
      prev = { x: a.x, y: a.y };
    }
  });

  d += ` C ${prev.x + 120} ${prev.y + 70}, ${prev.x + 220} ${prev.y - 40}, ${
    prev.x + 340
  } ${prev.y + 10}`;

  return d;
}
