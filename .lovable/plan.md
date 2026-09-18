# One 8400px SVG of the Whole Spread

Yes — exporting the entire frame as a single SVG works, and it is the most accurate route. A few things to know before you export, because they change what I build.

## What a whole-frame SVG gives you

- Perfect geometry. Every line, dot, shape and position lands exactly where you drew it. No eyeballing.
- The blue line comes across as real vector paths, so it can still draw itself as you scroll.
- Colours and shapes stay crisp at any zoom.

## The two trade-offs

1. **Text.** Figma exports text either as live text (fonts must load, and they sometimes shift) or as outlines (perfect shapes, but the words are no longer selectable, searchable, or readable by screen readers, and they will not reflow). My recommendation: export the frame **without** the text layers, and I re-create the copy as real text on top at the exact positions. You get pixel-accurate artwork plus real, selectable words.
2. **Photos.** If your photos are inside the frame, the SVG will embed them and could become very large (tens of MB), which makes the page slow. Better: export the frame **without** the photos, and I place them separately using the image files — same positions, much lighter page.

So the ideal export is: **the full 8400px frame containing the line art, shapes and decorative vectors only — no text, no photos.** If that is fussy to do, send the full thing including everything and I will work with it; I will just flag the file size.

## Export settings

- Select the top-level frame, export as SVG, 1x (SVG has no resolution).
- Turn ON "Include id attribute" — it lets me target individual pieces like the loop and the spike.
- Turn OFF "Outline text" if you are keeping text in.
- Also send: the exact frame width and height, and the font names and weights used.

## What I will build

- The page becomes one fixed 8400px-wide canvas scrolled horizontally, scaled to fit the window height so proportions never shift.
- Your SVG is rendered inline as the base layer at its true coordinates.
- The blue line is revealed progressively as you scroll — your artwork, only the reveal is animated.
- Real text and photos are layered on top at the positions taken from the same frame.
- Progress bar, scroll hint, keyboard and trackpad scrolling stay as they are.
- Phones fall back to the stacked vertical version, since an 8400px canvas is unusable there.

## Technical notes

- The exported SVG is committed inline (not as an `<img>`) so its paths can be clipped by scroll position and individual `id`s can be animated.
- The canvas uses the frame's own coordinate space via `viewBox`, with text and image layers absolutely positioned in the same units — one source of truth for geometry.
- `src/components/about/spine.ts` (the generated curve) is retired.
- Photos are stored as project assets and served from the CDN rather than embedded in the SVG.
