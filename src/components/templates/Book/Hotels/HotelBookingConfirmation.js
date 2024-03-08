import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  ListItem,
  ListItemText,
  Skeleton,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  Receipt as ReceiptIcon,
  Person as GuestIcon,
  Hotel as HotelIcon,
  MeetingRoom as RoomIcon,
  Payment as PaymentIcon,
  // PersonOutline as PersonIcon,
  EmailOutlined as EmailIcon,
  PhoneIphoneOutlined as PhoneIcon,
} from "@mui/icons-material";
import Iconify from "../../../atoms/Iconify";
import Page from "../../../atoms/Page";
import DashboardLayout from "../../../layouts/dashboard";
import { PAGE_PATH } from "../../../../constants/navigationConstants";
import { formatCurrency } from "../../../../utils/formatCurrency";
import { fDate } from "../../../../utils/formatTime";
import getHotelBookings from "../../../../store/actions/book/hotels/bookings/getHotelBookings";

const HotelBookingConfirmation = ({ pageTitle }) => {
  const [bookingInfo, setBookingInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [bookingNotFound, setBookingNotFound] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const { query, asPath } = router;
  const { reference } = query;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const hotelBookings = useSelector((state) => state.book.hotels.bookings);

  const isBookHotelsConfirmationPath =
    asPath === `${PAGE_PATH.BOOK_HOTELS_CONFIRMATION}${reference}/`;

  const isBookingsHotelsPath =
    asPath === `${PAGE_PATH.BOOKINGS_HOTELS}${reference}/`;

  useEffect(() => {
    if (_.isEmpty(hotelBookings)) {
      dispatch(getHotelBookings());
    } else {
      const existingBookingInfo = hotelBookings[reference];

      if (existingBookingInfo) {
        setBookingInfo(existingBookingInfo);
        setLoading(false);
      } else {
        setBookingNotFound(true);
        setLoading(false);
      }
    }
  }, [reference, hotelBookings]);

  const handleGoBack = () => {
    router.back();
  };

  const handleGoBackToHotels = () => {
    router.push({
      pathname: PAGE_PATH.BOOK,
      query: { currentTab: "Hotels" },
    });
  };

  const {
    bookingConfirmation,
    hotelDetails,
    guests,
    payments,
    rooms,
    download,
  } = bookingInfo;

  const BookMoreOrReturnHome = () => (
    <Grid
      container
      spacing={1}
      xs={12}
      justifyContent="center"
      alignItems="center"
      marginTop={2}
    >
      <Grid item xs={isMobile && 12}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={
            <Iconify icon={"mdi:hotel-outline"} width={20} height={20} />
          }
          size={isMobile ? "large" : "medium"}
          fullWidth={isMobile}
          onClick={handleGoBackToHotels}
        >
          Book more
        </Button>
      </Grid>
      {isBookHotelsConfirmationPath && (
        <Grid item xs={isMobile && 12}>
          <Button
            variant="contained"
            color="primary"
            startIcon={
              <Iconify icon={"mdi:home-outline"} width={20} height={20} />
            }
            size={isMobile ? "large" : "medium"}
            fullWidth={isMobile}
            href="/"
          >
            Return to Home
          </Button>
        </Grid>
      )}
    </Grid>
  );

  const LoadingBookingConfirmation = () => (
    <Paper elevation={3} sx={{ padding: 4, textAlign: "left" }}>
      <Skeleton
        variant="text"
        width={200}
        height={40}
        sx={{ margin: "auto" }}
      />

      {Array.from({ length: 5 }).map((item, index) => (
        <React.Fragment key={`loadingItem${index + 1}`}>
          <Skeleton
            variant="text"
            width={300}
            height={30}
            sx={{ marginTop: 4 }}
          />
          <Grid container spacing={2}>
            {[1, 2].map((index) => (
              <Grid item key={index} xs={12} sm={6}>
                <Skeleton variant="text" width="100%" height={80} />
              </Grid>
            ))}
          </Grid>
        </React.Fragment>
      ))}
    </Paper>
  );

  const BookingNotFound = () => (
    <Paper elevation={3} sx={{ padding: 4, textAlign: "left" }}>
      <Typography variant="h3" align="center" gutterBottom>
        Booking Not Found
      </Typography>
      <Typography variant="body1" align="center">
        Your booking for Hotel Reference{" "}
        <Typography component="span" color="primary">
          {reference}
        </Typography>{" "}
        is not found!
      </Typography>

      <BookMoreOrReturnHome />
    </Paper>
  );

  const BookingConfirmation = () => (
    <Paper elevation={3} sx={{ padding: 4, textAlign: "left" }}>
      <Typography variant="h3" align="center" gutterBottom>
        Booking Confirmed
      </Typography>
      <Grid
        container
        justifyContent="flex-end"
        spacing={2}
        sx={{ marginTop: 4 }}
      >
        {!_.isEmpty(download) && (
          <Button
            variant="outlined"
            color="primary"
            href={download?.downloadURL}
            download={download?.fileName}
            startIcon={
              <Iconify
                icon={"mdi:file-download-outline"}
                width={20}
                height={20}
              />
            }
          >
            Download
          </Button>
        )}
      </Grid>

      {/* Confirmation Results with Enhanced Styling */}
      <Typography
        variant="h6"
        gutterBottom
        display="flex"
        alignItems="center"
        sx={{ marginTop: 4 }}
      >
        <ReceiptIcon sx={{ marginRight: 0.5 }} /> Confirmation Details
      </Typography>
      <Grid container spacing={2}>
        {bookingConfirmation.map((result, index) => (
          <Grid item key={index} xs={12} sm={6}>
            <ListItem sx={{ marginBottom: 2 }}>
              <ListItemText
                primary={
                  <>
                    <Typography variant="h6" color="primary">
                      Confirmation ID
                    </Typography>
                    <Typography variant="body1" color="primary">
                      {result.providerConfirmationId}
                    </Typography>
                  </>
                }
                secondary={
                  <>
                    <Typography variant="subtitle2" color="textSecondary">
                      Reference:
                    </Typography>{" "}
                    {result.associatedRecords[0].reference}
                    <br />
                    <Typography variant="subtitle2" color="textSecondary">
                      Origin System Code:
                    </Typography>{" "}
                    {result.associatedRecords[0].originSystemCode}
                  </>
                }
              />
            </ListItem>
          </Grid>
        ))}
      </Grid>

      {/* Hotel Booking Details */}
      <Typography
        variant="h6"
        gutterBottom
        display="flex"
        alignItems="center"
        sx={{ marginTop: 2 }}
      >
        <HotelIcon sx={{ marginRight: 0.5 }} /> Hotel Booking Details
      </Typography>
      <Grid container spacing={!isMobile ? 2 : 0}>
        {/* Hotel ID and Hotel Name in one row */}
        <Grid item xs={12} sm={6}>
          <ListItem>
            <ListItemText
              primary={
                <>
                  <Typography variant="subtitle2" color="primary">
                    Hotel ID:
                  </Typography>{" "}
                  {hotelDetails.hotelId}
                  <Typography variant="subtitle2" color="primary">
                    Hotel Name:
                  </Typography>{" "}
                  {hotelDetails.name}
                </>
              }
            />
          </ListItem>
        </Grid>

        {/* Check-In Date, Check-Out Date, and Total in the second row */}
        <Grid item xs={12} sm={6}>
          <ListItem sx={{ marginBottom: 2 }}>
            <ListItemText
              secondary={
                <>
                  <Typography variant="subtitle2" color="textSecondary">
                    Check-In Date:
                  </Typography>{" "}
                  {fDate(hotelDetails.checkInDate)}
                  <br />
                  <Typography variant="subtitle2" color="textSecondary">
                    Check-Out Date:
                  </Typography>{" "}
                  {fDate(hotelDetails.checkOutDate)}
                  <br />
                  <Typography variant="subtitle2" color="textSecondary">
                    Total:
                  </Typography>{" "}
                  {formatCurrency(
                    hotelDetails.price.total,
                    hotelDetails.price.currency
                  )}
                </>
              }
            />
          </ListItem>
        </Grid>
      </Grid>

      {/* Guests Information */}
      <Typography
        variant="h6"
        gutterBottom
        display="flex"
        alignItems="center"
        sx={{ marginTop: 2 }}
      >
        <GuestIcon sx={{ marginRight: 0.5 }} />{" "}
        {guests.length === 1 ? "Guest" : "Guests"} Details
      </Typography>
      <Grid container spacing={2}>
        {guests.map((guest, index) => (
          <Grid item key={index} xs={12} sm={6}>
            <ListItem sx={{ marginBottom: 2 }}>
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    color="primary"
                    display="flex"
                    alignItems="center"
                  >
                    {/* <PersonIcon sx={{ marginRight: 0.5 }} />{" "} */}
                    {`${guest.name.title}. ${
                      guest.name.firstName.charAt(0).toUpperCase() +
                      guest.name.firstName.slice(1)
                    } ${
                      guest.name.lastName.charAt(0).toUpperCase() +
                      guest.name.lastName.slice(1)
                    }`}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      display="flex"
                      alignItems="center"
                    >
                      <EmailIcon sx={{ marginRight: 0.5 }} />{" "}
                      {guest.contact.email}
                    </Typography>{" "}
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      display="flex"
                      alignItems="center"
                    >
                      <PhoneIcon sx={{ marginRight: 0.5 }} />{" "}
                      {guest.contact.phone}
                    </Typography>{" "}
                  </>
                }
              />
            </ListItem>
          </Grid>
        ))}
      </Grid>

      {/* Payment Information */}
      <Typography
        variant="h6"
        gutterBottom
        display="flex"
        alignItems="center"
        sx={{ marginTop: 2 }}
      >
        <PaymentIcon sx={{ marginRight: 0.5 }} /> Payment Details
      </Typography>
      <Grid container spacing={2}>
        {payments.map((payment, index) => (
          <Grid item key={index} xs={12} sm={6}>
            <ListItem sx={{ marginBottom: 2 }}>
              <ListItemText
                primary={
                  <Typography variant="body1" color="primary">
                    {`Payment ${index + 1}`}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography variant="subtitle2" color="textSecondary">
                      Method:
                    </Typography>{" "}
                    {payment.method}
                    <br />
                    <Typography variant="subtitle2" color="textSecondary">
                      Card Number:
                    </Typography>{" "}
                    {payment.card.cardNumber}
                  </>
                }
              />
            </ListItem>
          </Grid>
        ))}
      </Grid>

      {/* Room Information with Special Requests */}
      {!rooms.every((room) =>
        Object.values(room).every((value) => value === undefined)
      ) &&
        rooms.some((room) => !_.isEmpty(room)) && (
          <Typography
            variant="h6"
            gutterBottom
            display="flex"
            alignItems="center"
            sx={{ marginTop: 2 }}
          >
            <RoomIcon sx={{ marginRight: 0.5 }} />{" "}
            {rooms.length === 1 ? "Room" : "Rooms"} Details
          </Typography>
        )}
      {!rooms.every((room) =>
        Object.values(room).every((value) => value === undefined)
      ) &&
        rooms.some((room) => !_.isEmpty(room)) && (
          <Grid container spacing={2}>
            {rooms.map((room, index) => (
              <Grid item key={index} xs={12} sm={6}>
                <ListItem sx={{ marginBottom: 2 }}>
                  <ListItemText
                    primary={
                      <Typography variant="body1" color="primary">
                        {`Room ${index + 1}`}
                      </Typography>
                    }
                    secondary={
                      <>
                        {room.guestIds && room.guestIds.length > 0 && (
                          <Typography variant="subtitle2" color="textSecondary">
                            Guests:
                          </Typography>
                        )}{" "}
                        {room.guestIds &&
                          room.guestIds.length > 0 &&
                          room.guestIds
                            .map(
                              (guestId) =>
                                guests.find((guest) => guest.id === guestId)
                                  .name.firstName
                            )
                            .map(
                              (name) =>
                                name.charAt(0).toUpperCase() + name.slice(1)
                            )
                            .join(", ")}
                        {room.guestIds && room.guestIds.length > 0 && <br />}
                        {room.specialRequest && (
                          <>
                            <Typography
                              variant="subtitle2"
                              color="textSecondary"
                            >
                              Special Request:
                            </Typography>{" "}
                            {room.specialRequest}
                          </>
                        )}
                      </>
                    }
                  />
                </ListItem>
              </Grid>
            ))}
          </Grid>
        )}
    </Paper>
  );

  return (
    <DashboardLayout>
      <Page title={pageTitle}>
        <Container>
          {isBookingsHotelsPath && (
            <Button
              size="small"
              color="inherit"
              onClick={handleGoBack}
              startIcon={<Iconify icon={"eva:arrow-ios-back-fill"} />}
              sx={{ mb: 3 }}
            >
              Back
            </Button>
          )}
          {loading ? (
            <LoadingBookingConfirmation />
          ) : bookingNotFound ? (
            <BookingNotFound />
          ) : (
            <BookingConfirmation />
          )}
          {!bookingNotFound && <BookMoreOrReturnHome />}
        </Container>
      </Page>
    </DashboardLayout>
  );
};

export default HotelBookingConfirmation;
