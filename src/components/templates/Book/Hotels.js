import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Container, Grid, Typography } from "@mui/material";
import Page from "../../atoms/Page";
import DashboardLayout from "./../../layouts/dashboard";
import HotelCard from "../../templates/Book/HotelCard";
import HotelCardSkeleton from "./HotelCardSkeleton";
import HeaderBreadcrumbs from "../../atoms/HeaderBreadCrumbs";
import useSettings from "../../../hooks/useSettings";
import { SearchHotelsFilters } from "./SearchHotelsFilters";
import { PAGE_PATH } from "../../../constants/navigationConstants";
import { isEmptyObject } from "../../../utils/objectUtils";
import { performHotelSearchByCity } from "../../../services/hotel/hotelsByCity";
import { getHotelOffersByHotelIds } from "../../../services/hotel/hotelOffersByHotelIds";

const Hotels = ({ pageTitle }) => {
  const [hotelOffers, setHotelOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSearchForm, setShowSearchForm] = useState(false);

  const { query } = useRouter();
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();

  const heading = "Hotels";

  const { destination, checkInDate, checkOutDate, numRooms, numGuests } = query;

  console.log("router", {
    destination,
    checkInDate,
    checkOutDate,
    numRooms,
    numGuests,
  });

  useEffect(() => {
    if (!isEmptyObject(query)) {
      const performSearch = async () => {
        setLoading(true);
        setError(null);

        try {
          const cityCode = "LON"; // Replace with your desired city code

          const { data: hotelsResult } = await performHotelSearchByCity(
            dispatch,
            cityCode
          );

          const hotelIds = ["MCLONGHM"]; // TODO: Remove in Production
          const { data: hotelOffersResult } = await getHotelOffersByHotelIds(
            dispatch,
            hotelIds.splice(0, 10), // TODO: Remove in Production
            numGuests,
            checkInDate,
            checkOutDate,
            numRooms
          );

          setHotelOffers(hotelOffersResult);
        } catch (err) {
          console.error("API call error:", err);
          setError("An error occurred, please try again later.");
        } finally {
          setLoading(false);
        }
      };

      performSearch();
    }
  }, [query]);

  const toggleSearchForm = () => {
    setShowSearchForm(!showSearchForm);
  };

  return (
    <DashboardLayout>
      <Page title={pageTitle}>
        <Container maxWidth={themeStretch ? false : "lg"}>
          <HeaderBreadcrumbs
            heading={heading}
            links={[{ name: "Book", href: PAGE_PATH.BOOK }, { name: heading }]}
          />
          <SearchHotelsFilters
            showSearchForm={showSearchForm}
            onToggleSearchForm={toggleSearchForm}
            {...query}
          />
          <Grid sx={{ my: 2 }}>
            <Typography variant="h3">Hotels for {destination}</Typography>
            {error ? (
              <Typography variant="body1" color="error">
                {error}
              </Typography>
            ) : loading ? (
              <>
                {[1, 2, 3].map((num) => (
                  <HotelCardSkeleton key={num} />
                ))}
              </>
            ) : (
              <>
                {hotelOffers.map((offer) => (
                  <HotelCard offer={offer} key={offer.id} />
                ))}
                {hotelOffers.length === 0 && (
                  <Typography variant="body1">
                    No hotels were found for the specified filters. Please try
                    using different filters.
                  </Typography>
                )}
              </>
            )}
          </Grid>
        </Container>
      </Page>
    </DashboardLayout>
  );
};

export default Hotels;
