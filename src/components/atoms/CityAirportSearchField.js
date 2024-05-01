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
  const [loading, setLoading] = useState(false);
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
      } catch (err) {
        console.error("Error occurred:", err.message);
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm && !searchTerm.includes(",")) {
      setLoading(true);

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

  const handleCityAddressSelected = (destinationDetails) => {
    onSelected(destinationDetails);
  };

  return (
    <Autocomplete
      freeSolo
      disableClearable
      options={options.map((option) => ({
        destination: option,
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
            <Box display="flex" alignItems="center" gap={2}>
              <Iconify icon={"mdi:map-marker"} width={20} height={20} />
              <Box>
                <Typography fontWeight={600}>
                  {option.destination.name}
                </Typography>
                <Typography color="GrayText">
                  {option.destination.address.stateCode
                    ? `${option.destination.address.stateCode}, ${option.destination.address.countryName}`
                    : option.destination.address.countryName}
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
