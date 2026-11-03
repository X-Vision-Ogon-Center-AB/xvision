import FAQ from "@/app/components/Blocks/FAQ/FAQ";

export const FaqBlock = ({ blok }: any) => {

  return (
    <>
      <FAQ props={blok?.FAQ} title={blok?.faq_title} />
    </>
  );
};
