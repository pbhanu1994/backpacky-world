import { setAuthorizationHeader, get } from "../../helpers/http";
import { getAccessToken } from "../auth/amadeusAuth";
import setAndShowErrorToast from "../../store/actions/config/toast/setAndShowErrorToast";

// Function to perform a flight search
export const performFlightSearch = async (
  dispatch,
  originLocationCode,
  destinationLocationCode,
  departureDate,
  adults = 1
) => {
  const accessToken = await getAccessToken();

  const apiEndpoint = "https://test.api.amadeus.com/v2/shopping/flight-offers";
  const params = {
    originLocationCode,
    destinationLocationCode,
    departureDate,
    adults,
  };

  setAuthorizationHeader(accessToken);
  try {
    const flightSearchData = await get(apiEndpoint, params);
    return flightSearchData;
  } catch (err) {
    console.error("Error occurred:", err.message);
    dispatch(setAndShowErrorToast(err.message));
    return "error";
  }
};
