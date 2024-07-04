import React from "react";
import { Card, CardContent, Typography, Grid, Divider } from "@mui/material";
import { fDate } from "../../../../utils/formatTime";
import { formatISODuration } from "../../../../utils/formatTime";
import { formatCurrency } from "../../../../utils/formatCurrency";

const FlightInfo = ({ offer }) => {
  const { id, source, lastTicketingDate, itineraries, travelerPricings } =
    offer;

  const renderSegment = (segment, index) => (
    <Grid container spacing={2} key={index} sx={{ mt: 1 }}>
      <Grid item xs={6}>
        <Typography variant="h5">
          Departure: {segment.departure.iataCode} Terminal:{" "}
          {segment.departure.terminal}
        </Typography>
        <Typography variant="h6">
          At:{" "}
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
          })}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h5">
          Arrival: {segment.arrival.iataCode} Terminal:{" "}
          {segment.arrival.terminal}
        </Typography>
        <Typography variant="h6">
          At:{" "}
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
          })}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1">Carrier: {segment.carrierCode}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1">Flight Number: {segment.number}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1">
          Aircraft: {segment.aircraft.code}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1">
          Duration: {formatISODuration(segment.duration)}
        </Typography>
      </Grid>
    </Grid>
  );

  return (
    <Card variant="outlined" sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Flight Offer ID: {id}
        </Typography>
        <Typography variant="body1">Source: {source}</Typography>
        <Typography variant="body1">
          Last Ticketing Date: {fDate(lastTicketingDate)}
        </Typography>

        <Typography variant="h6" sx={{ mt: 2 }}>
          Itinerary
        </Typography>
        {itineraries.map((itinerary, index) => (
          <div key={index}>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Segment {index + 1}
            </Typography>
            {itinerary.segments.map(renderSegment)}
          </div>
        ))}

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6">Traveler Pricing</Typography>
        {travelerPricings.map((traveler, index) => (
          <>
            <Typography variant="body1">
              <Typography
                variant="body1"
                component="span"
                sx={{ fontWeight: "bold" }}
              >
                Traveler ID:
              </Typography>{" "}
              {traveler.travelerId}
            </Typography>
            <Typography variant="body1">
              <Typography
                variant="body1"
                component="span"
                sx={{ fontWeight: "bold" }}
              >
                Type:
              </Typography>{" "}
              {traveler.travelerType}
            </Typography>
            <Typography variant="body1">
              <Typography
                variant="body1"
                component="span"
                sx={{ fontWeight: "bold" }}
              >
                Fare Option:
              </Typography>{" "}
              {traveler.fareOption}
            </Typography>
            <Typography variant="body1">
              <Typography
                variant="body1"
                component="span"
                sx={{ fontWeight: "bold" }}
              >
                Price:
              </Typography>{" "}
              {formatCurrency(traveler.price.total, traveler.price.currency)}
            </Typography>
            <Typography variant="body1">
              <Typography
                variant="body1"
                component="span"
                sx={{ fontWeight: "bold" }}
              >
                Base Price:
              </Typography>{" "}
              {formatCurrency(traveler.price.base, traveler.price.currency)}
            </Typography>
            <Typography variant="body1">
              <Typography
                variant="body1"
                component="span"
                sx={{ fontWeight: "bold" }}
              >
                Taxes:
              </Typography>
            </Typography>
            {traveler.price.taxes.map((tax, idx) => (
              <Typography component="span" key={idx} display="block">
                {tax.code}:{" "}
                {formatCurrency(tax.amount, traveler.price.currency)}
              </Typography>
            ))}
            <Divider sx={{ my: 1 }} />
          </>
        ))}
      </CardContent>
    </Card>
  );
};

export default FlightInfo;
