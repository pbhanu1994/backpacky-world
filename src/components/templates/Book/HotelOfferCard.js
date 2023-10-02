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
  InputAdornment,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import Iconify from "../../atoms/Iconify";
import SearchMap from "../../atoms/SearchMap";
import { HotelGuestForm } from "./HotelGuestForm";
import { AddItem } from "./AddItem";
import { HotelBookingSuccess } from "./HotelBookingSuccess";
import { fDate } from "../../../utils/formatTime";
import { isEmptyObject } from "../../../utils/objectUtils";
import { getCardIssuerCode } from "../../../utils/getCardIssuerCode";
import { convertToYYYYMM } from "../../../utils/convertToYYYYMM";
import {
  formatCardNumber,
  formatExpiryDate,
} from "../../../utils/formatPaymentDetails";
import { performHotelBooking } from "../../../services/hotel/hotelBooking";

const HotelOfferCard = ({ selectedHotel, offer }) => {
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
  const [showAdditionalGuests, setShowAdditionalGuests] = useState(false);
  const [showSpecialRequests, setShowSpecialRequests] = useState(false);
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
  const [formattedCardNumber, setFormattedCardNumber] = useState("");
  const [formattedExpiryDate, setFormattedExpiryDate] = useState("");
  const [cardType, setCardType] = useState(null);
  const [hotelBookLoading, setHotelBookLoading] = useState(false);
  const [hotelBookingResult, setHotelBookingResult] = useState(null);

  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { hotel, offers, available } = offer;
  const { description, checkInDate, checkOutDate, price, room, policies } =
    offers[0];

  const { latitude, longitude } = selectedHotel;
  const places = [{ ...selectedHotel }];

  const isEmptySelectedHotel = isEmptyObject(selectedHotel);

  const numOfGuests = offers[0]?.guests?.adults;

  const handleTitleChange = (e, guestNumber) => {
    const newGuests = [...hotelGuests];
    newGuests[guestNumber] = {
      ...newGuests[guestNumber],
      name: {
        ...newGuests[guestNumber].name,
        title: e.target.value,
      },
    };
    setHotelGuests(newGuests);
  };

  const handleFirstNameChange = (e, guestNumber) => {
    const newGuests = [...hotelGuests];
    newGuests[guestNumber] = {
      ...newGuests[guestNumber],
      name: {
        ...newGuests[guestNumber].name,
        firstName: e.target.value,
      },
    };
    setHotelGuests(newGuests);
  };

  const handleLastNameChange = (e, guestNumber) => {
    const newGuests = [...hotelGuests];
    newGuests[guestNumber] = {
      ...newGuests[guestNumber],
      name: {
        ...newGuests[guestNumber].name,
        lastName: e.target.value,
      },
    };
    setHotelGuests(newGuests);
  };

  const handleEmailChange = (e) => {
    const newGuests = [...hotelGuests];
    newGuests[0] = {
      ...newGuests[0],
      contact: {
        ...newGuests[0].contact,
        email: e.target.value,
      },
    };
    setHotelGuests(newGuests);
  };

  const handlePhoneChange = (e) => {
    const newGuests = [...hotelGuests];
    newGuests[0] = {
      ...newGuests[0],
      contact: {
        ...newGuests[0].contact,
        phone: e.target.value,
      },
    };
    setHotelGuests(newGuests);
  };

  const handleAddAdditionalGuests = (addOne = false) => {
    setShowAdditionalGuests(true);
    const additionalGuestName = {
      name: {
        title: "Mr", // Default title
        firstName: "",
        lastName: "",
      },
    };

    // Create an array with numOfGuests copies of the initialGuest
    const additionalGuests = Array.from({ length: numOfGuests - 1 }, () => ({
      ...additionalGuestName,
    }));

    if (addOne) {
      setHotelGuests((prevGuests) => [...prevGuests, additionalGuestName]);
    } else {
      setHotelGuests((prevGuests) => [...prevGuests, ...additionalGuests]);
    }
  };

  const handleRemoveHotelGuest = (guestNumber) => {
    if (hotelGuests.length > 1) {
      setHotelGuests((prevGuests) =>
        prevGuests.filter((_, i) => i !== guestNumber)
      );
    }
  };

  const handleSpecialRequestChange = (e) => {
    const updatedSpecialRequests = [...specialRequests];
    updatedSpecialRequests[0].specialRequest = e.target.value;

    setSpecialRequests(updatedSpecialRequests);
  };

  const handleCardNumberChange = (e) => {
    const { name, value } = e.target;

    // Allow only numbers by removing non-numeric characters
    const valueWithNonNumericChars = value.replace(/\D/g, "");

    if (name === "cardNumber") {
      const cardType = creditCardType(valueWithNonNumericChars);
      valueWithNonNumericChars === ""
        ? setCardType(null)
        : setCardType(cardType[0]?.type);

      const cardIssuerCode =
        cardType.length > 0 ? getCardIssuerCode(cardType[0].niceType) : "";

      // Remove spaces from the card number and store it in payments state
      const cardNumberWithoutSpaces = valueWithNonNumericChars.replace(
        /\s/g,
        ""
      );

      setPayments([
        {
          method: "creditCard",
          card: {
            vendorCode: cardIssuerCode,
            cardNumber: cardNumberWithoutSpaces, // Store without spaces
            expiryDate: payments[0].card.expiryDate, // Keep the existing expiryDate
          },
        },
      ]);

      // Format the card number with spaces and update the state
      setFormattedCardNumber(formatCardNumber(cardNumberWithoutSpaces));
    } else if (name === "expiryDate") {
      // Ensuring the input is exactly 4 digits
      const formattedValue = valueWithNonNumericChars.substring(0, 4);

      const formattedExpiryDate = formatExpiryDate(formattedValue);

      setPayments((prevPayments) => [
        {
          ...prevPayments[0],
          card: {
            ...prevPayments[0].card,
            expiryDate: formattedValue
              ? convertToYYYYMM(formattedExpiryDate)
              : "",
          },
        },
      ]);

      // Update the state with the formatted expiry date
      setFormattedExpiryDate(formattedExpiryDate);
    }
  };

  const handlePerformHotelBooking = async () => {
    setHotelBookLoading(true);

    // TODO: Validation

    const hotelBookingData = {
      data: {
        offerId: offer?.offers[0]?.id,
        guests: hotelGuests,
        payments,
        rooms: specialRequests,
      },
    };

    try {
      const { data: successHotelBookingResult } = await performHotelBooking(
        dispatch,
        hotelBookingData
      );
      console.log("successHotelBookingResult", successHotelBookingResult);

      setHotelBookingResult(successHotelBookingResult);
    } catch (err) {
      console.error("Hotel Booking error:", err);
    } finally {
      setHotelBookLoading(false);
    }
  };

  return (
    <>
      {hotelBookingResult ? (
        <HotelBookingSuccess bookingSuccessData={hotelBookingResult} />
      ) : (
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
                    <HotelGuestForm
                      hotelGuests={hotelGuests}
                      numOfGuests={numOfGuests}
                      showAdditionalGuests={showAdditionalGuests}
                      handleTitleChange={handleTitleChange}
                      handleFirstNameChange={handleFirstNameChange}
                      handleLastNameChange={handleLastNameChange}
                      handleEmailChange={handleEmailChange}
                      handlePhoneChange={handlePhoneChange}
                      handleAddAdditionalGuests={handleAddAdditionalGuests}
                      handleRemoveHotelGuest={handleRemoveHotelGuest}
                    />
                  </Stack>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} md={8}>
              {showSpecialRequests && (
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
                          Special Request{" "}
                          <Typography variant="caption">(optional)</Typography>
                        </Typography>
                        <Typography variant="caption">
                          Do you have any special requests or preferences for
                          your stay? Let us know how we can make your stay more
                          enjoyable. Whether it's a bottle of champagne, extra
                          towels, or any other request, we're here to assist
                          you.
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
              )}
              {!showSpecialRequests && (
                <AddItem
                  itemName="a Special Request"
                  onAddItem={() => setShowSpecialRequests(true)}
                />
              )}
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
                        solely be utilized for hotel record-keeping purposes,
                        and no immediate payment will be processed at this time.
                      </Typography>
                    </Stack>

                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                      <TextField
                        fullWidth
                        label="Card number"
                        name="cardNumber"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Iconify icon={`logos:${cardType}`} />
                            </InputAdornment>
                          ),
                        }}
                        value={formattedCardNumber}
                        onChange={handleCardNumberChange}
                      />
                      <TextField
                        label="Expiration date"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={formattedExpiryDate}
                        onChange={handleCardNumberChange}
                      />
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
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default HotelOfferCard;
