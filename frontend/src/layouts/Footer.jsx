import { useState } from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
  FaApple,
  FaGooglePlay,
  FaGlobe,
  FaChevronDown,
} from "react-icons/fa";

const Footer = () => {
  const [language, setLanguage] = useState("English");
  const [isLangOpen, setIsLangOpen] = useState(false);

  return (
    <footer className="bg-[#f4f5f7] text-gray-700 font-sans pt-16 pb-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Brand Logo / Header */}
         <div className="mb-10">
            <img
              src="./login-images/logo.png"
              className="w-27.25 lg:pr-8 lg:border-r-2 border-[#E6E8EC]"
              alt="logo"
            />
          </div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Column 1: Contact Us */}
          <div>
            <h3 className="text-gray-900 font-bold mb-4 text-base">
              Contact us
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <a
                  href="mailto:foodhouse@gmail.com"
                  className="hover:text-gray-900 transition-colors"
                >
                  foodhouse@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+123456789"
                  className="hover:text-gray-900 transition-colors"
                >
                  +1-2345-6789
                </a>
              </li>
              <li className="leading-relaxed">123 Ave, New York, USA</li>
            </ul>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-sm"
              >
                <FaFacebookF size={14} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-[#0077b5] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-sm"
              >
                <FaLinkedinIn size={14} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-[#1da1f2] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-sm"
              >
                <FaTwitter size={14} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-sm"
              >
                <FaInstagram size={14} />
              </a>
            </div>
          </div>

          {/* Column 2: Products */}
          <div>
            <h3 className="text-gray-900 font-bold mb-4 text-base">Products</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              {[
                "Auctor volutpat.",
                "Fermentum turpis.",
                "Mi consequat.",
                "Amet venenatis.",
                "Convallis porttitor.",
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="hover:text-gray-900 hover:translate-x-1 transition-all inline-block"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: About */}
          <div>
            <h3 className="text-gray-900 font-bold mb-4 text-base">About</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              {[
                "Egestas vitae.",
                "Viverra lorem ac.",
                "Eget ac tellus.",
                "Erat nulla.",
                "Vulputate proin.",
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="hover:text-gray-900 hover:translate-x-1 transition-all inline-block"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Get the app */}
          <div>
            <h3 className="text-gray-900 font-bold mb-4 text-base">
              Get the app
            </h3>
            <div className="flex flex-col gap-3">
              {/* App Store Button */}
              <a
                href="#"
                className="flex items-center bg-black text-white px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-colors w-fit border border-black shadow-sm"
              >
                <FaApple className="text-2xl mr-3" />
                <div className="flex flex-col text-left">
                  <span className="text-[10px] leading-none uppercase font-medium tracking-wide">
                    Download on the
                  </span>
                  <span className="text-sm font-semibold leading-tight mt-0.5">
                    App Store
                  </span>
                </div>
              </a>

              {/* Google Play Button */}
              <a
                href="#"
                className="flex items-center bg-black text-white px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-colors w-fit border border-black shadow-sm"
              >
                <FaGooglePlay className="text-xl mr-3" />
                <div className="flex flex-col text-left">
                  <span className="text-[10px] leading-none uppercase font-medium tracking-wide">
                    GET IT ON
                  </span>
                  <span className="text-sm font-semibold leading-tight mt-0.5">
                    Google Play
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 font-medium py-1 px-2 rounded-md hover:bg-gray-200/60 transition-colors"
            >
              <FaGlobe className="text-gray-600" />
              <span>{language}</span>
              <FaChevronDown
                className={`text-xs transition-transform duration-200 ${isLangOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown Menu */}
            {isLangOpen && (
              <div className="absolute bottom-full mb-2 left-0 bg-white border border-gray-200 rounded-lg shadow-lg py-1 w-32 z-10">
                <button
                  onClick={() => {
                    setLanguage("English");
                    setIsLangOpen(false);
                  }}
                  className="w-full text-left px-4 py-1.5 text-sm hover:bg-gray-100 text-gray-700"
                >
                  English
                </button>
                <button
                  onClick={() => {
                    setLanguage("العربية");
                    setIsLangOpen(false);
                  }}
                  className="w-full text-left px-4 py-1.5 text-sm hover:bg-gray-100 text-gray-700"
                >
                  العربية
                </button>
              </div>
            )}
          </div>

          {/* Copyright */}
          <p className="text-xs text-gray-500">
            Copyright © 2020. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
