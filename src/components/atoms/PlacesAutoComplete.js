import React, { useState } from "react";
import {
  Autocomplete,
  CircularProgress,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import fetchPlacesAutocomplete from "../../utils/googlePlacesApi";
import { LOADING_STATES } from "../../constants/loadingStates";

const PlacesAutocompleteField = ({
  inputValue,
  cities = false,
  onInputValueChange,
  label,
  error,
  helperText,
  autoFocus,
}) => {
  const [loadingState, setLoadingState] = useState(LOADING_STATES.INITIAL);
  const [options, setOptions] = useState([]);

  const handleLocationInputChange = async (event, value) => {
    setLoadingState(LOADING_STATES.LOADING);
    onInputValueChange(value);

    try {
      const results = await fetchPlacesAutocomplete(value, cities);
      setOptions(results);

      if (results.length > 0) {
        setLoadingState(LOADING_STATES.LOADED);
      } else {
        setLoadingState(LOADING_STATES.NO_RESULTS);
      }
    } catch (err) {
      console.error("API call error:", err);
      setLoadingState(LOADING_STATES.ERROR);
    }
  };

  return (
    <Autocomplete
      freeSolo
      disableClearable
      options={options.map((option) => ({
        label: option.name,
      }))}
      inputValue={inputValue}
      onInputChange={handleLocationInputChange}
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
            <Box display="flex" alignItems="center">
              <Typography>{option.label}</Typography>
            </Box>
          </li>
        );
      }}
    />
  );
};

export default PlacesAutocompleteField;
