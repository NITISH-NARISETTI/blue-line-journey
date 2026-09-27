# "That's it" on the sketchbook's last page

Once every sketch has been turned, the blank back page will show a short closing note instead of an empty sheet.

## What you'll see
- Centred on the blank back page: **"that's it."** in the site's font, small and quiet, ink grey.
- Under it, an even smaller line: **"click to close the book"**, in electric blue.
- The note fades in just after the last page finishes turning, and fades out when the book closes.
- The next click still closes the book, as it does now.

## Technical notes
- In `src/components/about/sketchbook.tsx`, add a centred text layer on top of the back board (the blank page seen when `flipped === total`).
- Show it with `opacity` plus a short delay (about 500 ms) so it appears after the flip. When reduced motion is on, it appears immediately.
- Update the button's aria-label on the last state to say "End of sketchbook. Click to close."
