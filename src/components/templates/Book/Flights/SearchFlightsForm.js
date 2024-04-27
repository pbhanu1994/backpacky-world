import React, { useState } from "react";
import { capitalCase } from "change-case";
import {
  Paper,
  TextField,
  Tabs,
  Tab,
  Button,
  Grid,
  MenuItem,
} from "@mui/material";
import useTabs from "../../../../hooks/useTabs";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import PlacesAutocompleteField from "../../../atoms/PlacesAutoComplete";

const SearchFlightType = {
  ONE_WAY: "One Way",
  RETURN: "Return",
};

const SearchFlightsForm = ({ hidePaper = false }) => {
  const router = useRouter();
  const query = router.query;

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departDate, setDepartDate] = useState(dayjs(new Date()));
  const [returnDate, setReturnDate] = useState(dayjs(new Date()));
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(0);
  const [cabinClass, setCabinClass] = useState("Economy");
  const [searchFlightsFormError, setSearchFlightsFormError] = useState({
    from: false,
    to: false,
    departDate: false,
    returnDate: false,
  });
  const { currentTab, onChangeTab } = useTabs(SearchFlightType.RETURN);

  const FLIGHT_TYPE_TABS = [
    {
      value: SearchFlightType.RETURN,
    },
    {
      value: SearchFlightType.ONE_WAY,
    },
  ];

  const matchedTab = FLIGHT_TYPE_TABS.find((tab) => tab.value === currentTab);

  const validateForm = () => {
    const parsedDepartDate = new Date(departDate);
    const parsedReturnDate = new Date(returnDate);

    const isEmptyDepartDate =
      isNaN(parsedDepartDate) || parsedDepartDate.toString() === "Invalid Date";
    const isEmptyReturnDate =
      isNaN(parsedReturnDate) || parsedReturnDate.toString() === "Invalid Date";

    if (!from) {
      setSearchFlightsFormError((prevState) => ({
        ...prevState,
        from: true,
      }));
      return true;
    }
    if (!to) {
      setSearchFlightsFormError((prevState) => ({
        ...prevState,
        to: true,
      }));
      return true;
    }
    if (isEmptyDepartDate) {
      setSearchFlightsFormError((prevState) => ({
        ...prevState,
        departDate: true,
      }));
      return true;
    }
    if (isEmptyReturnDate) {
      setSearchFlightsFormError((prevState) => ({
        ...prevState,
        returnDate: true,
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

    // Perform flight search based on form inputs
    console.log("Search parameters:", {
      from,
      to,
      departDate,
      returnDate,
      numAdults,
      numChildren,
      cabinClass,
    });
  };

  return (
    // TODO: Add Tabs to choose One Way or Round Trip
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Tabs value={currentTab} onChange={onChangeTab} sx={{ mb: 3 }}>
        {FLIGHT_TYPE_TABS.map((tab) => (
          <Tab
            disableRipple
            key={tab.value}
            label={capitalCase(tab.value)}
            value={tab.value}
          />
        ))}
      </Tabs>
      <form onSubmit={handleSearch}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <PlacesAutocompleteField
              inputValue={from}
              cities
              onInputValueChange={(value) => setFrom(value)}
              label="From"
              autoFocus
              error={!from && searchFlightsFormError.from}
              helperText={
                !from &&
                searchFlightsFormError.from &&
                "Please enter a valid from city"
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PlacesAutocompleteField
              inputValue={to}
              cities
              onInputValueChange={(value) => setTo(value)}
              label="To"
              error={!to && searchFlightsFormError.to}
              helperText={
                !to &&
                searchFlightsFormError.to &&
                "Please enter a valid destination city"
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              label="Depart"
              onChange={(dateValue) => setDepartDate(dateValue)}
              value={departDate}
              format="DD/MM/YYYY"
              sx={{ width: "100%" }}
              disablePast
              required
            />
          </Grid>
          {matchedTab && matchedTab.value === SearchFlightType.RETURN && (
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Return"
                onChange={(dateValue) => setReturnDate(dateValue)}
                value={returnDate}
                format="DD/MM/YYYY"
                sx={{ width: "100%" }}
                disablePast
              />
            </Grid>
          )}
          {matchedTab && matchedTab.value === SearchFlightType.ONE_WAY && (
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Class"
                fullWidth
                value={cabinClass}
                onChange={(e) => setCabinClass(e.target.value)}
                required
              >
                {[
                  "Cabin",
                  "Economy",
                  "Premium Economy",
                  "Business",
                  "First",
                ].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          )}
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Adults"
              fullWidth
              value={numAdults}
              onChange={(e) => setNumAdults(e.target.value)}
              required
            >
              {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                <MenuItem key={num} value={num}>
                  {num} {`${num === 1 ? "Adult" : "Adults"}`}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Children"
              fullWidth
              value={numChildren}
              onChange={(e) => setNumChildren(e.target.value)}
            >
              {[0, 1, 2, 3, 4, 5, 6, 7].map((num) => (
                <MenuItem key={num} value={num}>
                  {num} Children
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          {matchedTab && matchedTab.value === SearchFlightType.RETURN && (
            <Grid item xs={12}>
              <TextField
                select
                label="Class"
                fullWidth
                value={cabinClass}
                onChange={(e) => setCabinClass(e.target.value)}
                required
              >
                {[
                  "Cabin",
                  "Economy",
                  "Premium Economy",
                  "Business",
                  "First",
                ].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          )}
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

export default SearchFlightsForm;
