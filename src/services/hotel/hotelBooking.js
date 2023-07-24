import { setAuthorizationHeader, post } from "../../helpers/http";
import { getAccessToken } from "../auth/amadeusAuth";
import setAndShowErrorToast from "../../store/actions/config/toast/setAndShowErrorToast";

// Function to perform hotel booking
export const performHotelBooking = async (
  dispatch,
  offerId,
  guests,
  payments
) => {
  const accessToken = await getAccessToken();

  const apiEndpoint = "https://test.api.amadeus.com/v1/booking/hotel-bookings";
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
