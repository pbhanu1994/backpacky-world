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
import { useTheme } from "@emotion/react";
import Page from "../../../atoms/Page";
import HeaderBreadcrumbs from "../../../atoms/HeaderBreadCrumbs";
import DashboardLayout from "../../../layouts/dashboard";
import FlightCard from "./FlightCard";
import { SearchFlightsFilters } from "./SearchFlightsFilters";
import FlightCardSkeleton from "./FlightCardSkeleton";
import useSettings from "../../../../hooks/useSettings";
import { LOADING_STATES } from "../../../../constants/loadingStates";
import { PAGE_PATH } from "../../../../constants/navigationConstants";
import updateSelectedFlightOffer from "../../../../store/actions/book/flights/updateSelectedFlightOffer";
import { performFlightOffersSearch } from "../../../../services/flight/flightOffers";

const Flights = ({ pageTitle }) => {
  const [flightOffers, setFlightOffers] = useState([]);
  const [flightOffersToShow, setFlightOffersToShow] = useState([]);
  const [loadingState, setLoadingState] = useState(LOADING_STATES.INITIAL);
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fromCityCode = useSelector((state) => state.book.flights.from.iataCode);
  const toCityCode = useSelector((state) => state.book.flights.to.iataCode);

  const router = useRouter();
  const dispatch = useDispatch();
  const { themeStretch } = useSettings();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { query } = router;

  const heading = "Flights";

  const errorMessage = "An error occurred, please try again later.";

  const {
    from,
    to,
    departDate,
    returnDate,
    numAdults,
    numChildren,
    numInfants,
    cabinClass,
    flightType,
  } = query;

  useEffect(() => {
    const performSearch = async () => {
      setLoadingState(LOADING_STATES.LOADING);
      setFlightOffers([]);
      setFlightOffersToShow([]);
      setCurrentPage(1);

      try {
        const { data: flightOffersResult } = await performFlightOffersSearch(
          dispatch,
          fromCityCode,
          toCityCode,
          departDate,
          returnDate,
          numAdults,
          numChildren,
          numInfants,
          cabinClass
        );

        setFlightOffers(flightOffersResult);
        if (flightOffersResult.length > 0) {
          setLoadingState(LOADING_STATES.LOADED);
        } else {
          setLoadingState(LOADING_STATES.NO_RESULTS);
        }

        setTotalPages(Math.ceil(flightOffersResult.length / 10));
        loadMoreFlights(1, flightOffersResult);
      } catch (err) {
        console.error("API call error:", err);
        setLoadingState(LOADING_STATES.ERROR);
      }
    };

    if (!_.isEmpty(query)) {
      performSearch();
    }
  }, [query]);

  // Function to load more flights
  const loadMoreFlights = (page, offers) => {
    const startIndex = (page - 1) * 10;
    const endIndex = page * 10;
    setFlightOffersToShow((prevOffers) => [
      ...prevOffers,
      ...offers.slice(startIndex, endIndex),
    ]);
  };

  const handleLoadMoreFlights = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    loadMoreFlights(nextPage, flightOffers);
  };

  const handleToggleSearchForm = () => {
    setShowSearchForm(!showSearchForm);
  };

  const handleSelectedFlight = (flightOffer) => {
    dispatch(updateSelectedFlightOffer(flightOffer));
    router.push(`${PAGE_PATH.BOOK_FLIGHTS}${flightOffer.id}`);
    window.sessionStorage.setItem("canGoBack", true);
  };

  const renderSkeletonLoading = () => {
    const SKELETON_LOADING_COUNT = 3;

    return Array.from({ length: SKELETON_LOADING_COUNT }, (_, index) => (
      <FlightCardSkeleton key={index} />
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
                query: { currentTab: "Flights", ...query },
              },
              { name: heading },
            ]}
          />
          <SearchFlightsFilters
            loading={loadingState === LOADING_STATES.LOADING}
            flightType={flightType}
            showSearchForm={showSearchForm}
            onToggleSearchForm={handleToggleSearchForm}
            {...query}
          />
          <Grid sx={{ my: 2 }}>
            <Typography variant="h3" sx={{ mb: 2, fontWeight: 100 }}>
              Flights for{" "}
              <Typography
                component="span"
                variant="h3"
                sx={{ fontWeight: "bold", color: "primary.main" }}
              >
                {to}
              </Typography>
            </Typography>
            {loadingState === LOADING_STATES.ERROR && (
              <Typography variant="body1" color="error">
                {errorMessage}
              </Typography>
            )}
            {flightOffersToShow.map((offer) => (
              <FlightCard
                key={offer.id}
                offer={offer}
                onSelectedFlight={handleSelectedFlight}
              />
            ))}
            {loadingState === LOADING_STATES.NO_RESULTS && (
              <Typography variant="body1">
                No flights were found for the specified filters. Please try
                using different filters.
              </Typography>
            )}
            {loadingState === LOADING_STATES.LOADING && renderSkeletonLoading()}
          </Grid>
          {currentPage < totalPages &&
            loadingState !== LOADING_STATES.LOADING && (
              <Grid container justifyContent="center">
                <Button
                  variant="outlined"
                  color="primary"
                  size={isMobile ? "large" : "medium"}
                  fullWidth={isMobile}
                  onClick={handleLoadMoreFlights}
                >
                  Show More Flights
                </Button>
              </Grid>
            )}
        </Container>
      </Page>
    </DashboardLayout>
  );
};

export default Flights;
