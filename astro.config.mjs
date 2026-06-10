import { defineConfig } from "astro/config";
import UnoCSS from "unocss/astro";
import svelte from "@astrojs/svelte";
import solid from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  site: "https://portaler.edbpede.net",
  output: "static",
  // presetWind4 supplies its own reset (uno.config.ts), so we do not inject one here.
  integrations: [UnoCSS(), svelte(), solid()],
  build: {
    assets: "assets",
    inlineStylesheets: "auto",
    format: "file",
  },
});
