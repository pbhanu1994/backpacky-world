import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { Container, Typography, Button } from "@mui/material";
import Iconify from "../../../atoms/Iconify";
import Page from "../../../atoms/Page";
import DashboardLayout from "../../../layouts/dashboard";
import HotelOfferCard from "./HotelOfferCard";
import HotelOfferCardSkeleton from "./HotelOfferCardSkeleton";
import { BOOK_TYPES } from "../";
import { LOADING_STATES } from "../../../../constants/loadingStates";
import { PAGE_PATH } from "../../../../constants/navigationConstants";
import useSettings from "../../../../hooks/useSettings";
import { getHotelOffersByOfferId } from "../../../../services/hotel/hotelOffersByOfferId";

const HotelOffer = ({ pageTitle }) => {
  const [selectedHotelOffer, setSelectedHotelOffer] = useState({});
  const [loadingState, setLoadingState] = useState(LOADING_STATES.INITIAL);

  const router = useRouter();
  const dispatch = useDispatch();
  const { themeStretch } = useSettings();
  const selectedHotel = useSelector((state) => state.book.hotels.selected);

  const { query } = router;
  const { hotelOfferId } = query;

  const errorMessage = "An error occurred, please try again later.";

  const canGoBack = window.sessionStorage.getItem("canGoBack");

  const renderSkeletonLoading = () => <HotelOfferCardSkeleton />;

  useEffect(() => {
    if (hotelOfferId) {
      const getHotelOfferDetails = async () => {
        setLoadingState(LOADING_STATES.LOADING);

        try {
          const { data: hotelOfferResult } = await getHotelOffersByOfferId(
            dispatch,
            hotelOfferId
          );

          setSelectedHotelOffer(hotelOfferResult);
          if (hotelOfferResult) {
            setLoadingState(LOADING_STATES.LOADED);
          } else {
            setLoadingState(LOADING_STATES.NO_RESULTS);
          }
        } catch (err) {
          console.error("API call error:", err);
          setLoadingState(LOADING_STATES.ERROR);
        }
      };

      getHotelOfferDetails();
    }
  }, []);

  const handleGoBack = () => {
    if (canGoBack) {
      router.back();
    } else {
      router.push({
        pathname: PAGE_PATH.BOOK,
        query: { currentTab: BOOK_TYPES.HOTELS },
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
            _.isEmpty(selectedHotelOffer)) &&
            renderSkeletonLoading()}
          {!_.isEmpty(selectedHotelOffer) && (
            <HotelOfferCard
              selectedHotel={selectedHotel}
              offer={selectedHotelOffer}
            />
          )}
        </Container>
      </Page>
    </DashboardLayout>
  );
};

export default HotelOffer;
