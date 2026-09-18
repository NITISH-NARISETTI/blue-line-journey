const IMG = {
  podcast:
    "https://api.builder.io/api/v1/image/assets/TEMP/7e6f069e9c0f9c7dabba119ebf962aff6a77b08a?placeholderIfAbsent=true",
  studio:
    "https://api.builder.io/api/v1/image/assets/TEMP/e13fd04ebd31d0495798955154c72ac4d37c2500?placeholderIfAbsent=true",
  cie: "https://api.builder.io/api/v1/image/assets/TEMP/37e0f1391805ea36e791bb1bdf5a0fe2a654a4d4?placeholderIfAbsent=true",
  cieMore:
    "https://api.builder.io/api/v1/image/assets/TEMP/1d21b12b23aebb53ff4aee52dfb86a3c072ba145?placeholderIfAbsent=true",
  levyug:
    "https://api.builder.io/api/v1/image/assets/TEMP/0d2c27480473ed46b75c813643a0d569effb3cdb?placeholderIfAbsent=true",
  club: "https://api.builder.io/api/v1/image/assets/TEMP/6dc39353b11086ac172d827c5319cae82ae42a9a?placeholderIfAbsent=true",
  config:
    "https://api.builder.io/api/v1/image/assets/TEMP/3593c9a8499387278f8b1cd792e2ce03fa0d5d08?placeholderIfAbsent=true",
};

export type Shot = {
  src: string;
  alt: string;
  /** Offset inside the slot, in canvas units. */
  x: number;
  y: number;
  w: number;
  h: number;
  rotate?: number;
};

export type Slot = {
  id: string;
  /** Top-left of the slot on the 8400x700 canvas. */
  x: number;
  y: number;
  shots: Shot[];
};

/** Photo clusters dropped into the empty gaps left in the exported strip. */
export const slots: Slot[] = [
  {
    id: "podcast",
    x: 2620,
    y: 250,
    shots: [
      { src: IMG.podcast, alt: "Spotlight podcast cover artwork", x: 0, y: 0, w: 180, h: 180, rotate: -3 },
      { src: IMG.studio, alt: "Recording the podcast on air", x: 165, y: 22, w: 195, h: 150, rotate: 3 },
    ],
  },
  {
    id: "cie",
    x: 3300,
    y: 250,
    shots: [
      { src: IMG.cie, alt: "CIE campaign poster set", x: 0, y: 0, w: 210, h: 190, rotate: -2 },
      { src: IMG.cieMore, alt: "More CIE campaign work", x: 195, y: 18, w: 215, h: 175, rotate: 2.5 },
    ],
  },
  {
    id: "levyug",
    x: 3890,
    y: 270,
    shots: [
      { src: IMG.levyug, alt: "Levyug national design competition entry", x: 0, y: 0, w: 260, h: 185, rotate: -1.5 },
    ],
  },
  {
    id: "club",
    x: 4250,
    y: 420,
    shots: [
      { src: IMG.club, alt: "Working with the college design club", x: 0, y: 0, w: 220, h: 170, rotate: 2 },
    ],
  },
  {
    id: "config",
    x: 4560,
    y: 230,
    shots: [
      { src: IMG.config, alt: "Config24 Hyderabad event design", x: 0, y: 0, w: 230, h: 170, rotate: -2.5 },
    ],
  },
  {
    id: "variance",
    x: 6110,
    y: 240,
    shots: [
      { src: IMG.cieMore, alt: "Poster work for the Variance residency", x: 0, y: 0, w: 200, h: 165, rotate: -2 },
      { src: IMG.club, alt: "Merch and print work", x: 185, y: 25, w: 195, h: 150, rotate: 2.5 },
    ],
  },
];
