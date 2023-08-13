import React, { useState } from "react";
import { Paper, TextField, Button, Grid, MenuItem } from "@mui/material";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Iconify from "../../atoms/Iconify";
import PlacesAutocompleteField from "../../atoms/PlacesAutoComplete";
import { PAGE_PATH } from "../../../constants/navigationConstants";
import { fDateWithYMD } from "../../../utils/formatTime";

const SearchHotelsForm = ({ hidePaper = false }) => {
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

  const router = useRouter();

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

    const searchData = {
      destination,
      checkInDate: fDateWithYMD(checkInDate),
      checkOutDate: fDateWithYMD(checkOutDate),
      numRooms,
      numGuests,
    };

    router.push({
      pathname: PAGE_PATH.BOOK_HOTELS,
      query: searchData,
    });
  };

  return (
    <Paper
      elevation={hidePaper ? 0 : 3}
      sx={{
        width: "100%",
        padding: 3,
        bgcolor: hidePaper && "background.neutral",
      }}
    >
      <form onSubmit={handleSearch}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <PlacesAutocompleteField
              inputValue={destination}
              cities
              onInputValueChange={(value) => setDestination(value)}
              label="Destination"
              autoFocus
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
              startIcon={
                <Iconify icon={"mdi:hotel-outline"} width={20} height={20} />
              }
              fullWidth
              type="submit"
            >
              Search Hotels
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default SearchHotelsForm;
