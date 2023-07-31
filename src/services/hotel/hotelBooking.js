import { amadeusApiUrl } from "../../config/apiConfig";
import { setAuthorizationHeader, post } from "../../helpers/http";
import { getAccessToken } from "../auth/amadeusAuth";
import setAndShowErrorToast from "../../store/actions/config/toast/setAndShowErrorToast";

// Function to perform hotel booking
export const performHotelBooking = async (
  dispatch,
  offerId,
  guests,
  payments,
  rooms
) => {
  const accessToken = await getAccessToken();

  const apiEndpoint = `${amadeusApiUrl}/v1/booking/hotel-bookings`;
  const payload = {
    data: {
      offerId: "NRPQNQBOJM",
      guests: [
        {
          name: {
            title: "MR",
            firstName: "BOB",
            lastName: "SMITH",
          },
          contact: {
            phone: "+33679278416",
            email: "bob.smith@email.com",
          },
        },
      ],
      // Payment will not be made in most cases, but do pass accurate payment info
      payments: [
        {
          method: "creditCard",
          card: {
            vendorCode: "VI", //VISA, CA- MasterCard, etc. (refer documentation for more..)
            cardNumber: "0000000000000000",
            expiryDate: "2026-01",
          },
        },
      ],
      // Optional:
      rooms: [
        {
          guestIds: [null], // List of Ids, e.g: 1
          paymentId: null, //e.g: 1
          specialRequest: "", // e.g: "I will arrive at midnight"
        },
      ],
    },
  };

  setAuthorizationHeader(accessToken);
  try {
    const { access_token } = await post(apiEndpoint, payload);
    return access_token;
  } catch (error) {
    console.error("Error occurred:", err.message);
    dispatch(setAndShowErrorToast(err.message));
    return "error";
  }
};
