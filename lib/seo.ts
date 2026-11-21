import type { Metadata } from "next";
import { RULES } from "../middleware";

/**
 * Per-page canonical and hreflang tags for the three sites built from this repo.
 *
 * - Every page gets a self-referencing canonical on its own domain and public URL.
 * - Every page points to its own Swedish, Danish and English equivalent
 *   (sv-SE <-> da-DK <-> en), plus x-default -> English.
 * - A page that exists in only one language gets no hreflang partners.
 *
 * Danish and English public URLs come from the same RULES map the middleware uses,
 * so hreflang always points to the URL a visitor would actually see.
 */

type Lang = "sv" | "da" | "en";

const ALL_LANGS: Lang[] = ["sv", "da", "en"];

const DOMAINS: Record<Lang, string> = {
  sv: "https://www.xvisionkliniken.se",
  da: "https://www.xvisionkliniken.dk",
  en: "https://www.xvisionclinic.com",
};

const HREFLANG: Record<Lang, string> = {
  sv: "sv-SE",
  da: "da-DK",
  en: "en",
};

export function currentLang(): Lang {
  const value = process.env.STORYBLOCK_LANG;
  if (value === "da" || value === "dk") return "da";
  if (value === "en") return "en";
  return "sv";
}

const publicPathCache: Partial<Record<Lang, Map<string, string>>> = {};

function publicPathMap(lang: Lang): Map<string, string> {
  const cached = publicPathCache[lang];
  if (cached) return cached;
  const map = new Map<string, string>();
  const rules = lang === "sv" ? undefined : RULES[lang];
  if (rules) {
    // rewrites: public path -> Storyblok path. Reverse it; first entry wins,
    // the same way the sitemap does it.
    for (const [publicPath, internalPath] of Object.entries(rules.rewrites)) {
      if (!map.has(internalPath)) map.set(internalPath, publicPath);
    }
  }
  publicPathCache[lang] = map;
  return map;
}

/** Public URL path for a Storyblok path in a given language. */
export function publicPath(lang: Lang, internalPath: string): string {
  const path = normalise(internalPath);
  return publicPathMap(lang).get(path) ?? path;
}

function normalise(internalPath: string): string {
  if (!internalPath || internalPath === "/home" || internalPath === "home") return "/";
  const withSlash = internalPath.startsWith("/") ? internalPath : `/${internalPath}`;
  return withSlash.length > 1 ? withSlash.replace(/\/$/, "") : withSlash;
}

/** Normalises Storyblok's show_in_languages values ("sv", "se", {value:"da"} ...). */
export function languagesFrom(showInLanguages: unknown): Lang[] | undefined {
  if (!Array.isArray(showInLanguages) || showInLanguages.length === 0) return undefined;
  const result = new Set<Lang>();
  for (const item of showInLanguages) {
    const raw = typeof item === "string" ? item : (item as any)?.value ?? (item as any)?.name;
    const value = String(raw || "").toLowerCase();
    if (value === "sv" || value === "se") result.add("sv");
    else if (value === "da" || value === "dk") result.add("da");
    else if (value === "en") result.add("en");
  }
  return result.size ? ALL_LANGS.filter((l) => result.has(l)) : undefined;
}

/**
 * Builds Next.js `alternates` metadata for a Storyblok path such as
 * "/linsoperationer/gra-starr" or "/" for the home page.
 */
export function buildAlternates(
  internalPath: string,
  languages?: Lang[]
): Metadata["alternates"] {
  const lang = currentLang();
  const canonical = `${DOMAINS[lang]}${publicPath(lang, internalPath)}`;
  const langs = (languages ?? ALL_LANGS).filter((l) => ALL_LANGS.includes(l));

  // Single-language page, or a page shown on a domain it is not meant for:
  // canonical only, no hreflang partners.
  if (langs.length < 2 || !langs.includes(lang)) {
    return { canonical };
  }

  const alternates: Record<string, string> = {};
  for (const l of langs) {
    alternates[HREFLANG[l]] = `${DOMAINS[l]}${publicPath(l, internalPath)}`;
  }
  if (langs.includes("en")) {
    alternates["x-default"] = alternates[HREFLANG.en];
  }

  return { canonical, languages: alternates };
}
