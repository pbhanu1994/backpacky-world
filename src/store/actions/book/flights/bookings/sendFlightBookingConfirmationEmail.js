import { db } from "../../../../../handlers/firebaseClient";
import { addDoc, collection } from "firebase/firestore";
import setAndShowErrorToast from "../../../config/toast/setAndShowErrorToast";

const sendFlightBookingConfirmationEmail =
  (reference, emailBodyHTMLContent, traveler, downloadUrl) =>
  async (dispatch) => {
    try {
      /* Template */
      const emailData = {
        to: [traveler.contact.emailAddress],
        template: {
          name: "flightBookingConfirmation",
          data: {
            html: emailBodyHTMLContent,
            reference,
            downloadUrl,
          },
        },
      };
      addDoc(collection(db, "mail"), emailData);
    } catch (err) {
      console.error("error", err);
      const errorMessage = `Whoops! Could not send the Flight Booking Confirmation email. Please try again.`;
      dispatch(setAndShowErrorToast(errorMessage));
    }
  };

export default sendFlightBookingConfirmationEmail;
