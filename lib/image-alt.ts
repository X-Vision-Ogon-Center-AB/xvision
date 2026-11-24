import ALT from "./image-alt.json";
import { siteLang, type SiteLang } from "./routes";

type AltEntry = { sv: string; da: string; en: string };
const TABLE = ALT as Record<string, AltEntry>;

/** "https://a.storyblok.com/f/320587/1024x1536/abc/x.png/m/..." -> "1024x1536/abc/x.png" */
function keyOf(filename?: string | null): string | null {
  if (!filename) return null;
  const m = filename.split("?")[0].match(/\/f\/\d+\/(.+?\.(?:png|jpe?g|webp|avif|svg|gif))/i);
  return m ? m[1] : null;
}

/**
 * Alt text for a Storyblok image in the current site's language.
 *
 * 1. lib/image-alt.json (written per language for images used on the site;
 *    an empty string there marks the image as decorative)
 * 2. the alt text set on the image in Storyblok
 * 3. "" (treated as decorative by screen readers)
 */
export function altFor(asset?: { filename?: string | null; alt?: string | null } | null, lang: SiteLang = siteLang()): string {
  const key = keyOf(asset?.filename);
  const entry = key ? TABLE[key] : undefined;
  if (entry) return entry[lang] ?? entry.sv ?? "";
  return (asset?.alt || "").trim();
}
