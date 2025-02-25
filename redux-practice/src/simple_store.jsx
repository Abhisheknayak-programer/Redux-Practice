import { combineReducers, createStore } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit": {
      return { ...state, balance: state.balance + action.payload };
    }

    case "account/widthdraw": {
      return { ...state, balance: state.balance - action.payload };
    }

    case "account/requestLoan": {
      if (state.loan > 0) return false;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    }

    case "account/payLoan": {
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    }

    default: {
      return state;
    }
  }
}

/////////////////////////////////////////////////////////////////////////////////

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

const customerReducer = (state = initialStateCustomer, action) => {
  switch (action.type) {
    case "customer/createCustomer": {
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    }

    case "customer/updateName": {
      return { ...state, fullName: action.payload };
    }

    default: {
      return state;
    }
  }
};

const createCustomer = (fullName, nationalID) => {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
};

const updateName = (fullName) => {
  return {
    type: "customer/updateName",
    payload: fullName,
  };
};

const rootReducers = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducers);

// Dispatch without Action creators
// store.dispatch({ type: "account/deposit", payload: 5000 });
// store.dispatch({ type: "account/widthdraw", payload: 200 });
// store.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 1000, purpose: "vaccation" },
// });
// store.dispatch({ type: "account/payLoan" });
// console.log(store.getState());

//Dispatch with Action creators
const deposit = (amount) => {
  return { type: "account/deposit", payload: amount };
};

const withdraw = (amount) => {
  return { type: "account/widthdraw", payload: amount };
};

const requestLoan = (amount, purpose) => {
  return {
    type: "account/requestLoan",
    payload: { amount: amount, purpose: purpose },
  };
};

const payLoan = () => {
  return { type: "account/payLoan" };
};

store.dispatch(deposit(5000));
store.dispatch(withdraw(200));
store.dispatch(requestLoan(1000, "Vaccation"));
store.dispatch(payLoan());

store.dispatch(createCustomer("Abhishek", "41"));
store.dispatch(updateName("Abhishek Nayak"));
console.log(store.getState());
