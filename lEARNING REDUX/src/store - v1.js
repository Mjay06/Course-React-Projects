import { applyMiddleware, combineReducers, createStore } from "redux";

import AccountReducer from "./Features/accounts/accountslice";
import CustomerReducer from "./Features/customers/customerslice";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  Account: AccountReducer,
  Customer: CustomerReducer,
});

const Store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default Store;
