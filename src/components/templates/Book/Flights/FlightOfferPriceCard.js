import React from "react";
import { Card, CardContent, Typography, Divider, Grid } from "@mui/material";
import { formatCurrency } from "../../../../utils/formatCurrency";

const FlightOfferPriceCard = ({ price, isReturn }) => {
  const { currency, total, base, fees, grandTotal, additionalServices } = price;

  return (
    <Card sx={{ marginY: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Price summary
        </Typography>
        <Divider />

        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 2 }}
        >
          <Grid container item>
            <Typography variant="h6" gutterBottom>
              {!isReturn ? "One Way Flight" : "Return Flights"}
            </Typography>
          </Grid>
          <Typography variant="body1">1 x Adult fare</Typography>
          <Typography variant="body1">
            {formatCurrency(base, currency)}
          </Typography>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {fees.map((fee, index) => (
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            sx={{ mt: 2 }}
            key={index}
          >
            <Typography variant="body1">
              {fee.type.replace(/_/g, " ")}
            </Typography>
            <Typography variant="body1">
              {formatCurrency(fee.amount, currency)}
            </Typography>
          </Grid>
        ))}

        {additionalServices?.map((service, index) => (
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            sx={{ mt: 2 }}
            key={index}
          >
            <Typography variant="body1">
              {service.type.replace(/_/g, " ")}
            </Typography>
            <Typography variant="body1">
              {formatCurrency(service.amount, currency)}
            </Typography>
          </Grid>
        ))}

        <Divider sx={{ my: 2 }} />

        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 2 }}
        >
          <Typography variant="body1" fontWeight="bold">
            Includes taxes and fees
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {formatCurrency(total, currency)}
          </Typography>
        </Grid>

        <Divider sx={{ my: 2, borderColor: "black" }} />

        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h5" fontWeight="bold">
            Total
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            {formatCurrency(grandTotal, currency)}
          </Typography>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default FlightOfferPriceCard;
