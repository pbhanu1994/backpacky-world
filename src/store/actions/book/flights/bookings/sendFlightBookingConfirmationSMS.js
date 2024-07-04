import { db } from "../../../../../handlers/firebaseClient";
import { addDoc, collection } from "firebase/firestore";
import setAndShowErrorToast from "../../../config/toast/setAndShowErrorToast";

const sendFlightBookingConfirmationSMS =
  (phoneNumber, SMSBodyContent, downloadUrl) => async (dispatch) => {
    try {
      const SMSData = {
        to: phoneNumber,
        body: SMSBodyContent,
        //mediaUrl is also an Array (if there are Multiple docs/items)
        mediaUrl: downloadUrl,
      };
      addDoc(collection(db, "messages"), SMSData);
    } catch (err) {
      console.error("error", err);
      const errorMessage = `Whoops! Could not send the Flight Booking Confirmation SMS. Please try again.`;
      dispatch(setAndShowErrorToast(errorMessage));
    }
  };

export default sendFlightBookingConfirmationSMS;
