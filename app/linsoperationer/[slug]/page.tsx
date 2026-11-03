import Hero from "@/app/components/ArkivPage/Hero";
import BeforeAfter from "@/app/components/Blocks/BeforeAfter/BeforeAfter";
import ContactForm from "@/app/components/Blocks/ContactForm/ContactForm";
import CTA from "@/app/components/Blocks/CTA/CTA";
import FAQ from "@/app/components/Blocks/FAQ/FAQ";
import InfoBox from "@/app/components/Blocks/InfoBox/InfoBox";
import RemissForm from "@/app/components/Blocks/remiss-form";
import Step from "@/app/components/Blocks/Step/Step";
import Uspar from "@/app/components/Blocks/Uspar/Uspar";
import { GetLinsBehandlingarSlug, GetGenerlSettings } from "@/app/lib/apireq";
const lang = `${process.env.STORYBLOCK_LANG}`;
import { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> => {
  const pathname = params.slug;
  const res = await GetLinsBehandlingarSlug(pathname);

  return {
    title: res?.story?.content?.SEO_Title || "XVISION",
    description: res?.story?.content?.SEO_Meta || "Default description",
  };
};

const page = async ({ params }: { params: { slug: string } }) => {
  const pathname = params.slug;
  const data = await GetLinsBehandlingarSlug(pathname);
  const settings = await GetGenerlSettings();
  const slugData = data?.story?.content;
  console.log(data);

  const hasContent = data?.story?.content?.FAQ?.some(
    (item: any) => item?.title !== ""
  );
  const showStep = pathname !== "gra-starr";

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
        slug_name={
          data.story.content.site_title
            ? data.story.content.site_title
            : data.story.name
        }
      />
      <Uspar props={slugData.Uspar} />
      <CTA props={slugData.CTA} />

      {hasContent && (
        <FAQ
          props={data?.story?.content?.FAQ}
          title={data?.story?.content?.faq_title}
        />
      )}
      {showStep && <Step props={settings.story.content} />}
      <BeforeAfter props={slugData} />
      <CTA props={settings.story.content.CTA} />
      {slugData.remiss_form ?
        <RemissForm global={settings} lang={lang} />
        :
        <ContactForm global={settings} lang={lang} />
      }
    </div>
  );
};

export default page;
