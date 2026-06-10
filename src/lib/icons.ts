/**
 * Convert a Phosphor reference from content ("ph:book-fill") into the UnoCSS
 * pure-CSS icon class ("i-ph-book-fill"). Data-driven results must be present
 * in the `safelist` in uno.config.ts.
 */
export function iconClass(name?: string | null): string {
  if (!name || !name.includes(":")) return "i-ph-app-window-fill";
  return `i-${name.replace(":", "-")}`;
}
