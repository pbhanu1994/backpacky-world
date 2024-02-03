import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { Container, Typography, Button } from "@mui/material";
import Iconify from "../../atoms/Iconify";
import Page from "../../atoms/Page";
import DashboardLayout from "../../layouts/dashboard";
import HotelOfferCard from "./HotelOfferCard";
import HotelOfferCardSkeleton from "./HotelOfferCardSkeleton";
import { PAGE_PATH } from "../../../constants/navigationConstants";
import useSettings from "../../../hooks/useSettings";
import { getHotelOffersByOfferId } from "../../../services/hotel/hotelOffersByOfferId";

const HotelOffer = ({ pageTitle }) => {
  const [selectedHotelOffer, setSelectedHotelOffer] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();
  const dispatch = useDispatch();
  const { themeStretch } = useSettings();
  const selectedHotel = useSelector((state) => state.book.hotels.selected);

  const { query } = router;
  const { hotelOfferId } = query;

  const canGoBack = window.sessionStorage.getItem("canGoBack");

  useEffect(() => {
    if (hotelOfferId) {
      const getHotelOfferDetails = async () => {
        setLoading(true);
        setError(null);

        try {
          const { data: hotelOfferResult } = await getHotelOffersByOfferId(
            dispatch,
            hotelOfferId
          );

          setSelectedHotelOffer(hotelOfferResult);
        } catch (err) {
          console.error("API call error:", err);
          setError("An error occurred, please try again later.");
        } finally {
          setLoading(false);
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
        query: { currentTab: "Hotels" },
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
          {error ? (
            <Typography variant="body1" color="error">
              {error}
            </Typography>
          ) : loading ? (
            <HotelOfferCardSkeleton />
          ) : (
            <>
              {!_.isEmpty(selectedHotelOffer) && (
                <HotelOfferCard
                  selectedHotel={selectedHotel}
                  offer={selectedHotelOffer}
                />
              )}
              {_.isEmpty(selectedHotelOffer) && <HotelOfferCardSkeleton />}
            </>
          )}
        </Container>
      </Page>
    </DashboardLayout>
  );
};

export default HotelOffer;
