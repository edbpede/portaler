/// <reference types="astro/client" />

// Fontsource packages ship CSS only (no type declarations) — declare the
// side-effect imports so `astro check` is happy.
declare module "@fontsource-variable/*";