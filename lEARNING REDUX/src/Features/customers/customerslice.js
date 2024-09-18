import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  nationalId: "",
  createdAt: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    CreateAccount: {
      prepare(name, nationalId) {
        return {
          payload: { name, nationalId, createdAt: new Date().toISOString() },
        };
      },
      reducer(state, action) {
        state.name = action.payload.name;
        state.nationalId = action.payload.nationalId;
        state.createdAt = action.payload.createdAt;
      },
    },
    UpdateName(state, action) {
      state.name = action.payload;
    },
  },
});

export default customerSlice.reducer;
const { CreateAccount, UpdateName } = customerSlice.actions;
export { CreateAccount, UpdateName };

/* export default function CustomerReducer(state = initialStateCustomer, action) {
    switch (action.type) {
      case "customer/CreateAccount":
        return {
          ...state,
          name: action.payload.name,
          nationalId: action.payload.nationalId,
          createdAt: action.payload.createdAt,
        };
      case "customer/UpdateName":
          return{...state, name: action.payload}
      default:
        return state;
    }
  }
  
  export function CreateAccount(name, nationalId) {
    return {
      type: "customer/CreateAccount",
      payload: { name, nationalId, createdAt: new Date().toISOString() },
    };
  }
  export function UpdateName(name) {
    return { type: "customer/UpdateName", payload: name };
  }
  */
