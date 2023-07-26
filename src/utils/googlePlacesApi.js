const fetchPlacesAutocomplete = async (input) => {
  try {
    const response = await fetch(
      `/api/places-autocomplete?input=${encodeURIComponent(input)}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data from Google Places API");
    }

    const predictions = await response.json();

    return predictions.map((prediction) => ({
      name: prediction.description,
      placeId: prediction.place_id,
    }));
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return [];
  }
};

export default fetchPlacesAutocomplete;
