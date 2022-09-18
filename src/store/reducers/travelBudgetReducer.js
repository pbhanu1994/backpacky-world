import { GET_BUDGET_ITEMS } from "../actionTypes/travelBudget";

const initialState = {
  personalIncome: [],
  beforeILeave: [],
  destinations: [],
};

export const travelBudgetReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BUDGET_ITEMS:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
