import React from "react";
import { Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FlightCard from "./FlightCard";
import FlightInfo from "./FlightInfo";
import FlightOfferPriceCard from "./FlightOfferPriceCard";
import FlightBookingForm from "./FlightBookingForm";

const FlightOfferCard = ({ offer }) => {
  const { flightOffers, bookingRequirements } = offer.data;

  const { itineraries, price, travelerPricings } = flightOffers[0];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const isReturn = itineraries.length === 2;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <Grid item>
          <FlightCard offer={flightOffers[0]} showSelectButton={false} />
        </Grid>
        <Grid item>
          <FlightInfo offer={flightOffers[0]} />
        </Grid>
        {price && isMobile && (
          <Grid item>
            <FlightOfferPriceCard price={price} isReturn={isReturn} />
          </Grid>
        )}
        <Grid item>
          <FlightBookingForm
            flightOffers={flightOffers}
            bookingRequirements={bookingRequirements}
            travelerPricings={travelerPricings}
          />
        </Grid>
      </Grid>
      {!isMobile && (
        <Grid item xs={12} md={4}>
          {/* Pricing */}
          {price && (
            <Grid item>
              <FlightOfferPriceCard price={price} isReturn={isReturn} />
            </Grid>
          )}
        </Grid>
      )}
    </Grid>
  );
};

export default FlightOfferCard;
