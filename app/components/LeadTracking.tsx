"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { captureAttribution } from "@/lib/attribution";
import { isHealthPath } from "@/lib/health-paths";

/**
 * 1. Remembers where the visitor came from (UTM / referrer) for lead attribution.
 * 2. Loads the HubSpot tracking code — only after Cookiebot statistics or marketing
 *    consent, and never on health pages (vårdsidor):
 *    - HubSpot records one page view automatically when its script loads, so the
 *      script is not loaded while the visitor is on a health page.
 *    - Later page views in this single-page app are sent by hand (setPath +
 *      trackPageView) and are skipped on health pages.
 * Set NEXT_PUBLIC_HUBSPOT_PORTAL_ID to enable HubSpot; without it only (1) runs.
 */

const PORTAL = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;
const SCRIPT_HOST = process.env.NEXT_PUBLIC_HUBSPOT_SCRIPT_HOST || "js-eu1.hs-scripts.com";

function hasConsent(): boolean {
  const cb = (window as any).Cookiebot;
  return !!(cb && cb.consent && (cb.consent.statistics || cb.consent.marketing));
}

export default function LeadTracking() {
  const pathname = usePathname() || "/";
  const loaded = useRef(false);
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    const run = () => {
      captureAttribution();
      if (!PORTAL || !hasConsent() || isHealthPath(pathname)) return;

      const w = window as any;
      const _hsq = (w._hsq = w._hsq || []);

      if (!loaded.current) {
        loaded.current = true;
        lastTracked.current = pathname;
        _hsq.push(["setPath", pathname]);
        const s = document.createElement("script");
        s.id = "hs-script-loader";
        s.async = true;
        s.defer = true;
        s.src = `https://${SCRIPT_HOST}/${PORTAL}.js`;
        document.head.appendChild(s); // its first, automatic page view uses the path above
        return;
      }

      if (lastTracked.current !== pathname) {
        lastTracked.current = pathname;
        _hsq.push(["setPath", pathname]);
        _hsq.push(["trackPageView"]);
      }
    };

    run();
    window.addEventListener("CookiebotOnAccept", run);
    return () => window.removeEventListener("CookiebotOnAccept", run);
  }, [pathname]);

  return null;
}
