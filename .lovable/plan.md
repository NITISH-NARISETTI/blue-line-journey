# Rebuild the spread from your exported strip

Your export is the whole 8400x700 spread: the wordmark, the portrait stamp, every line of copy, the tool icons and the dashed blue line, all exactly as drawn. The page will now use that artwork itself instead of my rebuilt approximation, and the photos will be dropped into the empty spaces on top of it.

## What the page becomes

- The exported strip is the page background, shown at its true size on one long canvas, scaled to fit the window height.
- Scrolling sideways still reveals the spread progressively left to right, so the blue line and the words appear as you travel along them.
- Photos sit on top of the artwork in the gaps that were left empty, each one appearing as the reveal reaches it.
- The progress bar, the "scroll" hint, trackpad scrolling and arrow keys all stay.
- On phones, the spread stays as the current stacked version with real text and the same photos — the wide artwork is unreadable at that size.

## Photos I will place in the empty gaps

Using the photos already in the page:

| Gap | Photo |
| --- | --- |
| Under "I joined the CIE as a Design member" | the campaign card collage |
| Around "and a lot more..." | the event poster set |
| Under "Started a university podcast" | the Spotlight cover and the on-air recording shot |
| Beside the Levyug competition text | the Levyug logo card |
| Under "Then I designed for Config24 HYD" | the Friends of Figma banner and the audience shot |
| Around "So we started a design studio" | the studio deezign mark |
| Around the communities and Variance blocks | the community event photo and poster work |

If any photo belongs in a different gap, tell me which and I will move it.

## Worth knowing

- The text in your export is outlined shapes, not live text, so it cannot be selected or searched. I will keep a hidden, readable copy of the same words in the page so search engines and screen readers still get the story, and the phone version keeps real text.
- The file is about 4 MB, so it will be served from Lovable's asset storage rather than committed into the project.

## Technical notes

- Upload `about_me.svg` with `lovable-assets` and reference the pointer from `src/assets`.
- Rewrite `src/routes/index.tsx`: canvas 8400x700, single CSS transform scaled from viewport height, the artwork as one `<img>` inside a wrapper with a scroll-driven `clip-path` inset for the reveal, photo overlays positioned in canvas units above it.
- Replace `src/components/about/panels.tsx` with a photo-only overlay map (positions read from the export); retire `spine.ts` and the drawn wave since the line now comes from the artwork.
- Keep `chapters.tsx` as the source for the mobile stacked layout and the visually hidden text.
- Keep the wheel-to-horizontal listener, keyboard stepping, progress bar and `prefers-reduced-motion` handling (reveal off, everything visible).
