import React from "react";
import SectionHeader from "../../components/SectionHeader";
import { FaShippingFast } from "react-icons/fa";
import { TbClock24 } from "react-icons/tb";
import { PiCookingPotFill } from "react-icons/pi";
import { MdSmartToy } from "react-icons/md";






const OurFeatures = () => {
  return (
    <div className="set-section py-20 text-black">
      <div className="container px-4 lg:px-0 h-full">
        <SectionHeader title="Our Features" subtitle="Quality is Our First Priority" />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-15 pt-13">
            <div className="flex flex-col items-center justify-center">
                <FaShippingFast className="text-[48px]" />
                <h3 className="text-[20px] font-extrabold pt-6 pb-2 leading-6.25">Fast Shipping</h3>
                <p className="text-[12px] text-center">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nunc vestibulum ect
                </p>
            </div>
            <div className="flex flex-col items-center justify-center">
                <TbClock24 className="text-[48px]" />
                <h3 className="text-[20px] font-extrabold pt-6 pb-2 leading-6.25">24/7 Support</h3>
                <p className="text-[12px] text-center">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nunc vestibulum ect
                </p>
            </div>
            <div className="flex flex-col items-center justify-center">
                <PiCookingPotFill className="text-[48px]" />
                <h3 className="text-[20px] font-extrabold pt-6 pb-2 leading-6.25">Fresh Ingredients</h3>
                <p className="text-[12px] text-center">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nunc vestibulum ect
                </p>
            </div>
            <div className="flex flex-col items-center justify-center">
                <MdSmartToy className="text-[48px]" />
                <h3 className="text-[20px] font-extrabold pt-6 pb-2 leading-6.25">Kid-Friendly</h3>
                <p className="text-[12px] text-center">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nunc vestibulum ect
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default OurFeatures;
