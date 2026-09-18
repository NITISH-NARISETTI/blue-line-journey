# Cleaner spread: animated blue line, no chrome

Three changes to the horizontal "About me" page.

## 1. Remove the reveal edge

The thin pulsing blue vertical bar that sits at the edge of the revealed
artwork is removed. The left-to-right reveal of the spread itself stays as it
is — only the marker line disappears.

## 2. Remove the progress rail and the chapter bar

- The thin progress bar pinned along the top of the window goes away.
- The rounded chapter bar at the bottom (Start, Podcast, CIE, ... with the
  percentage counter) goes away.

The "Scroll →" hint at the start stays, so first-time visitors still know the
page moves sideways.

## 3. Animate the blue line

The blue dashed line is part of the exported artwork, which is a flat picture —
its dashes cannot move on their own. So the animation lives on the blue guide
line already drawn on top of the artwork: its dashes travel continuously to the
right, and the line keeps drawing itself forward as you scroll, so it reads as
one live hand-drawn stroke. Motion is disabled for visitors who ask for reduced
motion.

## Technical notes

- `src/routes/index.tsx`: delete the fixed progress rail block, the
  `nav[aria-label="Timeline sections"]` block, and the `reveal-edge` span.
  Drop the now-unused `goTo`, `activeIndex`, `progress` and `sections` import.
- Keep the existing `drawnTo` clip-path reveal on the artwork and on the
  overlay `<svg>` path.
- The overlay path keeps `.marching-line` (`march-dash` keyframes in
  `src/styles.css`), with the dash travel slowed slightly and opacity raised so
  it reads clearly against the artwork.
- `src/components/about/sections.ts` becomes unused; leave the file in place in
  case section jumps come back later.
