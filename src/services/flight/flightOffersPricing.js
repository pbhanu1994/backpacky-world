import { amadeusApiUrl } from "../../config/apiConfig";
import { setAuthorizationHeader, post } from "../../helpers/http";
import { getAccessToken } from "../auth/amadeusAuth";
import setAndShowErrorToast from "../../store/actions/config/toast/setAndShowErrorToast";

// Function to perform Flight Offers Pricing (Updated Price for Flight Offer)
export const performFlightOffersPricing = async (
  dispatch,
  flightOffersData
) => {
  const accessToken = await getAccessToken();

  const apiEndpoint = `${amadeusApiUrl}/v1/shopping/flight-offers/pricing`;
  //   const payload = {
  //     data: {
  //       type: "flight-offers-pricing",
  //       flightOffers: [{}, {}],
  //     },
  //   }
  setAuthorizationHeader(accessToken);
  try {
    const flightOffersPricingResult = await post(apiEndpoint, flightOffersData);
    return flightOffersPricingResult;
  } catch (err) {
    console.error("Error occurred:", err.message);
    dispatch(setAndShowErrorToast(err.message));
    throw err;
  }
};
