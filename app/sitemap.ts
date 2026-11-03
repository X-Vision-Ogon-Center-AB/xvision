import type { MetadataRoute } from "next";
import { RULES } from "../middleware";

type StoryblokStory = {
  full_slug?: string;
  is_folder?: boolean;
};

type StoryblokResponse = {
  stories?: StoryblokStory[];
  total?: number;
};

const DOMAINS: Record<string, string> = {
  da: "https://www.xvisionkliniken.dk",
  en: "https://www.xvisionclinic.com",
  sv: "https://www.xvisionkliniken.se",
};

function getDomain(language: string | undefined) {
  if (language === "da") return DOMAINS.da;
  if (language === "en") return DOMAINS.en;
  return DOMAINS.sv;
}

async function getPublishedStories(language: string | undefined) {
  const token = process.env.STORYBLOK_TOKEN;

  if (!token) {
    throw new Error("STORYBLOK_TOKEN saknas");
  }

  const stories: StoryblokStory[] = [];
  const perPage = 100;
  let page = 1;

  while (true) {
    const params = new URLSearchParams({
      token,
      version: "published",
      per_page: String(perPage),
      page: String(page),
    });

    if (language) params.set("language", language);

    const response = await fetch(
      `https://api.storyblok.com/v2/cdn/stories?${params.toString()}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error(`Storyblok sitemap fetch failed: ${response.status}`);
    }

    const data = (await response.json()) as StoryblokResponse;
    const batch = (data.stories ?? []).filter(
      (story) => story.full_slug && !story.is_folder
    );

    stories.push(...batch);

    if (
      batch.length < perPage ||
      stories.length >= (data.total ?? stories.length)
    ) {
      break;
    }

    page += 1;
  }

  return stories;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const language = process.env.STORYBLOCK_LANG;
  const domain = getDomain(language);
  const stories = await getPublishedStories(language);
  const rules = language ? RULES[language] : undefined;

  // Convert the public-path -> Storyblok-path rewrite map into the reverse
  // lookup needed by the sitemap. The first public path wins if multiple
  // public paths point to the same internal Storyblok path.
  const publicPathByInternalPath = new Map<string, string>();

  if (rules) {
    for (const [publicPath, internalPath] of Object.entries(rules.rewrites)) {
      if (!publicPathByInternalPath.has(internalPath)) {
        publicPathByInternalPath.set(internalPath, publicPath);
      }
    }
  }

  return stories
    .map((story) => {
      const fullSlug = story.full_slug!;
      const internalSlug =
        language && fullSlug.startsWith(`${language}/`)
          ? fullSlug.slice(language.length + 1)
          : fullSlug;
      const internalPath = `/${internalSlug}`;
      const path = publicPathByInternalPath.get(internalPath) ?? internalPath;
      return {
        url: `${domain}${path}`,
        lastModified: new Date(),
      };
    })
    .filter((entry, index, entries) => {
      return entries.findIndex((candidate) => candidate.url === entry.url) === index;
    });
}
