import React from "react";
import { Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FlightCardSkeleton from "./FlightCardSkeleton";
import FlightInfoSkeleton from "./FlightInfoSkeleton";
import FlightPriceSummarySkeleton from "./FlightPriceSummarySkeleton";
import FlightBookingFormSkeleton from "./FlightBookingFormSkeleton";

const FlightOfferCardSkeleton = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <Grid item>
          <FlightCardSkeleton showSelectButton={false} />
        </Grid>
        <Grid item>
          <FlightInfoSkeleton />
        </Grid>
        {isMobile && (
          <Grid item>
            <FlightPriceSummarySkeleton />
          </Grid>
        )}
        <Grid item>
          <FlightBookingFormSkeleton />
        </Grid>
      </Grid>
      {!isMobile && (
        <Grid item xs={12} md={4}>
          {/* Pricing */}
          <Grid item>
            <FlightPriceSummarySkeleton />
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default FlightOfferCardSkeleton;
