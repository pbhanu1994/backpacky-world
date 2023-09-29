import { UPDATE_SELECTED_HOTEL } from "../actionTypes/book";

const initialState = {
  hotels: {
    selected: {},
  },
};

export const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    // -- HOTELS -- //
    case UPDATE_SELECTED_HOTEL: {
      const selectedHotel = action.payload;

      return {
        ...state,
        hotels: {
          selected: selectedHotel,
        },
      };
    }

    default:
      return state;
  }
};
