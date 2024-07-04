import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Paper,
  TextField,
  Tabs,
  Tab,
  Button,
  Grid,
  MenuItem,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import useTabs from "../../../../hooks/useTabs";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DatePickerRange from "../../../atoms/DatePickerRange";
import Iconify from "../../../atoms/Iconify";
import CityAirportSearchField from "../../../atoms/CityAirportSearchField";
import { PAGE_PATH } from "../../../../constants/navigationConstants";
import {
  CABIN_CLASS,
  SEARCH_FLIGHT_TYPE,
} from "../../../../constants/flightBooking";
import { fDateWithYMD } from "../../../../utils/formatTime";
import addFromDetailsForFlight from "../../../../store/actions/book/flights/addFromDetails";
import addToDetailsForFlight from "../../../../store/actions/book/flights/addToDetails";

const SearchFlightsForm = ({
  hidePaper = false,
  loading = null,
  onToggleSearchForm,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { query } = router;

  const [from, setFrom] = useState(query.from ?? "");
  const [to, setTo] = useState(query.to ?? "");
  const [departDate, setDepartDate] = useState(
    dayjs(query.departDate || new Date())
  );
  const [returnDate, setReturnDate] = useState(
    dayjs(query.returnDate || new Date())
  );
  const [numAdults, setNumAdults] = useState(query.numAdults ?? 1);
  const [numChildren, setNumChildren] = useState(query.numChildren ?? 0);
  const [numInfants, setNumInfants] = useState(query.numInfants ?? 0);
  const [cabinClass, setCabinClass] = useState(
    CABIN_CLASS[query.cabinClass] ?? CABIN_CLASS.ECONOMY
  );
  const [showLoadingButton, setShowLoadingButton] = useState(loading ?? false);
  const [searchFlightsFormError, setSearchFlightsFormError] = useState({
    from: false,
    to: false,
    departDate: false,
    returnDate: false,
  });

  useEffect(() => {
    setShowLoadingButton(loading);
  }, [loading]);

  const { currentTab, onChangeTab } = useTabs(
    query.flightType ?? SEARCH_FLIGHT_TYPE.RETURN
  );

  const FLIGHT_TYPE_TABS = [
    {
      value: SEARCH_FLIGHT_TYPE.RETURN,
    },
    {
      value: SEARCH_FLIGHT_TYPE.ONE_WAY,
    },
  ];

  const CABIN_CLASS_TYPES = [
    CABIN_CLASS.ECONOMY,
    CABIN_CLASS.PREMIUM_ECONOMY,
    CABIN_CLASS.BUSINESS,
    CABIN_CLASS.FIRST,
  ];

  const cabinClassValue = Object.keys(CABIN_CLASS).find(
    (cabinClassKey) => CABIN_CLASS[cabinClassKey] === cabinClass
  );

  const matchedTab = FLIGHT_TYPE_TABS.find((tab) => tab.value === currentTab);

  const handleDepartReturnDate = ([departDate, returnDate]) => {
    setDepartDate(departDate);
    setReturnDate(returnDate);
  };

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
    setShowLoadingButton(false);
    return false;
  };

  const handleFromSelected = (fromDetails) => {
    setFrom(fromDetails.label);
    dispatch(addFromDetailsForFlight(fromDetails.cityAddress));
  };
  const handleToSelected = (toDetails) => {
    setTo(toDetails.label);
    dispatch(addToDetailsForFlight(toDetails.cityAddress));
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (onToggleSearchForm) onToggleSearchForm();

    // Validate the form
    const errors = validateForm();
    if (errors) return;
    setShowLoadingButton(true);

    const searchData = {
      from,
      to,
      departDate: fDateWithYMD(departDate),
      ...(currentTab === SEARCH_FLIGHT_TYPE.RETURN && {
        returnDate: fDateWithYMD(returnDate),
      }),
      numAdults,
      numChildren,
      numInfants,
      cabinClass: cabinClassValue,
      flightType: currentTab,
    };

    router.push({
      pathname: PAGE_PATH.BOOK_FLIGHTS,
      query: searchData,
    });
  };

  return (
    // TODO: Add Tabs to choose One Way or Round Trip
    <Paper
      elevation={hidePaper ? 0 : 3}
      sx={{
        width: "100%",
        padding: 3,
        bgcolor: hidePaper && "background.neutral",
      }}
    >
      <Tabs value={currentTab} onChange={onChangeTab} sx={{ mb: 3 }}>
        {FLIGHT_TYPE_TABS.map((tab) => (
          <Tab
            disableRipple
            key={tab.value}
            label={tab.value}
            value={tab.value}
          />
        ))}
      </Tabs>
      <form onSubmit={handleSearch}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <CityAirportSearchField
              inputValue={from}
              city
              onChange={(value) => setFrom(value)}
              onSelected={(fromDetails) => handleFromSelected(fromDetails)}
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
            <CityAirportSearchField
              inputValue={to}
              city
              onChange={(value) => setTo(value)}
              onSelected={(toDetails) => handleToSelected(toDetails)}
              label="To"
              error={!to && searchFlightsFormError.to}
              helperText={
                !to &&
                searchFlightsFormError.to &&
                "Please enter a valid destination city"
              }
            />
          </Grid>
          {matchedTab && matchedTab.value !== SEARCH_FLIGHT_TYPE.RETURN && (
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
          )}
          {matchedTab && matchedTab.value === SEARCH_FLIGHT_TYPE.RETURN && (
            <Grid item xs={12} sm={12}>
              <DatePickerRange
                value={[departDate, returnDate]}
                onDateChange={(date) => handleDepartReturnDate(date)}
                startText="Depart"
                endText="Return"
                disablePast
              />
            </Grid>
          )}
          {matchedTab && matchedTab.value === SEARCH_FLIGHT_TYPE.ONE_WAY && (
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Class"
                fullWidth
                value={cabinClass}
                onChange={(e) => setCabinClass(e.target.value)}
                required
              >
                {CABIN_CLASS_TYPES.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          )}
          <Grid item xs={12} sm={4}>
            <TextField
              select
              label="Adults (age 12 or older)"
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
          <Grid item xs={12} sm={4}>
            <TextField
              select
              label="Children (2 - 11 years)"
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
          <Grid item xs={12} sm={4}>
            <TextField
              select
              label="Infants (below 2 years)"
              fullWidth
              value={numInfants}
              onChange={(e) => setNumInfants(e.target.value)}
            >
              {[0, 1, 2, 3, 4, 5, 6, 7].map((num) => (
                <MenuItem key={num} value={num}>
                  {num} {`${num <= 1 ? "Infant" : "Infants"}`}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          {matchedTab && matchedTab.value === SEARCH_FLIGHT_TYPE.RETURN && (
            <Grid item xs={12}>
              <TextField
                select
                label="Class"
                fullWidth
                value={cabinClass}
                onChange={(e) => setCabinClass(e.target.value)}
                required
              >
                {CABIN_CLASS_TYPES.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          )}
          <Grid item xs={12}>
            {showLoadingButton ? (
              <LoadingButton
                fullWidth
                loading
                size="large"
                loadingPosition="start"
                variant="contained"
                startIcon={
                  <Iconify icon={"mdi:flight"} width={20} height={20} />
                }
              >
                Searching Flights...
              </LoadingButton>
            ) : (
              <Button
                variant="contained"
                size="large"
                color="primary"
                startIcon={
                  <Iconify icon={"mdi:flight"} width={20} height={20} />
                }
                fullWidth
                type="submit"
              >
                Search Flights
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default SearchFlightsForm;
