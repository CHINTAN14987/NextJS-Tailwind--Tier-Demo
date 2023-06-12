import Image from "next/image";
import React from "react";
import breadcrum from "/public/Images/drag_indicator.png";
const Info = () => {
  return (
    <div className="border border-gray-200 p-4 rounded-xl mt-8 bg-gray-100">
      <div className="flex gap-8 justify-between items-center ">
        <h3 className="text-lg text-center font-bold cursor-pointer">Info</h3>
        <div className="rounded-full bg-gray-100 border border-gray-200 w-12 h-12 flex justify-center cursor-pointer hover:bg-gray-400">
          <Image
            src={breadcrum}
            alt="icon"
            width={10}
            height={10}
            className="object-contain"
          />
        </div>
      </div>
      <h3 className="text-custom-gray font-semibold text-base  my-4 cursor-pointer">
        You can have up to 3 tiers of subscriptions
      </h3>

      <button className="border border-gray-200 text-custom-gray font-bold text-lg p-4 w-full mt-4 rounded-full cursor-pointer">
        close
      </button>
    </div>
  );
};

export default Info;
