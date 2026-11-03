"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ContactForm({ global, lang }: any) {
  const [sent, setSent] = useState(false);
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    birthday: "",
    date: "",
    tid: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleButtonClick = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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

  const data = global?.story?.content;
  return (
    <div className="max-w-[100%] xl:max-w-[70%] mx-auto p-6 bg-white py-10 lg:py-24">
      <div className="grid md:grid-cols-[2fr_1fr] gap-20">
        <div className="space-y-6">
          <h2 className="text-4xl">{data.form_title}</h2>
          <p className="text-gray-600 text-[18px] pb-10 pt-5 max-w-[90%]">
            {data.form_text}
          </p>
          {!status ? (
            <form className="space-y-4 form" onSubmit={handleButtonClick}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
                <div>
                  <label htmlFor="name" className="block text-gray-700">
                    {lang === "da" ? "Navn" : lang === "en" ? "Name" : "Namn"}
                  </label>
                  <input
                    id="name"
                    name="name"
                    className="w-full"
                    onChange={handleChange}
                    value={formData.name}
                  />
                </div>
                <div>
                  <label htmlFor="age" className="block text-gray-700">
                    {lang === "da"
                      ? "Fødselsår"
                      : lang === "en"
                        ? "Year of birth"
                        : "Födelseår"}
                  </label>
                  <input
                    id="age"
                    name="birthday"
                    maxLength={4}
                    className="w-full"
                    placeholder="XXXX"
                    onChange={handleChange}
                    value={formData.birthday}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-gray-700">
                    {lang === "da"
                      ? "Telefon"
                      : lang === "en"
                        ? "Phone"
                        : "Telefon"}
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    className="w-full"
                    onChange={handleChange}
                    value={formData.phone}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700">
                    {lang === "da"
                      ? "E-mail"
                      : lang === "en"
                        ? "E-mail"
                        : "E-post"}
                  </label>
                  <input
                    id="email"
                    name="email"
                    className="w-full"
                    type="email"
                    required
                    onChange={handleChange}
                    value={formData.email}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700">
                  {lang === "da"
                    ? "Besked"
                    : lang === "en"
                      ? "Message"
                      : "Meddelande"}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder=""
                  onChange={handleChange}
                  value={formData.message}
                  name="message"
                />
              </div>
              <div className="flex space-x-2">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-[30px] checkbox"
                />
                <label
                  htmlFor="terms"
                  className="terms flex flex-col text-gray-600"
                >
                  {lang === "da"
                    ? "Jeg accepterer, at du håndterer mine personlige data som ovenfor."
                    : lang === "en"
                      ? "I agree that you handle my personal data as above."
                      : "Jag godkänner att ni hanterar mina personuppgifter enligt ovan."}
                  <a href="/privacy-policy" className="hover:underline text-[14px] open-sans">
                    {lang == "da"
                      ? "Læs mere om, hvordan vi behandler dine personoplysninger her"
                      : lang === "en"
                        ? "Read more about how we process your personal data here"
                        : "Läs mer om hur vi behandlar dina personuppgifter här"}
                  </a>
                </label>
              </div>
              <button className="button font-medium text-[18px] hover:bg-[#1D383F] hover:text-white">
                {lang === "da" ? "Sende" : lang === "en" ? "Send" : "Skicka"}
              </button>
            </form>
          ) : (
            <div>
              {lang === "da"
                ? "Tak for din besked, vi vender snart tilbage til dig!"
                : lang === "en"
                  ? "Thank you for your message!"
                  : "Tack för ditt meddelande, vi återkommer snarast!"}
            </div>
          )}
        </div>
        <div className="space-y-10 ">
          <div className="rounded-lg overflow-hidden">
            <Image
              src={data.form_image.filename}
              alt="X-Vision Ögonklinik Interior"
              width={600}
              height={600}
              className="w-full max-h-[450px] object-left object-contain"
            />
          </div>
          <div className="space-y-2 flex flex-col gap-5 text-[18px] font-medium text-center lg:text-left">
            <div>
              <h4 className=" mb-2">X-Vision Ögonklinik</h4>
              <p>Hyllie Stationstorg 2</p>
              <p>215 32 Malmö</p>
            </div>
            <div className="flex flex-col open-sans">
              <Link className="open-sans" href={`tel:${data?.number}`}>
                Tel: {data?.number}
              </Link>
              <Link className="open-sans" href={`mailto:${data?.mail}`}>
                Mail: {data?.mail}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
