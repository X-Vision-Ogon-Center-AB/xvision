"use client";

import Image from "next/image";
import { render } from "storyblok-rich-text-react-renderer";
import Link from "next/link";
import { GoDotFill } from "react-icons/go";
import { HeroHome } from "./hero-home";
import { OmOss } from "./om-oss";

interface HeroProps {
  title?: string;
  text?: string;
  img?: any;
  buttons?: any;
  uspar?: any;
  no_image_hero?: boolean;
  subtitle?: string;
  text_center?: any;
  no_dots?: any;
  opacity?: any;
  popup?: any;
  mobile_img?: any;
  heroHome?: any;
  heroOmoss?: any;
}

const Hero = ({
  buttons,
  img,
  text,
  title,
  uspar,
  subtitle,
  no_image_hero,
  text_center,
  no_dots,
  popup,
  opacity,
  mobile_img,
  heroHome,
  heroOmoss,
}: HeroProps) => {
  return (
    <section
      className={`${popup && `pt-14 ${uspar?.length < 0 && "pb-10"}`}  ${
        no_image_hero
          ? `bg-[#1D383F] lg:px-0 h-[100%] ${uspar?.length === 0 && "pb-10"}`
          : "h-[100%] mt-0 lg:h-full lg:mt-20 lg:py-32 lg:pb-56"
      } relative overflow-hidden`}
    >
      {!no_image_hero && (
        <Image
          src={img?.filename}
          fill
          alt={img?.alt}
          className="hidden lg:block lg:object-cover object-top"
        />
      )}

      {!no_image_hero && mobile_img && (
        <Image
          src={mobile_img?.filename || img?.filename}
          fill
          alt={mobile_img?.alt}
          className={`${
            heroHome
              ? "!h-[780px]"
              : heroOmoss
              ? "!object-center !object-contain mt-[90px] !relative"
              : "h-full"
          } object-cover lg:hidden object-top `}
        />
      )}

      {heroHome ? (
        <HeroHome
          uspar={uspar}
          buttons={buttons}
          text={text}
          title={title}
          subtitle={subtitle}
          text_center={text_center}
          no_dots={no_dots}
          opacity={opacity}
          heroHome={heroHome}
        />
      ) : heroOmoss ? (
        <OmOss
          uspar={uspar}
          buttons={buttons}
          text={text}
          title={title}
          subtitle={subtitle}
          text_center={text_center}
          no_dots={no_dots}
          opacity={opacity}
          heroHome={heroHome}
        />
      ) : (
        <div>
          {!opacity && (
            <div className="h-full w-full absolute top-0 bg-[#1D383F] opacity-30" />
          )}
          <div
            className={` ${
              !no_image_hero
                ? "mx-auto container px-4 flex flex-col gap-10 justify-between"
                : ""
            } h-full flex flex-col justify-between`}
          >
            <div
              className={`flex flex-col lg:flex-row items-center px-5 lg:px-0 ${
                no_image_hero
                  ? "justify-center text-center pt-32 lg:pt-56 pb-0 lg:pb-24"
                  : `${
                      text_center
                        ? "text-center justify-center"
                        : "justify-between text-center lg:text-left"
                    } pt-20 lg:pt-0`
              }  h-full`}
            >
              <div className="lg:w-1/2 z-10 text-white">
                {subtitle && (
                  <h2 className="text-[16px] mb-5 text-[#CFEDC6] open-sans">
                    {subtitle}
                  </h2>
                )}
                <h1
                  className={`mb-4 text-[35px] lg:text-[62px] lg:max-w-[100%]  ${
                    !no_image_hero ? "pt-14" : "mx-auto"
                  }`}
                >
                  {title}
                </h1>
                <p
                  className={`text-lg mb-6 ${
                    no_image_hero && "max-w-[100%] lg:max-w-[85%] mx-auto"
                  }`}
                >
                  {text}
                </p>
                <div
                  className={`flex flex-col lg:flex-row gap-4 mt-16 justify-center items-center  lg:px-0 ${
                    no_image_hero
                      ? "lg:justify-center"
                      : "lg:justify-start lg:pb-20"
                  }`}
                >
                  {buttons &&
                    Array.isArray(buttons) &&
                    buttons?.map((el: any, index: number) => {
                      return (
                        <Link
                          key={index}
                          href={`${
                            el.link.linktype === "story"
                              ? `${el.link.cached_url.replace(
                                  /\/(da|en)\//,
                                  "/"
                                )}`
                              : `${el.link.url}`
                          }`}
                          className={`button transition-all duration-300 ${
                            index === 0
                              ? "bg-green-200 text-black hover:bg-[#1D383F] hover:text-white button"
                              : " text-white hover:opacity-70 button border-white border"
                          }`}
                        >
                          {el.link_title}
                        </Link>
                      );
                    })}
                </div>
              </div>
            </div>

            {uspar?.length > 0 && (
              <div
                className={`bg-[#FFF8E7] ${
                  no_image_hero
                    ? ""
                    : "rounded-3xl mb-10 lg:absolute bottom-0 lg:w-[80%]"
                } p-6 mt-8 lg:mt-0 z-10`}
              >
                <div className="flex justify-center lg:justify-around text-center items-center flex-col lg:flex-wrap lg:flex-row gap-5 lg:gap-0 ">
                  {uspar?.map((el: any) => {
                    return (
                      <div
                        className="font-medium flex items-center gap-2 font_overwrite text-[18px] lg:text-[20px]"
                        key={el._uid}
                      >
                        {!no_dots && <GoDotFill />}
                        {render(el.title)}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
