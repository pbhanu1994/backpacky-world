import _ from "lodash";
import { db } from "../../../../../handlers/firebaseClient";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import setAndShowErrorToast from "../../../config/toast/setAndShowErrorToast";
import { GET_FLIGHT_BOOKINGS } from "../../../../actionTypes/book";

const getFlightBookings = () => async (dispatch, getState) => {
  const uid = getState().auth.user.uid;

  try {
    const bookingsCollection = collection(
      db,
      "book",
      uid,
      "flights",
      uid,
      "bookings"
    );

    const bookingsQuery = query(
      bookingsCollection,
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(bookingsQuery);

    const flightBookings = {};

    querySnapshot.forEach((doc) => {
      const bookingData = doc.data();
      flightBookings[bookingData.id] = bookingData;
    });

    dispatch({
      type: GET_FLIGHT_BOOKINGS,
      payload: flightBookings,
    });
  } catch (err) {
    console.error("error", err);
    const errorMessage = `Whoops! Could not fetch the Flight Bookings`;
    dispatch(setAndShowErrorToast(errorMessage));
  }
};

export default getFlightBookings;
