import React from "react";
import SectionHeader from "../../components/SectionHeader";
import { mainFlavors } from "../../data/Lists";

const MainServices = () => {
  return (
    <div className="set-section py-20 text-black">
      <div className="container px-4 lg:px-0 h-full">
        <SectionHeader
          title="Main Service"
          subtitle="Choose your favorite flavor"
        />
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-11 pt-10">
          {mainFlavors.map((flavor) => (
            <div
              key={flavor.id}
              className="flex flex-col justify-between items-center text-center"
            >
              <div className="">
                <img
                  src={`./home-images/${flavor.id + 1}.png`}
                  alt={flavor.flavorName}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold">{flavor.flavorName}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainServices;
