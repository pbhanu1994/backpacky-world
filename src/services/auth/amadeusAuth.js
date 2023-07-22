import { http } from "../../helpers/http";

const client_id = process.env.AMADEUS_API_KEY;
const client_secret = process.env.AMEDEUS_SECRET_KEY;

// Function to get the access token using client credentials
export const getAccessToken = async () => {
  const tokenUrl = "https://test.api.amadeus.com/v1/security/oauth2/token";
  const payload = {
    grant_type: "client_credentials",
    client_id,
    client_secret,
  };

  try {
    const response = await http.post(tokenUrl, payload);
    return response.data.access_token;
  } catch (error) {
    throw new Error("Failed to get access token");
  }
};
