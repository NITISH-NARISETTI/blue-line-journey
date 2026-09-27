# Framer code component: About Me strip

Turn the current strip into one Framer code component you can paste into your Framer site between your existing sections.

## How it behaves on your Framer page

- Visitors scroll down normally. When the strip reaches the top of the screen, it stays pinned and further scrolling moves it sideways.
- At the end of the strip, the page unpins and normal downward scrolling picks up again.
- On phones (under 768px) it shows the vertical timeline instead, in the same order as the desktop strip, including Contact.
- Kept: grey-to-blue line fill, soft reveal edge, fade-ins, name card tilt, sketchbook page turns, community poster zoom, rangoli sway, all links.
- Dropped: the smooth-scroll glide (Framer controls page scrolling, and the glide would fight it).

## Settings you can change in Framer

- Scroll length (how slow the sideways travel feels)
- Background colour, line blue, line grey
- Strip height on screen

## Steps

1. Publish this site so the artwork and pictures have a public address the component can load from.
2. Build the single component file, with every picture pointing to the published address.
3. Save it to your Files as `AboutMeStrip.tsx`, with short paste-in instructions (Framer: Assets, Code, New component, paste, drag onto canvas, set full width).
4. Check it in a plain test page here: pinned sideways scroll, release at the end, phone layout.

## Technical details

- Tall outer wrapper (height = strip width x scroll multiplier), inner `position: sticky; top: 0; height: 100vh`.
- `useScroll({ target })` + `useTransform` from framer-motion map vertical progress to `translateX`; line sweep and reveal mask derived from the same progress value.
- Fade-ins use IntersectionObserver-free progress thresholds per item (canvas x positions).
- Line vectors fetched from the published asset URL and injected into an inline SVG, as today.
- `addPropertyControls` for the settings; `RenderTarget.current() === RenderTarget.canvas` shows a static, fully revealed preview in the Framer editor.
- Mobile layout inlined from `mobile-spread.tsx` / `mobile-chapters.tsx`, using `useIsMobile`-style width check.
- No Lenis, no Tailwind: all styles inline so it works standalone in Framer; Urbanist loaded via a font link.
- The existing site stays unchanged.
