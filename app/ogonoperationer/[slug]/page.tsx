import Hero from "@/app/components/ArkivPage/Hero";
import BeforeAfter from "@/app/components/Blocks/BeforeAfter/BeforeAfter";
import ContactForm from "@/app/components/Blocks/ContactForm/ContactForm";
import CTA from "@/app/components/Blocks/CTA/CTA";
import FAQ from "@/app/components/Blocks/FAQ/FAQ";
import InfoBox from "@/app/components/Blocks/InfoBox/InfoBox";
import Step from "@/app/components/Blocks/Step/Step";
import Uspar from "@/app/components/Blocks/Uspar/Uspar";
import { GetBehandlingarSlug, GetGenerlSettings } from "@/app/lib/apireq";
const lang = `${process.env.STORYBLOCK_LANG}`;
import { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> => {
  const pathname = params.slug;
  const res = await GetBehandlingarSlug(pathname);

  return {
    title: res?.story?.content?.SEO_Title || "XVISION",
    description: res?.story?.content?.SEO_Meta || "Default description",
  };
};

const page = async ({ params }: { params: { slug: string } }) => {
  const pathname = params.slug;
  const data = await GetBehandlingarSlug(pathname);
  const settings = await GetGenerlSettings();
  const slugData = data.story.content;

  const hasContent = data?.story?.content?.FAQ?.some(
    (item: any) => item?.title !== ""
  );

  return (
    <div>
      <Hero
        title={
          data.story.content.site_title
            ? data.story.content.site_title
            : data.story.name
        }
        subtitle={slugData.hero_sub_title}
        content={slugData.hero_content}
        btns={slugData.buttons}
      />
      <InfoBox
        title={slugData.a_title}
        content={slugData.a_content}
        slug_name={data.story.name}
      />
      <Uspar props={slugData.Uspar} />
      <CTA props={slugData.CTA} />
      {hasContent && (
        <FAQ
          props={data?.story?.content?.FAQ}
          title={data?.story?.content?.faq_title}
        />
      )}
      <Step props={settings.story.content} />
      <BeforeAfter props={slugData} />
      <CTA props={settings.story.content.CTA} />
      <ContactForm global={settings} lang={lang} />
    </div>
  );
};

export default page;
