import { amadeusApiUrl } from "../config/amadeusApiConfig";
import { setAuthorizationHeader, get } from "../../helpers/http";
import { getAccessToken } from "../auth/amadeusAuth";
import setAndShowErrorToast from "../../store/actions/config/toast/setAndShowErrorToast";

// Function to perform a hotel search
export const performHotelSearchByCity = async (
  dispatch,
  cityCode,
  radius = 5
) => {
  const accessToken = await getAccessToken();

  const apiEndpoint = `https://${amadeusApiUrl}/v1/reference-data/locations/hotels/by-city`;
  const params = {
    cityCode,
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
