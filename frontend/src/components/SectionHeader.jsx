import React from "react";

const SectionHeader = ({ title, subtitle }) => {
  return (
    <div className="w-full">
      <p className="font-pop text-center text-2xl leading-8 tracking-tight">
        {title}
      </p>
      <h1 className="text-center text-[32px] font-bold leading-10 tracking-tight mt-5">
        {subtitle}
      </h1>
    </div>
  );
};

export default SectionHeader;
