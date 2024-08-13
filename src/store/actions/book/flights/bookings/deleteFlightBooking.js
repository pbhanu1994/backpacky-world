import { db } from "../../../../../handlers/firebaseClient";
import { doc, deleteDoc } from "firebase/firestore";
import {
  GET_FLIGHT_BOOKINGS,
  DELETE_FLIGHT_BOOKING,
} from "../../../../actionTypes/book";
import setAndShowErrorToast from "../../../config/toast/setAndShowErrorToast";

const deleteFlightBooking =
  (bookingReference) => async (dispatch, getState) => {
    const uid = getState().auth.user.uid;
    const oldState = getState().book.flights.bookings;

    try {
      dispatch({
        type: DELETE_FLIGHT_BOOKING,
        payload: {
          bookingReference,
        },
      });

      deleteDoc(
        doc(db, "book", uid, "flights", uid, "bookings", bookingReference)
      );
    } catch (err) {
      console.error("error", err);
      const errorMessage =
        "Whoops! Could not delete the flight booking. Please try again.";
      dispatch(setAndShowErrorToast(errorMessage));
      dispatch({
        type: GET_FLIGHT_BOOKINGS,
        payload: oldState,
      });
    }
  };

export default deleteFlightBooking;
