import React, { useState } from "react";
import {
  Paper,
  Box,
  TextField,
  Typography,
  Autocomplete,
  Button,
  Grid,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import fetchPlacesAutocomplete from "../../../utils/googlePlacesApi";

const SearchHotelsForm = () => {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
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

  const handleLocationInputChange = async (event, value) => {
    setLoading(true);
    setDestination(value);

    try {
      const results = await fetchPlacesAutocomplete(value);
      setOptions(results);
      setSearchHotelFormError(false);
    } finally {
      setLoading(false);
    }
  };

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
            <Autocomplete
              freeSolo
              disableClearable
              options={options.map((option) => ({
                label: option.name,
              }))}
              inputValue={destination}
              onInputChange={handleLocationInputChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  label="Destination"
                  variant="outlined"
                  color="primary"
                  autoFocus
                  error={searchHotelsFormError.destination}
                  helperText={
                    searchHotelsFormError.destination &&
                    "Please enter a valid destination"
                  }
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
              renderOption={(props, option) => {
                return (
                  <li {...props}>
                    <Box display="flex" alignItems="center">
                      <Typography>{option.label}</Typography>
                    </Box>
                  </li>
                );
              }}
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
