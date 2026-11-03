import Hero from "../components/ArkivPage/Hero";
import BeforeAfter from "../components/Blocks/BeforeAfter/BeforeAfter";
import ContactForm from "../components/Blocks/ContactForm/ContactForm";
import CTA from "../components/Blocks/CTA/CTA";
import FAQ from "../components/Blocks/FAQ/FAQ";
import ImageBlock from "../components/Blocks/ImageBlock/ImageBlock";
import Step from "../components/Blocks/Step/Step";
import TilesBehandlingar from "../components/Blocks/TilesBehandlingar/TilesBehandlingar";
import {
  GetGenerlSettings,
  GetOgonLaser,
  GetOgonOperationer,
} from "../lib/apireq";
import { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> => {
  const res = await GetOgonLaser();

  return {
    title: res?.story?.content?.SEO_Title || "XVISION",
    description: res?.story?.content?.SEO_Meta || "Default description",
  };
};

const Page = async () => {
  const data = await GetOgonLaser();
  const settings = await GetGenerlSettings();

  const dataBehandlingar = await GetOgonOperationer();

  const matchedThreatments = dataBehandlingar?.stories.filter(
    (item: { uuid: string }) =>
      data?.story?.content?.Threatment?.includes(item.uuid)
  );
  const lang = process.env.STORYBLOCK_LANG;

  return (
    <div className="mt-14">
      <Hero
        title={data.story.content.title_hero}
        content={data.story.content.content_text}
        btns={data.story.content.buttons}
        bg={data.story.content.bg}
      />
      {data.story.content.content_image.map((el: any) => {
        return <ImageBlock props={el} lang={lang} />;
      })}
      <TilesBehandlingar
        operations={matchedThreatments}
        props={data.story.content}
        lang={lang}
      />
      <FAQ
        props={data.story.content.FAQ}
        title={data.story.content.faq_title}
      />
      <Step props={settings?.story?.content} />
      <BeforeAfter props={data.story.content} />
      <CTA props={settings.story.content.CTA} />
      <ContactForm global={settings} lang={lang} />
    </div>
  );
};

export default Page;
