import { db } from "../../../../../handlers/firebaseClient";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import {
  GET_HOTEL_BOOKINGS,
  ADD_HOTEL_BOOKING,
} from "../../../../actionTypes/book";
import setAndShowErrorToast from "../../../config/toast/setAndShowErrorToast";

const addHotelBooking = (bookingInfo) => async (dispatch, getState) => {
  const uid = getState().auth.user.uid;
  const oldState = getState().book.hotels.bookings;

  const bookingData = { uid, createdAt: serverTimestamp(), ...bookingInfo };

  try {
    dispatch({
      type: ADD_HOTEL_BOOKING,
      payload: bookingData,
    });

    setDoc(
      doc(db, "book", uid, "hotels", uid, "bookings", bookingData.id),
      bookingData
    );
  } catch (err) {
    console.log("error", err);
    const errorMessage = `Whoops! Could not add the Hotel Booking Info. Please try again.`;
    dispatch(setAndShowErrorToast(errorMessage));
    dispatch({
      type: GET_HOTEL_BOOKINGS,
      payload: oldState,
    });
  }
};

export default addHotelBooking;
