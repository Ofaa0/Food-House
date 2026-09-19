import { CiUser } from "react-icons/ci";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { testimonials } from "../../data/Lists";
import SectionHeader from "../../components/SectionHeader";

const Testimonials = () => {
  return (
    <div className="set-section py-26">
      <div className="container px-4 lg:px-0 h-full">
        {/* Header + Arrows */}
        <div className="flex flex-col justify-center gap-4 items-end text-black">
          <SectionHeader
            title="Testimonials"
            subtitle="What’s our customer says?"
          />

          {/* Custom Navigation */}
          <div className="flex gap-3 align-bottom">
            <button className="testimonial-prev w-12 h-12 rounded-full border border-black flex-center cursor-pointer hover:bg-black hover:text-white transition">
              <FaChevronLeft />
            </button>

            <button className="testimonial-next w-12 h-12 rounded-full border border-black flex-center cursor-pointer hover:bg-black hover:text-white transition">
              <FaChevronRight />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation={{
            prevEl: ".testimonial-prev",
            nextEl: ".testimonial-next",
          }}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          spaceBetween={32}
          slidesPerView={1}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {testimonials.map((slide) => (
            <SwiperSlide key={slide.id} className="pb-35 py-10  text-black">
              <div className="flex-center flex-col lg:flex-row lg:gap-0 h-full w-full  ">
                <div className=" text-[#3B5266] w-full flex flex-col gap-12.5 py-7.5 px-6.25 bg-[#F4F5F6]">
                  <p className="text-[16px] leading-6 font-pop">
                    {slide.testimonial}
                  </p>
                  <div className="flex-center gap-9.5">
                    <CiUser className="text-4xl font-bold" />
                    <div>
                      <h1 className="font-extrabold text-nowrap text-[20px] leading-6.25 tracking-[-2%]">
                        {slide.name}
                      </h1>
                      <p className="text-[15px] leading-5 text-nowrap ">
                        {slide.job}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
