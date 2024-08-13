import { db } from "../../../../../handlers/firebaseClient";
import { doc, deleteDoc } from "firebase/firestore";
import {
  GET_HOTEL_BOOKINGS,
  DELETE_HOTEL_BOOKING,
} from "../../../../actionTypes/book";
import setAndShowErrorToast from "../../../config/toast/setAndShowErrorToast";

const deleteHotelBooking = (bookingReference) => async (dispatch, getState) => {
  const uid = getState().auth.user.uid;
  const oldState = getState().book.hotels.bookings;

  try {
    dispatch({
      type: DELETE_HOTEL_BOOKING,
      payload: {
        bookingReference,
      },
    });

    deleteDoc(
      doc(db, "book", uid, "hotels", uid, "bookings", bookingReference)
    );
  } catch (err) {
    console.error("error", err);
    const errorMessage =
      "Whoops! Could not delete the hotel booking. Please try again.";
    dispatch(setAndShowErrorToast(errorMessage));
    dispatch({
      type: GET_HOTEL_BOOKINGS,
      payload: oldState,
    });
  }
};

export default deleteHotelBooking;
