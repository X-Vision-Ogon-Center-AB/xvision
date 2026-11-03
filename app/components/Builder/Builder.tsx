import AboutBlock from "../Blocks/AboutBlock/AboutBlock";
import ColumnBox from "../Blocks/ColumnBox/ColumnBox";
import ContactForm from "../Blocks/ContactForm/ContactForm";
import ContentBox from "../Blocks/ContentBox/ContentBox";
import CTABlock from "../Blocks/CTA/CTABlock";
import FAQ from "../Blocks/FAQ/FAQ";
import Hero from "../Blocks/Hero/Hero";
import ImageBlock from "../Blocks/ImageBlock/ImageBlock";
import InfoBox from "../Blocks/InfoBox/InfoBox";
import PartnerLogos from "../Blocks/PartnerLogos/PartnerLogos";
import PrisBlock from "../Blocks/PrisBlock/PrisBlock";
import Step from "../Blocks/Step/Step";
import Team from "../Blocks/Team/Team";
import TilesBehandlingar from "../Blocks/TilesBehandlingar/TilesBehandlingar";
import Forundersokning from "../Forundersokning/Forundersokning";

interface Props {
  props?: any;
  ogonOperationer?: any;
  global?: any;
  linsOperation?: any;
  lang?: any;
  settings?: any;
}

const Builder = ({
  props,
  ogonOperationer,
  global,
  linsOperation,
  lang,
  settings,
}: Props) => {
  return props ? (
    <div>
      {props.map((el: any) => {
        switch (el.component) {
          case "Hero":
            return (
              <>
                <Hero
                  title={el.title}
                  text={el.text}
                  uspar={el.uspar}
                  img={el.img}
                  buttons={el.buttons}
                  no_image_hero={el.no_image_hero}
                  subtitle={el.subtitle}
                  text_center={el.text_center}
                  no_dots={el.no_dots}
                  opacity={el.opacity}
                  popup={global.story.content.showpopup}
                  mobile_img={el.mobile_img}
                  heroHome={el.heroHome}
                  heroOmoss={el.heroOmoss}
                />
              </>
            );
          case "infobox":
            return (
              <InfoBox
                title={el.title}
                slug_name={el.subtitle}
                content={el.content}
                link={el.btns}
              />
            );
          case "forundersokning":
            return <Forundersokning props={el} lang={lang} />;
          case "tilesBehandlingar":
            return (
              <TilesBehandlingar
                props={el}
                operations={ogonOperationer.stories}
                linsoperation={linsOperation.stories}
                lang={lang}
              />
            );
          case "team": {
            return <Team props={el} />;
          }

          case "column_box": {
            return <ColumnBox props={el} />;
          }
          case "faqblock": {
            return <FAQ props={el.faq} />;
          }

          case "stepblock": {
            return <Step props={global.story.content} />;
          }
          case "partnerLogos":
            return (
              <PartnerLogos
                images={el?.partnerlogos}
                title={el.title}
                lang={lang}
              />
            );
          case "aboutBlock":
            return <AboutBlock props={el} />;
          case "contactForm":
            return <ContactForm global={global} lang={lang} />;
          case "imageblock":
            return <ImageBlock props={el} lang={lang} />;

          case "contentbox":
            return <ContentBox props={el} settings={settings} />;
          case "CTA":
            return (
              <CTABlock
                sub_under_title={el.sub_under_title}
                subtitle={el.subtitle}
                title={el.title}
                content={el.content}
                btn={el.btn}
                bg_image={el.bg_image}
                bg_image_2={el.bg_image_2}
                two_images={el.two_images}
              />
            );
          case "PrisBlock":
            return <PrisBlock props={el} lang={lang} />;

          default:
            return <div>No content</div>;
        }
      })}
    </div>
  ) : null;
};

export default Builder;
