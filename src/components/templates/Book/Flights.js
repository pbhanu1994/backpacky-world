import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { performFlightOffersSearch } from "../../../services/flight/flightOffers";

export const Flights = () => {
  const [flightSearchResult, setFlightSearchResult] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    // Perform the flight search when the component mounts
    const performSearch = async () => {
      const origin = "JFK"; // Replace with your desired origin airport code
      const destination = "LAX"; // Replace with your desired destination airport code
      const departureDate = "2023-08-30"; // Replace with your desired departure date

      const result = await performFlightOffersSearch(
        dispatch,
        origin,
        destination,
        departureDate
      );
      setFlightSearchResult(result);
    };

    performSearch();
  }, []);

  return (
    <div>
      <h1>Flight Search Results:</h1>
      {flightSearchResult ? (
        <pre>{JSON.stringify(flightSearchResult, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
