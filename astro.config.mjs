import { defineConfig } from "astro/config";
import UnoCSS from "unocss/astro";
import svelte from "@astrojs/svelte";
import solid from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  site: "https://portaler.edbpede.net",
  output: "static",
  integrations: [
    UnoCSS({ injectReset: false }),
    svelte(),
    solid(),
  ],
  build: {
    assets: "assets",
    inlineStylesheets: "auto",
  },
});
