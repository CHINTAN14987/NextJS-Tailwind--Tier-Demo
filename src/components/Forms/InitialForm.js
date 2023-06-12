import { editPerkForm } from "@/redux/perkReducer";
import { notification } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import tier from "/public/Images/tier.png";

const InitialForm = () => {
  const inputFields = useSelector((state) => state.perk.formFields);
  const validation = useSelector((state) => state.perk.isValidated);
  const dispatch = useDispatch();
  const [wordCount, setWordCount] = useState(0);
  const [discountApplied, setDiscountApplied] = useState(false);

  const tierClassData = ["Tier I", "Tier II", "Tier III"];
  const currencies = ["USD", "INR", "AFN", "DZD"];
  const discountHandler = () => {
    let discount = (inputFields?.price / 20) * inputFields?.price;
    if (!discountApplied) {
      dispatch(
        editPerkForm({ name: "price", value: inputFields?.price - discount })
      );
    }
    setDiscountApplied(true);
    if (discountApplied) {
      notification.error({
        message: (
          <h3 className="border-t-4 border-red-500 py-2 text-black text-lg font-bold leading-6 m-0">
            Discount already applied of ${discount}
          </h3>
        ),
        closable: false,
        icon: null,
        description: (
          <div className="text-custom-gray font-bold text-base leading-6">
            cannot use the same discount again...!
          </div>
        ),
        duration: 3,
        placement: "top",
      });
    }
    return;
  };
  const onChangeHandler = (e) => {
    dispatch(editPerkForm({ name: e.target.name, value: e.target.value }));

    if (e.target.name === "description") {
      const words = e.target.value.trim().split("");
      setWordCount(words.length);
    }
  };

  return (
    <div className="border border-gray-200 rounded-xl ">
      <div className="px-4 py-8 flex flex-col gap-8 cursor-pointer ">
        <h3 className="text-xl text-center font-bold">General</h3>
        <div className="  cursor-pointer flex flex-col gap-8 sm:16 sm:items-center sm:justify-between sm:flex-row">
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-custom-gray text-base font-medium leading-6 ml-4 cursor-pointer">
              Tier Name
            </label>
            <input
              name="tierName"
              className={`h-14  pl-3 outline-none cursor-pointer bg-white bg-opacity-100 font-semibold text-base leading-6 rounded-lg ${
                validation && !inputFields?.tierName?.trim()
                  ? "border-red-500 border"
                  : "border border-opacity-6"
              }`}
              value={inputFields?.tierName}
              onChange={onChangeHandler}
            />
          </div>
          <div className="flex flex-col gap-2 flex-1 ">
            <label className="text-custom-gray text-base font-medium leading-6 ml-4 cursor-pointer">
              Class
            </label>
            <select
              className="h-14 border border-opacity-6 pl-3 outline-none cursor-pointer bg-white bg-opacity-100 font-semibold text-base leading-6 rounded-lg"
              value={inputFields?.class}
              name="class"
              onChange={onChangeHandler}
            >
              {tierClassData.map((tier) => {
                return (
                  <option className="p-4 text-xl text-custom-gray " key={tier}>
                    {tier}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="flex flex-col  gap-8  sm:flex-row sm:gap-16 sm:items-center sm:justify-between  cursor-pointer">
          <div className="flex flex-col flex-1 gap-2 ">
            <label className="text-custom-gray text-base font-medium leading-6 ml-4 cursor-pointer">
              Price
            </label>
            <input
              className={`h-14 outline-none pl-3 cursor-pointer bg-white bg-opacity-100 font-semibold text-base leading-6 rounded-lg ${
                validation && !inputFields?.price?.trim()
                  ? "border-red-500 border"
                  : "border border-opacity-6"
              }`}
              name="price"
              value={inputFields?.price}
              onChange={onChangeHandler}
            />
            <h3
              className="ml-3 text-purple-700 text-sm font-semibold leading-6"
              onClick={discountHandler}
            >
              + &nbsp; &nbsp;Add Sale Price
            </h3>
          </div>
          <select
            className={`h-16 pl-3 outline-none cursor-pointer sm:flex-[0.3] sm:h-16 bg-white bg-opacity-100 font-semibold text-base leading-6 rounded-lg ${
              validation && !inputFields?.currency?.trim()
                ? "border-red-500 border"
                : "border border-opacity-6"
            }`}
            value={inputFields?.currency}
            name="currency"
            onChange={onChangeHandler}
          >
            {currencies.map((curency) => {
              return (
                <option className="p-4 text-xl text-custom-gray " key={curency}>
                  {curency}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-col gap-2 cursor-pointer">
          <label className="text-custom-gray text-base font-medium leading-6 ml-4 cursor-pointer">
            Tier Icon
          </label>
          <div className="flex items-center justify-around bg-gray-100 h-20 w-64 rounded-lg cursor-pointer">
            <div className="w-16 h-16 bg-gray-300 flex items-center justify-center rounded-xl">
              <Image src={tier} h={50} w={50} alt="icon" />
            </div>
            <h3 className="text-custom-gray text-xl font-bold leading-6">
              Tier II Icon
            </h3>
          </div>
        </div>
        <div className="flex flex-col gap-2 ">
          <label className="text-custom-gray text-base font-medium leading-6 ml-4 cursor-pointer">
            Description (optional)
          </label>
          <textarea
            name="description"
            placeholder="Enter description."
            className={`h-36 pl-3 outline-none cursor-pointer bg-white bg-opacity-100 font-semibold text-base leading-6 rounded-lg placeholder:text-xl p-4 text-custom-gray ${
              validation && wordCount > 180
                ? "border-red-500 border"
                : "border border-opacity-6"
            }`}
            value={inputFields?.description}
            type="text"
            onChange={onChangeHandler}
          ></textarea>
          <div className="flex justify-between">
            <span
              className={`text-sm font-normal leading-6 ${
                180 - wordCount < 0
                  ? "text-red-500 font-bold"
                  : "text-custom-gray"
              }`}
            >
              Characters
            </span>
            <div className="flex justify-end items-center gap-1">
              <div
                className={`w-8 h-8 rounded-full border text-sm flex items-center  ${
                  180 < wordCount
                    ? "text-red-500 font-bold border-red-500"
                    : "border-custom-gray"
                }`}
              >
                <span className="text-center flex-1">
                  {wordCount && 180 - wordCount}
                </span>
              </div>

              <span className="text-custom-gray text-sm font-normal leading-6">
                180
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitialForm;
