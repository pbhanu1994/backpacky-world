import { amadeusApiUrl } from "../../config/apiConfig";
import { setAuthorizationHeader, get } from "../../helpers/http";
import { getAccessToken } from "../auth/amadeusAuth";
import setAndShowErrorToast from "../../store/actions/config/toast/setAndShowErrorToast";

// Function to perform a flight search
export const performFlightOffersSearch = async (
  dispatch,
  originLocationCode,
  destinationLocationCode,
  departureDate,
  returnDate,
  adults = 1,
  children = 0,
  infants = 0,
  travelClass,
  max = 250 //Max flight offers (we could go max (default) of 250 flight offers)
) => {
  const accessToken = await getAccessToken();

  const apiEndpoint = `${amadeusApiUrl}/v2/shopping/flight-offers`;
  const params = {
    originLocationCode,
    destinationLocationCode,
    departureDate,
    returnDate,
    adults,
    children,
    infants,
    travelClass,
    max,
  };

  setAuthorizationHeader(accessToken);
  try {
    const flightSearchData = await get(apiEndpoint, params);
    return flightSearchData;
  } catch (err) {
    console.error("Error occurred:", err.message);
    dispatch(setAndShowErrorToast(err.message));
    throw err;
  }
};
