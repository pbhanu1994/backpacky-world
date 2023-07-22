import { http } from "../../helpers/http";
import { getAccessToken } from "../auth/amadeusAuth";

// Function to perform a flight search
export const performFlightSearch = async (
  origin,
  destination,
  departureDate,
  adults = 1
) => {
  const accessToken = await getAccessToken();

  const apiEndpoint = "https://test.api.amadeus.com/v2/shopping/flight-offers";
  const params = {
    origin,
    destination,
    departureDate,
    adults, // Number of adults (you can change this as needed)
  };
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const { data: flightSearchData } = await http.get(apiEndpoint, {
      headers,
      params,
    });
    return flightSearchData;
  } catch (error) {
    console.error("Error occurred:", error.message);
    return null;
  }
};

export { performFlightSearch };
