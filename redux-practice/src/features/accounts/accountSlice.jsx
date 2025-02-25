import axios from "axios";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit": {
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
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

    case "account/convertingCurrency": {
      return { ...state, isLoading: true };
    }

    default: {
      return state;
    }
  }
}

export const deposit = (amount, currency) => {
  if (currency === "USD") return { type: "account/deposit", payload: amount };
  return async (dispatch, getState) => {
    //Start Loading
    dispatch({ type: "account/convertingCurrency" });

    //API CALL
    const url = `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`;

    const res = await axios.get(url);
    const amt = res.data.rates.USD;

    //Return Action
    dispatch({ type: "account/deposit", payload: amt });
  };
};

export const withdraw = (amount) => {
  return { type: "account/widthdraw", payload: amount };
};

export const requestLoan = (amount, purpose) => {
  return {
    type: "account/requestLoan",
    payload: { amount: amount, purpose: purpose },
  };
};

export const payLoan = () => {
  return { type: "account/payLoan" };
};
