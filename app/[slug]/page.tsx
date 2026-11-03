import { Metadata } from "next";
import {
  GetGenerlSettings,
  GetLinsOperationer,
  GetOgonOperationer,
} from "../lib/apireq";
import { notFound } from "next/navigation";
import StoryblokStory from "@storyblok/react/story";
import { getData } from "@/lib/get-data";
import { Popup } from "../components/popup";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> => {
  const pathname = params.slug;

  const slugName = pathname === undefined ? `home` : pathname;
  const res = await getData(slugName);

  return {
    title: res.data.data.story?.content?.SEO_Title || "XVISION",
    description:
      res.data.data.story?.content?.SEO_Meta || "Default description",
  };
};

const Page = async ({ params }: { params: { slug: string } }) => {
  const lang = process.env.STORYBLOCK_LANG;
  const ogonOperation = await GetOgonOperationer();
  const linsOperation = await GetLinsOperationer();
  const generalSetting = await GetGenerlSettings();

  const pathname = params.slug;
  const slugName = pathname === undefined ? `home` : pathname;

  const story = await getData(slugName);

  if (!story || !story.data.data.story || !story.data.data.story.content) {
    return notFound();
  }

  return (
    <main>
      {story.data.data.story.content?.popup && (
        <Popup props={generalSetting.story.content} />
      )}
      <StoryblokStory
        lang={lang}
        story={story.data.data.story}
        ogonOperationer={ogonOperation}
        linsOperation={linsOperation}
        generalSetting={generalSetting}
      />
    </main>
  );
};

export default Page;
