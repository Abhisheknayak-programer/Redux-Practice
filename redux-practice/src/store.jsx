import { applyMiddleware, combineReducers, createStore } from "redux";
import customerReducer from "./features/customers/customerSlice";
import accountReducer from "./features/accounts/accountSlice";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

const rootReducers = combineReducers({
  account: accountReducer,
  customers: customerReducer,
});

// const store = createStore(rootReducers, applyMiddleware(thunk));
const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
