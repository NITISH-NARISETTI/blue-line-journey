import type { ReactNode } from "react";

/** Phone-only story, in the same left-to-right order as the desktop strip. */
export type MobileChapter = { id: string; title: string; content: ReactNode };

const Blue = ({ children }: { children: ReactNode }) => (
  <span className="text-electric">{children}</span>
);
const Kicker = ({ children }: { children: ReactNode }) => (
  <p className="text-[11px] uppercase tracking-[0.3em] text-ink/55">{children}</p>
);
const Lead = ({ children }: { children: ReactNode }) => (
  <p className="font-display text-[1.375rem] font-light leading-[1.25] text-ink">{children}</p>
);
const Body = ({ children }: { children: ReactNode }) => (
  <p className="mt-4 text-[15px] leading-[1.6] text-ink/70">{children}</p>
);
const LinkA = ({ href, children }: { href: string; children: ReactNode }) => (
  <a
    href={href}
    target={href.startsWith("http") ? "_blank" : undefined}
    rel="noreferrer"
    className="inline-flex min-h-11 items-center text-[15px] font-medium text-electric underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric"
  >
    {children}
  </a>
);

const skills = [
  "Typography", "Layout", "Branding", "Web Design", "Visual Systems", "Information Design",
  "Event Branding", "Print design", "Merch design", "Storytelling", "Social media design",
];

export const mobileChapters: MobileChapter[] = [
  {
    id: "opening",
    title: "About me",
    content: (
      <>
        <Kicker>About me</Kicker>
        <h1 className="mt-4 font-display text-[1.75rem] font-light leading-[1.15] tracking-tight">
          Somewhere between the sketchbook and the engineering classroom,
        </h1>
        <Body>
          I found <Blue>design.</Blue> And I think I&apos;m going to stick with it.
        </Body>
      </>
    ),
  },
  {
    id: "plot",
    title: "An engineering-college plot",
    content: (
      <>
        <Lead>A pretty standard Indian engineering-college plot.</Lead>
        <p className="mt-5 border-l-2 border-electric pl-4 text-[15px] leading-[1.6] text-ink/80">
          Until I discovered something that changed things:
        </p>
      </>
    ),
  },
  {
    id: "podcast",
    title: "Starting a university podcast",
    content: (
      <Lead>
        Started a university podcast. Designed <Blue>everything</Blue> around it.
      </Lead>
    ),
  },
  {
    id: "communication",
    title: "Design became communication",
    content: <Lead>Design stopped being just software. It became communication.</Lead>,
  },
  {
    id: "cie",
    title: "Joining CIE as a design member",
    content: (
      <>
        <Kicker>CIE</Kicker>
        <div className="mt-3">
          <Lead>I joined the CIE as a Design member. This was where things got serious.</Lead>
        </div>
        <Body>
          There were events. Campaigns. People. Deadlines. And suddenly, my designs weren&apos;t
          just sitting on my laptop. They were <Blue>out in the world</Blue>.
        </Body>
      </>
    ),
  },
  {
    id: "levyug",
    title: "Levyug national design competition",
    content: (
      <>
        <Lead>
          I entered <Blue>Levyug&apos;s</Blue> national-level design competition, a student startup
          from NIT Calicut.
        </Lead>
        <p className="mt-4 text-[12px] uppercase leading-relaxed tracking-[0.15em] text-ink/60">
          500+ participants. Across India. ₹1 lakh prize pool.
        </p>
        <p className="mt-5 font-display text-[1.75rem] font-light leading-none text-electric">
          A small win.
        </p>
      </>
    ),
  },
  {
    id: "giving-back",
    title: "Giving back to the college club",
    content: (
      <>
        <Lead>
          The same college club where I started as a designer eventually became a place where I
          helped other people make it.
        </Lead>
        <Body>
          Here, I learned to work with <Blue>people</Blue>, not just pixels.
        </Body>
      </>
    ),
  },
  {
    id: "config24",
    title: "Designing for Config24 HYD",
    content: (
      <>
        <Lead>
          I had been designing for a while. Then I designed for <Blue>Config24 HYD.</Blue>
        </Lead>
        <Body>
          Designing for a community built around design felt different. It was the first time I
          seriously saw design as a <Blue>career</Blue>.
        </Body>
      </>
    ),
  },
  {
    id: "deezign",
    title: "Starting the deezign studio",
    content: (
      <>
        <Kicker>Three people. One studio.</Kicker>
        <div className="mt-3">
          <Lead>
            A friend. A senior. Me. So we started a <Blue>design studio</Blue>.
          </Lead>
        </div>
        <Body>A small studio with big ideas and absolutely no interest in making boring things.</Body>
        <div className="mt-2">
          <LinkA href="https://deezign.org">deezign.org ↗</LinkA>
        </div>
      </>
    ),
  },
  {
    id: "communities",
    title: "Designing for Hyderabad communities",
    content: (
      <>
        <Kicker>Then the circle got bigger.</Kicker>
        <div className="mt-3">
          <Lead>
            Started designing for some of the coolest design + tech communities around Hyderabad.
          </Lead>
        </div>
        <Body>
          Different communities. Same question: how do you make people <Blue>care</Blue>?
        </Body>
      </>
    ),
  },
  {
    id: "variance",
    title: "Variance deep-tech residency",
    content: (
      <>
        <p className="font-display text-[1.875rem] font-light leading-none tracking-tight text-electric">
          VARIANCE
        </p>
        <div className="mt-3">
          <Lead>A launchpad for deep-tech companies built from India.</Lead>
        </div>
        <Body>Volunteer Designer for a month-long deep-tech residency supporting 14 founders.</Body>
      </>
    ),
  },
  {
    id: "skills",
    title: "What I picked up along the way",
    content: (
      <>
        <p className="text-[15px] leading-[1.6] text-ink/70">
          Somewhere between the sketches, deadlines, late nights, clients, communities and
          questionable design decisions, I picked up a few things.
        </p>
        <p className="mt-5 text-[13px] uppercase tracking-[0.3em] text-ink">Design</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {skills.map((s) => (
            <li key={s} className="rounded-full border border-ink/20 px-3 py-1 text-[13px] text-ink/75">
              {s}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[13px] text-ink/60">And probably the most important one</p>
        <p className="mt-2 font-display text-[1.375rem] font-light uppercase leading-[1.2]">
          Good design starts before you open the software.
        </p>
      </>
    ),
  },
  {
    id: "closing",
    title: "Where I am today",
    content: (
      <>
        <Lead>Today, I&apos;m between brand, visual communication, culture and technology.</Lead>
        <Body>
          I like identities that have personality. And work that feels like it came from a person,
          not a template.
        </Body>
      </>
    ),
  },
  {
    id: "contact",
    title: "Contact me",
    content: (
      <>
        <p className="font-display text-[1.5rem] font-medium leading-none text-electric">Contact Me</p>
        <Body>
          Let&apos;s create something meaningful together. I&apos;d love to hear about your
          project, big or small.
        </Body>
        <p className="mt-6 text-[11px] uppercase tracking-[0.25em] text-ink/60">Email &amp; Phone</p>
        <div className="flex flex-col">
          <LinkA href="mailto:nitishnarisetti.com">nitishnarisetti.com</LinkA>
          <LinkA href="tel:+919573561389">+91 9573561389</LinkA>
        </div>
        <p className="mt-4 text-[11px] uppercase tracking-[0.25em] text-ink/60">Socials</p>
        <div className="flex flex-col">
          <LinkA href="https://www.linkedin.com/in/nitishnarisetti/">LinkedIn</LinkA>
          <LinkA href="https://www.behance.net/narisettinitish">Behance</LinkA>
        </div>
      </>
    ),
  },
];
