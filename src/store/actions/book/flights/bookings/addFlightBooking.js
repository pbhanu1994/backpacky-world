import { db } from "../../../../../handlers/firebaseClient";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import {
  GET_FLIGHT_BOOKINGS,
  ADD_FLIGHT_BOOKING,
} from "../../../../actionTypes/book";
import setAndShowErrorToast from "../../../config/toast/setAndShowErrorToast";

const addFlightBooking = (bookingInfo) => async (dispatch, getState) => {
  const uid = getState().auth.user.uid;
  const oldState = getState().book.flights.bookings;

  const bookingData = { uid, createdAt: serverTimestamp(), ...bookingInfo };

  try {
    dispatch({
      type: ADD_FLIGHT_BOOKING,
      payload: bookingData,
    });

    setDoc(
      doc(db, "book", uid, "flights", uid, "bookings", bookingData.id),
      bookingData
    );
  } catch (err) {
    console.error("error", err);
    const errorMessage = `Whoops! Could not add the Flight Booking Info. Please try again.`;
    dispatch(setAndShowErrorToast(errorMessage));
    dispatch({
      type: GET_FLIGHT_BOOKINGS,
      payload: oldState,
    });
  }
};

export default addFlightBooking;
