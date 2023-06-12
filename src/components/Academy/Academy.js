import Image from "next/image";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import breadcrum from "/public/Images/drag_indicator.png";
import data from "../../redux/perks.json";
import Library from "../library/Library";
import { Modal } from "antd";
import Info from "../Info/Info";
const Academy = () => {
  const perks = useSelector((state) => state.perk.perks);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const unUsedPerks = data?.filter((item) => {
    return !perks?.some((perkData) => perkData?.id === item?.id);
  });
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="mt-16">
      <div className="border border-gray-200 p-4 rounded-xl">
        <div className="flex gap-8 justify-between items-center">
          <h3 className="text-xl text-center font-bold cursor-pointer">
            Academy
          </h3>
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
        <h3 className="text-custom-gray font-normal text-sm my-4 cursor-pointer">
          Here are some of perks from the library you have not used yet
        </h3>
        <div>
          {unUsedPerks?.map((perk, index) => {
            return (
              <div
                className="flex gap-4 items-center cursor-pointer"
                key={index}
              >
                <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                <span
                  className="text-base  text-custom-gray font-bold my-2"
                  key={perk.id}
                >
                  {perk.title}
                </span>
              </div>
            );
          })}
        </div>
        <button
          className="border border-gray-200 text-custom-gray font-bold text-lg p-4 w-full mt-16 rounded-full"
          onClick={showModal}
        >
          Library
        </button>
      </div>

      <Info />
      <button className="bg-gradient-to-br mt-8 w-full from-pink-400 to-purple-600 text-white font-bold text-lg tracking-wide p-4 flex-1 rounded-full gap-4 sm:mt-96">
        Edit Panel
      </button>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
      >
        <Library />
      </Modal>
    </div>
  );
};

export default Academy;
