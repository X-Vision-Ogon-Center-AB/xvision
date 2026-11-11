"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

export default function FooterSection({ props, lang }: any) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenKontakt, setIsdropDownOpenKontakt] = useState(false);
  const {
    story: {
      content: { footer_logo, footer_image, footer_menu_1, footer_menu_2, IG, FB },
    },
  } = props;

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleDropdownContact = () => {
    setIsdropDownOpenKontakt(!isDropdownOpenKontakt);
  };

  return (
    <footer className="bg-[#1D383F] text-white py-5 relative">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 mt-20 p-5 lg:p-0 text-center lg:text-left">
        <Link
          className="flex items-center -mt-8 lg:mt-0 lg:hidden mx-auto"
          href="/"
        >
          <Image
            src={footer_logo.filename}
            width={220}
            height={50}
            alt={footer_logo.alt}
          />
        </Link>
        <Image
          src={footer_image.filename}
          width={150}
          height={150}
          alt={footer_image.alt}
          className="absolute top-5 right-2 lg:right-10 lg:top-10 hidden lg:block"
        />
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="font-semibold mb-1 text-[24px]">
              X-Vision Ögonklinik Malmö
            </h3>
            <p>Hyllie Stationstorg 2</p>
            <p>215 32 Malmö</p>
          </div>

          <div>
            <h3 className="font-semibold mb-1 text-[24px]">
              X-Vision Ögonklinik Lund
            </h3>
            <p>Stora Södergatan 57A</p>
            <p>222 23 Lund</p>
          </div>

          <div>
            <h3 className="font-semibold mb-1 text-[24px]">
              X-Vision Eye Center Hellerup
            </h3>
            <p>Strandvejen 88</p>
            <p>2900 Hellerup (Denmark)</p>
          </div>

          <p className="mt-4">Org. Nr: 559001-0178</p>
          <div className="flex flex-col">
            <Link
              href={`tel:+46103001008`}
              className="open-sans hover:opacity-70"
            >
              Telefon +46103001008
            </Link>
            <Link
              href={`mailto:info@xvisionkliniken.se`}
              className="open-sans hover:opacity-70"
            >
              info@xvisionkliniken.se
            </Link>
          </div>
          <div className="flex space-x-4 mt-4 justify-center lg:justify-normal">
            <Link href={FB.url}>
              <FaFacebook size={25} />
            </Link>
            <Link href={IG.url}>
              <FaInstagram size={25} />
            </Link>
          </div>
        </div>
        {/* Column 2: Services */}
        <div>
          <h3
            className="font-semibold lg:mb-4 text-[24px] cursor-pointer md:cursor-default flex items-center 
            lg:items-start justify-center lg:justify-start lg:ml-0 gap-2 lg:gap-0"
            onClick={toggleDropdown}
          >
            {lang === "da"
              ? "Operationer og behandlinger"
              : lang === "en"
                ? "Surgeries & treatments"
                : " Operationer & behandlingar"}
            <RiArrowDownSLine
              fontSize={40}
              className={`${!isDropdownOpen ? "block md:hidden" : "hidden"}`}
            />
            <RiArrowUpSLine
              fontSize={40}
              className={`${isDropdownOpen ? "block md:hidden" : "hidden"}`}
            />
          </h3>
          <ul
            className={`space-y-2 ${isDropdownOpen ? "block" : "hidden"
              } md:block`}
          >
            {footer_menu_1.map((item: any, i: number) => (
              <li key={i} className="text-[22px]">
                <Link
                  href={`${item.link.linktype === "story"
                    ? `/${item.link.cached_url.replace(/\/(da|en)\//, "")}`
                    : item.link.url
                    }`}
                >
                  {item.link_title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div className="flex flex-col text-[22px]">
          <h3
            className="font-semibold mb-4 text-[24px] cursor-pointer md:cursor-default flex items-center 
            lg:items-start justify-center lg:justify-start ml-10 lg:ml-0 gap-2 lg:gap-0"
            onClick={toggleDropdownContact}
          >
            {lang === "da" ? "Kontakte" : lang === "en" ? "Contact" : "Kontakt"}
            <RiArrowDownSLine
              fontSize={40}
              className={` ${!isDropdownOpenKontakt ? "block lg:hidden" : "hidden"
                }`}
            />
            <RiArrowUpSLine
              fontSize={40}
              className={`${isDropdownOpenKontakt ? "block lg:hidden" : "hidden"
                }`}
            />
          </h3>
          <div
            className={`${isDropdownOpenKontakt ? "flex" : "hidden"
              } md:flex flex-col`}
          >
            <Link href="/gratis-forundersokning" className="">
              {lang === "da"
                ? "Book en gratis konsultation"
                : lang === "en"
                  ? "Book a free consultation"
                  : "Boka fri konsultation"}
            </Link>
            <Link href="/privacy-policy" className="mt-4">
              Privacy policy
            </Link>
            <Link href="/cookies" className="mt-4">
              Cookies
            </Link>
            {footer_menu_2.map((item: any, i: number) => (
              <li key={i} className="text-[22px] list-none mt-4">
                <Link
                  href={`${item.link.linktype === "story"
                    ? `/${item.link.cached_url.replace(/\/(da|en)\//, "")}`
                    : item.link.url
                    }`}
                >
                  {item.link_title}
                </Link>
              </li>
            ))}

          </div>
        </div>
      </div>

      {/* Decorative circles */}
      <div className="top-4 right-4 grid grid-cols-4 gap-1">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="w-2 h-2 bg-cream rounded-full"></div>
        ))}
      </div>
      <div className="flex w-full justify-end px-5 lg:hidden">
        <Image
          src={footer_image.filename}
          width={150}
          height={150}
          alt={footer_image.alt}
        />
      </div>
      {/* Bottom section */}
      <div className="lg:mt-5 lg:pt-6 flex flex-col bg-[#1D383F] lg:flex-row justify-center lg:justify-between h-[108px] px-5 lg:px-10 items-center">
        <div className="text-2xl font-bold hidden lg:block">
          <Link className="flex items-center -mt-8 lg:mt-0" href="/">
            <Image
              src={footer_logo.filename}
              width={180}
              height={50}
              alt={footer_logo.alt}
            />
          </Link>
        </div>
        <div className="text-sm lg:absolute bottom-2 lg:bottom-5 lg:right-10 text-white flex flex-col gap-5 mt-5 lg:mt-0">
          <Image
            src="https://a.storyblok.com/f/304820/272x42/44fd68df90/resurs_logo_horizontal_rgb_white-2x.png"
            width={150}
            height={50}
            className="mx-auto lg:mx-0"
            alt="logo"
          />
          <span> © 2025 X-Vision Ögonklinik. All rights reserved</span>
        </div>
      </div>
    </footer>
  );
}
