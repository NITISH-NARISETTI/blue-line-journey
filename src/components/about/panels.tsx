import type { ReactNode } from "react";

const IMG = {
  profile:
    "https://api.builder.io/api/v1/image/assets/TEMP/3691ea066160018877defad13e3d472d60492c9c?placeholderIfAbsent=true",
  podcast:
    "https://api.builder.io/api/v1/image/assets/TEMP/7e6f069e9c0f9c7dabba119ebf962aff6a77b08a?placeholderIfAbsent=true",
  cie: "https://api.builder.io/api/v1/image/assets/TEMP/37e0f1391805ea36e791bb1bdf5a0fe2a654a4d4?placeholderIfAbsent=true",
  cieMore:
    "https://api.builder.io/api/v1/image/assets/TEMP/1d21b12b23aebb53ff4aee52dfb86a3c072ba145?placeholderIfAbsent=true",
  levyug:
    "https://api.builder.io/api/v1/image/assets/TEMP/0d2c27480473ed46b75c813643a0d569effb3cdb?placeholderIfAbsent=true",
  club: "https://api.builder.io/api/v1/image/assets/TEMP/6dc39353b11086ac172d827c5319cae82ae42a9a?placeholderIfAbsent=true",
  config:
    "https://api.builder.io/api/v1/image/assets/TEMP/3593c9a8499387278f8b1cd792e2ce03fa0d5d08?placeholderIfAbsent=true",
  studio:
    "https://api.builder.io/api/v1/image/assets/TEMP/e13fd04ebd31d0495798955154c72ac4d37c2500?placeholderIfAbsent=true",
  communities:
    "https://api.builder.io/api/v1/image/assets/TEMP/59fe410b677e00911001bee0a035f42c54f94a66?placeholderIfAbsent=true",
};

export type Block = {
  id: string;
  /** Position on the 8400x700 canvas, in canvas units. */
  x: number;
  y: number;
  w: number;
  /** Text alignment inside the block. */
  align?: "left" | "center";
  rotate?: number;
  z?: number;
  node: ReactNode;
};

const Blue = ({ children }: { children: ReactNode }) => (
  <span className="text-electric">{children}</span>
);

const Cap = ({ children }: { children: ReactNode }) => (
  <p className="text-[11px] leading-[1.5] text-ink/45">{children}</p>
);

const Body = ({ children }: { children: ReactNode }) => (
  <p className="text-[13px] leading-[1.55] text-ink/70">{children}</p>
);

const Lead = ({ children }: { children: ReactNode }) => (
  <p className="font-display text-[19px] font-medium leading-[1.35] text-ink">{children}</p>
);

const Shot = ({
  src,
  alt,
  w,
  h,
  rotate = 0,
  className = "",
}: {
  src: string;
  alt: string;
  w: number;
  h: number;
  rotate?: number;
  className?: string;
}) => (
  <img
    src={src}
    alt={alt}
    loading="lazy"
    style={{ width: w, height: h, transform: `rotate(${rotate}deg)` }}
    className={`object-cover shadow-[0_20px_50px_-32px_rgba(0,0,0,0.65)] ${className}`}
  />
);

export const blocks: Block[] = [
  {
    id: "wordmark",
    x: 0,
    y: 150,
    w: 1400,
    z: 0,
    node: (
      <span className="select-none font-display text-[280px] font-semibold leading-none tracking-tight text-ink/[0.07]">
        about me
      </span>
    ),
  },
  {
    id: "portrait",
    x: 500,
    y: 225,
    w: 190,
    z: 2,
    node: (
      <div className="border-[6px] border-dashed border-electric p-[3px]">
        <img
          src={IMG.profile}
          alt="Portrait of Nitish Narisetti"
          className="h-[200px] w-full object-cover"
        />
      </div>
    ),
  },
  {
    id: "opening-caption",
    x: 385,
    y: 460,
    w: 430,
    align: "center",
    node: (
      <>
        <Body>
          Somewhere between the sketchbook and the engineering classroom, I found{" "}
          <Blue>design.</Blue>
        </Body>
        <Cap>And I think I&apos;m going to stick with it.</Cap>
      </>
    ),
  },
  {
    id: "normal-decision",
    x: 1580,
    y: 120,
    w: 330,
    node: (
      <>
        <Lead>And then I made a very normal decision.</Lead>
        <Cap>A pretty standard Indian engineering-college plot.</Cap>
      </>
    ),
  },
  {
    id: "cie-cards",
    x: 1960,
    y: 225,
    w: 420,
    node: (
      <div className="flex items-end gap-4">
        <Shot src={IMG.cie} alt="CIE campaign design" w={230} h={175} rotate={-4} />
        <Shot src={IMG.cieMore} alt="More CIE work" w={165} h={130} rotate={2} />
      </div>
    ),
  },
  {
    id: "cie-caption",
    x: 1960,
    y: 450,
    w: 300,
    node: (
      <>
        <Body>I joined the CIE as a Design member.</Body>
        <Cap>This was where things got serious.</Cap>
      </>
    ),
  },
  {
    id: "podcast-text",
    x: 2560,
    y: 120,
    w: 300,
    node: (
      <>
        <Lead>Started a university podcast.</Lead>
        <Cap>
          Designed <Blue>everything</Blue> around it.
        </Cap>
      </>
    ),
  },
  {
    id: "podcast-art",
    x: 2530,
    y: 230,
    w: 420,
    node: (
      <div className="flex items-end gap-4">
        <Shot src={IMG.podcast} alt="University podcast artwork" w={220} h={220} rotate={-2} />
        <Shot src={IMG.studio} alt="Recording an episode on air" w={185} h={140} rotate={3} />
      </div>
    ),
  },
  {
    id: "podcast-caption",
    x: 2570,
    y: 500,
    w: 250,
    align: "center",
    node: <Cap>Covers, clips, stage design and everything in between.</Cap>,
  },
  {
    id: "events-text",
    x: 3070,
    y: 95,
    w: 400,
    align: "center",
    node: (
      <>
        <Lead>Events. Campaigns. People. Deadlines.</Lead>
        <Cap>
          And suddenly, my designs weren&apos;t just sitting on my laptop. They were{" "}
          <Blue>out in the world</Blue>.
        </Cap>
      </>
    ),
  },
  {
    id: "events-wall",
    x: 2990,
    y: 240,
    w: 560,
    node: (
      <div className="flex items-end gap-5">
        <Shot src={IMG.cieMore} alt="Event posters" w={150} h={195} rotate={-5} />
        <Shot src={IMG.podcast} alt="Campaign poster" w={165} h={215} rotate={1} />
        <Shot src={IMG.cie} alt="Poster series" w={150} h={200} rotate={4} />
      </div>
    ),
  },
  {
    id: "events-caption",
    x: 2960,
    y: 495,
    w: 520,
    align: "center",
    node: (
      <>
        <Cap>
          The same college club where I started as a designer eventually became a place where I
          helped other people make it.
        </Cap>
        <Body>
          Here, I learned to work with <Blue>people</Blue>, not just pixels.
        </Body>
      </>
    ),
  },
  {
    id: "lanyard",
    x: 3560,
    y: 0,
    w: 230,
    z: 2,
    node: (
      <div className="flex flex-col items-center">
        <span className="h-[150px] w-[14px] bg-ink" />
        <Shot src={IMG.cieMore} alt="Event poster set" w={130} h={190} />
      </div>
    ),
  },
  {
    id: "levyug-text",
    x: 3840,
    y: 130,
    w: 340,
    align: "center",
    node: (
      <>
        <Cap>I entered a national-level</Cap>
        <Lead>design competition for a student startup</Lead>
        <Cap>from NIT Calicut.</Cap>
        <p className="mt-2 text-[11px] uppercase tracking-[0.25em] text-electric">
          500+ participants · ₹1 lakh prize pool
        </p>
      </>
    ),
  },
  {
    id: "levyug-card",
    x: 3875,
    y: 250,
    w: 260,
    node: <Shot src={IMG.levyug} alt="Levyug competition entry" w={255} h={200} />,
  },
  {
    id: "levyug-caption",
    x: 3855,
    y: 485,
    w: 320,
    align: "center",
    node: (
      <>
        <Cap>A small win.</Cap>
        <Body>
          <Blue>Top 3</Blue> out of 500+ designers across India.
        </Body>
      </>
    ),
  },
  {
    id: "config-text",
    x: 4415,
    y: 125,
    w: 320,
    node: (
      <>
        <Cap>I had been designing for a while.</Cap>
        <Lead>
          Then I designed for <Blue>Config24 HYD.</Blue>
        </Lead>
      </>
    ),
  },
  {
    id: "config-shots",
    x: 4335,
    y: 200,
    w: 420,
    node: (
      <div className="flex items-end gap-4">
        <Shot src={IMG.club} alt="Config24 HYD audience" w={250} h={150} />
        <Shot src={IMG.config} alt="Friends of Figma Hyderabad signage" w={130} h={190} rotate={2} />
      </div>
    ),
  },
  {
    id: "config-caption",
    x: 4335,
    y: 490,
    w: 340,
    node: (
      <>
        <Body>Designing for a community built around design felt different.</Body>
        <Cap>
          The first time I seriously saw design as a <Blue>career</Blue>.
        </Cap>
      </>
    ),
  },
  {
    id: "deezign-text",
    x: 4960,
    y: 125,
    w: 340,
    align: "center",
    node: (
      <>
        <Lead>Three people. One studio.</Lead>
        <Cap>A friend. A senior. Me. So we started a design studio.</Cap>
      </>
    ),
  },
  {
    id: "deezign-poster",
    x: 5000,
    y: 245,
    w: 260,
    node: <Shot src={IMG.profile} alt="Studio Deezign mark" w={250} h={250} className="!object-contain" />,
  },
  {
    id: "deezign-caption",
    x: 4970,
    y: 520,
    w: 320,
    align: "center",
    node: (
      <>
        <Cap>check us out !</Cap>
        <a
          href="https://www.deezign.org/"
          target="_blank"
          rel="noreferrer"
          className="story-link font-display text-[17px] font-medium text-electric"
        >
          deezign.org
        </a>
        <Cap>A small studio with big ideas and no interest in boring things.</Cap>
      </>
    ),
  },
  {
    id: "communities-text",
    x: 5620,
    y: 130,
    w: 290,
    align: "center",
    node: (
      <>
        <Cap>Then the circle got bigger.</Cap>
        <Body>
          Designing for design + tech communities around <Blue>Hyderabad</Blue>.
        </Body>
      </>
    ),
  },
  {
    id: "variance-text",
    x: 5480,
    y: 470,
    w: 400,
    align: "center",
    node: (
      <>
        <Cap>VARIANCE</Cap>
        <Body>
          Volunteer designer for a month-long deep-tech residency supporting 14 founders,
          building from India.
        </Body>
      </>
    ),
  },
  {
    id: "merch-collage",
    x: 6030,
    y: 250,
    w: 460,
    node: (
      <div className="flex items-end gap-4">
        <Shot src={IMG.cieMore} alt="Merch and poster design" w={150} h={175} rotate={-8} />
        <Shot src={IMG.club} alt="Community event" w={160} h={195} rotate={4} />
        <Shot src={IMG.cie} alt="Print work" w={150} h={185} rotate={-3} />
      </div>
    ),
  },
  {
    id: "merch-caption",
    x: 6060,
    y: 510,
    w: 340,
    align: "center",
    node: (
      <>
        <Cap>Print, merch, stage and social.</Cap>
        <Body>
          Different communities. Same question: how do you make people <Blue>care</Blue>?
        </Body>
      </>
    ),
  },
  {
    id: "skills-intro",
    x: 6660,
    y: 110,
    w: 400,
    align: "center",
    node: (
      <Cap>
        Somewhere between the sketches, deadlines, late nights, clients, communities and
        questionable design decisions, I picked up a few things.
      </Cap>
    ),
  },
  {
    id: "skills-list",
    x: 6660,
    y: 200,
    w: 420,
    node: (
      <>
        <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-electric">
          Design
        </p>
        <p className="mt-2 text-[13px] leading-[1.7] text-ink/70">
          Typography · Layout · Branding · Web Design · Visual Systems · Information Design ·
          Event Branding · Print design · Merch design · Storytelling · Social media design
        </p>
        <p className="mt-5 text-[13px] font-semibold uppercase tracking-[0.2em] text-electric">
          Tools
        </p>
        <p className="mt-2 text-[13px] leading-[1.7] text-ink/70">
          Illustrator · After Effects · InDesign · Figma · Photoshop · Premiere Pro · Blender ·
          Framer · Webflow · Notion · GitHub
        </p>
      </>
    ),
  },
  {
    id: "skills-icons",
    x: 7060,
    y: 230,
    w: 260,
    node: <Shot src={IMG.communities} alt="Tools I use every day" w={250} h={125} />,
  },
  {
    id: "skills-caption",
    x: 6680,
    y: 560,
    w: 320,
    node: <Cap>And a lot more that never made it onto a list.</Cap>,
  },
  {
    id: "closing-one",
    x: 7360,
    y: 120,
    w: 420,
    node: (
      <>
        <Lead>Good design starts before you open the software.</Lead>
        <Cap>
          Today, I&apos;m somewhere between brand, visual communication, culture and technology.
        </Cap>
      </>
    ),
  },
  {
    id: "closing-two",
    x: 7360,
    y: 290,
    w: 400,
    node: (
      <>
        <Body>
          I like identities that have personality, and work that feels like it came from a
          person, not a template.
        </Body>
        <Cap>
          Still learning. <Blue>Still building.</Blue>
        </Cap>
      </>
    ),
  },
];
