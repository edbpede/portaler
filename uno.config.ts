import {
  defineConfig,
  presetIcons,
  presetWind4,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  presets: [
    presetWind4({
      preflights: { reset: true },
    }),
    presetIcons({
      scale: 1.15,
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
      },
    }),
  ],

  transformers: [transformerDirectives(), transformerVariantGroup()],

  theme: {
    font: {
      sans: ['"Inter Variable"', "Inter", "system-ui", "sans-serif"],
      display: [
        '"Bricolage Grotesque Variable"',
        '"Bricolage Grotesque"',
        "system-ui",
        "sans-serif",
      ],
    },
    // Semantic tokens — resolved from CSS variables defined in src/styles/global.css.
    // This is what powers the Modern Minimal light/dark theme.
    colors: {
      background: "var(--background)",
      foreground: "var(--foreground)",
      card: {
        DEFAULT: "var(--card)",
        foreground: "var(--card-foreground)",
      },
      muted: {
        DEFAULT: "var(--muted)",
        foreground: "var(--muted-foreground)",
      },
      primary: {
        DEFAULT: "var(--primary)",
        foreground: "var(--primary-foreground)",
      },
      secondary: {
        DEFAULT: "var(--secondary)",
        foreground: "var(--secondary-foreground)",
      },
      accent: {
        DEFAULT: "var(--accent)",
        foreground: "var(--accent-foreground)",
      },
      border: "var(--border)",
      ring: "var(--ring)",
      // Skoleår spectrum — the signature. One hue per school phase.
      indskoling: "var(--phase-indskoling)",
      mellemtrin: "var(--phase-mellemtrin)",
      udskoling: "var(--phase-udskoling)",
    },
  },

  shortcuts: {
    // Reusable surface + focus bundles used across components.
    "ui-card": "rounded-2xl border border-border bg-card text-card-foreground",
    "ui-focus":
      "outline-none focus-visible:(ring-2 ring-ring ring-offset-2 ring-offset-background)",
    "ui-chip":
      "inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground",
  },
});
