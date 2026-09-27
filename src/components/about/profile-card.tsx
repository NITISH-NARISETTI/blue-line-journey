import aboutTitle from "@/assets/about-me-title.svg.asset.json";

/** Position of the new "about me" title artwork on the 8400x700 canvas. */
const TITLE = { left: -4, top: 196, width: 1224, height: 322 };

/**
 * Opening "about me" title with portrait stamp. A grey patch hides the old
 * title baked into the exported strip.
 */
export function ProfileCard() {
  return (
    <>
      <div
        aria-hidden
        className="absolute z-[5] bg-[#EEEEEE]"
        style={{ left: 0, top: 180, width: 1180, height: 340 }}
      />
      <img
        src={aboutTitle.url}
        alt="About me — portrait of Nitish Narisetti. CS engineer turned designer who specialises in crafting empathetic experiences for delight and function."
        width={TITLE.width}
        height={TITLE.height}
        draggable={false}
        className="absolute z-10 select-none"
        style={{ ...TITLE, maxWidth: "none" }}
      />
    </>
  );
}
