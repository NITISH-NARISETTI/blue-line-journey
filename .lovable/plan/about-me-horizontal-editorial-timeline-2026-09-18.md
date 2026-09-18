# About Me — Horizontal Editorial Timeline

A single full-screen page that scrolls sideways, like an independent design magazine spread laid out end to end. A dotted electric-blue line runs through the whole journey and draws itself as you move.

## The journey (left to right)

Content comes straight from the file you pasted, in this order:

1. **Opening** — "Somewhere between the sketchbook and the engineering classroom, I found design. And I think I'm going to stick with it." with your profile picture.
2. **The normal decision** — the engineering-college plot, and what changed things.
3. **The podcast** — started a university podcast, designed everything around it.
4. **CIE** — joined as a Design member; events, campaigns, deadlines; "out in the world".
5. **Levyug** — national competition, 500+ participants, ₹1 lakh prize pool, a small win.
6. **Giving back** — the same club became a place to help others make it; people, not just pixels.
7. **Config24 HYD** — the first time design felt like a career.
8. **Deezign** — three people, one studio, with the "check us out → deezign.org" link.
9. **The circle got bigger** — design + tech communities around Hyderabad.
10. **Variance** — deep-tech residency, 14 founders.
11. **What I picked up** — the skills wall: Typography, Layout, Branding, Web Design, Visual Systems, Information Design, Event Branding, Print, Merch, Storytelling, Social media, "AND A LOT MORE...".
12. **Closing** — "Good design starts before you open the software." and where you are today.

## The blue line

- One continuous dotted line crossing every chapter — hand-drawn feel, uneven curves, loops, dips and rises rather than a neat arc.
- It draws itself progressively as you scroll: the line only exists as far as you've travelled.
- At key moments it misbehaves on purpose — a loop at the studio chapter, a sharp spike at the competition win, a tangle before the skills wall, a slow settle at the end.
- Small blue dots mark each milestone, and the chapter's text fades and lifts in slightly as it enters view.

## Feel

- Off-white paper background, near-black text, one electric blue used sparingly for emphasis words and the line.
- Urbanist for the copy, with oversized display headings and small caption text, magazine-style — chapters deliberately unequal in width and vertical placement, not a tidy grid.
- Images from your file are used as-is at their original URLs.
- A thin progress bar and a "scroll →" hint at the start; keyboard arrows and trackpad both move the page.

## Technical notes

- Rewrites `src/routes/index.tsx` as the horizontal scroll page (this is the home page), with chapter sections as components under `src/components/about/`.
- Native horizontal overflow scroll on a full-height track; vertical wheel input is translated to horizontal movement so a normal mouse works. Respects `prefers-reduced-motion` by disabling line drawing and reveals.
- The line is one inline SVG path per chapter segment, dashed stroke, animated with `stroke-dashoffset` driven by scroll position (no extra animation library needed).
- Colors and fonts added as tokens in `src/styles.css`; Urbanist loaded via a `<link>` in `__root.tsx`.
- Mobile: below the desktop breakpoint the same chapters stack vertically with the line running top to bottom, since sideways scrolling is awkward on phones.
- Page title/description set for this portfolio.
