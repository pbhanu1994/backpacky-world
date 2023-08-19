import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end(); // Method Not Allowed
  }

  // Google Places API key
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

  // The query parameter for the Google Places API autocomplete request
  const { input, cities } = req.query;

  // Set the types based on the "cities" parameter
  let types = "";

  if (cities === "true") {
    types = "(cities)";
  }

  // Google Places API endpoint for autocomplete
  const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${API_KEY}&input=${encodeURIComponent(
    input
  )}&types=${encodeURIComponent(types)}`;

  try {
    // Fetch data from Google Places API using Axios
    const response = await axios.get(apiUrl);

    if (!response.data) {
      throw new Error("Google Places API request failed.");
    }

    return res.status(200).json(response.data.predictions);
  } catch (error) {
    console.error("Error fetching data from Google Places API:", error.message);
    return res.status(500).end(); // Internal Server Error
  }
}
