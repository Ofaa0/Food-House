import React, { useState } from "react";
import {
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
  FaStar,
  FaRegStar,
  FaHeart,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import Testimonials from "../sections/home_sections/Testimonials";

export default function AboutUsPage() {
  const [cartCount, setCartCount] = useState(2);
  const [activeNav, setActiveNav] = useState("About us");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const chefs = [
    {
      name: "Andrei Masharin",
      role: "CEO & FOUNDER",
      image:
        "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80",
      bio: "Master chef with over 15 years of experience in fine dining and restaurant management.",
    },
    {
      name: "Edina Gunnarsdóttir",
      role: "CO-FOUNDER & HEAD PASTRY",
      image:
        "https://plus.unsplash.com/premium_photo-1661778091956-15dbe6e47442?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bio: "Award-winning pastry chef passionate about creating sweet masterpieces that bring pure joy.",
    },
    {
      name: "Bai Zelong",
      role: "EXECUTIVE CHEF",
      image:
        "https://images.unsplash.com/photo-1607631568010-a87245c0daf8?auto=format&fit=crop&w=600&q=80",
      bio: "Specialist in culinary fusion and organic ingredient sourcing, crafting memorable dining choices.",
    },
    {
      name: "Xen Baiying",
      role: "SOUS CHEF",
      image:
        "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?auto=format&fit=crop&w=600&q=80",
      bio: "Dedicated to precision, plating perfection, and maintaining top quality standards daily.",
    },
  ];

  const ratingBreakdown = [
    { stars: 5, percentage: 75, count: 902 },
    { stars: 4, percentage: 16, count: 208 },
    { stars: 3, percentage: 5, count: 65 },
    { stars: 2, percentage: 1, count: 12 },
    { stars: 1, percentage: 3, count: 46 },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans text-slate-800 antialiased flex flex-col selection:bg-orange-100 selection:text-[#FF5200]">
      <main className="flex-1">
        {}
        <section className="bg-slate-100/80 py-12 md:py-16 border-b border-slate-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              About Us
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-500 font-medium max-w-xl mx-auto">
              Learn more about our journey, our passion for good food, and the
              team bringing delicious meals to your table every day.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-20 md:space-y-28">
          {}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Storefront Image */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#FF1010] to-[#FF1012] rounded-3xl blur-lg opacity-25 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-slate-100 shadow-xl border border-slate-200/80">
                <img
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85"
                  alt="Food House Restaurant Storefront"
                  className="w-full h-[320px] sm:h-[420px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-md text-xs font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e64e43]"></span>
                  Est. 2010
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div className="inline-block px-3.5 py-1.5 rounded-full bg-orange-50 border border-red-300 text-[#FF1010   ] text-xs font-bold uppercase tracking-wider">
                Our Origins
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Our Story
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed md:leading-loose">
                When I opened Sugarplum cake shoppe in 2010, I began with the
                question:{" "}
                <span className="font-semibold text-slate-800">
                  "What makes people smile?"
                </span>{" "}
                I found that what brings a smile to my face is the perfectly
                baked treat, and while my business has grown and changed, this
                focus has stayed the same. My team and I strive to serve in a
                way that meets your goal. We believe that each sweet treat is an
                opportunity to bring joy to another person's world. If You Can
                Dream It, We Can Bake It!
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Crafted with Love
                  </h4>
                  <p className="text-xs text-slate-400">
                    Every recipe perfected over a decade
                  </p>
                </div>
              </div>
            </div>
          </section>

          {}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Content Left */}
            <div className="space-y-6 order-2 lg:order-1">
              <div className="inline-block px-3.5 py-1.5 rounded-full bg-orange-50 border border-red-300 text-[#FF1010] text-xs font-bold uppercase tracking-wider">
                Our Commitment
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Our Mission
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed md:leading-loose">
                At Food House, our mission is to redefine comfort dining through
                quality ingredients, warm hospitality, and unwavering culinary
                excellence. We craft every dish with intention, ensuring that
                each visit delivers an unforgettable taste experience.
              </p>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-700 font-medium">
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs">
                    ✓
                  </span>
                  Fresh local organic ingredients delivered daily
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs">
                    ✓
                  </span>
                  Zero artificial preservatives or compromise on taste
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs">
                    ✓
                  </span>
                  Warm customer-first dining and takeout experience
                </li>
              </ul>
            </div>

            {/* Poster / Indoor Scene Image Right */}
            <div className="relative group order-1 lg:order-2">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#FF1010] to-[#FF1011] rounded-3xl blur-lg opacity-25 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-slate-900 shadow-xl border border-slate-200/80">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85"
                  alt="Food House Our Mission Interior Scene"
                  className="w-full h-[320px] sm:h-[420px] object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent flex flex-col justify-end p-6 sm:p-8">
                  <span className="text-[#FF5200] font-black text-xs uppercase tracking-widest mb-1">
                    Food House
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    OUR MISSION
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 line-clamp-2">
                    Bringing people together through exceptional food and
                    authentic connection.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {}
          <section className="space-y-10 md:space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="inline-block px-3.5 py-1.5 rounded-full bg-orange-50 border border-red-300 text-[#FF1010] text-xs font-bold uppercase tracking-wider">
                Culinary Experts
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Our Chefs
              </h2>
              <p className="text-slate-500 text-sm sm:text-base">
                Meet the passionate masters behind our kitchen magic, bringing
                creativity and flavor to every plate.
              </p>
            </div>

            {/* Chefs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {chefs.map((chef, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/70 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-100">
                    <img
                      src={chef.image}
                      alt={chef.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <a
                        href="#"
                        className="w-9 h-9 rounded-full bg-white/90 text-slate-900 flex items-center justify-center hover:bg-[#FF1010] hover:text-white transition-colors shadow-md"
                      >
                        <FaLinkedinIn className="w-4 h-4" />
                      </a>
                      <a
                        href="#"
                        className="w-9 h-9 rounded-full bg-white/90 text-slate-900 flex items-center justify-center hover:bg-[#FF1010] hover:text-white transition-colors shadow-md"
                      >
                        <FaInstagram className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <span className="text-[10px] font-black text-[#FF1010] tracking-wider uppercase block mb-1">
                        {chef.role}
                      </span>
                      <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#FF1010] transition-colors">
                        {chef.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                        {chef.bio}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {}
          <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 md:p-12 shadow-sm space-y-8">
            <div className="text-center sm:text-left space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Customers reviews
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Honest feedback from food lovers who dined with us recently.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Rating Summary Left */}
              <div className="lg:col-span-5 bg-slate-50/80 p-6 sm:p-8 rounded-2xl border border-slate-100 text-center flex flex-col items-center justify-center space-y-4">
                <div className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight">
                  4.7
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 text-amber-400 text-lg sm:text-xl">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar className="text-amber-300/80" />
                </div>

                <div className="text-xs sm:text-sm font-bold text-slate-600">
                  (1,873 Reviews)
                </div>

                <p className="text-xs text-slate-400 italic max-w-xs leading-relaxed">
                  "A Discount Toner Cartridge Is Better Than Ever And You Will
                  Save 10 Or More"
                </p>
              </div>

              {/* Progress Bars Breakdown Right */}
              <div className="lg:col-span-7 space-y-3.5">
                {ratingBreakdown.map((item) => (
                  <div
                    key={item.stars}
                    className="flex items-center gap-1 sm:gap-4 text-xs sm:text-sm"
                  >
                    {/* Star Label */}
                    <div className="w-14 sm:w-16 font-semibold text-slate-600 flex items-center gap-1">
                      <span>{item.stars}</span>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="flex-1 bg-slate-100 h-3 rounded-full overflow-hidden">
                      <div
                        className="bg-[#FF5200] h-full rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>

                    {/* Percentage & Count */}
                    <div className="w-20 text-right font-medium text-slate-500 text-xs">
                      <span className="font-bold text-slate-800">
                        {item.percentage}%
                      </span>
                      <span className="text-slate-400 text-[11px] ml-1">
                        ({item.count})
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      {}

      <Testimonials />  
    </div>
  );
}
