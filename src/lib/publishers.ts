// Publisher logos resolved to hashed URLs at build time. Plain strings, so this
// is safe to import from a client island. Publishers without a logo fall back
// to a text-only chip.
import gyldendal from "../assets/gyldendal_icon.svg";
import alinea from "../assets/alinea_icon.svg";

export const PUBLISHER_LOGOS: Record<string, string> = {
  Gyldendal: gyldendal.src,
  Alinea: alinea.src,
};
