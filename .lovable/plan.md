# Rebuild the Spread to Match Your Figma Layout

The uploaded image of the full spread is enough to work from — I'll match the composition from it and skip the 60 MB SVG. The line in your design is a smooth, continuous wave that rises and dips between moments, not the loops and spikes the current page invents, so that gets replaced too.

## What changes

**Layout.** The page becomes one fixed 8400x1200 canvas, scrolled sideways and scaled to fit the window height, so every block sits exactly where you placed it. Each piece — text block, photo cluster, caption — is positioned on that canvas at the coordinates read off your design instead of being packed into equal-height columns.

**Composition, left to right, as in your design:**
- A huge pale "about me" wordmark sitting behind the framed portrait at the far left, with its caption beneath.
- Short text blocks alternating above and below the line, small and quiet — no oversized headings.
- Photo clusters as overlapping, slightly rotated collages: the campaign cards, the podcast set, the poster wall, the lanyard hanging from the top edge, the Config event shots, the deezign poster, the merch collage, and the app-icon grid in the skills block.
- Captions in small type directly under each cluster.
- The skills block near the end as plain listed words under "DESIGN" and "TOOLS" headings, not pills.
- The closing paragraphs as two small text blocks at the far right.

**The line.** One continuous dotted electric-blue wave crossing the whole canvas, passing behind photos and between text blocks, matching the rhythm in your design — long arcs, a tight dip near the podcast, a rise over the lanyard, a settle at the end. It still draws itself progressively as you scroll.

**Kept as is:** your existing photos at their current URLs, the paper/ink/electric palette, Urbanist, horizontal scrolling by trackpad and arrow keys, the progress bar and scroll hint, and the stacked vertical fallback on phones.

## Accuracy caveat

The uploaded image is small, so the copy inside the tiny text blocks isn't readable from it. I'll keep the wording already in the page and place it according to your composition. If any block ends up with the wrong text or in the wrong spot, send a close-up of that section and I'll correct it.

## Technical notes

- New `src/components/about/layout.ts` holds one coordinate map (x, y, width, rotation) for every block on the 8400x1200 canvas; chapters become absolutely positioned layers in that shared space.
- The canvas scales with a single CSS transform driven by viewport height, so proportions never shift across screen sizes.
- The line stays an inline SVG path in canvas coordinates, revealed by a scroll-driven clip rect; `spine.ts` is rewritten to produce the smooth wave and the loop/spike/tangle behaviours are dropped.
- Mobile keeps the existing stacked layout, reading the same content from the chapter definitions.
