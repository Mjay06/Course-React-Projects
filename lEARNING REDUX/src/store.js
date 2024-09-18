import { configureStore } from "@reduxjs/toolkit";
import AccountReducer from "./Features/accounts/accountslice";
import CustomerReducer from "./Features/customers/customerslice";

const Store = configureStore({
  reducer: {
    Account: AccountReducer,
    Customer: CustomerReducer,
  },
});

export default Store;
