import { amadeusApiUrl } from "../../config/apiConfig";
import { setAuthorizationHeader, get } from "../../helpers/http";
import { getAccessToken } from "../auth/amadeusAuth";
import setAndShowErrorToast from "../../store/actions/config/toast/setAndShowErrorToast";

// Function to perform a city / airport search which gives IATA codes
export const getCityAirportDetails = async (
  dispatch,
  keyword,
  city = false,
  airport = false
) => {
  const accessToken = await getAccessToken();

  const apiEndpoint = `${amadeusApiUrl}/v1/reference-data/locations`;

  const subTypeCheck =
    city && airport ? "CITY,AIRPORT" : city ? "CITY" : airport ? "AIRPORT" : "";

  const params = {
    subType: subTypeCheck,
    keyword,
  };

  setAuthorizationHeader(accessToken);
  try {
    const { data: cityIataSearchResults } = await get(apiEndpoint, params);
    return cityIataSearchResults;
  } catch (err) {
    console.error("Error occurred:", err.message);
    dispatch(setAndShowErrorToast(err.message));
    throw err;
  }
};
