import Image from "next/image";
import Link from "next/link";
import { render } from "storyblok-rich-text-react-renderer";
import scss from "./aboutblock.module.scss";

export default function AboutBlock({ props }: any) {
  return (
    <div className="bg-[#1D383F] text-white px-5 lg:px-14 pb-24 pt-20">
      {props.subtitle && (
        <h4 className="pb-14 text-center text-[16px] text-[#CFEDC6]">
          {props.subtitle}
        </h4>
      )}
      <div className="grid gri-cols-1 lg:grid-cols-3 gap-5">
        <div className="flex flex-col gap-5">
          <h2 className="text-[35px] lg:text-[50px] max-w-[100%] lg:max-w-[80%] font-medium">
            {props.title}
          </h2>
          <span className="text-[#CFEDC6]">{props.dr}</span>
        </div>
        <div>
          <Image src={props?.img?.filename} alt="" width={700} height={700} />
        </div>
        <div className="flex text-[18px] flex-col ml-0 lg:ml-5 justify-end gap-5">
          <span className={scss.aboutcontent}>{render(props.content)}</span>
          {props.button && (
            <Link href="/om-oss" className="underline underline-offset-8">
              {props.button}
            </Link>
          )}
        </div>
      </div>
      <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3">
        <div />
        <Image
          src={props?.smallimg?.filename}
          alt=""
          width={400}
          height={700}
          className="mt-0 lg:-mt-44 ml-0 lg:-ml-28"
        />
      </div>
      <div />
    </div>
  );
}
