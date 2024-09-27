import { ADD_LOCATION } from "../actionTypes/explore";

const initialState = {
  location: null,
};

export const exploreReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LOCATION:
      return { ...state, location: action.payload };

    default:
      return state;
  }
};
