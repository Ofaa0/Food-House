import React from "react";
import HeroSection from "../sections/home_sections/HeroSection";
import SwiperSection from "../sections/home_sections/SwiperSection";
import MostPopular from "../sections/home_sections/MostPopular";
import OurFeatures from "../sections/home_sections/OurFeatures";
import MainServices from "../sections/home_sections/MainServices";
import TheReasons from "../sections/home_sections/TheReasons";
import Testimonials from "../sections/home_sections/Testimonials";
import GetInTouch from "../sections/home_sections/GetInTouch";

const HomePage = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <HeroSection />
      <SwiperSection />
      <MostPopular />
      <MainServices />
      <OurFeatures />
      <TheReasons />
      <Testimonials />
      <GetInTouch />
    </div>
  );
};

export default HomePage;
