"use client";

import Image from "next/image";
import Link from "next/link";
import { render } from "storyblok-rich-text-react-renderer";
import scss from "./imageblock.module.scss";

interface ImageBlockProps {
  props: any;
  lang: any;
  isimg?: boolean;
}

const ImageBlock = ({ props, lang, isimg }: ImageBlockProps) => {
  const imageSrc = props
    ? lang === "da" && props.image_da?.filename
      ? props.image_da.filename
      : lang === "en" && props.image_en?.filename
      ? props.image_en.filename
      : lang === "sv" && props.image_sv?.filename
      ? props.image_sv.filename
      : props.image?.filename || "/fallback-image.jpg"
    : "/fallback-image.jpg";

  const imageAlt = props
    ? lang === "da" && props.image_da?.alt
      ? props.image_da.alt
      : lang === "en" && props.image_en?.alt
      ? props.image_en.alt
      : lang === "sv" && props.image_sv?.alt
      ? props.image_sv.alt
      : props.image?.alt || "Default image"
    : "Default image";

  return (
    <div className="flex justify-center max-w-[100%] lg:max-w-[80%] m-auto">
      {!props.image_left ? (
        <div
          className={`grid grid-cols-1 ${
            !isimg ? "lg:grid-cols-2 lg:my-20" : "lg:my-14 lg:grid-cols-1"
          } justify-center w-full gap-10 px-5 items-center my-5`}
        >
          <div
            className={`flex flex-col gap-5 ${
              props?.bg && "bg-[#e6ebe1] h-full lg:h-[600px] justify-center py-10 lg:py-24 px-5 lg:px-20"
            }`}
          >
            {props?.subtitle && <span className="text-[16px] text-[#1d383f]">{props?.subtitle}</span>}
            {props?.title && <h3 className="text-[35px] leading-[45px]">{props?.title}</h3>}
            {props?.content && (
              <span className={`max-w-[100%] text-[18px] ${scss.trygghet}`}>{render(props?.content)}</span>
            )}
            <div className="mt-5">
              {props?.button && props.button && (
                <Link
                  href={props?.link?.cached_url.replace(/\/(da|en)\//, "/") || "/"}
                  className="border-[#1D383F] border text-center button mt-5 text-[18px] hover:bg-[#1D383F] hover:text-white"
                >
                  {props.button}
                </Link>
              )}
            </div>
          </div>
          {!isimg && (
            <div className="flex h-[350px] lg:h-[606px] w-[100%] relative">
              <Image src={imageSrc} alt={imageAlt} fill className="lg:object-contain object-cover" />
            </div>
          )}
        </div>
      ) : (
        <div
          className={`grid grid-cols-1 ${
            !isimg ? "lg:grid-cols-2" : "lg:grid-cols-1"
          } justify-center w-full gap-10 px-5 items-center my-5 lg:my-20`}
        >
          {!isimg && props?.image?.filename && (
            <div className="flex h-[400px] lg:h-[600px] w-[100%] relative">
              <Image src={imageSrc} alt={imageAlt} fill className="lg:object-contain object-cover" />
            </div>
          )}
          <div
            className={`flex flex-col gap-5 ${
              props?.bg && "bg-[#e6ebe1] h-full lg:h-[600px] justify-center py-10 lg:py-24 px-5 lg:px-20"
            }`}
          >
            {props?.subtitle && <span className="text-[16px]">{props.subtitle}</span>}
            <h3 className="text-[35px] leading-[45px]">{props?.title}</h3>
            <span className={`max-w-[100%] text-[18px] flex flex-col gap-5 ${scss.linkcontent}`}>
              {render(props?.content)}
            </span>
            {props?.button && props?.button && (
              <Link
                href={props?.link?.cached_url.replace(/\/(da|en)\//, "/") || "/"}
                className="border-[#1D383F] border max-w-[350px] text-center button mt-5 hover:bg-[#1D383F] hover:text-white"
              >
                {props?.button}
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageBlock;
