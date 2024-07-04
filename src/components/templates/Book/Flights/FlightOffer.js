import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { Container, Typography, Button } from "@mui/material";
import Iconify from "../../../atoms/Iconify";
import Page from "../../../atoms/Page";
import DashboardLayout from "../../../layouts/dashboard";
import FlightOfferCard from "./FlightOfferCard";
import FlightOfferCardSkeleton from "./FlightOfferCardSkeleton";
import { BOOK_TYPES } from "../";
import { LOADING_STATES } from "../../../../constants/loadingStates";
import { PAGE_PATH } from "../../../../constants/navigationConstants";
import useSettings from "../../../../hooks/useSettings";
import { performFlightOffersPricing } from "../../../../services/flight/flightOffersPricing";

const FlightOffer = ({ pageTitle }) => {
  const selectedFlightOffer = useSelector(
    (state) => state.book.flights.selected
  );
  const [flightOfferPricing, setFlightOfferPricing] = useState({});
  const [loadingState, setLoadingState] = useState(LOADING_STATES.INITIAL);

  const router = useRouter();
  const dispatch = useDispatch();
  const { themeStretch } = useSettings();

  const { query } = router;
  const { flightOfferId } = query;

  const errorMessage = "An error occurred, please try again later.";

  const canGoBack = window.sessionStorage.getItem("canGoBack");

  const renderSkeletonLoading = () => <FlightOfferCardSkeleton />;

  useEffect(() => {
    if (flightOfferId) {
      const getFlightOfferPricing = async () => {
        setLoadingState(LOADING_STATES.LOADING);

        const flightOffersPricingBody = {
          data: {
            type: "flight-offers-pricing",
            flightOffers: [selectedFlightOffer],
          },
        };

        try {
          const flightOfferPricingResult = await performFlightOffersPricing(
            dispatch,
            flightOffersPricingBody
          );

          setFlightOfferPricing(flightOfferPricingResult);
          if (!_.isEmpty(query)) {
            setLoadingState(LOADING_STATES.LOADED);
          } else {
            setLoadingState(LOADING_STATES.NO_RESULTS);
          }
        } catch (err) {
          console.error("API call error:", err);
          setLoadingState(LOADING_STATES.ERROR);
        }
      };

      getFlightOfferPricing();
    }
  }, []);

  const handleGoBack = () => {
    if (canGoBack) {
      router.back();
    } else {
      router.push({
        pathname: PAGE_PATH.BOOK,
        query: { currentTab: BOOK_TYPES.FLIGHTS },
      });
    }
  };

  return (
    <DashboardLayout>
      <Page title={pageTitle}>
        <Container maxWidth={themeStretch ? false : "lg"}>
          <Button
            size="small"
            color="inherit"
            onClick={handleGoBack}
            startIcon={<Iconify icon={"eva:arrow-ios-back-fill"} />}
            sx={{ mb: 3 }}
          >
            {canGoBack ? "Back" : "Search Hotels"}
          </Button>
          {loadingState === LOADING_STATES.ERROR && (
            <Typography variant="body1" color="error">
              {errorMessage}
            </Typography>
          )}
          {(loadingState === LOADING_STATES.LOADING ||
            _.isEmpty(flightOfferPricing)) &&
            renderSkeletonLoading()}
          {!_.isEmpty(flightOfferPricing) && (
            <FlightOfferCard offer={flightOfferPricing} />
          )}
        </Container>
      </Page>
    </DashboardLayout>
  );
};

export default FlightOffer;
