import { createElement } from "react";
import {
  render as baseRender,
  NODE_HEADING,
  type RenderOptions,
} from "storyblok-rich-text-react-renderer";

/**
 * Storyblok rich-text renderer used across the site.
 *
 * Editors sometimes pick "Heading 1" inside a text block. The page's hero
 * already owns the single <h1>, so a level-1 heading in body text is
 * rendered as <h2> (same look via the h1 class, correct structure for Google).
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
  });
}
