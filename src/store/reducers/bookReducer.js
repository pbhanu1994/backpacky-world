import {
  ADD_DESTINATION_DETAILS_FOR_HOTEL,
  UPDATE_SELECTED_HOTEL,
  ADD_HOTEL_BOOKING,
  DELETE_HOTEL_BOOKING,
  GET_HOTEL_BOOKINGS,
  ADD_FROM_DETAILS_FOR_FLIGHT,
  ADD_TO_DETAILS_FOR_FLIGHT,
  UPDATE_SELECTED_FLIGHT_OFFER,
  ADD_SEARCH_PARAMS,
  ADD_FLIGHT_BOOKING,
  DELETE_FLIGHT_BOOKING,
  GET_FLIGHT_BOOKINGS,
} from "../actionTypes/book";

const initialState = {
  hotels: {
    destination: {},
    selected: {},
    bookings: {},
  },
  flights: {
    from: {},
    to: {},
    searchParams: {},
    selected: {},
    bookings: {},
  },
};

export const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    // -- HOTELS -- //
    case ADD_DESTINATION_DETAILS_FOR_HOTEL: {
      const destinationInfo = action.payload;

      return {
        ...state,
        hotels: {
          ...state.hotels,
          destination: destinationInfo,
        },
      };
    }

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

    case DELETE_HOTEL_BOOKING: {
      const { bookingReference } = action.payload;

      const allHotelBookings = { ...state.hotels.bookings };
      delete allHotelBookings[bookingReference];

      return {
        ...state,
        hotels: {
          ...state.hotels,
          bookings: allHotelBookings,
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

    // -- FLIGHTS -- //
    case ADD_FROM_DETAILS_FOR_FLIGHT: {
      const fromInfo = action.payload;

      return {
        ...state,
        flights: {
          ...state.flights,
          from: fromInfo,
        },
      };
    }

    case ADD_TO_DETAILS_FOR_FLIGHT: {
      const toInfo = action.payload;

      return {
        ...state,
        flights: {
          ...state.flights,
          to: toInfo,
        },
      };
    }

    case ADD_SEARCH_PARAMS: {
      const searchParams = action.payload;

      return {
        ...state,
        flights: {
          ...state.flights,
          searchParams,
        },
      };
    }

    case UPDATE_SELECTED_FLIGHT_OFFER: {
      const selectedFlightOffer = action.payload;

      return {
        ...state,
        flights: {
          ...state.flights,
          selected: selectedFlightOffer,
        },
      };
    }

    case ADD_FLIGHT_BOOKING: {
      return {
        ...state,
        flights: {
          ...state.flights,
          bookings: {
            ...state.flights.bookings,
            [action.payload.id]: action.payload,
          },
        },
      };
    }

    case DELETE_FLIGHT_BOOKING: {
      const { bookingReference } = action.payload;

      const allFlightBookings = { ...state.flights.bookings };
      delete allFlightBookings[bookingReference];

      return {
        ...state,
        flights: {
          ...state.flights,
          bookings: allFlightBookings,
        },
      };
    }

    case GET_FLIGHT_BOOKINGS: {
      return {
        ...state,
        flights: {
          ...state.flights,
          bookings: action.payload,
        },
      };
    }

    default:
      return state;
  }
};
