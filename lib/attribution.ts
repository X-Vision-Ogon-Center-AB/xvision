"use client";

import { isHealthPath } from "./health-paths";

/**
 * Lead attribution: where did the visitor come from (UTM tags, referrer, landing page)?
 *
 * - With statistics or marketing consent in Cookiebot, the first source of the visit is
 *   kept in sessionStorage so it survives navigation to the booking page.
 * - Without consent nothing is stored; only the current page's own UTM tags and the
 *   referrer are read at the moment the form is sent.
 * - Health pages (vårdsidor) are never recorded as landing page.
 */

export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referrer?: string;
  landing_page?: string;
  page_uri?: string;
  hutk?: string;
};

const KEY = "xv_attribution";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

function hasConsent(): boolean {
  const cb = (window as any).Cookiebot;
  return !!(cb && cb.consent && (cb.consent.statistics || cb.consent.marketing));
}

function safePage(url: URL): string {
  // Strip query string and never expose a health page path.
  return isHealthPath(url.pathname) ? url.origin + "/" : url.origin + url.pathname;
}

function readCurrent(): Attribution {
  const url = new URL(window.location.href);
  const a: Attribution = {};
  for (const k of UTM_KEYS) {
    const v = url.searchParams.get(k);
    if (v) a[k] = v.slice(0, 100);
  }
  if (document.referrer) {
    try {
      const ref = new URL(document.referrer);
      // Only the referring site, not the full URL; internal navigation is not a source.
      if (ref.host !== url.host) a.referrer = ref.origin;
    } catch {}
  }
  a.landing_page = safePage(url);
  return a;
}

/** Call once per page load. Stores the first source of the visit (consent only). */
export function captureAttribution(): void {
  if (typeof window === "undefined" || !hasConsent()) return;
  try {
    if (sessionStorage.getItem(KEY)) return; // first touch wins
    const a = readCurrent();
    if (a.utm_source || a.referrer) sessionStorage.setItem(KEY, JSON.stringify(a));
  } catch {}
}

function readCookie(name: string): string | undefined {
  const m = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return m ? decodeURIComponent(m[1]) : undefined;
}

/** Called when a form is sent. Returns no health data and no personal data. */
export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  let stored: Attribution = {};
  try {
    if (hasConsent()) stored = JSON.parse(sessionStorage.getItem(KEY) || "{}");
  } catch {}
  const current = readCurrent();
  const first = stored.utm_source || stored.referrer ? stored : current;
  return {
    ...first,
    page_uri: safePage(new URL(window.location.href)),
    // HubSpot's own visitor cookie, present only if its tracking code ran after consent.
    hutk: readCookie("hubspotutk"),
  };
}
