"use client";
import Image from "next/image";
import { useEffect } from "react";
import { render } from "storyblok-rich-text-react-renderer";

interface FAQ {
  props: any;
  title?: string;
}

const FAQ = ({ props, title }: FAQ) => {
  const extractTextFromRichText = (richTextContent: any) => {
    if (!richTextContent) return "";
    if (typeof richTextContent === "string") return richTextContent;

    try {
      if (richTextContent.content && Array.isArray(richTextContent.content)) {
        return richTextContent.content
          .map((node: any) => {
            if (node.content && Array.isArray(node.content)) {
              return node.content.map((textNode: any) => textNode.text || "").join("");
            }
            return node.text || "";
          })
          .join(" ");
      }
    } catch (error) {
      console.error("Error extracting text from rich content:", error);
    }

    return "";
  };

  useEffect(() => {
    if (!props || props.length === 0) return;

    const existingSchema = document.querySelector('script[data-faq-schema="true"]');
    if (existingSchema) {
      existingSchema.remove();
    }

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": props.map((item: any) => ({
        "@type": "Question",
        "name": item?.question || item?.title,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": typeof item?.text === "string"
            ? item?.text
            : typeof item?.content === "string"
              ? item?.content
              : extractTextFromRichText(item?.text || item?.content)
        }
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-faq-schema', 'true');
    script.textContent = JSON.stringify(faqSchema, null, 2);
    document.head.appendChild(script);

    return () => {
      const schemaToRemove = document.querySelector('script[data-faq-schema="true"]');
      if (schemaToRemove) {
        schemaToRemove.remove();
      }
    };
  }, [props]);

  return (
    <div className="bg-white px-5 mx-5 lg:px-8 py-20 rounded-3xl lg:max-w-[80%] lg:mx-auto border-2 border-black my-5 lg:my-24">
      <h2 className="text-[25px] lg:text-[28px] font-medium text-center mb-8 leading-10 lg:leading-none">
        {title}
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-0 lg:px-10">
        {props?.map((item: any, index: number) => (
          <div
            key={index}
            className="flex space-x-4 py-5 lg:py-10 lg:px-5 flex-col lg:flex-row items-center lg:items-start gap-5"
          >
            <div className="flex-shrink-0">
              <Image
                src="https://a.storyblok.com/f/304820/55x55/f9892efa1d/group-1396.svg"
                alt="FAQ"
                className="lg:-mt-0 w-[55px]"
                width={55}
                height={50}
              />
            </div>
            <div>
              <h3 className="font-medium mb-2 text-[22px]">{item.title}</h3>
              {typeof item.content === "string" ? (
                <p>{item.content}</p>
              ) : (
                <div>{render(item.content)}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
