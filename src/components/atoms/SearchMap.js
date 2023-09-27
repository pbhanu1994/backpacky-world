import React, { useState } from "react";
import { GoogleMap, MarkerF, InfoWindow } from "@react-google-maps/api";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const SearchMap = ({ defaultLatAndLong, places }) => {
  const [selectedPlace, setSelectedPlace] = useState(undefined);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { lat, lng } = defaultLatAndLong;

  const containerStyle = {
    width: "100%",
    height: isMobile ? "240px" : "100%",
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat, lng }}
      zoom={15}
    >
      {places.length > 0 &&
        places.map((place, index) => (
          <MarkerF
            key={`marker-${index}`}
            position={{ lat: place.lat, lng: place.lng }}
            onClick={() => {
              place === selectedPlace
                ? setSelectedPlace(undefined)
                : setSelectedPlace(place);
            }}
          />
        ))}
      {selectedPlace && (
        <InfoWindow
          position={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
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
            <Typography variant="h5">{selectedPlace.name}</Typography>
            <Typography variant="h6">{selectedPlace.address}</Typography>
          </Box>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default SearchMap;
