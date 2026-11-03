"use client";

import { useState } from "react";
import scss from "./forundersokning.module.scss";

const Form = ({ lang }: any) => {
  const [sent, setSent] = useState(false);
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    tid: "",
    message: "",
    beskriv: "",
    synfel: "",
    operationType: "",
    consent: false,
    questions: Array(6).fill(""),
    initialQuestion: Array(1).fill(""),
  });

  const initialQuestion = ["Vilken åldersgrupp tillhör du?"];
  const questions = [
    "Använder du glasögon?",
    "Använder du kontaktlinser?",
    "Ser du bra med dina kontaktlinser och/eller glasögon?",
    "Har du någon autoimmun sjukdom?",
    "Tar du några mediciner?",
    "Har du tidigare gjort någon ögonoperation?",
  ];

  // Simple translation function

  const translate = (text: string, lang: string): string => {
    const translations: { [key: string]: { [key: string]: string } } = {
      "Svara gärna på nedan frågor.": {
        da: "Svar venligst på følgende spørgsmål",
        en: "Please answer the following questions",
        sv: "Svara gärna på nedan frågor.",
      },
      "Vilken åldersgrupp tillhör du?": {
        da: "Hvilken aldersgruppe tilhører du?",
        en: "What age group do you belong to?",
        sv: "Vilken åldersgrupp tillhör du?",
      },

      "76 eller äldre": {
        da: "76 eller ældre",
        en: "76 or older",
        sv: "76 eller äldre",
      },

      "Ja": {
        da: "Ja",
        en: "Yes",
        sv: "Ja",
      },
      "Nej": {
        da: "Nej",
        en: "No",
        sv: "Nej",
      },

      "Använder du glasögon?": {
        da: "Bruger du briller?",
        en: "Do you wear glasses?",
        sv: "Använder du glasögon?",
      },
      "Använder du kontaktlinser?": {
        da: "Bruger du kontaktlinser?",
        en: "Do you wear contact lenses?",
        sv: "Använder du kontaktlinser?",
      },
      "Ser du bra med dina kontaktlinser och/eller glasögon?": {
        da: "Ser du godt med dine kontaktlinser og/eller briller?",
        en: "Do you see well with your contact lenses and/or glasses?",
        sv: "Ser du bra med dina kontaktlinser och/eller glasögon?",
      },
      "Har du någon autoimmun sjukdom?": {
        da: "Har du en autoimmun sygdom?",
        en: "Do you have an autoimmune disease?",
        sv: "Har du någon auto",
      },
      "Tar du några mediciner?": {
        da: "Tager du medicin?",
        en: "Do you take any medication?",
        sv: "Tar du några mediciner?",
      },
      "Har du tidigare gjort någon ögonoperation?": {
        da: "Har du tidligere fået foretaget en øjenoperation?",
        en: "Have you had any eye surgery before?",
        sv: "Har du tidigare gjort någon ögonoperation?",
      },
      "Vilken typ av synfel har du (närsynt, översynt, astigmatism eller ålderssynthet)? Om möjligt, skriv dina senaste synvärden för båda ögonen (sfär, cylinder och axel).": {
        da: "Hvilken type synsdefekt har du (nærsynet, langsynet, astigmatisme eller presbyopi)? Skriv gerne dine seneste synsmålinger for begge øjne (sfære, cylinder og akse).",
        en: "What type of vision defect do you have (myopia, hyperopia, astigmatism or presbyopia)? If possible, write your latest vision values for both eyes (sphere, cylinder and axis).",
        sv: "Vilken typ av synfel har du (närsynt, översynt, astigmatism eller ålderssynthet)? Om möjligt, skriv dina senaste synvärden för båda ögonen (sfär, cylinder och axel).",
      },
      "Vilken typ av synkorrigerande operation är du mest intresserad av? (Om du vet: t.ex. laser/SMILE, linsimplantat/ICL eller linsbyte/RLE.)": {
        da: "Hvilken type synskorrektionsoperation er du mest interesseret i? (Hvis du ved det: f.eks. laser/SMILE, linseimplantat/ICL eller linseudskiftning/RLE.)",
        en: "What type of vision correction surgery are you most interested in? (If you know: e.g. laser/SMILE, lens implant/ICL or lens replacement/RLE.)",
        sv: "Vilken typ av synkorrigerande operation är du mest intresserad av? (Om du vet: t.ex. laser/SMILE, linsimplantat/ICL eller linsbyte/RLE.)",
      },

      Namn: {
        da: "Navn",
        en: "Name",
        sv: "Namn",
      },
      Telefon: {
        da: "Telefon",
        en: "Phone",
        sv: "Telefon",
      },
      "E-post": {
        da: "E-mail",
        en: "E-mail",
        sv: "E-post",
      },
      Meddelande: {
        da: "Besked",
        en: "Message",
        sv: "Meddelande",
      },
      "Jag godkänner att ni hanterar mina personuppgifter enligt ovan": {
        da: "Jeg accepterer, at I behandler mine personoplysninger som beskrevet ovenfor",
        en: "I accept that you handle my personal data as described above",
        sv: "Jag godkänner att ni hanterar mina personuppgifter enligt ovan",
      },
      "Läs mer om hur vi behandlar dina personuppgifter här": {
        da: "Læs mere om, hvordan vi behandler dine personoplysninger her",
        en: "Read more about how we handle your personal data here",
        sv: "Läs mer om hur vi behandlar dina personuppgifter här",
      },
      Skicka: {
        da: "Sende",
        en: "Send",
        sv: "Skicka",
      },
      "Tack för ditt meddelande, vi återkommer så fort vi kan!": {
        da: "Tak for din besked, vi vender tilbage så hurtigt som muligt!",
        en: "Thank you for your message, we will get back to you as soon as possible!",
        sv: "Tack för ditt meddelande, vi återkommer så fort vi kan!",
      },

      "Vad vill du uppnå med en ögonoperation?": {
        da: "7. Hvad vil du opnå med en øjenoperation?",
        en: "7. What do you want to achieve with an eye surgery?",
        sv: "7. Vad vill du uppnå med en ögonoperation?",
      },
      "Vilken tid skulle du vilja bli uppringd?": {
        da: "8. Hvornår vil du gerne ringes op?",
        en: "8. What time would you like to be called?",
        sv: "8. Vilken tid skulle du vilja bli uppringd?",
      },
      "Förmiddag / Eftermiddag / Kväll / Tid": {
        da: "Formiddag / Eftermiddag / Aften / Tid",
        en: "Morning / Afternoon / Evening / Time",
        sv: "Förmiddag / Eftermiddag / Kväll / Tid",
      },
      "Beskriv i fritext": {
        da: "Beskriv i fritekst",
        en: "Describe in free text",
        sv: "Beskriv i fritext",
      },
    };

    return translations[text] ? translations[text][lang] || text : text;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (
    value: string,
    index: number,
    isInitial = false
  ) => {
    setFormData((prev) => {
      if (isInitial) {
        const newInitialQuestion = [...prev.initialQuestion];
        newInitialQuestion[index] = value;
        return { ...prev, initialQuestion: newInitialQuestion };
      } else {
        const newQuestions = [...prev.questions];
        newQuestions[index] = value;
        return { ...prev, questions: newQuestions };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formattedQuestions = questions.map((question, index) => ({
      question,
      answer: formData.questions[index],
    }));

    const formattedInitialQuestion = initialQuestion.map(
      (initialQuestion, index) => ({
        initialQuestion,
        answer: formData.initialQuestion[index],
      })
    );

    const dataToSend = {
      ...formData,
      questions: formattedQuestions,
      initialQuestion: formattedInitialQuestion,
    };

    try {
      const response = await fetch("/api/bokning", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        setStatus("success");
        setSent(true);
      } else {
        setStatus("error");
        setSent(false);
      }
    } catch (error) {
      console.error("Error sending message.", error);
      setStatus("error");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6">
      {!sent ? (
        <form
          onSubmit={handleSubmit}
          className={`grid grid-cols-1 md:grid-cols-2 gap-14 ${scss.form}`}
        >
          <div className="space-y-4 flex flex-col">
            <h2 className="text-xl font-semibold">
              {translate("Svara gärna på nedan frågor.", lang)}
            </h2>
            {initialQuestion.map((question, index) => (
              <div key={index}>
                <p className="mb-2">{` ${translate(question, lang)}`}</p>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`initial-question-${index}`}
                      value="20-45"
                      onChange={() => handleRadioChange("20-45", index, true)}
                      className="hidden peer"
                    />
                    <div
                      className="w-8 h-8 border-2 border-gray-300 rounded-full
          peer-checked:border-[#1d383f] peer-checked:bg-[#1d383f]"
                    ></div>
                    <span>20-45</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`initial-question-${index}`}
                      value="46-75"
                      onChange={() => handleRadioChange("46-75", index, true)}
                      className="hidden peer"
                    />
                    <div
                      className="w-8 h-8 border-2 border-gray-300 rounded-full
          peer-checked:border-[#1d383f] peer-checked:bg-[#1d383f]"
                    ></div>
                    <span>46-75</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`initial-question-${index}`}
                      value="76 eller äldre"
                      onChange={() =>
                        handleRadioChange("76 år eller äldre", index, true)
                      }
                      className="hidden peer"
                    />
                    <div
                      className="w-8 h-8 border-2 border-gray-300 rounded-full
          peer-checked:border-[#1d383f] peer-checked:bg-[#1d383f]"
                    ></div>
                    <span>{translate("76 eller äldre", lang)}</span>
                  </label>
                </div>
              </div>
            ))}
            {questions.slice(0, 3).map((question, index) => (
              <div key={index}>
                <p className="mb-2">{`${index + 1}. ${translate(
                  question,
                  lang
                )}`}</p>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value="Ja"
                      onChange={() => handleRadioChange("Ja", index, false)}
                      className="hidden peer"
                    />
                    <div
                      className="w-8 h-8 border-2 border-gray-300 rounded-full
          peer-checked:border-[#1d383f] peer-checked:bg-[#1d383f]"
                    ></div>
                    <span>{translate("Ja", lang)}</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value="Nej"
                      onChange={() => handleRadioChange("Nej", index, false)}
                      className="hidden peer"
                    />
                    <div
                      className="w-8 h-8 border-2 border-gray-300 rounded-full
          peer-checked:border-[#1d383f] peer-checked:bg-[#1d383f]"
                    ></div>
                    <span>{translate("Nej", lang)}</span>
                  </label>
                </div>
              </div>
            ))}
            <div>
              <label className="block mb-2">
                {translate("Vilken typ av synfel har du (närsynt, översynt, astigmatism eller ålderssynthet)? Om möjligt, skriv dina senaste synvärden för båda ögonen (sfär, cylinder och axel).", lang)}
              </label>
              <textarea
                placeholder={`${translate("Beskriv i fritext", lang)}`}
                className="p-4"
                id="synfel"
                name="synfel"
                value={formData.synfel}
                onChange={handleInputChange}
              />
            </div>
            {questions.slice(3).map((question, index) => (
              <div key={index + 3}>
                <p className="mb-2">{`${index + 4}. ${translate(
                  question,
                  lang
                )}`}</p>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`question-${index + 3}`}
                      value="Ja"
                      onChange={() => handleRadioChange("Ja", index + 3, false)}
                      className="hidden peer"
                    />
                    <div
                      className="w-8 h-8 border-2 border-gray-300 rounded-full
          peer-checked:border-[#1d383f] peer-checked:bg-[#1d383f]"
                    ></div>
                    <span>{translate("Ja", lang)}</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`question-${index + 3}`}
                      value="Nej"
                      onChange={() => handleRadioChange("Nej", index + 3, false)}
                      className="hidden peer"
                    />
                    <div
                      className="w-8 h-8 border-2 border-gray-300 rounded-full
          peer-checked:border-[#1d383f] peer-checked:bg-[#1d383f]"
                    ></div>
                    <span>{translate("Nej", lang)}</span>
                  </label>
                </div>
              </div>
            ))}
            <div>
              <label className="block mb-2">
                {translate("Vilken typ av synkorrigerande operation är du mest intresserad av? (Om du vet: t.ex. laser/SMILE, linsimplantat/ICL eller linsbyte/RLE.)", lang)}
              </label>
              <textarea
                placeholder={`${translate("Beskriv i fritext", lang)}`}
                className="p-4"
                id="operationType"
                name="operationType"
                value={formData.operationType}
                onChange={handleInputChange}
              />
            </div>
            <label>
              {translate("Vad vill du uppnå med en ögonoperation?", lang)}
            </label>
            <textarea
              placeholder={`${translate("Beskriv i fritext", lang)}`}
              className="p-4"
              id="beskriv"
              name="beskriv"
              value={formData.beskriv}
              onChange={handleInputChange}
            />

          </div>
          <div>
            <div className="flex flex-wrap gap-5 global-form">
              <div className="w-full xl:w-[48%] ">
                <label htmlFor="name" className="block mb-1">
                  <span>{translate("Namn", lang)}</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#2d3748]"
                />
              </div>
              <div className="w-full xl:w-[48%] ">
                <label htmlFor="phone" className="block mb-1">
                  {translate("Telefon", lang)}
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#2d3748]"
                />
              </div>
              <div className="w-full">
                <label htmlFor="email" className="block mb-1">
                  {translate("E-post", lang)}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#2d3748]"
                />
              </div>
              <div className="w-full">
                <label htmlFor="message" className="block mb-1">
                  {translate("Meddelande", lang)}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#2d3748] h-32"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="consent"
                  checked={formData.consent}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      consent: e.target.checked,
                    }))
                  }
                  className="form-checkbox text-[#2d3748]"
                />
                <label htmlFor="consent" className="text-sm">
                  {translate(
                    "Jag godkänner att ni hanterar mina personuppgifter enligt ovan",
                    lang
                  )}

                  <br />
                  <a
                    href="/privacy-policy"
                    className="text-black text-[14px] open-sans hover:underline"
                  >
                    {translate(
                      "Läs mer om hur vi behandlar dina personuppgifter här",
                      lang
                    )}
                  </a>
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-[#2d3748] text-white py-2 px-4 h-14 font-medium rounded-md hover:bg-[#1a202c] transition duration-300"
              >
                {translate("Skicka", lang)}
              </button>
            </div>
          </div>
        </form>
      ) : (
        <h2 className="text-center">
          {translate(
            "Tack för ditt meddelande, vi återkommer så fort vi kan!",
            lang
          )}
        </h2>
      )}
    </div>
  );
};

export default Form;
