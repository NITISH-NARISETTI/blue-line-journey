# Phone version: put the story back in the right order

On phones, the chapter text no longer follows the same order as the desktop strip. For example, "Design stopped being just software. It became communication." now shows before the podcast. On desktop it comes after. "Until I discovered something that changed things:" is also stuck in the wrong chapter.

## What changes (phone only)

- Walk through the desktop strip from left to right and rewrite each phone chapter so its lines appear in exactly that order:
  1. About me: "Somewhere between the sketchbook and the engineering classroom, I found design…"
  2. "A pretty standard Indian engineering-college plot." then "Until I discovered something that changed things:"
  3. Podcast: "Started a university podcast. Designed everything around it."
  4. "Design stopped being just software. It became communication."
  5. CIE, Levyug, the college club, Config24, deezign, communities, Variance, skills and the closing text, each matching the wording on desktop, then the Contact block (email, phone, LinkedIn, Behance), which is currently missing on phones.
- Renumber the chapter markers (00, 01, …) to fit the new list.
- Keep the same dotted line, fade-ins, spacing and fonts.
- Desktop stays untouched.

## Technical notes

- Phone chapter copy currently lives in `chapters.tsx`. Give the mobile view its own ordered copy list, matching the desktop artwork, so later desktop edits can't reshuffle it.
- Check the result with Playwright at 390px and compare it against the desktop reading order.
- implement scalabilty and accesbitly of standard mobile design gudielines, reduce fontsizes too
- &nbsp;