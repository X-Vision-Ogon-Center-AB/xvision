"use client";

import Image from "next/image";
import Link from "next/link";
import { IoMdCheckmark } from "react-icons/io";
import { render } from "storyblok-rich-text-react-renderer";

const PrisBlock = ({ props, lang }: any) => {
  return (
    <div className="my-10 lg:my-20 px-5 lg:px-0" id={`${props.hashtag}`}>
      <h2 className="text-center pb-5 text-[35px]">{props.title}</h2>
      <h2 className="text-center pb-10 text-[22px]">{props.subtitle}</h2>
      <div className="flex flex-wrap justify-center gap-5 text-center">
        {props.pris.map((item: any, index: number) => {
          const firstLink =
            item.link.length > 0 ? item.link[0].link.cached_url : "undefiend";

          return (
            <div
              key={index}
              className="flex flex-col gap-5 bg-[#1D383F] px-14 py-20 text-white rounded-[37px] w-full lg:w-1/4 2xl:w-1/5"
            >
              <div className="flex justify-center max-h-[45px]">
                {item.icon.filename && (
                  <Image
                    src={item.icon.filename}
                    alt=""
                    className="object-contain"
                    width={50}
                    height={30}
                  />
                )}
              </div>
              <h3 className="text-[22px]">{item.title}</h3>
              <div className="mx-auto">
                {item.uspar.map((usp: any, index: number) => (
                  <span
                    key={index}
                    className="text-[16px] text-left flex gap-2 items-center"
                  >
                    <IoMdCheckmark color="#CFEDC6" /> {render(usp.title)}
                  </span>
                ))}
              </div>
              <div className="h-[1px] w-full bg-[#CFEDC6]" />
              <div className="flex flex-col">
                {item.pris_manad && (
                  <span className="text-[25px] text-[#F4845F]">
                    {item.pris_manad}
                  </span>
                )}
                {item.otherprice && (
                  <span className="text-[16px]">{render(item.otherprice)}</span>
                )}

                <span className="text-[20px] ">{item.pris}</span>
                <span className="line-through text-[20px]">
                  {item.rea && item.rea_pris}
                </span>
                <span className="max-w-[250px] mt-2 text-[12px]">
                  {lang === "da"
                    ? "Opdel din betaling rentefrit over 24 måneder eller i et månedlige omkostninger, der passer dig."
                    : lang === "en"
                      ? "Divide your payment interest-free over 36 months or at a monthly cost that suits you."
                      : "Dela upp din betalning räntefritt i 36 mån eller till en månadskostnad som passar dig."}
                </span>
              </div>
              <Link
                className="button mx-auto max-w-[220px] bg-[#CFEDC6] hover:bg-white text-black mt-5 "
                href="/gratis-forundersokning"
              >
                {lang === "da"
                  ? "Book en konsultation"
                  : lang === "en"
                    ? "Book a consultation "
                    : "Boka konsultation"}
              </Link>
              <div className="flex flex-col gap-2">
                {firstLink === "undefiend" ? (
                  <>
                    <Link
                      key={index}
                      href={`/delbetalning`}
                      className="underline underline-offset-2"
                    >
                      {lang === "da"
                        ? "Læs mere om delbetaling"
                        : lang === "en"
                          ? "Read more about partial payment "
                          : " Läs mer om delbetalning "}
                    </Link>
                    <div className="mt-4">
                      <span className="text-[12px] text-center">
                        {lang === "da"
                          ? "* Ved delbetaling over 24 måneder hos Resurs Bank. Læs mere om delbetaling"
                          : lang === "en"
                            ? "* When paying in installments over 36 months with Zaver"
                            : "* Vid delbetalning på 36 mån med Zaver"}
                      </span>

                      <Link
                        href={`/delbetalnin`}
                        className="underline mt-4 ml-[4px]"
                      >
                        {lang === "da"
                          ? "her."
                          : lang === "en"
                            ? "here. "
                            : "här."}
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <Link
                      key={index}
                      href={`/${firstLink.replace(/\/(da|en)\//, "")}`}
                      className="underline underline-offset-2"
                    >
                      {lang === "da"
                        ? "Læs mere om "
                        : lang === "en"
                          ? "Read more about "
                          : "Läs mer om "}
                      {item.title}
                    </Link>

                    <Link
                      href={`/delbetalning`}
                      className="underline underline-offset-2"
                    >
                      {lang === "da"
                        ? "Læs mere om delbetaling"
                        : lang === "en"
                          ? "Read more about partial payment "
                          : " Läs mer om delbetalning "}
                    </Link>

                    <div className="mt-4">
                      <span className="text-[12px]">
                        {lang === "da"
                          ? "* Ved delbetaling over 24 måneder hos Resurs Bank. Læs mere om delbetaling"
                          : lang === "en"
                            ? "* When paying in installments over 36 months with Zaver"
                            : "* Vid delbetalning på 36 mån med Zaver"}
                      </span>

                      <Link
                        href={`/delbetalning`}
                        className="underline mt-4 ml-[4px]"
                      >
                        {lang === "da"
                          ? "her."
                          : lang === "en"
                            ? "here. "
                            : "här."}
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PrisBlock;
