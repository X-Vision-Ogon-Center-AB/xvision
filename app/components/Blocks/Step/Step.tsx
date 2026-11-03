import Image from "next/image";
import { IoIosArrowDroprightCircle } from "react-icons/io";

const Step = ({ props }: any) => {
  return (
    <div
      className="lg:max-w-[80%] mx-auto p-4 mb-10 lg:mb-24 mt-5 lg:mt-14"
      id="step"
    >
      <h2 className="text-[35px] font-semibold text-center mb-2">
        {props.step_title}
      </h2>
      <p className="text-center text-[18px] open-sans mb-14">
        {props.step_subtitle}
      </p>
      <div className="flex flex-wrap gap-10 lg:space-x-12 justify-center">
        {props?.steps?.map((step: any, index: number) => (
          <div key={index} className="w-[100%] lg:w-[28%] relative">
            <div className="bg-[#D4E0DE] rounded-[37px] p-8 h-[350px] text-center flex flex-col py-10 justify-center lg:justify-start">
              <h4 className="text-lg font-semibold mb-2">STEG {index + 1}</h4>
              <h2 className="font-medium mb-3 text-[28px] leading-[34px] lg:leading-normal">
                {step.title}
              </h2>
              <p className="text-[16px]">{step.content}</p>
            </div>
            {index < props.steps.length - 1 && index !== 2 && (
              <div className="absolute top-1/2 -right-[70px] transform -translate-y-1/2 hidden lg:block">
                <Image
                  src="https://a.storyblok.com/f/304820/55x55/2637293a82/group-1562.svg"
                  width={55}
                  height={55}
                  alt="step-icon"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Step;
