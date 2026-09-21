# Mobile: the same journey, top to bottom

Phones currently get a plain stacked list with a dotted border down the left. It
is rebuilt as a proper vertical version of the spread, with the same paper
background, the same type, and the same blue line — only turned 90 degrees.

## How it works

- One continuous dotted electric-blue line runs down the page, slightly off to
  the left, hand-drawn in feel: it bends left and right between chapters rather
  than running dead straight.
- The line draws itself as you scroll. Above your position it is fully blue;
  below it sits in the same muted grey the desktop line starts from, so colour
  fills in downward as you travel — the same grey-to-blue front, rotated.
- Each stage is revealed as it enters view: the line reaches a small blue dot at
  the chapter, then the chapter's text fades and lifts in, so stages are
  discovered one at a time instead of all being visible at once.
- A soft gradient edge sits just below your position so upcoming content washes
  in gently, matching the desktop reveal.
- A "Scroll ↓" hint at the top, fading out once you start.
- Smooth scrolling on touch, and motion is fully disabled for visitors who ask
  for reduced motion — everything is simply visible.

## Layout and content

- Same 12 chapters, same words, in the same order.
- Chapters alternate their horizontal placement slightly around the line, some
  wider, some narrower, keeping the uneven magazine rhythm rather than a tidy
  list.
- Small chapter markers (00–11) in the blue, set in the same small-caps spacing
  used on desktop.
- No photos, matching the desktop spread.
- Desktop stays exactly as it is.

## Technical notes

- New `src/components/about/mobile-spread.tsx` holding the vertical timeline;
  `src/routes/index.tsx` renders it in place of the current `md:hidden` block
  and keeps the desktop branch untouched.
- The line is one inline SVG path in a tall, viewport-width coordinate space,
  positioned `fixed`/`sticky` behind the content and sized to the full document
  height; chapter y-anchors are derived from measured section offsets so dots
  always land on their chapter.
- Reveal uses the existing `Reveal` component plus a vertical gradient
  `maskImage` on the line SVG driven by `window.scrollY`, mirroring `drawnTo` /
  `front` from the desktop route.
- Grey `#4E5875` → `#0000FF` handled with a vertical `linearGradient` mask, same
  approach as the desktop overlay.
- Line dash styling reuses the existing dashed stroke look; `march-dash` stays
  available but is not required.
