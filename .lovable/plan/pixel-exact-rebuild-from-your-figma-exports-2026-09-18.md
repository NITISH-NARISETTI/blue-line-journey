# Pixel-Exact Rebuild from Your Figma Exports

You want the page to match the Figma file exactly, using your own vector line art instead of the line I generate in code. That is doable, but it needs exports from you first.

## What I need from you

1. **The blue line, as SVG.** Export the line as vector — ideally one SVG per section/segment (the podcast stretch, the loop at the studio, the spike at the competition, the tangle before the skills wall, the closing settle). One giant SVG of the whole line also works and is simpler; separate pieces give smoother "draws as you scroll" control.
2. **A full-frame image of the whole spread** (PNG or JPG, exported at 2x). This is my reference for exact positions, sizes and spacing.
3. **Section close-ups** — a screenshot of each chapter at readable size, so I can match type sizes and gaps precisely.
4. **Exact type details** if you have them: font family and weights, and the heading/body sizes used.

Upload them in chat and I will start. Without the exports I can only approximate.

## What I will build once the files arrive

- Replace the code-generated line with your exported vector paths, placed at the exact coordinates from the Figma frame.
- Keep the "draws itself as you scroll" behaviour: your path is revealed progressively as you travel right, so the artwork is yours and only the reveal is animated.
- Rebuild each chapter's layout to the exported frame: same x positions, same widths, same vertical placement, same image crops and sizes, same type scale.
- Keep your existing photos at their current URLs unless you send higher-resolution exports.
- Milestone dots, progress bar, scroll hint and keyboard/trackpad scrolling stay as they are now.

## Pixel-exact, practically

A Figma frame is one fixed width. To be truly pixel-exact I will lay the page out on that same fixed canvas and scale the whole thing to fit the window height, so proportions never shift. On phones the page falls back to the stacked vertical version, since a fixed wide canvas is unreadable there — tell me if you would rather it stay horizontal on mobile too.

## Technical notes

- Exported SVGs are stored as project assets and rendered inline so the stroke can be revealed by scroll position; the reveal uses a clip rectangle driven by scroll, not a redrawn path.
- Chapter geometry moves from hand-tuned widths into a single coordinate map taken from the Figma frame, with one absolutely positioned layer per chapter on the shared canvas.
- `src/components/about/spine.ts` (the generated curve) is retired once your vectors are in.
- Text stays live HTML, not flattened images, so it remains selectable and readable.
