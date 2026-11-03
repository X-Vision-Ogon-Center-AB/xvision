"use client";

import Form from "./Form";
import { render } from "storyblok-rich-text-react-renderer";

const Forundersokning = ({ props, lang }: any) => {
  return (
    <div className="py-24 bg-[#f0f2e9] mt-8 px-2 lg:px-0">
      <div className="max-w-6xl  text-center m-auto py-16 flex flex-col gap-5">
        <h2 className="text-[16px] lg:text-[20px] open-sans">
          {props.subtitle}
        </h2>
        <h1 className="text-[28px] lg:text-[35px] lg:max-w-[50%] leading-[35px] lg:leading-[45px] m-auto">
          {props.title}
        </h1>
        <span className="max-w-4xl text-[16px] lg:text-[20px] mx-auto open-sans">
          {render(props.content)}
        </span>
      </div>
      <Form lang={lang} />
    </div>
  );
};

export default Forundersokning;
