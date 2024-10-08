import { amadeusApiUrl } from "../../config/apiConfig";
import { setAuthorizationHeader, get } from "../../helpers/http";
import { getAccessToken } from "../auth/amadeusAuth";
import setAndShowErrorToast from "../../store/actions/config/toast/setAndShowErrorToast";

// Function to get a hotel offers by Offer Id
export const getHotelOffersByOfferId = async (
  dispatch,
  offerId,
  language = null // Language - FR , fr , fr-FR., default: English
) => {
  const accessToken = await getAccessToken();

  const apiEndpoint = `${amadeusApiUrl}/v3/shopping/hotel-offers/${offerId}`;
  const params = {
    lang: language,
  };

  setAuthorizationHeader(accessToken);
  try {
    const hotelOfferData = await get(apiEndpoint, params);
    return hotelOfferData;
  } catch (err) {
    console.error("Error occurred:", err.message);
    dispatch(setAndShowErrorToast(err.message));
    throw err;
  }
};
