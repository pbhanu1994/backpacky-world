import React from "react";
import {
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
        <Typography variant="h6">{hotel.name}</Typography>
        <Typography variant="subtitle2" color="textSecondary">
          {hotel.cityCode}
        </Typography>
        <Divider sx={{ marginY: 1 }} />
        <Typography variant="body2">
          {firstOffer.room.description.text}
        </Typography>
        <Typography variant="subtitle1">
          Price: {firstOffer.price.total} {firstOffer.price.currency}
        </Typography>
        <Button variant="contained" color="primary" fullWidth>
          Book Now
        </Button>
      </CardContent>
    </ResponsiveCard>
  );
};

export default HotelCard;
