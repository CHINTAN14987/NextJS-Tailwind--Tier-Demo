import { editPerkForm, isFormValidated } from "@/redux/perkReducer";
import { notification, Switch } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdvanceForm = () => {
  const inputFields = useSelector((state) => state.perk.formFields);
  const dispatch = useDispatch();
  const validation = useSelector((state) => state.perk.isValidated);
  const [isAddressActive, setIsAddressActive] = useState(false);
  const [limitSubscriptions, setLimitSubscriptions] = useState(true);

  const subscriptionData = ["Montly", "Quaterly", "Yearly"];

  const onChangeHandler = (e) => {
    dispatch(
      editPerkForm({
        name: e.target.name,
        value: e.target.value,
      })
    );
  };

  const addressDisplayOnChangeHandler = (value) => {
    setIsAddressActive(value);
  };
  const limitSubscriptionsOnChange = (value) => {
    setLimitSubscriptions(value);
  };
  console.log(inputFields);
  const saveFormDetailsHandler = () => {
    if (
      !inputFields.tierName.trim() ||
      !inputFields.class.trim() ||
      !inputFields.price.trim() ||
      !inputFields.currency.trim() ||
      !inputFields?.limitationNumber?.trim() ||
      !inputFields?.description?.trim()?.split("").length > 180 ||
      !inputFields?.address?.trim()
    ) {
      dispatch(isFormValidated(true));

      notification.error({
        message: (
          <h3 className="border-t-4 border-red-500 py-2 text-black text-lg font-bold leading-6 m-0">
            Forms items are missing...
          </h3>
        ),
        closable: false,
        icon: null,
        description: (
          <div className="text-custom-gray font-bold text-base leading-6">
            Please fill the form fields
          </div>
        ),
        duration: 3,
        placement: "top",
      });
      return;
    }
    notification.error({
      message: (
        <h3 className="border-t-4 border-red-500 py-2 text-black text-lg font-bold leading-6 m-0">
          Changes are saved for Tier
        </h3>
      ),
      closable: false,
      icon: null,
      description: (
        <div className="text-custom-gray font-bold text-base leading-6">
          Tier class is saved
        </div>
      ),
      duration: 3,
      placement: "top",
    });
  };

  return (
    <div className="border border-gray-200 rounded-xl mt-8">
      <div className="px-4 py-8 flex flex-col gap-8 cursor-pointer ">
        <h3 className="text-xl text-center font-bold">General</h3>
        <div className="flex items-center justify-between gap-16 cursor-pointer">
          <div className="flex flex-col gap-2 flex-1 ">
            <label className="text-custom-gray text-base font-medium leading-6 ml-4 cursor-pointer">
              Subscription Billed
            </label>
            <select
              className={`h-14  pl-3 outline-none cursor-pointer bg-white bg-opacity-100 font-semibold text-base leading-6 rounded-lg ${
                validation && !inputFields?.subscription?.trim()
                  ? "border-red-500 border"
                  : "border border-opacity-6"
              }`}
              value={inputFields?.subscription}
              name="subscription"
              onChange={onChangeHandler}
            >
              {subscriptionData?.map((subscription) => {
                return (
                  <option
                    className="p-4 text-2xl text-custom-gray "
                    key={subscription}
                  >
                    {subscription}
                  </option>
                );
              })}
            </select>
            <h3 className="text-custom-gray text-base font-normal leading-6 ml-4 cursor-pointer mt-2">
              Choose if subscriptions will be billed as 1<sup>st</sup> of every
              month or new week
            </h3>
          </div>
        </div>
        <div className="flex items-center justify-between gap-16 cursor-pointer bg-gray-100 h-16 rounded-xl">
          <span className="text-custom-gray text-base font-bold leading-6 ml-4 cursor-pointer">
            Limit Subscriptions
          </span>

          <Switch
            className=" mr-4 h-8 w-16 ant-switch-handle -mt-3"
            checked={limitSubscriptions}
            onChange={limitSubscriptionsOnChange}
          />
        </div>

        <div
          className={`flex  flex-col items-start  h-14 pl-3 cursor-pointer bg-white bg-opacity-100 font-semibold text-base  leading-6 rounded-lg sm:justify-between  sm:items-center sm:flex-row ${
            validation && !inputFields?.limitationNumber?.trim()
              ? "border-red-500 border"
              : "border border-opacity-6"
          }`}
        >
          <input
            className="w-12 p-2 h-12 outline-none cursor-pointer bg-white bg-opacity-100 font-semibold text-base leading-6 rounded-lg sm:p-0"
            value={inputFields?.limitationNumber}
            name="limitationNumber"
            disabled={limitSubscriptions}
            onChange={onChangeHandler}
          />
          <span className="text-custom-gray text-base font-medium leading-6 ml-2 cursor-pointer  sm:ml-4">
            24 subscribed
          </span>
        </div>
        <div>
          <div className="flex items-center justify-between gap-16 cursor-pointer bg-gray-100 h-16 rounded-xl">
            <span className="text-custom-gray text-base font-bold leading-6 ml-4 cursor-pointer">
              Shipping Address
            </span>

            <Switch
              className=" mr-4 h-8 w-16 ant-switch-handle -mt-3"
              checked={isAddressActive}
              onChange={addressDisplayOnChangeHandler}
            />
          </div>
          <h3 className="text-custom-gray text-base font-normal leading-6 ml-4 cursor-pointer mt-4">
            If the option is enabled the subscribers will be asked to input
            their shipping addresses at the checkout
          </h3>
        </div>

        {isAddressActive && (
          <div className="flex flex-col gap-2 ">
            <textarea
              name="address"
              placeholder="Enter Address."
              className={`h-36 pl-3 outline-none cursor-pointer bg-white bg-opacity-100 font-semibold text-base leading-6 rounded-lg placeholder:text-xl p-4 text-custom-gray ${
                validation && !inputFields?.address
                  ? "border-red-500 border"
                  : "border border-opacity-6"
              }`}
              value={inputFields?.address}
              type="text"
              onChange={onChangeHandler}
            ></textarea>
          </div>
        )}

        <div className="bg-gray-100 p-2 rounded-xl">
          <div className="flex justify-between gap-8 flex-wrap p-4">
            <span className=" text-custom-gray text-lg font-normal  h-14">
              Manage Tier
            </span>
            <span className="text-purple-700 text-lg font-semibold  h-14">
              Published
            </span>
          </div>
          <div className="flex justify-between gap-8 flex-wrap pb-4">
            <button className="text-custom-gray text-lg font-semibold border border-gray-200 bg-gray-100 h-14 flex-[0.4] rounded-full">
              Unpublish Tier
            </button>
            <button className="text-red-500 text-lg font-semibold border border-gray-200 bg-gray-100 h-14 flex-[0.4] rounded-full">
              Delete Tier
            </button>
          </div>
        </div>

        <button
          onClick={saveFormDetailsHandler}
          className=" text-custom-gray w-full text-lg font-semibold border border-gray-200 bg-gray-100 h-14 rounded-full"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AdvanceForm;
