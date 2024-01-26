import React from "react";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import { formatCurrency } from "../../../utils/formatCurrency";

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

const HotelCard = ({ offer, onSelectedHotel }) => {
  const {
    available,
    hotel,
    offers: [firstOffer],
  } = offer;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const MAX_DESC_CHAR_LENGTH = 200;

  const handleClick = () => {
    onSelectedHotel(offer);
  };

  return (
    <ResponsiveCard>
      <CardMedia
        component="img"
        height="140"
        image={`https://www.pngkey.com/png/detail/360-3608307_placeholder-hotel-house.png`}
        alt={hotel.name}
      />
      <CardActionArea onClick={handleClick}>
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
            <Grid
              item
              xs={12}
              sx={!isMobile ? { minHeight: 160, maxHeight: 160 } : {}}
            >
              <Typography variant="body2">
                {!isMobile &&
                firstOffer.room.description.text.length > MAX_DESC_CHAR_LENGTH
                  ? `${firstOffer.room.description.text.slice(
                      0,
                      MAX_DESC_CHAR_LENGTH
                    )}...`
                  : firstOffer.room.description.text}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                Price:{" "}
                {formatCurrency(
                  firstOffer.price.total,
                  firstOffer.price.currency
                )}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="caption"
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
          </Grid>
        </CardContent>
      </CardActionArea>
    </ResponsiveCard>
  );
};

export default HotelCard;
