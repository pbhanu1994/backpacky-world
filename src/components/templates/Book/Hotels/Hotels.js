import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import {
  Container,
  Grid,
  Typography,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Page from "../../../atoms/Page";
import HeaderBreadcrumbs from "../../../atoms/HeaderBreadCrumbs";
import DashboardLayout from "../../../layouts/dashboard";
import HotelCard from "./HotelCard";
import { SearchHotelsFilters } from "./SearchHotelsFilters";
import HotelCardSkeleton from "./HotelCardSkeleton";
import useSettings from "../../../../hooks/useSettings";
import { LOADING_STATES } from "../../../../constants/loadingStates";
import { PAGE_PATH } from "../../../../constants/navigationConstants";
import updateSelectedHotel from "../../../../store/actions/book/hotels/updateSelectedHotel";
import { performHotelSearchByCity } from "../../../../services/hotel/hotelsByCity";
import { getHotelOffersByHotelIds } from "../../../../services/hotel/hotelOffersByHotelIds";

const Hotels = ({ pageTitle }) => {
  const [allHotelIds, setAllHotelIds] = useState([]);
  const [hotelOffers, setHotelOffers] = useState([]);
  const [loadingState, setLoadingState] = useState(LOADING_STATES.INITIAL);
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const cityCode = useSelector(
    (state) => state.book.hotels.destination.iataCode
  );

  const router = useRouter();
  const dispatch = useDispatch();
  const { themeStretch } = useSettings();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { query } = router;

  const heading = "Hotels";

  const errorMessage = "An error occurred, please try again later.";

  const { destination, checkInDate, checkOutDate, numRooms, numGuests } = query;

  useEffect(() => {
    const performSearch = async () => {
      setLoadingState(LOADING_STATES.LOADING);
      setHotelOffers([]);
      setAllHotelIds([]);
      setCurrentPage(1);

      try {
        const { data: hotelsResult } = await performHotelSearchByCity(
          dispatch,
          cityCode
        );

        const hotelIds = hotelsResult.map((hotel) => hotel.hotelId); // Hotel Ids with more than 900 results
        setAllHotelIds(hotelIds);
        setTotalPages(Math.ceil(hotelIds.length / 50));
        loadMoreHotels(1, hotelIds);
      } catch (err) {
        console.error("API call error:", err);
        setLoadingState(LOADING_STATES.ERROR);
      }
    };

    if (!_.isEmpty(query)) {
      performSearch();
    }
  }, [query]);

  const loadMoreHotels = async (page, hotelIds) => {
    setLoadingState(LOADING_STATES.LOADING);
    const startIndex = (page - 1) * 50;
    const endIndex = page * 50;

    try {
      const { data: hotelOffersResult } = await getHotelOffersByHotelIds(
        dispatch,
        hotelIds.slice(startIndex, endIndex),
        numGuests,
        checkInDate,
        checkOutDate,
        numRooms
      );
      setHotelOffers((prevOffers) => [...prevOffers, ...hotelOffersResult]);

      if (hotelOffersResult.length > 0) {
        setLoadingState(LOADING_STATES.LOADED);
      } else {
        setLoadingState(LOADING_STATES.NO_RESULTS);
      }
    } catch (err) {
      console.error("API call error:", err);
      setLoadingState(LOADING_STATES.ERROR);
    }
  };

  const handleLoadMoreHotels = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    loadMoreHotels(nextPage, allHotelIds);
  };

  const handleToggleSearchForm = () => {
    setShowSearchForm(!showSearchForm);
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

  const renderSkeletonLoading = () => {
    const SKELETON_LOADING_COUNT = 3;

    return Array.from({ length: SKELETON_LOADING_COUNT }, (_, index) => (
      <HotelCardSkeleton key={index} />
    ));
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
            loading={loadingState === LOADING_STATES.LOADING}
            showSearchForm={showSearchForm}
            onToggleSearchForm={handleToggleSearchForm}
            {...query}
          />
          <Grid sx={{ my: 2 }}>
            <Typography variant="h3" sx={{ mb: 2, fontWeight: 100 }}>
              Hotels for{" "}
              <Typography
                component="span"
                variant="h3"
                sx={{ fontWeight: "bold", color: "primary.main" }}
              >
                {destination}
              </Typography>
            </Typography>
            {loadingState === LOADING_STATES.ERROR && (
              <Typography variant="body1" color="error">
                {errorMessage}
              </Typography>
            )}
            {hotelOffers.map((offer) => (
              <HotelCard
                key={offer.id}
                offer={offer}
                onSelectedHotel={handleSelectedHotel}
              />
            ))}
            {loadingState === LOADING_STATES.NO_RESULTS && (
              <Typography variant="body1">
                No hotels were found for the specified filters. Please try using
                different filters.
              </Typography>
            )}
            {loadingState === LOADING_STATES.LOADING && renderSkeletonLoading()}
          </Grid>
          {currentPage < totalPages &&
            loadingState !== LOADING_STATES.LOADING && (
              <Grid container xs={12} justifyContent="center">
                <Button
                  variant="outlined"
                  color="primary"
                  size={isMobile ? "large" : "medium"}
                  fullWidth={isMobile}
                  onClick={handleLoadMoreHotels}
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
