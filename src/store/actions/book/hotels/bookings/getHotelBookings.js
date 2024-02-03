import _ from "lodash";
import { db } from "../../../../../handlers/firebaseClient";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import setAndShowErrorToast from "../../../config/toast/setAndShowErrorToast";
import { GET_HOTEL_BOOKINGS } from "../../../../actionTypes/book";

const getHotelBookings = () => async (dispatch, getState) => {
  const uid = getState().auth.user.uid;

  try {
    const bookingsCollection = collection(
      db,
      "book",
      uid,
      "hotels",
      uid,
      "bookings"
    );

    const bookingsQuery = query(
      bookingsCollection,
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(bookingsQuery);

    const hotelBookings = {};

    querySnapshot.forEach((doc) => {
      const bookingData = doc.data();
      hotelBookings[bookingData.id] = bookingData;
    });

    dispatch({
      type: GET_HOTEL_BOOKINGS,
      payload: hotelBookings,
    });
  } catch (err) {
    console.log("error", err);
    const errorMessage = `Whoops! Could not fetch the Hotel Bookings`;
    dispatch(setAndShowErrorToast(errorMessage));
  }
};

export default getHotelBookings;
