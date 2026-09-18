/** Jump points along the 8400px spread, in canvas units. */
export type Section = {
  id: string;
  label: string;
  x: number;
};

export const sections: Section[] = [
  { id: "opening", label: "Start", x: 0 },
  { id: "normal-decision", label: "The normal decision", x: 1250 },
  { id: "podcast", label: "Podcast", x: 2500 },
  { id: "cie", label: "CIE", x: 3250 },
  { id: "levyug", label: "Levyug", x: 3850 },
  { id: "giving-back", label: "Giving back", x: 4230 },
  { id: "config24", label: "Config24 HYD", x: 4550 },
  { id: "deezign", label: "Deezign", x: 5150 },
  { id: "communities", label: "Communities", x: 5700 },
  { id: "variance", label: "Variance", x: 6100 },
  { id: "skills", label: "Skills", x: 6900 },
  { id: "closing", label: "Today", x: 7900 },
];
