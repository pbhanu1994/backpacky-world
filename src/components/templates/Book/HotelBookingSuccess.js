import React from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
} from "@mui/material";

const hotelBookingSuccessfulStyles = () => ({
  container: {
    display: "flex",
    justifyContent: "center",
  },
  card: {
    maxWidth: 400,
    padding: (theme) => theme.spacing(3),
    textAlign: "center",
  },
  button: {
    marginTop: (theme) => theme.spacing(3),
  },
});

export const HotelBookingSuccess = ({ bookingSuccessData }) => {
  const classes = hotelBookingSuccessfulStyles();

  const { id, providerConfirmationId } = bookingSuccessData[0];
  const { reference, originSystemCode } =
    bookingSuccessData[0].associatedRecords[0];

  return (
    <Container sx={classes.container}>
      <Card sx={classes.card} elevation={3}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Booking Confirmation
          </Typography>
          <Typography variant="body1">
            Your hotel booking has been confirmed.
          </Typography>
          <Stack spacing={1} sx={{ paddingTop: 2 }}>
            <Typography variant="body2" gutterBottom>
              <Typography variant="subtitle1">Booking ID:</Typography> {id}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <Typography variant="subtitle1">
                Provider Confirmation ID:
              </Typography>{" "}
              {providerConfirmationId}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <Typography variant="subtitle1">Reference:</Typography>{" "}
              {reference}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <Typography variant="subtitle1">Origin System Code:</Typography>{" "}
              {originSystemCode}
            </Typography>
          </Stack>
          <Button
            variant="contained"
            color="primary"
            href="/"
            fullWidth
            sx={classes.button}
          >
            Return to Home
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};
