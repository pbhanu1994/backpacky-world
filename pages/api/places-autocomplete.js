import fetch from "isomorphic-unfetch";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end(); // Method Not Allowed
  }

  // Google Places API key
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

  // The query parameter for the Google Places API autocomplete request
  const { input } = req.query;

  // Google Places API endpoint for autocomplete
  const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${API_KEY}&input=${encodeURIComponent(
    input
  )}`;

  try {
    // Fetch data from Google Places API
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Google Places API request failed.");
    }

    const data = await response.json();
    return res.status(200).json(data.predictions);
  } catch (error) {
    console.error("Error fetching data from Google Places API:", error.message);
    return res.status(500).end(); // Internal Server Error
  }
}
