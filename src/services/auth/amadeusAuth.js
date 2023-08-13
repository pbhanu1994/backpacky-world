import { amadeusApiUrl } from "../../config/apiConfig";
import { setAuthorizationHeader, post } from "../../helpers/http";

const client_id = process.env.NEXT_PUBLIC_AMADEUS_API_KEY;
const client_secret = process.env.NEXT_PUBLIC_AMADEUS_SECRET_KEY;

// Function to get the access token using client credentials
export const getAccessToken = async () => {
  const tokenUrl = `${amadeusApiUrl}/v1/security/oauth2/token`;
  const payload = {
    grant_type: "client_credentials",
    client_id,
    client_secret,
  };

  setAuthorizationHeader(null);
  try {
    const { access_token } = await post(tokenUrl, payload);
    return access_token;
  } catch (err) {
    throw new Error("Failed to get access token");
  }
};
