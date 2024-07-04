import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  CircularProgress,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { useDispatch } from "react-redux";
import Iconify from "./Iconify";
import { LOADING_STATES } from "../../constants/loadingStates";
import { ENVIRONMENTS } from "../../constants/environments";
import useCurrentEnvironment from "../../hooks/useCurrentEnvironment";
import { getCityAirportDetails } from "../../services/flight/cityAirportSearch";

const CityAirportSearchField = ({
  city = false,
  airport = false,
  inputValue,
  onChange = () => {},
  onSelected,
  label,
  error,
  helperText,
  autoFocus,
}) => {
  const [searchTerm, setSearchTerm] = useState(inputValue ?? "");
  const [loadingState, setLoadingState] = useState(LOADING_STATES.INITIAL);
  const [options, setOptions] = useState([]);

  const dispatch = useDispatch();
  const currentEnv = useCurrentEnvironment();

  const isDevEnv = currentEnv === ENVIRONMENTS.DEVELOPMENT;

  useEffect(() => {
    onChange(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    let delayApiCall;

    const getCitySuggestions = async () => {
      try {
        const results = await getCityAirportDetails(
          dispatch,
          searchTerm,
          city,
          airport
        );
        setOptions(results);

        if (results.length > 0) {
          setLoadingState(LOADING_STATES.LOADED);
        } else {
          setLoadingState(LOADING_STATES.NO_RESULTS);
        }
      } catch (err) {
        console.error("Error occurred:", err.message);
        setLoadingState(LOADING_STATES.ERROR);
      }
    };

    if (searchTerm && !searchTerm.includes(",")) {
      setLoadingState(LOADING_STATES.LOADING);

      if (isDevEnv) {
        delayApiCall = setTimeout(() => {
          getCitySuggestions();
        }, 100);
      } else {
        getCitySuggestions();
      }
    } else {
      setOptions([]);
    }

    return () => clearTimeout(delayApiCall);
  }, [searchTerm]);

  const handleCityAddressSelected = (cityAddressDetails) => {
    onSelected(cityAddressDetails);
  };

  return (
    <Autocomplete
      freeSolo
      disableClearable
      options={options.map((option) => ({
        cityAddress: option,
        label: `${option.name}, ${
          option.address.stateCode
            ? `${option.address.stateCode}, ${option.address.countryCode}`
            : option.address.countryCode
        }`,
      }))}
      inputValue={searchTerm}
      onInputChange={(e, value) => setSearchTerm(value)}
      onChange={(e, value) => handleCityAddressSelected(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          label={label}
          variant="outlined"
          color="primary"
          autoFocus={autoFocus}
          error={error}
          helperText={error && helperText}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loadingState === LOADING_STATES.LOADING ? (
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
            <Box display="flex" alignItems="center" gap={2}>
              <Iconify icon={"mdi:map-marker"} width={20} height={20} />
              <Box>
                <Typography fontWeight={600}>
                  {option.cityAddress.name}
                </Typography>
                <Typography color="GrayText">
                  {option.cityAddress.address.stateCode
                    ? `${option.cityAddress.address.stateCode}, ${option.cityAddress.address.countryName}`
                    : option.cityAddress.address.countryName}
                </Typography>
              </Box>
            </Box>
          </li>
        );
      }}
    />
  );
};

export default CityAirportSearchField;
