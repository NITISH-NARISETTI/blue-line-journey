/** Keep the whole artwork proportional, with a further 0.85x reduction on phones. */
export function stripScale(width: number, height: number, breakpoint = 768) {
  return width < breakpoint
    ? 0.85 * Math.min(0.75 * (width / 390), height / 700)
    : Math.max(0.55, Math.min(1.7, height / 700));
}