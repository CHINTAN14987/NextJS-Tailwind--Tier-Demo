import { addPerkList } from "@/redux/perkReducer";
import { notification } from "antd";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import perkList from "../../redux/perks.json";
import add from "/public/Images/add.png";
const Library = () => {
  const disptach = useDispatch();
  const perkData = useSelector((state) => state.perk.perks);

  const addPerkListHandler = (perk) => {
    const isPerkAvailable = perkData?.some((item) => item.id === perk.id);
    if (isPerkAvailable) {
      notification.error({
        message: (
          <h3 className="border-t-4 border-red-500 py-2 text-black text-lg font-bold leading-6 m-0">
            {perk.title} is already available in perk list
          </h3>
        ),
        closable: false,
        icon: null,
        description: (
          <div className="text-custom-gray font-bold text-base leading-6">
            Add another perk from Library
          </div>
        ),
        duration: 3,
        placement: "top",
      });
      return;
    }

    disptach(addPerkList({ data: perk }));
    notification.error({
      message: (
        <h3 className="border-t-4 border-red-500 py-2 text-black text-lg font-bold leading-6 m-0">
          Success..!
        </h3>
      ),
      closable: false,
      icon: null,
      description: (
        <div className="text-custom-gray font-bold text-base leading-6">
          {perk.title} is Added Successfully to the Perk List
        </div>
      ),
      duration: 3,
      placement: "top",
    });
  };

  return (
    <div>
      <div className="py-8">
        <h3 className="text-xl text-center font-bold mb-8">Perks Library</h3>
        {perkList?.map((perk) => {
          return (
            <div
              className="flex items-center space-x-4 bg-transparent-black border rounded-xl border-gray-200 shadow-custom-box-shadow p-3 my-4"
              key={perk.id}
            >
              <div className="flex-1">
                <h3 className="text-custom-gray text-lg font-bold leading-6 cursor-pointer">
                  {perk.title}
                </h3>
                {perk?.description && (
                  <p className="text-custom-gray text-sm leading-6 cursor-pointer">
                    {perk.description}
                  </p>
                )}
              </div>
              <Image
                src={add}
                alt="icon"
                width={15}
                height={15}
                className="cursor-pointer"
                onClick={() => {
                  addPerkListHandler(perk);
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Library;
