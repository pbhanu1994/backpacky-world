import { db } from "../../../../../handlers/firebaseClient";
import { collection, addDoc } from "firebase/firestore";
import setAndShowErrorToast from "../../../config/toast/setAndShowErrorToast";

const sendHotelBookingConfirmationEmail =
  (reference, emailBodyHTMLContent, guest, downloadUrl) => async (dispatch) => {
    // const uid = getState().auth.user.uid;
    try {
      //Temp
      // const sampleHtml = Array.from(
      //   { length: 2 },
      //   (_, index) => `<div class="important-info">
      //         <h2>Important Information:</h2>
      //           <ol>
      //               <li><strong>Check-in Time:</strong> ${`Hotel Check-in: ${
      //                 index + 1
      //               }`}</li>
      //               <li><strong>Check-out Time:</strong> ${`Hotel Check-Out: ${
      //                 index + 2
      //               }`}</li>
      //               <li><strong>Cancellation Policy:</strong> ${`Hotel Cancellation: ${
      //                 index + 3
      //               }`}</li>
      //               <li><strong>Payment Method:</strong> ${`Hotel Payyment: ${
      //                 index + 4
      //               }`}</li>
      //           </ol>
      //       </div>`
      // ).join("\n");
      /* Normal - WORKS! */
      const emailData = {
        to: [guest.contact.email],
        message: {
          subject: `Your Hotel Booking Confirmation - REF #${reference}`,
          html: emailBodyHTMLContent,
          attachments: [
            {
              filename: `Booking_Confirmation-REF_#${reference}.pdf`,
              path: downloadUrl,
            },
          ],
        },
      };
      /* Templates EXAMPLE*/
      // const emailData = {
      //   to: ["pbhanu.1994@gmail.com", "pbhanu.1994@ymail.com"],
      //   template: {
      //     name: "monthly_invoice",
      //     data: {
      //       amount: 200,
      //       invoice_link: downloadUrl,
      //     },
      //   },
      // };
      addDoc(collection(db, "mail"), emailData);
    } catch (err) {
      console.log("error", err);
      const errorMessage = `Whoops! Could not send the Hotel Booking Confirmation email. Please try again.`;
      dispatch(setAndShowErrorToast(errorMessage));
    }
  };

export default sendHotelBookingConfirmationEmail;
