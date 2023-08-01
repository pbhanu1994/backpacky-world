import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import HotelCard from "./HotelCard";
import { performHotelSearchByCity } from "../../../services/hotel/hotelsByCity";

export const Hotels = () => {
  const [hotelSearchResult, setHotelSearchResult] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    // Perform the hotel search when the component mounts
    const performSearch = async () => {
      const cityCode = "LON"; // Replace with your desired city code

      const { data: hotelsResult, meta } = await performHotelSearchByCity(
        dispatch,
        cityCode
      );
      setHotelSearchResult({ hotels: hotelsResult, meta });
    };

    performSearch();
  }, []);

  return (
    <div>
      <h1>Hotel Search Results:</h1>
      {hotelSearchResult ? (
        hotelSearchResult.hotels.map((hotel) => <HotelCard hotel={hotel} />)
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
