import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const HotelCard = ({ hotel }) => {
  return (
    <Card sx={{ my: 1.6 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {hotel.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {hotel.address.countryCode}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Distance: {hotel.distance.value} {hotel.distance.unit}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Latitude: {hotel.geoCode.latitude}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Longitude: {hotel.geoCode.longitude}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default HotelCard;
