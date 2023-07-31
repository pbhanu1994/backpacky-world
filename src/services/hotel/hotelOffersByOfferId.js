import { amadeusApiUrl } from "../../config/apiConfig";
import { setAuthorizationHeader, get } from "../../helpers/http";
import { getAccessToken } from "../auth/amadeusAuth";
import setAndShowErrorToast from "../../store/actions/config/toast/setAndShowErrorToast";

// Function to get a hotel offers by Offer Id
export const getHotelOffersByOfferId = async (
  dispatch,
  offerId,
  language = null // Language - FR , fr , fr-FR., if language is not available the text will be returned in english.
) => {
  const accessToken = await getAccessToken();

  const apiEndpoint = `${amadeusApiUrl}/v3/shopping/hotel-offers`;
  const params = {
    offerId,
    lang: language,
  };

  setAuthorizationHeader(accessToken);
  try {
    const hotelOfferData = await get(apiEndpoint, params);
    return hotelOfferData;
  } catch (err) {
    console.error("Error occurred:", err.message);
    dispatch(setAndShowErrorToast(err.message));
    return "error";
  }
};
