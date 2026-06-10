<script lang="ts">
  // Svelte 5 runes. The icon is CSS-driven (via the `.dark` class) so it is
  // correct on first paint with no hydration flash; state here only drives the
  // accessible label. The no-flash init lives inline in Layout.astro.
  let dark = $state(false);

  $effect(() => {
    dark = document.documentElement.classList.contains("dark");
  });

  function toggle() {
    dark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", dark);
    // Keep the browser-chrome colour in sync with the active theme.
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", dark ? "#171717" : "#ffffff");
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {
      // localStorage can be unavailable (private mode); theme still applies for the session.
    }
  }
</script>

<button
  type="button"
  onclick={toggle}
  aria-label={dark ? "Skift til lyst tema" : "Skift til mørkt tema"}
  title={dark ? "Skift til lyst tema" : "Skift til mørkt tema"}
  class="ui-focus inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted"
>
  <span class="i-lucide-sun text-lg dark:hidden"></span>
  <span class="i-lucide-moon hidden text-lg dark:inline-block"></span>
</button>
