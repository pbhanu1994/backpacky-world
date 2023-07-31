import { amadeusApiUrl } from "../../config/apiConfig";
import { setAuthorizationHeader, get } from "../../helpers/http";
import { getAccessToken } from "../auth/amadeusAuth";
import setAndShowErrorToast from "../../store/actions/config/toast/setAndShowErrorToast";

// Function to perform a hotel search
export const performHotelSearchByGeoCode = async (
  dispatch,
  latitude,
  longitude,
  radius = 5
) => {
  const accessToken = await getAccessToken();

  const apiEndpoint = `${amadeusApiUrl}/v1/reference-data/locations/hotels/by-geocode`;
  const params = {
    latitude,
    longitude,
    radius,
  };

  setAuthorizationHeader(accessToken);
  try {
    const hotelSearchData = await get(apiEndpoint, params);
    return hotelSearchData;
  } catch (err) {
    console.error("Error occurred:", err.message);
    dispatch(setAndShowErrorToast(err.message));
    return "error";
  }
};
