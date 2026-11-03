import Link from "next/link";
import { getAllPosts } from "../lib/apireq";

const rawLang = `${process.env.STORYBLOCK_LANG || "sv"}`;

const lang =
  rawLang === "se" ? "sv" :
  rawLang === "dk" ? "da" :
  rawLang;

const page = async () => {
  const data = await getAllPosts();

  const filteredPosts = data.stories.filter((item: any) => {
    const languages = item.content?.show_in_languages;

    if (!languages || languages.length === 0) {
      return lang === "sv";
    }

    if (Array.isArray(languages)) {
      return languages.some((language: any) => {
        if (typeof language === "string") {
          return language === lang;
        }

        return language?.value === lang || language?.name === lang;
      });
    }

    return false;
  });

  return (
    <div className="container mx-auto px-4">
      <div className="mt-52 mb-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
        {filteredPosts.map((item: any) => (
          <Link
            key={item.uuid}
            className="flex bg-[#f6eedc] py-6 px-4 rounded-lg flex-col gap-4"
            href={`blog/${item.slug}`}
          >
            <h2 className="text-[20px] lg:text-[40px]">
              {item.content?.title_hero || item.name}
            </h2>

            <span className="text-[14px] lg:text-[20px] line-clamp-3">
              {item.content?.content_text}
            </span>

            <p className="button bg-[#1d383f] max-w-[150px] text-[white] text-center">
              {lang === "en"
                ? "Read more"
                : lang === "da"
                ? "Læs mere"
                : "Läs mer"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default page;
