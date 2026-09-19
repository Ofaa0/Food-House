import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { swiperList } from "../../data/Lists";
import { useEffect, useState } from "react";

const SwiperSection = ({styling}) => {
  const [banners, setBanners] = useState([])
  const getBanners = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/banners`);
      setBanners(res.data?.data);
      console.log(res.data?.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };
  useEffect(() => {
    getBanners();
  }, []);
  return (
    <div className={`set-section py-25 ${styling}`}>
      <div className="container px-4 lg:px-0 h-full">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          spaceBetween={30}
          slidesPerView={1}
        >
          {banners.map((slide, i) => (
            <SwiperSlide key={i} className="pb-15 text-black">
              <div className="flex-center flex-col lg:flex-row gap-4 lg:gap-0 h-full w-full">
                <div className="lg:w-1/2 w-full flex-center">
                  <img
                    src={slide.imageUrl}
                    alt="img"
                    className="lg:w-1/2 w-full object-cover object-center"
                  />
                </div>
                <div className="lg:w-1/2 w-full flex flex-col gap-8">
                  <h1 className="font-bold lg:text-[64px] text-5xl leading-16 tracking-[-2%]">
                    {slide.title}
                  </h1>
                  <p className=" text-[16px] leading-6 font-pop">{slide.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SwiperSection;
