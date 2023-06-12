import { addPerkList } from "@/redux/perkReducer";
import { notification } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const CreatePerk = ({ close }) => {
  const [perk, setPerk] = useState({
    id: Math.floor(Math.random() * 1000),
    title: "",
    permission: "",
  });
  const disptach = useDispatch();
  const onChangeHandler = (e) => {
    setPerk({ ...perk, [e.target.name]: e.target.value });
  };
  const createPerkHandler = () => {
    disptach(addPerkList({ data: perk }));
    notification.error({
      message: (
        <h3 className="border-t-4 border-red-500 py-2 text-black text-lg font-bold leading-6 m-0">
          Perk created successfully..!
        </h3>
      ),
      closable: false,
      icon: null,
      description: (
        <div className="text-custom-gray font-bold text-base leading-6">
          {perk.title} is Added Successfully to the Library
        </div>
      ),
      duration: 3,
      placement: "top",
    });
    close();
  };
  return (
    <div>
      <h3 className="text-xl text-center font-bold mb-8">Create Perk</h3>

      <div className="flex flex-col gap-4">
        <label className="text-custom-gray text-base font-medium leading-6 ml-4 cursor-pointer">
          Perk Name
        </label>
        <input
          className="h-14 border border-opacity-6 pl-3 outline-none cursor-pointer bg-white bg-opacity-100 font-semibold text-base leading-6 rounded-lg placeholder:text-base placeholder:font-normal"
          placeholder="enter perk name"
          name="title"
          value={perk.title}
          onChange={onChangeHandler}
        />
      </div>
      <div className="flex flex-col gap-4 mt-8">
        <label className="text-custom-gray text-base font-medium leading-6 ml-4 cursor-pointer">
          Permission (allow subscriber to)
        </label>
        <select
          disabled={true}
          className="h-14 border border-opacity-6 pl-3 outline-none cursor-pointer bg-white bg-opacity-100 font-semibold text-base leading-6 rounded-lg"
        >
          {["None"].map((item) => {
            return <option>{item}</option>;
          })}
        </select>
      </div>

      <button
        className="border mt-32 border-gray-200 bg-gray-100 text-custom-gray font-bold text-lg p-4 flex-1 rounded-full w-full"
        onClick={createPerkHandler}
      >
        Create Perk
      </button>
    </div>
  );
};

export default CreatePerk;
