import Image from "next/image";
import React, { useRef, useState } from "react";
import breadcrum from "/public/Images/drag_indicator.png";
import close from "/public/Images/close.png";
import { useDispatch, useSelector } from "react-redux";
import { deletePerk, dragPerkList } from "@/redux/perkReducer";
import { Modal } from "antd";
import CreatePerk from "../CreatePerk/CreatePerk";
import Library from "../library/Library";

const Perks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const perkList = useSelector((state) => state.perk.perks)?.slice(0, 4);
  const dragItem = useRef();
  const dragOverItem = useRef();
  const [displayLibrary, setDisplayLibrary] = useState(false);
  const disptach = useDispatch();
  const dragStart = (position) => {
    dragItem.current = position;
  };

  const dragEnter = (position) => {
    dragOverItem.current = position;
  };
  const showModal = () => {
    setIsModalOpen(true);
    setDisplayLibrary(true);
  };
  const showCreatePerkModal = () => {
    setIsModalOpen(true);
    setDisplayLibrary(false);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const deletePerkHandler = (value) => {
    disptach(deletePerk(value));
  };
  const drop = (e) => {
    disptach(
      dragPerkList({ drag: dragItem.current, drop: dragOverItem.current })
    );
    dragItem.current = null;
    dragOverItem.current = null;
  };

  return (
    <div className="border border-gray-100 p-2 rounded-xl mt-6">
      <h3 className="text-xl text-center font-bold mb-8">Perks</h3>
      <div>
        {perkList?.map((perk, index) => {
          return (
            <div
              key={perk.id}
              onDragStart={(e) => dragStart(index)}
              onDragEnter={(e) => dragEnter(index)}
              onDragEnd={drop}
              draggable
              className="flex items-center space-x-4 bg-transparent-black  border border-gray-100 shadow-custom-box-shadow p-6 my-4 rounded-xl"
            >
              <Image src={breadcrum} alt="icon" width={10} height={10} />
              <h3 className="text-custom-gray text-lg font-bold leading-6 flex-1">
                {perk.title}
              </h3>
              <Image
                src={close}
                alt="icon"
                width={15}
                height={15}
                onClick={() => {
                  deletePerkHandler(perk.id);
                }}
              />
            </div>
          );
        })}
      </div>
      <div className="flex flex-col gap-10 sm:my-8 sm:flex-row sm:gap-10">
        <button
          className="bg-gradient-to-br from-pink-400 to-purple-600 text-white font-bold text-lg tracking-wide p-4 flex-1 rounded-full gap-4 mt-8 sm:mt-0"
          onClick={showModal}
        >
          Library
        </button>
        <button
          className="border border-gray-200 text-custom-gray font-bold text-lg p-4 flex-1 rounded-full"
          onClick={showCreatePerkModal}
        >
          Create Perk
        </button>
      </div>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        {displayLibrary ? <Library /> : <CreatePerk close={handleCancel} />}
      </Modal>
    </div>
  );
};

export default Perks;
