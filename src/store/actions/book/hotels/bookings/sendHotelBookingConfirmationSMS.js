import { db } from "../../../../../handlers/firebaseClient";
import { addDoc, collection } from "firebase/firestore";
import setAndShowErrorToast from "../../../config/toast/setAndShowErrorToast";

const sendHotelBookingConfirmationSMS =
  (phoneNumber, SMSBodyContent, downloadUrl) => async (dispatch) => {
    try {
      const SMSData = {
        to: phoneNumber,
        body: SMSBodyContent,
        mediaUrl: downloadUrl,
      };
      addDoc(collection(db, "messages"), SMSData);
    } catch (err) {
      console.log("error", err);
      const errorMessage = `Whoops! Could not send the Hotel Booking Confirmation SMS. Please try again.`;
      dispatch(setAndShowErrorToast(errorMessage));
    }
  };

export default sendHotelBookingConfirmationSMS;
