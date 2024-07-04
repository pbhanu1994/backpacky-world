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
  List,
  ListItem,
  ListItemText,
  Skeleton,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  Receipt as ReceiptIcon,
  Person as TravelerIcon,
  EmailOutlined as EmailIcon,
  PhoneIphoneOutlined as PhoneIcon,
  AttachMoneyOutlined as PriceIcon,
  FlightOutlined as FlightIcon,
  Book as DocumentIcon,
} from "@mui/icons-material";
import Iconify from "../../../atoms/Iconify";
import Page from "../../../atoms/Page";
import DashboardLayout from "../../../layouts/dashboard";
import { LOADING_STATES } from "../../../../constants/loadingStates";
import { PAGE_PATH } from "../../../../constants/navigationConstants";
import { formatCurrency } from "../../../../utils/formatCurrency";
import { fDate, formatISODuration } from "../../../../utils/formatTime";
import getFlightBookings from "../../../../store/actions/book/flights/bookings/getFlightBookings";

const FlightBookingConfirmation = ({ pageTitle }) => {
  const [bookingInfo, setBookingInfo] = useState({});
  const [loadingState, setLoadingState] = useState(LOADING_STATES.LOADING);

  const dispatch = useDispatch();
  const router = useRouter();
  const { query, asPath } = router;
  const { reference } = query;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const flightBookings = useSelector((state) => state.book.flights.bookings);

  const isBookFlightsConfirmationPath =
    asPath === `${PAGE_PATH.BOOK_FLIGHTS_CONFIRMATION}${reference}/`;

  const isBookingsFlightsPath =
    asPath === `${PAGE_PATH.BOOKINGS_FLIGHTS}${reference}/`;

  useEffect(() => {
    if (_.isEmpty(flightBookings)) {
      dispatch(getFlightBookings());
    } else {
      const existingBookingInfo = flightBookings[reference];

      if (existingBookingInfo) {
        setBookingInfo(existingBookingInfo);
        setLoadingState(LOADING_STATES.LOADED);
      } else {
        setLoadingState(LOADING_STATES.NO_RESULTS);
      }
    }
  }, [reference, flightBookings]);

  const handleGoBack = () => {
    router.back();
  };

  const handleGoBackToFlights = () => {
    router.push({
      pathname: PAGE_PATH.BOOK,
      query: { currentTab: "Flights" },
    });
  };

  const { bookingConfirmation, travelers, flightOffers, download } =
    bookingInfo;

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
          startIcon={<Iconify icon={"mdi:flight"} width={20} height={20} />}
          size={isMobile ? "large" : "medium"}
          fullWidth={isMobile}
          onClick={handleGoBackToFlights}
        >
          Book more
        </Button>
      </Grid>
      {isBookFlightsConfirmationPath && (
        <Grid item xs={isMobile && 12}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Iconify icon={"mdi:home"} width={20} height={20} />}
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
        Your booking for Flight Reference{" "}
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
        <Grid item xs={12} sm={6}>
          <ListItem sx={{ marginBottom: 2 }}>
            <ListItemText
              primary={
                <>
                  <Typography variant="h6" color="primary">
                    Reference
                  </Typography>
                  <Typography variant="body1" color="primary">
                    {bookingConfirmation.associatedRecords[0].reference}
                  </Typography>
                </>
              }
              secondary={
                <>
                  <Typography variant="subtitle2" color="textSecondary">
                    Creation Date:
                  </Typography>{" "}
                  {fDate(bookingConfirmation.associatedRecords[0].creationDate)}
                  <br />
                  <Typography variant="subtitle2" color="textSecondary">
                    Origin System Code:
                  </Typography>{" "}
                  {bookingConfirmation.associatedRecords[0].originSystemCode}
                </>
              }
            />
          </ListItem>
        </Grid>
      </Grid>

      <Typography
        variant="h6"
        gutterBottom
        display="flex"
        alignItems="center"
        sx={{ marginTop: 2 }}
      >
        <TravelerIcon sx={{ marginRight: 0.5 }} />{" "}
        {travelers.length === 1 ? "Traveler" : "Travelers"} Details
      </Typography>
      <Grid container spacing={2}>
        {travelers.map((traveler, index) => (
          <>
            <Grid item key={`travelerInfo-${index}`} xs={12} sm={6}>
              <List key={`traveler-${index}`}>
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
                        color="primary"
                        display="flex"
                        alignItems="center"
                      >
                        {`${
                          traveler.name.firstName.charAt(0).toUpperCase() +
                          traveler.name.firstName.slice(1)
                        } ${
                          traveler.name.lastName.charAt(0).toUpperCase() +
                          traveler.name.lastName.slice(1)
                        }`}{" "}
                        ({fDate(traveler.dateOfBirth)})
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
                          {traveler.contact.emailAddress}
                        </Typography>{" "}
                        <Typography
                          variant="subtitle2"
                          color="textSecondary"
                          display="flex"
                          alignItems="center"
                        >
                          <PhoneIcon sx={{ marginRight: 0.5 }} />{" "}
                          {`+${traveler.contact.phones[0].countryCallingCode} ${traveler.contact.phones[0].number}`}
                        </Typography>{" "}
                      </>
                    }
                  />
                </ListItem>
              </List>
            </Grid>

            <Grid key={`traveler-document-${index}`} item xs={12} sm={6}>
              <Typography
                variant="h6"
                gutterBottom
                display="flex"
                alignItems="center"
                sx={{ marginTop: 2 }}
              >
                <DocumentIcon sx={{ marginRight: 0.5 }} /> Document Information
              </Typography>
              <ListItem>
                <ListItemText
                  secondary={
                    <>
                      <Typography variant="subtitle2" color="primary">
                        Document Type:
                      </Typography>{" "}
                      {traveler.documents[0].documentType}
                      <Typography variant="subtitle2" color="primary">
                        Document Number:
                      </Typography>{" "}
                      {traveler.documents[0].number}
                      <Typography variant="subtitle2" color="primary">
                        Expiry Date:
                      </Typography>{" "}
                      {fDate(traveler.documents[0].expiryDate)}
                      <Typography variant="subtitle2" color="primary">
                        Issuance Country:
                      </Typography>{" "}
                      {traveler.documents[0].issuanceCountry}
                      <Typography variant="subtitle2" color="primary">
                        Issuance Location:
                      </Typography>{" "}
                      {traveler.documents[0].issuanceLocation}
                      <Typography variant="subtitle2" color="primary">
                        Nationality:
                      </Typography>{" "}
                      {traveler.documents[0].nationality}
                    </>
                  }
                />
              </ListItem>
            </Grid>
          </>
        ))}
      </Grid>

      <Typography
        variant="h6"
        gutterBottom
        display="flex"
        alignItems="center"
        sx={{ marginTop: 2 }}
      >
        <FlightIcon sx={{ marginRight: 0.5 }} /> Flight Itinerary
      </Typography>
      <Grid container spacing={2}>
        {bookingConfirmation.flightOffers[0].itineraries[0].segments.map(
          (segment, index) => (
            <Grid item key={`segment-${index}`} xs={12} sm={6}>
              <List key={`segmentInfo-${index}`}>
                <ListItem sx={{ marginBottom: 2 }}>
                  <ListItemText
                    primary={
                      <>
                        <Typography variant="subtitle2" color="primary">
                          Segment:
                        </Typography>{" "}
                        {segment.departure.iataCode} to{" "}
                        {segment.arrival.iataCode}
                      </>
                    }
                    secondary={
                      <>
                        <Typography variant="subtitle2" color="primary">
                          Departure:
                        </Typography>{" "}
                        {new Date(segment.departure.at).toLocaleDateString([], {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                        ,{" "}
                        {new Date(segment.departure.at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        from Terminal {segment.departure.terminal}
                        <Typography variant="subtitle2" color="primary">
                          Arrival:
                        </Typography>{" "}
                        {new Date(segment.arrival.at).toLocaleDateString([], {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                        ,{" "}
                        {new Date(segment.arrival.at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        at Terminal {segment.arrival.terminal}
                        <Typography variant="subtitle2" color="primary">
                          Carrier:
                        </Typography>{" "}
                        {segment.carrierCode} {segment.number}
                        <Typography variant="subtitle2" color="primary">
                          Aircraft:
                        </Typography>{" "}
                        {segment.aircraft.code}
                        <Typography variant="subtitle2" color="primary">
                          Duration:
                        </Typography>{" "}
                        {formatISODuration(segment.duration)}
                      </>
                    }
                  />
                </ListItem>
              </List>
            </Grid>
          )
        )}
      </Grid>

      <Typography
        variant="h6"
        gutterBottom
        display="flex"
        alignItems="center"
        sx={{ marginTop: 2 }}
      >
        <PriceIcon sx={{ marginRight: 0.5 }} /> Pricing Information
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <ListItem sx={{ marginBottom: 2 }}>
            <ListItemText
              secondary={
                <>
                  <Typography variant="subtitle2" color="primary">
                    Total Price:
                  </Typography>{" "}
                  {formatCurrency(
                    bookingConfirmation.flightOffers[0].price.total,
                    bookingConfirmation.flightOffers[0].price.currency
                  )}
                  <Typography variant="subtitle2" color="primary">
                    Base Price:
                  </Typography>{" "}
                  {formatCurrency(
                    bookingConfirmation.flightOffers[0].price.base,
                    bookingConfirmation.flightOffers[0].price.currency
                  )}
                  <Typography variant="subtitle2" color="primary">
                    Fees:
                  </Typography>{" "}
                  {bookingConfirmation.flightOffers[0].price.fees.map(
                    (fee, index) => (
                      <Typography key={`fee-${index}`}>
                        {fee.type.replace(/_/g, " ")}:{" "}
                        {formatCurrency(
                          fee.amount,
                          bookingConfirmation.flightOffers[0].price.currency
                        )}
                      </Typography>
                    )
                  )}
                  <Typography variant="subtitle2" color="primary">
                    Grand Total:
                  </Typography>{" "}
                  {formatCurrency(
                    bookingConfirmation.flightOffers[0].price.grandTotal,
                    bookingConfirmation.flightOffers[0].price.currency
                  )}
                </>
              }
            />
          </ListItem>
        </Grid>
      </Grid>
    </Paper>
  );

  return (
    <DashboardLayout>
      <Page title={pageTitle}>
        <Container>
          {isBookingsFlightsPath && (
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
          {loadingState === LOADING_STATES.LOADING ? (
            <LoadingBookingConfirmation />
          ) : loadingState === LOADING_STATES.NO_RESULTS ? (
            <BookingNotFound />
          ) : (
            <BookingConfirmation />
          )}
          {loadingState !== LOADING_STATES.NO_RESULTS && (
            <BookMoreOrReturnHome />
          )}
        </Container>
      </Page>
    </DashboardLayout>
  );
};

export default FlightBookingConfirmation;
