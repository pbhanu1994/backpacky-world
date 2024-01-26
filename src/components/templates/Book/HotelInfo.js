import React from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Stack,
} from "@mui/material";
import { fDate } from "../../../utils/formatTime";
import { formatCurrency } from "../../../utils/formatCurrency";

export const HotelInfo = ({ offer }) => {
  const { hotel, offers, available } = offer;
  const {
    description,
    checkInDate,
    checkOutDate,
    price,
    room,
    roomQuantity = 1,
    guests,
    policies,
  } = offers[0];

  return (
    <Grid item xs={12} md={8}>
      <Card variant="outlined">
        <CardMedia
          component="img"
          height="140"
          image={`https://www.pngkey.com/png/detail/360-3608307_placeholder-hotel-house.png`}
          alt={hotel.name}
        />
        <CardContent>
          <Grid container direction="column" spacing={0.6}>
            <Grid
              container
              item
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Grid item>
                <Typography variant="h3" color="primary">
                  {hotel.name} - {hotel.cityCode}, {hotel.address.countryCode}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {room.description.text}
                </Typography>
              </Grid>
              <Grid item>
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
            <Grid item>
              <Typography variant="body2" color="textSecondary">
                <Typography
                  variant="body2"
                  color="textSecondary"
                  fontWeight="fontWeightBold"
                >
                  Amenities
                </Typography>{" "}
                {hotel.amenities.join(", ")}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" color="textSecondary">
                <Stack direction="row" spacing={2}>
                  <Stack>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      fontWeight="fontWeightBold"
                    >
                      Check-in
                    </Typography>{" "}
                    {fDate(checkInDate)}{" "}
                  </Stack>
                  <Stack>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      fontWeight="fontWeightBold"
                    >
                      Check-out
                    </Typography>{" "}
                    {fDate(checkOutDate)}
                  </Stack>
                </Stack>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" color="textSecondary">
                <Stack direction="row" spacing={2}>
                  <Stack>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      fontWeight="fontWeightBold"
                    >
                      Rooms
                    </Typography>{" "}
                    {roomQuantity ?? 1}
                  </Stack>
                  <Stack>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      fontWeight="fontWeightBold"
                    >
                      Adults
                    </Typography>{" "}
                    {guests?.adults}{" "}
                  </Stack>
                </Stack>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" color="textSecondary">
                <Typography
                  variant="body2"
                  color="textSecondary"
                  fontWeight="fontWeightBold"
                >
                  Description
                </Typography>
                {description.text}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5" color="primary">
                {formatCurrency(price.total, price.currency)}
              </Typography>
            </Grid>
            {price?.base && (
              <Grid item>
                <Typography variant="body2" color="textSecondary">
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    fontWeight="fontWeightBold"
                  >
                    Base Price
                  </Typography>
                  {formatCurrency(price.base, price.currency)}
                </Typography>
              </Grid>
            )}
            <Grid item>
              <Typography variant="body2" color="textSecondary">
                <Typography
                  variant="body2"
                  color="textSecondary"
                  fontWeight="fontWeightBold"
                >
                  Cancellation Deadline
                </Typography>
                {policies.cancellations[0].deadline
                  ? fDate(policies.cancellations[0].deadline)
                  : policies.cancellations[0].description.text}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="body2"
                color="textSecondary"
                textTransform="capitalize"
              >
                <Typography
                  variant="body2"
                  color="textSecondary"
                  fontWeight="fontWeightBold"
                >
                  Payment Type
                </Typography>
                {policies.paymentType}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};
