
import Hero from "@/app/components/ArkivPage/Hero";
import ImageBlock from "@/app/components/Blocks/ImageBlock/ImageBlock";
import { GetBlog } from "@/app/lib/apireq";
const lang = `${process.env.STORYBLOCK_LANG}`;
import { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> => {
  const pathname = params.slug;
  const res = await GetBlog(pathname);

  return {
    title: res?.story?.content?.SEO_Title || "XVISION",
    description: res?.story?.content?.SEO_Meta || "Default description",
  };
};

const page = async ({ params }: { params: { slug: string } }) => {
  const pathname = params.slug;
  const data = await GetBlog(pathname);
  const slugData = data.story.content;
  console.log("Blog data:", slugData);

  return (
    <div>
      <Hero title={slugData.title_hero} content={slugData.content_text} />

      {data.story.content.content_image.map((el: any) => {
        return <ImageBlock props={el} lang={lang} isimg={true} />;
      })}
    </div>
  );
};

export default page;
