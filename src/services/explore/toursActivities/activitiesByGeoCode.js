import { amadeusApiUrl } from "../../../config/apiConfig";
import { setAuthorizationHeader, get } from "../../../helpers/http";
import { getAccessToken } from "../../auth/amadeusAuth";
import setAndShowErrorToast from "../../../store/actions/config/toast/setAndShowErrorToast";

// Function to get activities by location geocode
export const performActivitiesSearchByGeoCode = async (
  dispatch,
  latitude,
  longitude,
  radius = 1 // 1 is default
) => {
  const accessToken = await getAccessToken();

  const apiEndpoint = `${amadeusApiUrl}/v1/shopping/activities`;
  const params = {
    latitude,
    longitude,
    radius,
  };

  setAuthorizationHeader(accessToken);
  try {
    const activitiesData = await get(apiEndpoint, params);
    return activitiesData;
  } catch (err) {
    console.error("Error occurred:", err.message);
    dispatch(setAndShowErrorToast(err.message));
    throw err;
  }
};
