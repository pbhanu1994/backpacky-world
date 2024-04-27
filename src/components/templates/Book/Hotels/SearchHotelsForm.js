import React, { useState, useEffect } from "react";
import { Paper, TextField, Button, Grid, MenuItem } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import DatePickerRange from "../../../atoms/DatePickerRange";
import Iconify from "../../../atoms/Iconify";
import CityAirportSearchField from "../../../atoms/CityAirportSearchField";
import { PAGE_PATH } from "../../../../constants/navigationConstants";
import { fDateWithYMD } from "../../../../utils/formatTime";

const SearchHotelsForm = ({
  hidePaper = false,
  loading = null,
  onToggleSearchForm,
}) => {
  const router = useRouter();
  const { query } = router;

  const [destination, setDestination] = useState(query.destination ?? "");
  const [checkInDate, setCheckInDate] = useState(
    dayjs(query.checkInDate || new Date())
  );
  const [checkOutDate, setCheckOutDate] = useState(
    dayjs(query.checkOutDate || new Date())
  );
  const [numRooms, setNumRooms] = useState(query.numRooms ?? 1);
  const [numGuests, setNumGuests] = useState(query.numGuests ?? 1);
  const [showLoadingButton, setShowLoadingButton] = useState(loading ?? false);
  const [searchHotelsFormError, setSearchHotelFormError] = useState({
    destination: false,
    checkInDate: false,
    checkOutDate: false,
  });

  useEffect(() => {
    setShowLoadingButton(loading);
  }, [loading]);

  const handleCheckInCheckOutDate = ([checkInDate, checkOutDate]) => {
    setCheckInDate(checkInDate);
    setCheckOutDate(checkOutDate);
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
    setShowLoadingButton(false);
    return false;
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (onToggleSearchForm) onToggleSearchForm();

    // Validate the form
    const errors = validateForm();
    if (errors) return;
    setShowLoadingButton(true);

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
            <CityAirportSearchField
              inputValue={destination}
              city
              onDestinationSelected={(value) => setDestination(value)}
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
          <Grid item xs={12} sm={12}>
            <DatePickerRange
              value={[checkInDate, checkOutDate]}
              onDateChange={(date) => handleCheckInCheckOutDate(date)}
              startText="Check In"
              endText="Check out"
              disablePast
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
            {showLoadingButton ? (
              <LoadingButton
                fullWidth
                loading
                size="large"
                loadingPosition="start"
                variant="contained"
                startIcon={
                  <Iconify icon={"mdi:hotel-outline"} width={20} height={20} />
                }
              >
                Searching Hotels...
              </LoadingButton>
            ) : (
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
            )}
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default SearchHotelsForm;
