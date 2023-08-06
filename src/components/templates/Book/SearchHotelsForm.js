import React, { useState } from "react";
import { Paper, TextField, Button, Grid, MenuItem } from "@mui/material";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import PlacesAutocompleteField from "../../atoms/PlacesAutoComplete";

const SearchHotelsForm = () => {
  const [destination, setDestination] = useState("");
  const [checkInDate, setCheckInDate] = useState(dayjs(new Date()));
  const [checkOutDate, setCheckOutDate] = useState(dayjs(new Date()));
  const [numRooms, setNumRooms] = useState(1);
  const [numGuests, setNumGuests] = useState(1);
  const [searchHotelsFormError, setSearchHotelFormError] = useState({
    destination: false,
    checkInDate: false,
    checkOutDate: false,
  });

  const validateForm = () => {
    const parsedCheckInDate = new Date(checkInDate);
    const parsedCheckOutDate = new Date(checkOutDate);

    const isEmptyCheckInDate =
      isNaN(parsedCheckInDate) ||
      parsedCheckInDate.toString() === "Invalid Date";
    const isEmptyCheckOutDate =
      isNaN(parsedCheckOutDate) ||
      parsedCheckOutDate.toString() === "Invalid Date";

    if (!destination) {
      setSearchHotelFormError((prevState) => ({
        ...prevState,
        destination: true,
      }));
      return true;
    }
    if (isEmptyCheckInDate) {
      setSearchHotelFormError((prevState) => ({
        ...prevState,
        checkInDate: true,
      }));
      return true;
    }
    if (isEmptyCheckOutDate) {
      setSearchHotelFormError((prevState) => ({
        ...prevState,
        checkOutDate: true,
      }));
      return true;
    }

    return false;
  };

  const handleSearch = (e) => {
    e.preventDefault();

    // Validate the form
    const errors = validateForm();
    if (errors) return;

    // Perform hotel search based on form inputs
    console.log("Search parameters:", {
      destination,
      checkInDate,
      checkOutDate,
      numRooms,
      numGuests,
    });
  };

  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      <form onSubmit={handleSearch}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <PlacesAutocompleteField
              inputValue={destination}
              onInputValueChange={(value) => setDestination(value)}
              label="Destination"
              error={!destination && searchHotelsFormError.destination}
              helperText={
                !destination &&
                searchHotelsFormError.destination &&
                "Please enter a valid destination city"
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              label="Check in"
              onChange={(dateValue) => setCheckInDate(dateValue)}
              value={checkInDate}
              format="DD/MM/YYYY"
              sx={{ width: "100%" }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              label="Check out"
              onChange={(dateValue) => setCheckOutDate(dateValue)}
              value={checkOutDate}
              format="DD/MM/YYYY"
              sx={{ width: "100%" }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Number of Rooms"
              fullWidth
              value={numRooms}
              onChange={(e) => setNumRooms(e.target.value)}
              required
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <MenuItem key={num} value={num}>
                  {num} {`${num === 1 ? "Room" : "Rooms"}`}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Number of Guests"
              fullWidth
              value={numGuests}
              onChange={(e) => setNumGuests(e.target.value)}
              required
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <MenuItem key={num} value={num}>
                  {num} {`${num === 1 ? "Guest" : "Guests"}`}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              size="large"
              color="primary"
              fullWidth
              type="submit"
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default SearchHotelsForm;
