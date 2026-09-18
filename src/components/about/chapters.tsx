import type { ReactNode } from "react";
import type { SpineKind } from "./spine";

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

export type Chapter = {
  id: string;
  /** Desktop width of the panel in px. */
  width: number;
  /** Anchor height inside the 760px-tall spine canvas. */
  y: number;
  kind?: SpineKind;
  marker: string;
  content: ReactNode;
};

const Blue = ({ children }: { children: ReactNode }) => (
  <span className="text-electric">{children}</span>
);

const Kicker = ({ children }: { children: ReactNode }) => (
  <p className="text-[11px] uppercase tracking-[0.42em] text-ink/45">{children}</p>
);

const Photo = ({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) => (
  <img
    src={src}
    alt={alt}
    loading="lazy"
    className={`object-cover shadow-[0_18px_50px_-30px_rgba(0,0,0,0.6)] ${className}`}
  />
);

export const chapters: Chapter[] = [
  {
    id: "opening",
    width: 1180,
    y: 430,
    marker: "00",
    content: (
      <div className="flex h-full items-center gap-14">
        <div className="max-w-[560px]">
          <Kicker>About me</Kicker>
          <h1 className="mt-6 font-display text-[clamp(2.6rem,4.4vw,4.6rem)] font-light leading-[1.03] tracking-tight">
            Somewhere between the sketchbook and the engineering classroom,
          </h1>
          <p className="mt-7 font-display text-3xl font-light leading-snug">
            I found <Blue>design.</Blue> And I think I&apos;m going to stick with it.
          </p>
        </div>
        <Photo
          src={IMG.profile}
          alt="Portrait"
          className="h-[300px] w-[300px] rotate-[-3deg] rounded-full"
        />
      </div>
    ),
  },
  {
    id: "normal-decision",
    width: 900,
    y: 545,
    marker: "01",
    content: (
      <div className="flex h-full flex-col justify-center gap-8">
        <p className="font-display text-[2.4rem] font-light leading-tight">
          And then I made a very normal decision.
        </p>
        <p className="max-w-[380px] text-base leading-relaxed text-ink/60">
          A pretty standard Indian engineering-college plot.
        </p>
        <p className="mt-10 max-w-[420px] border-l-2 border-electric pl-5 font-display text-xl leading-snug">
          Until I discovered something that changed things:
        </p>
      </div>
    ),
  },
  {
    id: "podcast",
    width: 880,
    y: 330,
    marker: "02",
    content: (
      <div className="flex h-full items-center gap-12">
        <Photo
          src={IMG.podcast}
          alt="University podcast artwork"
          className="h-[300px] w-[300px] rotate-[2deg]"
        />
        <p className="max-w-[300px] font-display text-2xl font-light leading-snug">
          Started a university podcast.
          <br />
          Designed <Blue>everything</Blue> around it.
        </p>
      </div>
    ),
  },
  {
    id: "cie",
    width: 1120,
    y: 575,
    marker: "03",
    content: (
      <div className="flex h-full items-center gap-14">
        <div className="max-w-[420px]">
          <Kicker>CIE</Kicker>
          <p className="mt-5 font-display text-[2rem] font-light leading-tight">
            I joined the CIE as a Design member.
            <br />
            This was where things got serious.
          </p>
          <p className="mt-7 text-base leading-relaxed text-ink/60">
            There were events. Campaigns. People. Deadlines. And suddenly, my designs
            weren&apos;t just sitting on my laptop. They were <Blue>out in the world</Blue>.
          </p>
        </div>
        <div className="flex items-end gap-6">
          <Photo src={IMG.cie} alt="CIE campaign design" className="h-[330px] w-[190px]" />
          <div className="relative">
            <Photo
              src={IMG.cieMore}
              alt="More CIE work"
              className="h-[250px] w-[130px] rotate-[3deg]"
            />
            <span className="absolute -bottom-9 left-0 text-[10px] uppercase tracking-[0.3em] text-ink/45">
              And a lot more...
            </span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "levyug",
    width: 1020,
    y: 320,
    kind: "spike",
    marker: "04",
    content: (
      <div className="flex h-full items-center gap-12">
        <div className="max-w-[380px]">
          <p className="font-display text-2xl font-light leading-snug">
            I entered <Blue>Levyug&apos;s</Blue> national-level design competition, a student
            startup from NIT Calicut.
          </p>
          <p className="mt-6 text-sm uppercase tracking-[0.2em] text-ink/55">
            500+ participants. Across India. ₹1 lakh prize pool.
          </p>
          <p className="mt-8 font-display text-[3rem] font-light leading-none text-electric">
            A small win.
          </p>
        </div>
        <Photo src={IMG.levyug} alt="Competition entry" className="h-[340px] w-[218px] rotate-[-2deg]" />
      </div>
    ),
  },
  {
    id: "giving-back",
    width: 940,
    y: 500,
    marker: "05",
    content: (
      <div className="flex h-full items-center gap-12">
        <Photo src={IMG.club} alt="Club design work" className="h-[300px] w-[132px]" />
        <div className="max-w-[400px]">
          <p className="font-display text-[1.9rem] font-light leading-tight">
            The same college club where I started as a designer eventually became a place where
            I helped other people make it.
          </p>
          <p className="mt-6 text-base leading-relaxed text-ink/60">
            Here, I learned to work with <Blue>people</Blue>, not just pixels.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "config24",
    width: 940,
    y: 350,
    marker: "06",
    content: (
      <div className="flex h-full items-center gap-12">
        <div className="max-w-[380px]">
          <p className="font-display text-[2rem] font-light leading-tight">
            I had been designing for a while. Then I designed for <Blue>Config24 HYD.</Blue>
          </p>
          <p className="mt-6 text-base leading-relaxed text-ink/60">
            Designing for a community built around design felt different. This was probably the
            first time design felt like more than a side quest — the first time I seriously saw
            design as a <Blue>career</Blue>.
          </p>
        </div>
        <Photo src={IMG.config} alt="Config24 HYD design" className="h-[200px] w-[355px] rotate-[1.5deg]" />
      </div>
    ),
  },
  {
    id: "deezign",
    width: 1080,
    y: 540,
    kind: "loop",
    marker: "07",
    content: (
      <div className="flex h-full items-center gap-14">
        <div className="max-w-[400px]">
          <Kicker>Three people. One studio.</Kicker>
          <p className="mt-5 font-display text-[2.2rem] font-light leading-tight">
            A friend. A senior. Me. So we started a <Blue>design studio</Blue>.
          </p>
          <p className="mt-6 text-base leading-relaxed text-ink/60">
            A small studio with big ideas and absolutely no interest in making boring things.
          </p>
          <p className="mt-8 text-sm">
            <span className="text-ink/50">check us out ! </span>
            <a
              href="https://www.deezign.org/"
              target="_blank"
              rel="noreferrer"
              className="story-link font-medium text-electric"
            >
              deezign.org
            </a>
          </p>
        </div>
        <Photo src={IMG.studio} alt="Studio work" className="h-[330px] w-[196px] rotate-[-2deg]" />
      </div>
    ),
  },
  {
    id: "communities",
    width: 960,
    y: 330,
    marker: "08",
    content: (
      <div className="flex h-full items-center gap-12">
        <Photo src={IMG.communities} alt="Community event design" className="h-[300px] w-[140px] rotate-[2deg]" />
        <div className="max-w-[380px]">
          <Kicker>Then the circle got bigger.</Kicker>
          <p className="mt-5 font-display text-[1.9rem] font-light leading-tight">
            Started designing for some of the coolest design + tech communities around Hyderabad.
          </p>
          <p className="mt-6 text-base leading-relaxed text-ink/60">
            Different communities. Same question: how do you make people <Blue>care</Blue>?
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "variance",
    width: 900,
    y: 510,
    marker: "09",
    content: (
      <div className="flex h-full flex-col justify-center">
        <p className="font-display text-[3.2rem] font-light leading-none tracking-tight text-electric">
          VARIANCE
        </p>
        <p className="mt-4 max-w-[360px] font-display text-xl font-light leading-snug">
          A launchpad for deep-tech companies built from India.
        </p>
        <p className="mt-7 max-w-[340px] text-base leading-relaxed text-ink/60">
          Volunteer Designer for a month-long deep-tech residency supporting 14 founders.
        </p>
      </div>
    ),
  },
  {
    id: "skills",
    width: 1320,
    y: 400,
    kind: "tangle",
    marker: "10",
    content: (
      <div className="flex h-full flex-col justify-center">
        <p className="max-w-[520px] text-base leading-relaxed text-ink/60">
          Somewhere between the sketches, deadlines, late nights, clients, communities and
          questionable design decisions, I picked up a few things.
        </p>
        <p className="mt-8 font-display text-[2.6rem] font-light leading-none tracking-[0.2em]">
          DESIGN
        </p>
        <div className="mt-6 flex max-w-[860px] flex-wrap gap-x-4 gap-y-3">
          {[
            "Typography",
            "Layout",
            "Branding",
            "Web Design",
            "Visual Systems",
            "Information Design",
            "Event Branding",
            "Print design",
            "Merch design",
            "Storytelling",
            "Social media design",
          ].map((s) => (
            <span
              key={s}
              className="rounded-full border border-ink/20 px-4 py-1.5 text-sm text-ink/75"
            >
              {s}
            </span>
          ))}
          <span className="px-2 py-1.5 text-sm uppercase tracking-[0.25em] text-electric">
            And a lot more...
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "closing",
    width: 1100,
    y: 440,
    marker: "11",
    content: (
      <div className="flex h-full flex-col justify-center">
        <h2 className="max-w-[720px] font-display text-[clamp(2.2rem,3.6vw,3.6rem)] font-light uppercase leading-[1.05] tracking-tight">
          Good design starts before you open the software.
        </h2>
        <p className="mt-8 max-w-[440px] font-display text-xl font-light leading-snug">
          Today, I&apos;m somewhere between brand, visual communication, culture and technology.
        </p>
        <p className="mt-5 max-w-[440px] text-base leading-relaxed text-ink/60">
          I like identities that have personality. And work that feels like it came from a
          person, not a template.
        </p>
      </div>
    ),
  },
];
