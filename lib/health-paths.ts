/**
 * Pages about eye conditions ("vårdsidor"). Visits to these pages say something
 * about a person's health, so they must never be sent to HubSpot or ad platforms.
 * Mirrors the intent of the GTM exception "Moose - Exception – Vårdsidor (Meta)".
 * Extend this list when new condition pages are added.
 */
const HEALTH_PATH = new RegExp(
  [
    "torra", "torre", "tørre", "dry-eye",
    "vitreoly", "floater", "glaskropp", "glaslegeme",
    "keratokonus", "keratoconus", "crosslinking", "cross-linking",
    "gra-starr", "gra-staer", "grå-stær", "katarakt", "cataract",
    "gron-starr", "glaukom", "glaucoma",
    "amd", "makula", "macula",
    "nathinna", "nethinde", "retina",
    "synnerv", "diabet", "uveit",
  ].join("|"),
  "i"
);

export function isHealthPath(pathname: string): boolean {
  try {
    return HEALTH_PATH.test(decodeURIComponent(pathname));
  } catch {
    return HEALTH_PATH.test(pathname);
  }
}
