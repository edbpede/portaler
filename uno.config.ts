import {
  defineConfig,
  presetIcons,
  presetWind4,
  transformerVariantGroup,
} from "unocss";

/**
 * Subject icon colours are stored as utility class strings inside content JSON
 * (e.g. "text-rose-500"). UnoCSS extracts utilities statically, so these
 * data-driven classes must be safelisted to survive the build.
 */
const SUBJECT_HUES = [
  "amber",
  "blue",
  "cyan",
  "emerald",
  "gray",
  "indigo",
  "orange",
  "pink",
  "purple",
  "red",
  "rose",
  "sky",
  "teal",
  "violet",
  "yellow",
] as const;

export default defineConfig({
  presets: [
    // Tailwind v4-compatible utilities. Reset is integrated via preflights —
    // do not layer an extra reset package on top.
    presetWind4({
      preflights: { reset: true },
    }),
    // Pure-CSS Phosphor icons (via @iconify-json/ph). One icon system that
    // works identically in Astro, Svelte and Solid with no runtime JS.
    // Colour follows `currentColor`, so `text-rose-500` tints the glyph.
    presetIcons({
      scale: 1.15,
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
        "flex-shrink": "0",
      },
    }),
  ],

  theme: {
    colors: {
      // Green-tinted ink so type never reads as flat black — ties to the brand.
      ink: {
        DEFAULT: "#14211A",
        soft: "#46544B",
        faint: "#6E7C73",
      },
      // Cool, faintly green off-white. Deliberately not a warm cream.
      paper: {
        DEFAULT: "#F6F8F4",
        raised: "#FFFFFF",
        sunken: "#EEF2EA",
      },
      // STR school brand green and an accessible-contrast deep variant.
      green: {
        DEFAULT: "#5CC031",
        glow: "#7BD64F",
        deep: "#2F7D17",
        dark: "#21610F",
        wash: "#E8F4E0",
      },
      line: {
        DEFAULT: "#DCE5D6",
        strong: "#C6D4BC",
      },
    },
    font: {
      display: '"Bricolage Grotesque Variable", ui-sans-serif, system-ui, sans-serif',
      sans: '"Inter Variable", ui-sans-serif, system-ui, sans-serif',
    },
  },

  shortcuts: {
    // Surface primitives reused across Astro / Svelte / Solid components.
    "u-card": "bg-paper-raised rounded-2xl border border-line",
    "u-chip":
      "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium leading-none",
    "u-input":
      "w-full rounded-xl border border-line bg-paper-raised px-4 py-2.5 text-sm text-ink placeholder-ink-faint outline-none transition-colors focus:border-green focus:ring-2 focus:ring-green/25",
    "u-focus":
      "outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
  },

  safelist: [
    ...SUBJECT_HUES.map((hue) => `text-${hue}-500`),
    ...SUBJECT_HUES.map((hue) => `text-${hue}-600`),
    // Data-driven Phosphor icons referenced from content JSON (subject icons,
    // platform icon overrides) plus the in-code fallbacks. Literal icon classes
    // written directly in components are extracted automatically and need no
    // entry here.
    ...[
      "atom-fill",
      "book-bookmark-fill",
      "book-fill",
      "buildings-fill",
      "calculator-fill",
      "cooking-pot-fill",
      "cross-fill",
      "dna-fill",
      "dots-three-outline-fill",
      "flag-banner-fill",
      "globe-hemisphere-west-fill",
      "hammer-fill",
      "leaf-fill",
      "paint-brush-fill",
      "paw-print-fill",
      "scroll-fill",
      "folder-fill",
      "app-window-fill",
    ].map((icon) => `i-ph-${icon}`),
  ],

  transformers: [transformerVariantGroup()],
});
