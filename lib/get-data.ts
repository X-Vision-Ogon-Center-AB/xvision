import { STORYBLOK_VERSION } from "@/lib/storyblok-version";
import { getStoryblokApi } from "@storyblok/react";

export async function getData(slug: string) {
  const sbParams = {
    version: STORYBLOK_VERSION,
    language: `${process.env.STORYBLOCK_LANG}`,
  };

  const client = getStoryblokApi();
  try {
    const data = await client.get(`cdn/stories/${slug}`, sbParams);
    return { data };
  } catch (error: any) {
    // A page that does not exist in Storyblok should give a 404, not a 500.
    if (error?.status === 404 || error?.response?.status === 404) {
      return { data: { data: { story: null } } as any };
    }
    throw error;
  }
}
