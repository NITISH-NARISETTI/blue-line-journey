import profileCard from "@/assets/profile-card.svg.asset.json";

/** Position of the card on the 8400x700 canvas. */
const CARD = { left: 492, top: 198, width: 206, height: 264 };

/**
 * The portrait card on the opening panel. A grey patch sits underneath so the
 * old stamp baked into the exported strip never peeks out while the card tilts.
 */
export function ProfileCard() {
  return (
    <>
      <div
        aria-hidden
        className="absolute z-[5] bg-[#EEEEEE]"
        style={{
          left: CARD.left - 6,
          top: CARD.top - 6,
          width: CARD.width + 12,
          height: CARD.height + 12,
        }}
      />
      <img
        src={profileCard.url}
        alt="Portrait of Nitish Narisetti"
        width={CARD.width}
        height={CARD.height}
        draggable={false}
        className="absolute z-10 cursor-pointer select-none will-change-transform transition-transform duration-[900ms] ease-[cubic-bezier(0.34,1.36,0.64,1)] hover:rotate-[12.5deg] motion-reduce:transition-none motion-reduce:hover:rotate-0"
        style={{ ...CARD, maxWidth: "none" }}
      />
    </>
  );
}
