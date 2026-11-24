import { createElement } from "react";
import Link from "next/link";
import { localHref } from "./routes";
import {
  render as baseRender,
  NODE_HEADING,
  MARK_LINK,
  type RenderOptions,
} from "storyblok-rich-text-react-renderer";

/**
 * Storyblok rich-text renderer used across the site.
 *
 * Editors sometimes pick "Heading 1" inside a text block. The page's hero
 * already owns the single <h1>, so a level-1 heading in body text is
 * rendered as <h2> (same look via the h1 class, correct structure for Google).
 *
 * Internal links in text point straight at the public address of the current
 * site (e.g. /free-consultation on .com) instead of the Swedish one.
 */
export function render(document: unknown, options: RenderOptions = {}) {
  return baseRender(document as any, {
    ...options,
    nodeResolvers: {
      [NODE_HEADING]: (children, props) => {
        const level = Math.min(Math.max(Number(props?.level) || 2, 1), 6);
        if (level === 1) {
          return createElement("h2", { className: "rt-h1" }, children);
        }
        return createElement(`h${level}`, null, children);
      },
      ...(options.nodeResolvers || {}),
    },
    markResolvers: {
      [MARK_LINK]: (children, props: any) => {
        const { linktype, href, target, anchor } = props || {};
        if (linktype === "email") {
          return createElement("a", { href: `mailto:${href}` }, children);
        }
        if (linktype === "story" || (typeof href === "string" && href.startsWith("/"))) {
          const path = localHref(href) + (anchor ? `#${anchor}` : "");
          return createElement(Link, { href: path, target: target || undefined }, children);
        }
        return createElement(
          "a",
          { href, target: target || undefined, rel: target === "_blank" ? "noopener" : undefined },
          children
        );
      },
      ...(options.markResolvers || {}),
    },
  });
}
