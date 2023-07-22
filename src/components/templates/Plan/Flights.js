import React, { useEffect, useState } from "react";
import { performFlightSearch } from "../../../services/flight/flightSearch";

const Flights = () => {
  const [flightSearchResult, setFlightSearchResult] = useState(null);

  useEffect(() => {
    // Perform the flight search when the component mounts
    const performSearch = async () => {
      const origin = "JFK"; // Replace with your desired origin airport code
      const destination = "LAX"; // Replace with your desired destination airport code
      const departureDate = "2023-08-01"; // Replace with your desired departure date

      const result = await performFlightSearch(
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

export default Flights;
