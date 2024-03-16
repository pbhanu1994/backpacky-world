import {
  ADD_DESTINATION_DETAILS,
  UPDATE_SELECTED_HOTEL,
  GET_HOTEL_BOOKINGS,
  ADD_HOTEL_BOOKING,
} from "../actionTypes/book";

const initialState = {
  destination: {},
  hotels: {
    selected: {},
    bookings: {},
  },
};

export const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DESTINATION_DETAILS: {
      const destinationInfo = action.payload;

      return {
        ...state,
        destination: destinationInfo,
      };
    }
    // -- HOTELS -- //
    case UPDATE_SELECTED_HOTEL: {
      const selectedHotel = action.payload;

      return {
        ...state,
        hotels: {
          ...state.hotels,
          selected: selectedHotel,
        },
      };
    }

    case GET_HOTEL_BOOKINGS: {
      return {
        ...state,
        hotels: {
          ...state.hotels,
          bookings: action.payload,
        },
      };
    }

    case ADD_HOTEL_BOOKING: {
      return {
        ...state,
        hotels: {
          ...state.hotels,
          bookings: {
            ...state.hotels.bookings,
            [action.payload.id]: action.payload,
          },
        },
      };
    }

    default:
      return state;
  }
};
