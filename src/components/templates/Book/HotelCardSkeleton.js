import React from "react";
import { Grid, Card, CardContent, Divider, Skeleton } from "@mui/material";
import { styled } from "@mui/system";

const ResponsiveCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),

  [theme.breakpoints.up("md")]: {
    display: "inline-block",
    width: "calc(50% - 16px)", // 2 cards in a row for medium screens (like iPads)
    marginRight: theme.spacing(2), // Add right margin for spacing between cards
    verticalAlign: "top",
  },

  [theme.breakpoints.up("lg")]: {
    width: "calc(33.33% - 16px)", // 3 cards in a row for large screens (desktops)
    marginRight: theme.spacing(2), // Add right margin for spacing between cards
    verticalAlign: "top",
  },
}));

const HotelCardSkeleton = () => {
  return (
    <ResponsiveCard>
      <Skeleton variant="rectangular" height={140} />
      <CardContent>
        <Grid container spacing={0.6}>
          <Grid item xs={12}>
            <Skeleton variant="text" width="60%" height={30} />
          </Grid>
          <Grid item xs={12}>
            <Skeleton variant="text" width="40%" height={20} />
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ marginY: 1 }} />
          </Grid>
          <Grid item xs={12}>
            <Skeleton variant="text" />
          </Grid>
          <Grid item xs={12}>
            <Skeleton variant="text" width="80%" />
          </Grid>
          <Grid item xs={12}>
            <Skeleton
              variant="rectangular"
              width={100}
              height={30}
              sx={{ borderRadius: 3 }}
            />
          </Grid>
          <Grid item xs={12}>
            <Skeleton variant="rectangular" height={40} />
          </Grid>
        </Grid>
      </CardContent>
    </ResponsiveCard>
  );
};

export default HotelCardSkeleton;
