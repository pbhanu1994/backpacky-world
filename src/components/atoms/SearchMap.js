import React, { useState } from "react";
import {
  LoadScript,
  GoogleMap,
  MarkerF,
  InfoWindow,
} from "@react-google-maps/api";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const SearchMap = ({ defaultLatAndLong, places = [] }) => {
  const [selectedPlace, setSelectedPlace] = useState(undefined);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { lat, lng } = defaultLatAndLong ?? { lat: "", lng: "" };

  const containerStyle = {
    width: "100%",
    height: isMobile ? "260px" : "100%",
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat, lng }}
        zoom={15}
      >
        {places.length > 0 &&
          places.map((place, index) => (
            <MarkerF
              key={`marker-${index}`}
              position={{ lat: place.latitude, lng: place.longitude }}
              onClick={() => {
                place === selectedPlace
                  ? setSelectedPlace(undefined)
                  : setSelectedPlace(place);
              }}
            />
          ))}
        {selectedPlace && (
          <InfoWindow
            position={{
              lat: selectedPlace.latitude,
              lng: selectedPlace.longitude,
            }}
            zIndex={1}
            options={{
              pixelOffset: {
                width: 0,
                height: -40,
              },
            }}
            onCloseClick={() => setSelectedPlace(undefined)}
          >
            <Box>
              <Typography variant="h6">{selectedPlace.name}</Typography>
              <Typography variant="body2">{selectedPlace.address}</Typography>
            </Box>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default SearchMap;
