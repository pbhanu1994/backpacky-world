import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Container, Grid, Typography, Button } from "@mui/material";
import Page from "../../atoms/Page";
import DashboardLayout from "./../../layouts/dashboard";
import HotelCard from "../../templates/Book/HotelCard";
import HotelCardSkeleton from "./HotelCardSkeleton";
import HeaderBreadcrumbs from "../../atoms/HeaderBreadCrumbs";
import useSettings from "../../../hooks/useSettings";
import { SearchHotelsFilters } from "./SearchHotelsFilters";
import { PAGE_PATH } from "../../../constants/navigationConstants";
import { isEmptyObject } from "../../../utils/objectUtils";
import updateSelectedHotel from "../../../store/actions/book/hotels/updateSelectedHotel";
import { performHotelSearchByCity } from "../../../services/hotel/hotelsByCity";
import { getHotelOffersByHotelIds } from "../../../services/hotel/hotelOffersByHotelIds";

const Hotels = ({ pageTitle }) => {
  const [hotelOffers, setHotelOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const router = useRouter();
  const dispatch = useDispatch();
  const { themeStretch } = useSettings();

  const { query } = router;

  const heading = "Hotels";

  const { destination, checkInDate, checkOutDate, numRooms, numGuests } = query;

  console.log("router", {
    destination,
    checkInDate,
    checkOutDate,
    numRooms,
    numGuests,
  });

  // Resetting when the query changes
  useEffect(() => {
    setHotelOffers([]);
    setCurrentPage(1);
  }, [query]);

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

          const hotelIds = hotelsResult.map((hotel) => hotel.hotelId); // Hotel Ids with more than 900 results

          const { data: hotelOffersResult } = await getHotelOffersByHotelIds(
            dispatch,
            hotelIds.slice((currentPage - 1) * 100, currentPage * 100), // Update to load next 100
            numGuests,
            checkInDate,
            checkOutDate,
            numRooms
          );

          setHotelOffers((prevOffers) => [...prevOffers, ...hotelOffersResult]);
          setTotalPages(Math.ceil(hotelIds.length / 100)); // Calculate total pages
        } catch (err) {
          console.error("API call error:", err);
          setError("An error occurred, please try again later.");
        } finally {
          setLoading(false);
        }
      };

      performSearch();
    }
  }, [query, currentPage]);

  const handleToggleSearchForm = () => {
    setShowSearchForm(!showSearchForm);
  };

  // Function to load more hotels
  const loadMoreHotels = () => {
    setLoading(true);
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleSelectedHotel = (hotelOffer) => {
    const {
      hotel,
      offers: [firstOffer],
    } = hotelOffer;
    dispatch(updateSelectedHotel(hotel));
    router.push(`${PAGE_PATH.BOOK_HOTELS}${firstOffer.id}`);
    window.sessionStorage.setItem("canGoBack", true);
  };

  return (
    <DashboardLayout>
      <Page title={pageTitle}>
        <Container maxWidth={themeStretch ? false : "lg"}>
          <HeaderBreadcrumbs
            heading={heading}
            links={[
              {
                name: "Book",
                href: PAGE_PATH.BOOK,
                query: { currentTab: "Hotels", ...query },
              },
              { name: heading },
            ]}
          />
          <SearchHotelsFilters
            loading={loading}
            showSearchForm={showSearchForm}
            onToggleSearchForm={handleToggleSearchForm}
            {...query}
          />
          <Grid sx={{ my: 2 }}>
            <Typography variant="h3" sx={{ mb: 2 }}>
              Hotels for {destination}
            </Typography>
            {error ? (
              <Typography variant="body1" color="error">
                {error}
              </Typography>
            ) : loading && hotelOffers.length === 0 && currentPage === 1 ? (
              <>
                {[1, 2, 3].map((num) => (
                  <HotelCardSkeleton key={num} />
                ))}
              </>
            ) : (
              <>
                {hotelOffers.map((offer) => (
                  <HotelCard
                    key={offer.id}
                    offer={offer}
                    onSelectedHotel={handleSelectedHotel}
                  />
                ))}
                {hotelOffers.length === 0 && (
                  <Typography variant="body1">
                    No hotels were found for the specified filters. Please try
                    using different filters.
                  </Typography>
                )}
              </>
            )}
            {loading &&
              hotelOffers.length > 0 &&
              currentPage > 1 &&
              [1, 2, 3].map((item) => <HotelCardSkeleton key={item} />)}
          </Grid>
          {currentPage < totalPages && !loading && (
            <Grid container justifyContent="center">
              <Button
                type="button"
                variant="outlined"
                color="primary"
                onClick={loadMoreHotels}
              >
                Show More Hotels
              </Button>
            </Grid>
          )}
        </Container>
      </Page>
    </DashboardLayout>
  );
};

export default Hotels;
