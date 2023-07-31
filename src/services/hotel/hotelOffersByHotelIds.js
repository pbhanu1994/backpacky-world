import { amadeusApiUrl } from "../../config/apiConfig";
import { setAuthorizationHeader, get } from "../../helpers/http";
import { getAccessToken } from "../auth/amadeusAuth";
import setAndShowErrorToast from "../../store/actions/config/toast/setAndShowErrorToast";

// Function to get a hotel offers by Hotel Ids
export const getHotelOffersByHotelIds = async (
  dispatch,
  hotelIds,
  adults = 1,
  checkInDate,
  checkOutDate,
  roomQuantity = 1
) => {
  const accessToken = await getAccessToken();

  const apiEndpoint = `${amadeusApiUrl}/v3/shopping/hotel-offers`;
  const params = {
    hotelIds, // List of HotelIds ["XXXXXXX", "XXXXXXX"]
    adults,
    checkInDate, // Example : 2023-11-22
    checkOutDate, // Example : 2023-12-18
    roomQuantity, // Number of rooms requested (1-9).
  };

  setAuthorizationHeader(accessToken);
  try {
    const hotelOffersData = await get(apiEndpoint, params);
    return hotelOffersData;
  } catch (err) {
    console.error("Error occurred:", err.message);
    dispatch(setAndShowErrorToast(err.message));
    return "error";
  }
};
