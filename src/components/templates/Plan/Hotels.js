import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { performHotelSearchByCity } from "../../../services/hotel/hotelsByCity";

export const Hotels = () => {
  const [hotelSearchResult, setHotelSearchResult] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    // Perform the hotel search when the component mounts
    const performSearch = async () => {
      const cityCode = "LON"; // Replace with your desired city code

      const result = await performHotelSearchByCity(dispatch, cityCode);
      setHotelSearchResult(result);
    };

    performSearch();
  }, []);

  return (
    <div>
      <h1>Hotel Search Results:</h1>
      {hotelSearchResult ? (
        <pre>{JSON.stringify(hotelSearchResult, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
