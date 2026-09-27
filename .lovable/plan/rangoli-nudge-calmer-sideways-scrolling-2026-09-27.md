# Rangoli nudge + calmer sideways scrolling

## 1. Move the rangoli photo and caption 16px left
Both move together, so the gap between them stays the same.

## 2. Slow down the scroll so sections don't rush past
- Each mouse-wheel or trackpad flick moves the strip about half as far as it does now.
- The glide eases in and out more gently, so it settles softly instead of shooting ahead.
- Arrow keys and Page Up/Down move about 55% of the screen per press instead of 80%, and the glide is a little slower.
- Phone scrolling stays the same.

If it feels too slow afterwards, I can tune it in small steps.

## Technical details
- `src/routes/index.tsx`: rangoli `Reveal` wrapper `left-[7890px]` changes to `left-[7874px]`.
- Lenis options: `wheelMultiplier` 1.1 to 0.55, `lerp` 0.085 to 0.06, `touchMultiplier` 0.8.
- Keyboard handler: step `clientWidth * 0.55`, `scrollTo` duration 1.4.
