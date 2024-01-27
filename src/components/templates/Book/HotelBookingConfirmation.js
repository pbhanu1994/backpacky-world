import React from "react";
import {
  Grid,
  Stack,
  Card,
  CardContent,
  Typography,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const HotelBookingConfirmation = ({ bookingSuccessData }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" align="center" gutterBottom>
          Booking Confirmation
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          Your hotel booking has been confirmed.
        </Typography>
      </Grid>

      {bookingSuccessData.map(
        ({ id, providerConfirmationId, associatedRecords }, index) => (
          <Grid item key={index} xs={12} md={6}>
            <Card
              sx={{
                width: "100%",
                maxWidth: isMobile ? "100%" : 600,
                padding: (theme) => theme.spacing(3),
                textAlign: "center",
              }}
              elevation={3}
            >
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="body2" gutterBottom>
                    <Typography variant="subtitle1">Booking ID:</Typography>{" "}
                    {id}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <Typography variant="subtitle1">
                      Provider Confirmation ID:
                    </Typography>{" "}
                    {providerConfirmationId}
                  </Typography>

                  {associatedRecords.map((record, recordIndex) => (
                    <React.Fragment key={recordIndex}>
                      <Typography variant="body2" gutterBottom>
                        <Typography variant="subtitle1">Reference:</Typography>{" "}
                        {record.reference}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <Typography variant="subtitle1">
                          Origin System Code:
                        </Typography>{" "}
                        {record.originSystemCode}
                      </Typography>
                    </React.Fragment>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        )
      )}

      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Button
          variant="contained"
          color="primary"
          size={isMobile ? "large" : "medium"}
          fullWidth={isMobile}
          href="/"
        >
          Return to Home
        </Button>
      </Grid>
    </Grid>
  );
};
