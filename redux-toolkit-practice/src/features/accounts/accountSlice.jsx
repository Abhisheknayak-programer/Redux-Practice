import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance = state.balance + action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance = state.balance - action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return { payload: { amount, purpose } };
      },

      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance = action.payload.amount;
      },
    },
    payLoan(state, action) {
      state.balance = state.balance - state.loan;
      state.loanPurpose = "";
      state.loan = 0;
    },
    convertingCurrency(state, action) {
      state.isLoading = true;
    },
  },
});

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

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;
export default accountSlice.reducer;
