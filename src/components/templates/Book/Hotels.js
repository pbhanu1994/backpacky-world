import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Container } from "@mui/material";
import SearchHotelsForm from "./SearchHotelsForm";
import HotelCard from "./HotelCard";
import useSettings from "../../../hooks/useSettings";
import { performHotelSearchByCity } from "../../../services/hotel/hotelsByCity";
import { getHotelOffersByHotelIds } from "../../../services/hotel/hotelOffersByHotelIds";

export const Hotels = () => {
  const [hotelOffers, setHotelOffers] = useState(null);

  const dispatch = useDispatch();
  const { themeStretch } = useSettings();

  useEffect(() => {
    // Perform the hotel search when the component mounts
    const performSearch = async () => {
      const cityCode = "LON"; // Replace with your desired city code

      const { data: hotelsResult, meta } = await performHotelSearchByCity(
        dispatch,
        cityCode
      );
      // const hotelIds = hotelsResult.map(({ hotelId }) => hotelId); //TODO: Uncomment in production
      const hotelIds = ["MCLONGHM"];
      const { data: hotelOffersResult } = await getHotelOffersByHotelIds(
        dispatch,
        hotelIds.splice(0, 10) //TODO: Remove in Production
      );
      setHotelOffers(hotelOffersResult);
    };

    performSearch();
  }, []);

  return (
    <Container maxWidth={themeStretch ? false : "lg"}>
      <SearchHotelsForm />
      <h1>Hotel Search Results:</h1>
      {hotelOffers && hotelOffers.length > 0 ? (
        hotelOffers.map((offer) => <HotelCard offer={offer} />)
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
};
