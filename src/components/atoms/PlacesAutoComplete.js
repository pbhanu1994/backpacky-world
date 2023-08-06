import React, { useState } from "react";
import {
  Autocomplete,
  CircularProgress,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import fetchPlacesAutocomplete from "../../utils/googlePlacesApi";

const PlacesAutocompleteField = ({
  inputValue,
  onInputValueChange,
  label,
  error,
  helperText,
}) => {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const handleLocationInputChange = async (event, value) => {
    setLoading(true);
    onInputValueChange(value);

    try {
      const results = await fetchPlacesAutocomplete(value);
      setOptions(results);
    } finally {
      setLoading(false);
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
          autoFocus
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
