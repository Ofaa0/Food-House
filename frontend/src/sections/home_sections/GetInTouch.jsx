import React from "react";
import SectionHeader from "../../components/SectionHeader";
import { sponsors } from "../../data/Lists";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const GetInTouch = () => {
  return (
    <div className="set-section pt-20 text-black">
      <div className="container px-4 lg:px-0 h-full ">
        <SectionHeader title="Get In Touch" subtitle="Join Our Newsletter" />
        <p className="text-center text-[12px] text-[#3B5266] leading-4 font-pop pt-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis nisl,{" "}
          <br />
          elementum elit arcu amet nec non eget felis. Eu ut cursus luctus nunc.
        </p>
        <div className="flex gap-10 justify-center pt-10">
          <input
            type="email"
            placeholder="Your email"
            className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className=" bg-login-btn-color text-white rounded-md py-2 px-4 hover:bg-login-btn-color/90 cursor-pointer transition">
            Subscribe
          </button>
        </div>
        <div className="pt-20 ">
          <Swiper
            modules={[Autoplay]}
            loop={true}
            slidesPerView="auto"
            spaceBetween={30}
            speed={5000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            allowTouchMove={false}
          >
            {sponsors.map((sponsor) => (
              <SwiperSlide key={sponsor.id} className="w-[300px]! h-[300px]!">
                <img src={sponsor.srcImg} alt={sponsor.alt} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
