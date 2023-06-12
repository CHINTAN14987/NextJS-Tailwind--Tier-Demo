import Image from "next/image";
import React from "react";
import breadcrum from "/public/Images/drag_indicator.png";

const SideNav = () => {
  const menuData = [
    "Activities",
    "OverAll",
    "Earning",
    { Properfans: ["OverView", "Earning", "Manage Tiers"] },
    "Propermeet",
    "Properlive",
  ];
  return (
    <div>
      <div className="flex gap-8 justify-between items-center h-40">
        <div className="rounded-full bg-gray-100 border border-gray-200 w-20 h-20 flex justify-center cursor-pointer hover:bg-gray-400">
          <Image
            src={breadcrum}
            alt="icon"
            width={20}
            height={20}
            className="object-contain"
          />
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-4xl font-extrabold ">Creator</span>
          <span className="text-4xl font-extrabold">Dashboard</span>
        </div>
      </div>
      <div className="border border-gray-200 p-4 rounded-xl">
        <div className="flex gap-8">
          <div className="relative w-14 h-14">
            <Image
              src="https://images.unsplash.com/photo-1558222218-b7b54eede3f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
              alt="user"
              fill
              className="rounded-full object-cover cursor-pointer"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold cursor-pointer">FaZe Banks</h3>
            <h3 className="text-base text-custom-gray font-normal cursor-pointer">
              via. Richardson Bengston
            </h3>
          </div>
        </div>
        <button className="border border-gray-200 text-custom-gray font-bold text-lg p-4 w-full mt-16 rounded-full">
          Switch
        </button>
      </div>
      <h3 className=" text-gray-400 font-normal text-base mt-8 text-center sm:text-left">
        Menu
      </h3>
      <div className="">
        {menuData.map((menu) => {
          if (typeof menu === "object") {
            const [title, subTitle] = Object.entries(menu)[0];
            return (
              <div key={menu}>
                <div className="text-xl font-bold mx-2  p-3 m-4 hover:rounded-xl hover:bg-gray-200 cursor-pointer text-center sm:text-left">
                  {title}
                </div>
                <div className="flex gap-2">
                  <div className=" ml-4 w-[2px] hidden bg-gray-200 cursor-pointer sm:block"></div>
                  <div className="flex-grow flex flex-col ">
                    {subTitle?.map((list) => {
                      return (
                        <div
                          key={list}
                          className="text-xl font-bold text-custom-gray p-4 bg-gray-100 rounded-full cursor-pointer  m-2 border-gray-200 hover:rounded-xl hover:bg-gray-200 text-center sm:text-left sm:bg-white sm:m-0"
                        >
                          {list}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <div
                key={menu}
                className="text-xl font-bold mx-2 my-8 p-3 m-4 cursor-pointer hover:rounded-xl hover:bg-gray-200 text-center sm:text-left"
              >
                {menu}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default SideNav;
