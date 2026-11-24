import { storyblokEditable, StoryblokComponent } from "@storyblok/react/rsc";

const page = ({ blok, ogonOperationer, linsOperation, generalSetting, lang }: any) => {
  // One <h1> per page: the first Hero owns it. Later heroes and the
  // booking-form block render their heading as <h2> instead.
  const body: any[] = Array.isArray(blok?.body) ? blok.body : [];
  const firstHeroUid = body.find((b) => b?.component === "Hero")?._uid;
  return (
    <div {...storyblokEditable(blok)}>
      {blok &&
        Array.isArray(blok.body) &&
        blok.body.map((nestedBlok: any) => (
          <StoryblokComponent
            blok={nestedBlok}
            key={nestedBlok._uid}
            ogonOperationer={ogonOperationer}
            linsOperation={linsOperation}
            generalSetting={generalSetting}
            lang={lang}
            headingLevel={
              !firstHeroUid || nestedBlok._uid === firstHeroUid ? 1 : 2
            }
          />
        ))}
    </div>
  );
};

export default page;
