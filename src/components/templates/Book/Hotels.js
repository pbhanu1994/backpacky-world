import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Container } from "@mui/material";
import Page from "../../atoms/Page";
import DashboardLayout from "./../../layouts/dashboard";
import SearchHotelsForm from "../../templates/Book/SearchHotelsForm";
import HotelCard from "../../templates/Book/HotelCard";
import useSettings from "../../../hooks/useSettings";
import { isEmptyObject } from "../../../utils/objectUtils";
import { performHotelSearchByCity } from "../../../services/hotel/hotelsByCity";
import { getHotelOffersByHotelIds } from "../../../services/hotel/hotelOffersByHotelIds";

const Hotels = ({ pageTitle }) => {
  const [hotelOffers, setHotelOffers] = useState(null);

  const { query } = useRouter();
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();

  const { destination, checkInDate, checkOutDate, numRooms, numGuests } = query;

  console.log("router:", {
    destination,
    checkInDate,
    checkOutDate,
    numRooms,
    numGuests,
  });

  useEffect(() => {
    if (!isEmptyObject(query)) {
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
          hotelIds.splice(0, 10), //TODO: Remove in Production
          numGuests,
          checkInDate,
          checkOutDate,
          numRooms
        );
        setHotelOffers(hotelOffersResult);
      };

      performSearch();
    }
  }, []);

  return (
    <DashboardLayout>
      <Page title={pageTitle}>
        <Container maxWidth={themeStretch ? false : "lg"}>
          <SearchHotelsForm />
          <h1>Hotel Search Results:</h1>
          {hotelOffers && hotelOffers.length > 0 ? (
            hotelOffers.map((offer) => <HotelCard offer={offer} />)
          ) : (
            <p>Loading...</p>
          )}
        </Container>
      </Page>
    </DashboardLayout>
  );
};

export default Hotels;
