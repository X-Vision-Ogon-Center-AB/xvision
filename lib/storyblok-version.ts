/**
 * Which Storyblok content version the site shows.
 *
 * Production (the live .se/.dk/.com domains) shows only PUBLISHED content, so
 * unfinished drafts in Storyblok are never visible to visitors.
 * Preview deployments and local development show DRAFT content, so editors can
 * check changes before pressing Publish.
 *
 * STORYBLOK_VERSION=draft|published in Vercel overrides this if ever needed.
 */
export const STORYBLOK_VERSION: "draft" | "published" =
  process.env.STORYBLOK_VERSION === "draft" ||
  process.env.STORYBLOK_VERSION === "published"
    ? process.env.STORYBLOK_VERSION
    : process.env.VERCEL_ENV === "production"
      ? "published"
      : "draft";
