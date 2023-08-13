import React from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import { styled } from "@mui/system";

const ResponsiveCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2), // Add some vertical spacing

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

const HotelCard = ({ offer }) => {
  const {
    available,
    hotel,
    offers: [firstOffer],
  } = offer;

  return (
    <ResponsiveCard>
      <CardMedia
        component="img"
        height="140"
        image={`https://via.placeholder.com/300x200`} // Replace with actual image URL
        alt={hotel.name}
      />
      <CardContent>
        <Grid container spacing={0.6}>
          <Grid item xs={12}>
            <Typography variant="h6">{hotel.name}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="textSecondary">
              {hotel.cityCode}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ marginY: 1 }} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">
              {firstOffer.room.description.text}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              Price: {firstOffer.price.total} {firstOffer.price.currency}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              sx={{
                width: "fit-content",
                padding: "2px 4px",
                borderRadius: 3,
                border: (theme) =>
                  available
                    ? `solid 1px ${theme.palette.success.light}`
                    : `solid 1px ${theme.palette.error.light}`,
                backgroundColor: (theme) =>
                  available
                    ? theme.palette.success.light
                    : theme.palette.error.light,
                color: (theme) =>
                  available
                    ? theme.palette.success.dark
                    : theme.palette.error.dark,
              }}
            >
              {available ? "Available" : "Not Available"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth>
              Book Now
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </ResponsiveCard>
  );
};

export default HotelCard;
