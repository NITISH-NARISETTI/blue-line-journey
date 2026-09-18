/** The spread's fixed canvas, in design units. */
export const CANVAS = { w: 8400, h: 700 };

/** Reference points (x, y) in canvas units that the dotted line travels through. */
const K = 4.375; // reference image (1920px wide) -> canvas units

const REF: [number, number][] = [
  [110, 132],
  [175, 141],
  [240, 138],
  [300, 22],
  [352, 16],
  [400, 44],
  [452, 34],
  [500, 26],
  [548, 132],
  [600, 150],
  [652, 138],
  [700, 30],
  [742, 20],
  [790, 40],
  [830, 120],
  [872, 148],
  [920, 142],
  [962, 34],
  [1010, 44],
  [1062, 30],
  [1110, 48],
  [1155, 138],
  [1205, 150],
  [1258, 140],
  [1305, 40],
  [1352, 18],
  [1400, 60],
  [1445, 128],
  [1495, 136],
  [1528, 34],
  [1560, 24],
  [1600, 120],
  [1648, 136],
  [1700, 130],
  [1742, 34],
  [1790, 22],
  [1850, 40],
];

export const LINE_POINTS: [number, number][] = REF.map(([x, y]) => [
  Math.round(x * K),
  Math.round(y * K),
]);

/** Milestone dots sit on a handful of the line points. */
export const LINE_DOTS = [0, 5, 9, 13, 18, 23, 28, 32, LINE_POINTS.length - 1].map(
  (i) => LINE_POINTS[Math.min(i, LINE_POINTS.length - 1)]!,
);

/** Catmull-Rom through every point, emitted as one smooth cubic path. */
export function buildWavePath(points: [number, number][]): string {
  if (points.length < 2) return "";
  const p = points;
  let d = `M ${p[0]![0]} ${p[0]![1]}`;

  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[Math.max(0, i - 1)]!;
    const p1 = p[i]!;
    const p2 = p[i + 1]!;
    const p3 = p[Math.min(p.length - 1, i + 2)]!;

    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;

    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(
      1,
    )}, ${p2[0]} ${p2[1]}`;
  }

  return d;
}
