"use client";

import Link from "next/link";
import scss from "./arkivpage.module.scss";

interface Hero {
  title?: string;
  content?: string;
  bg?: string;
  btns?: any;
  subtitle?: string;
}

const Hero = ({ title, content, bg, btns, subtitle }: Hero) => {
  return (
    <div
      className={`${
        bg ? `bg-[${bg}]` : "bg-[#1D383F]"
      } pb-32 pt-48 flex items-center`}
    >
      <div className="lg:max-w-[50%] px-5 lg:px-0 text-left lg:text-center m-auto flex flex-col gap-10 text-white">
        {subtitle && (
          <h4 className="text-[16px] mb-2 font-light text-[#CFEDC6]">
            {subtitle}
          </h4>
        )}
        <h1>{title}</h1>
        <p>{content}</p>
        {btns && Array.isArray(btns) && (
          <div className={scss.hero_btns}>
            {btns?.map((el: any, index: number) => {
              return (
                <Link
                  key={index}
                  href={`${
                    el.link.linktype === "story"
                      ? `${el.link.cached_url.replace(/\/(da|en)\//, "/")}`
                      : `/${el.link.url}`
                  }`}
                  className={`button ${
                    index === 0
                      ? scss.button
                      : "border-white border text-[18px] hover:bg-white hover:text-black"
                  }`}
                >
                  {el?.link_title}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
