import React from "react";
import { render } from "storyblok-rich-text-react-renderer";

const ProgressBar = ({
  current,
  total,
  showPercentage = true,
  color = "#3b82f6",
  backgroundColor = "#fff",
  animated = true,
}: any) => {
  const safeTotal = total || 1;
  const safeCurrent = current || 0;

  const percentage = Math.min(Math.max((safeCurrent / safeTotal) * 100, 0), 100);

  return (
    <div className="w-full">
      <div
        className="relative rounded-full overflow-hidden"
        style={{
          height: `30px`,
          backgroundColor: backgroundColor,
        }}
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${animated ? "transform" : ""}`}
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        />
        {showPercentage && (
          <div className="absolute inset-0 flex items-center justify-center text-lg font-medium text-[#cfedc6]">
            {Math.round(percentage)}%
          </div>
        )}
      </div>
    </div>
  );
};

export const Progress = ({ blok, lang }: any) => {
  const currentValue = parseInt(blok?.current_value) || 0;
  const maxValue = parseInt(blok?.max_value) || 100;

  const isComponentOnLangauge = (show: any) => {
    if (show.includes(lang)) {
      return true;
    } else if (show.includes("all")) {
      return true;
    }
    return false;
  };

  return (
    isComponentOnLangauge(blok.show_langauge) && (
      <div className="container-section lg:mx-24 lg:px-8 px-4 py-14 space-y-8">
        <div className="bg-[#cfedc6] p-6 rounded-lg shadow-sm border space-y-4">
          <div className="text-center">
            <h2 className="text-2xl">{blok?.title || "Progress Bar"}</h2>
            {blok.content && <span className="text-gray-600">{render(blok?.content)}</span>}
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-end items-center mb-2">
                <span className="text-lg text-gray-700">
                  {currentValue} / {maxValue}
                </span>
              </div>
              <ProgressBar
                current={currentValue}
                total={maxValue}
                color={blok?.color || "#23373e"}
                height={parseInt(blok?.height) || 18}
                showPercentage={blok?.show_percentage !== false}
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
};
