/** Keep the whole artwork proportional; 390px phones use a 0.75x canvas. */
export function stripScale(width: number, height: number, breakpoint = 768) {
  return width < breakpoint
    ? Math.min(0.75 * (width / 390), height / 700)
    : Math.max(0.55, Math.min(1.7, height / 700));
}