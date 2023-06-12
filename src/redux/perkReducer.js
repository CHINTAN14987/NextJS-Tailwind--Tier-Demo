import { createSlice } from "@reduxjs/toolkit";
import data from "./perks.json";
const perkReducer = createSlice({
  name: "perk",
  initialState: {
    perks: data.slice(0, 4),
    formFields: {
      tierName: "SuperCross",
      class: "Tier II",
      price: "5.99",
      currency: "USD",
      description: "",
      subscription: "Monthly",
      limitationNumber: "100",
      address: "",
    },
    isValidated: false,
  },
  reducers: {
    addPerkList: (state, action) => {
      const newState = [...state.perks];
      return { ...state, perks: newState.concat(action.payload.data) };
    },
    dragPerkList: (state, action) => {
      const copyListItems = [...state.perks];
      const { drag, drop } = action.payload;
      const dragItemContent = copyListItems[drag];
      copyListItems.splice(drag, 1);
      copyListItems.splice(drop, 0, dragItemContent);
      return { ...state, perks: copyListItems };
    },
    deletePerk: (state, action) => {
      return state.perks.filter((item) => item.id !== action.payload);
    },
    editPerkForm: (state, action) => {
      const { name, value } = action.payload;
      return { ...state, formFields: { ...state.formFields, [name]: value } };
    },
    isFormValidated: (state, action) => {
      return { ...state, isValidated: action.payload };
    },
  },
});
export const {
  addPerkList,
  dragPerkList,
  deletePerk,
  editPerkForm,
  isFormValidated,
} = perkReducer.actions;
export default perkReducer.reducer;
