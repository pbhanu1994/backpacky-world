import React, { useState } from "react";
import { useDispatch } from "react-redux";
import creditCardType from "credit-card-type";
import {
  Grid,
  Box,
  Stack,
  Card,
  CardMedia,
  CardContent,
  Typography,
  TextField,
  Popover,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import { HotelGuestForm } from "./HotelGuestForm";
import { AddHotelGuest } from "./AddHotelGuest";
import SearchMap from "../../atoms/SearchMap";
import { fDate } from "../../../utils/formatTime";
import { isEmptyObject } from "../../../utils/objectUtils";
import { getCardIssuerCode } from "../../../utils/getCardIssuerCode";
import { convertToYYYYMM } from "../../../utils/convertToYYYYMM";
import { performHotelBooking } from "../../../services/hotel/hotelBooking";

function HotelOfferCard({ selectedHotel, offer }) {
  const [isOpen, setIsOpen] = useState(null);
  const [hotelGuests, setHotelGuests] = useState([
    {
      name: {
        title: "Mr",
        firstName: "",
        lastName: "",
      },
      contact: {
        phone: "",
        email: "",
      },
    },
  ]);
  const [specialRequests, setSpecialRequests] = useState([
    {
      specialRequest: "",
    },
  ]);
  const [payments, setPayments] = useState([
    {
      method: "creditCard",
      card: {
        vendorCode: "",
        cardNumber: "",
        expiryDate: "",
      },
    },
  ]);
  const [hotelBookLoading, setHotelBookLoading] = useState(false);
  const [hotelBookingResult, setHotelBookingResult] = useState(null);

  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleTitleChange = (e, index) => {
    const newGuests = [...hotelGuests];
    newGuests[index].name.title = e.target.value;
    setHotelGuests(newGuests);
  };

  const handleFirstNameChange = (e, index) => {
    const newGuests = [...hotelGuests];
    newGuests[index].name.firstName = e.target.value;
    setHotelGuests(newGuests);
  };

  const handleLastNameChange = (e, index) => {
    const newGuests = [...hotelGuests];
    newGuests[index].name.lastName = e.target.value;
    setHotelGuests(newGuests);
  };

  const handleEmailChange = (e, index) => {
    const newGuests = [...hotelGuests];
    newGuests[index].contact.email = e.target.value;
    setHotelGuests(newGuests);
  };

  const handlePhoneChange = (e, index) => {
    const newGuests = [...hotelGuests];
    newGuests[index].contact.phone = e.target.value;
    setHotelGuests(newGuests);
  };

  const handleAddHotelGuest = () => {
    setHotelGuests((prevGuests) => [
      ...prevGuests,
      {
        name: {
          title: "Mr", // Default title
          firstName: "",
          lastName: "",
        },
        contact: {
          phone: "",
          email: "",
        },
      },
    ]);
  };

  const handleRemoveHotelGuest = (index) => {
    if (hotelGuests.length > 1) {
      setHotelGuests((prevGuests) => prevGuests.filter((_, i) => i !== index));
    }
  };

  const handleSpecialRequestChange = (e) => {
    const updatedSpecialRequests = [...specialRequests];
    updatedSpecialRequests[0].specialRequest = e.target.value;

    setSpecialRequests(updatedSpecialRequests);
  };

  const handleCardNumberChange = (e) => {
    const { name, value } = e.target;

    if (name === "cardNumber") {
      const cardType = creditCardType(value);

      if (cardType.length > 0) {
        const cardIssuerCode = getCardIssuerCode(cardType[0].niceType);

        // Update the payments state with cardNumber, vendorCode, and expiryDate
        setPayments([
          {
            method: "creditCard",
            card: {
              vendorCode: cardIssuerCode,
              cardNumber: value,
              expiryDate: payments[0].card.expiryDate, // Keep the existing expiryDate
            },
          },
        ]);
      } else {
        // Handle the case when no card type is detected
        setPayments([
          {
            method: "creditCard",
            card: {
              vendorCode: "",
              cardNumber: value,
              expiryDate: payments[0].card.expiryDate, // Keep the existing expiryDate
            },
          },
        ]);
      }
    } else if (name === "expiryDate") {
      // Handle expiry date change
      // Update the payments state with the new expiryDate
      setPayments((prevPayments) => [
        {
          ...prevPayments[0],
          card: {
            ...prevPayments[0].card,
            expiryDate: convertToYYYYMM(value),
          },
        },
      ]);
    }
  };

  const handlePerformHotelBooking = async () => {
    // TODO: Validation

    const hotelBookingData = {
      offerId: offer?.offers[0]?.id,
      guests: hotelGuests,
      payments,
      rooms: specialRequests,
    };

    setHotelBookLoading(true);

    try {
      const { data: successHotelBookingResult } = await performHotelBooking(
        dispatch,
        hotelBookingData
      );

      // TODO: Add the success page upon success hotel booking!!
      console.log("successHotelBookingResult", successHotelBookingResult);

      setHotelBookingResult(successHotelBookingResult);
    } catch (err) {
      console.error("Hotel Booking error:", err);
    } finally {
      setHotelBookLoading(false);
    }
  };

  const { hotel, offers, available } = offer;
  const { description, checkInDate, checkOutDate, price, room, policies } =
    offers[0];

  const { latitude, longitude } = selectedHotel;
  const places = [{ ...selectedHotel }];

  const isEmptySelectedHotel = isEmptyObject(selectedHotel);

  return (
    <>
      <Grid container spacing={2}>
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
                      {hotel.name} - {hotel.cityCode},{" "}
                      {hotel.address.countryCode}
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
                {/* <Grid item>
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
                </Grid> */}
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
        {!isEmptySelectedHotel && (
          <Grid item xs={12} md={4}>
            <Card
              variant="outlined"
              sx={{ height: !isMobile ? "40%" : "100%" }}
            >
              <SearchMap
                defaultLatAndLong={{ lat: latitude, lng: longitude }}
                places={places}
              />
            </Card>
          </Grid>
        )}
        <Grid item xs={12} md={8}>
          <Card variant="outlined">
            <Box
              sx={{
                padding: 3,
                borderRadius: 1,
              }}
            >
              <Stack spacing={3}>
                <Stack>
                  <Typography variant="subtitle1">
                    Enter Guest Details
                  </Typography>
                  <Typography variant="caption">
                    Enter the details of guests that will be staying at the
                    hotel. Please provide accurate information to ensure a
                    smooth check-in process and a comfortable stay.
                  </Typography>
                </Stack>
                {/* Hotel Guests */}
                {hotelGuests.map((guest, index) => (
                  <HotelGuestForm
                    key={index}
                    guest={guest}
                    index={index}
                    numOfGuests={hotelGuests.length}
                    handleTitleChange={(e) => handleTitleChange(e, index)}
                    handleFirstNameChange={(e) =>
                      handleFirstNameChange(e, index)
                    }
                    handleLastNameChange={(e) => handleLastNameChange(e, index)}
                    handleEmailChange={(e) => handleEmailChange(e, index)}
                    handlePhoneChange={(e) => handlePhoneChange(e, index)}
                    removeGuest={handleRemoveHotelGuest}
                  />
                ))}
                <AddHotelGuest onAddHotelGuest={handleAddHotelGuest} />
              </Stack>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card variant="outlined">
            <Box
              sx={{
                padding: 3,
                borderRadius: 1,
              }}
            >
              <Stack spacing={3}>
                <Stack>
                  <Typography variant="subtitle1">
                    Special Requests{" "}
                    <Typography variant="caption">(optional)</Typography>
                  </Typography>
                  <Typography variant="caption">
                    Do you have any special requests or preferences for your
                    stay? Let us know how we can make your stay more enjoyable.
                    Whether it's a bottle of champagne, extra towels, or any
                    other request, we're here to assist you.
                  </Typography>
                </Stack>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Special Requests"
                  variant="outlined"
                  placeholder="Enter your special requests here..."
                  value={specialRequests[0].specialRequest}
                  onChange={handleSpecialRequestChange}
                />
              </Stack>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
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
                  <Typography variant="subtitle1">
                    Enter Card Details
                  </Typography>
                  <Typography variant="caption">
                    Please be assured that your provided card details will
                    solely be utilized for hotel record-keeping purposes, and no
                    immediate payment will be processed at this time.
                  </Typography>
                </Stack>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField
                    fullWidth
                    label="Card number"
                    name="cardNumber"
                    onChange={handleCardNumberChange}
                  />
                  <TextField
                    label="Expiration date"
                    name="expiryDate"
                    placeholder="MM/YY"
                    onChange={handleCardNumberChange}
                  />

                  {/* <TextField
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
                /> */}
                </Stack>
              </Stack>
            </Box>
          </Card>
          <LoadingButton
            type="submit"
            fullWidth
            loading={hotelBookLoading}
            loadingPosition="start"
            size="large"
            variant="contained"
            color="primary"
            sx={{ mt: 1.5 }}
            onClick={handlePerformHotelBooking}
          >
            {hotelBookLoading ? "Booking..." : "Book"}
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
          Three-digit number on the back of your card
        </Typography>
      </Popover>
    </>
  );
}

export default HotelOfferCard;
