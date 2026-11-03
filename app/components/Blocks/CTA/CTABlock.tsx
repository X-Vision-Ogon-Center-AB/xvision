"use client";

import Image from "next/image";
import Link from "next/link";

interface CTA {
  sub_under_title: any;
  subtitle: string;
  title: string;
  content: any;
  btn: any;
  two_images: any;
  bg_image: any;
  bg_image_2: any;
}

const CTABlock = ({
  sub_under_title,
  subtitle,
  title,
  content,
  btn,
  two_images,
  bg_image,
  bg_image_2,
}: CTA) => {
  return (
    <div className="relative h-[100vh] lg:h-[70vh] w-full text-white flex justify-center">
      <div className="absolute z-10 text-center gap-10 m-auto w-full h-full flex justify-center -center flex-col">
        <div className="mb-2">
          {!sub_under_title && (
            <h3 className="text-[16px] mb-5 text-[#CFEDC6]">{subtitle}</h3>
          )}
          <h2 className="text-[35px] lg:max-w-[40%] mx-auto">{title}</h2>
          {sub_under_title && (
            <h3 className="text-[16px] mt-5 text-[#CFEDC6] open-sans">
              {subtitle}
            </h3>
          )}
          {content && (
            <p className="lg:max-w-[40%] mx-auto p-5 text-[18px]">{content}</p>
          )}
        </div>
        <div>
          <Link
            href={`${two_images ? "/om-oss" : "/var-trygghetsgaranti"}`}
            className="button border border-white rounded-xl hover:bg-white hover:text-black"
          >
            {btn}
          </Link>
        </div>
      </div>
      <div
        className={`${
          two_images ? "w-full lg:w-1/2" : "w-full"
        } h-full relative`}
      >
        <Image
          src={bg_image?.filename}
          alt={bg_image?.alt}
          fill
          quality={100}
          className={`object-cover left-0`}
        />
      </div>
      {two_images && (
        <div className="w-1/2 h-full relative hidden lg:block">
          <Image
            src={bg_image_2.filename}
            alt={bg_image_2.alt}
            fill
            className="object-cover w-1/2 left-0"
          />
        </div>
      )}

      <div className="bg-black opacity-30 absolute h-full w-full" />
    </div>
  );
};

export default CTABlock;
