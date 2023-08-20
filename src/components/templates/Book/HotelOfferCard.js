import React, { useState } from "react";
import {
  Grid,
  Box,
  Stack,
  Card,
  CardMedia,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Popover,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Iconify from "../../atoms/Iconify";
import { fDate } from "../../../utils/formatTime";

function HotelOfferCard({ offer }) {
  const [isOpen, setIsOpen] = useState(null);

  const { hotel, offers, available } = offer;
  const { description, checkInDate, checkOutDate, price, room, policies } =
    offers[0];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
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
                  {price.currency} {price.total}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" color="textSecondary">
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    fontWeight="fontWeightBold"
                  >
                    Base Price
                  </Typography>
                  {price.base}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" color="textSecondary">
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    fontWeight="fontWeightBold"
                  >
                    Cancellation Deadline
                  </Typography>
                  {fDate(policies.cancellations[0].deadline)}
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
      <Grid item xs={12} md={6}>
        <Card variant="outlined">
          <Box
            sx={{
              padding: 3,
              borderRadius: 1,
              bgcolor: "background.neutral",
            }}
          >
            <Stack spacing={3}>
              <Stack>
                <Typography variant="subtitle1">Enter card details</Typography>
                <Typography variant="caption">
                  Please be assured that your provided card details will solely
                  be utilized for hotel record-keeping purposes, and no
                  immediate payment will be processed at this time.
                </Typography>
              </Stack>

              <Stack direction={{ xs: "column" }} spacing={2}>
                <TextField fullWidth label="Name on card" />

                <TextField fullWidth label="Card number" />
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  fullWidth
                  label="Expiration date"
                  placeholder="MM/YY"
                />

                <TextField
                  label="CVV"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          edge="end"
                          onClick={(event) => setIsOpen(event.currentTarget)}
                        >
                          <Iconify icon={"eva:info-fill"} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
            </Stack>
          </Box>
        </Card>
        <LoadingButton
          type="submit"
          fullWidth
          loading={false}
          loadingPosition="start"
          size="large"
          variant="contained"
          color="primary"
          sx={{ mt: 1.5 }}
        >
          Book
        </LoadingButton>
        {/* <LoadingButton
          type="submit"
          fullWidth
          loading
          loadingPosition="start"
          size="large"
          variant="contained"
          color="primary"
          sx={{ mt: 1.5 }}
        >
          Booking...
        </LoadingButton> */}
      </Grid>
      <Popover
        open={Boolean(isOpen)}
        anchorEl={isOpen}
        onClose={() => setIsOpen(null)}
        anchorOrigin={{ vertical: "center", horizontal: "center" }}
        transformOrigin={{ vertical: "center", horizontal: "center" }}
        PaperProps={{
          sx: {
            p: 1,
            maxWidth: 200,
          },
        }}
      >
        <Typography variant="body2" align="center">
          Three-digit number on the back of your VISA card
        </Typography>
      </Popover>
    </Grid>
  );
}

export default HotelOfferCard;
