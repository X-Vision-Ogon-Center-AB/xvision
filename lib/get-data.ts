import { getStoryblokApi } from "@storyblok/react";

export async function getData(slug: string) {
  const sbParams = {
    version: "draft" as const,
    language: `${process.env.STORYBLOCK_LANG}`,
  };

  const client = getStoryblokApi();
  const data = await client.get(`cdn/stories/${slug}`, sbParams);

  return { data };
}
