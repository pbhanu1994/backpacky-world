import React from "react";
import {
  Stack,
  Grid,
  Typography,
  IconButton,
  Divider,
  Button,
  useMediaQuery,
} from "@mui/material";
import { TuneSharp as FilterIcon } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import SearchFlightsForm from "./SearchFlightsForm";
import { fDate } from "../../../../utils/formatTime";
import {
  CABIN_CLASS,
  SEARCH_FLIGHT_TYPE,
} from "../../../../constants/flightBooking";

export const SearchFlightsFilters = ({
  loading,
  from,
  to,
  departDate,
  returnDate,
  numAdults,
  numChildren,
  numInfants,
  cabinClass,
  flightType,
  showSearchForm,
  onToggleSearchForm,
}) => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const commonItems = [
    { label: "From", value: from, xs: 12, md: 3 },
    { label: "To", value: to, xs: 12, md: 3 },
    { label: "Depart Date", value: fDate(departDate), xs: 12, md: 3 },
    { label: "Adults", value: numAdults, xs: 12, md: 3 },
    { label: "Children", value: numChildren, xs: 12, md: 3 },
    { label: "Infants", value: numInfants, xs: 12, md: 3 },
    {
      label: "Cabin Class",
      value: CABIN_CLASS[cabinClass],
      xs: 12,
      md: 3,
    },
  ];

  const filterItems =
    flightType === SEARCH_FLIGHT_TYPE.RETURN
      ? [
          ...commonItems,
          { label: "Return Date", value: fDate(returnDate), xs: 12, md: 3 },
        ]
      : commonItems;

  const FilterItem = ({ label, value, xs, md }) => (
    <Grid item xs={xs} md={md}>
      <Typography variant="h6">{label}</Typography>
      <Typography variant="body1">{value}</Typography>
    </Grid>
  );

  return (
    <>
      <Stack
        spacing={2}
        direction={{ xs: "column", sm: "row" }}
        alignItems="center"
        sx={{
          p: 3,
          bgcolor: "background.neutral",
          borderRadius: 2,
        }}
      >
        <Grid container item spacing={2} alignItems="center">
          {filterItems.map(({ label, value, xs, md }, index) => (
            <FilterItem
              key={index}
              label={label}
              value={value}
              xs={xs}
              md={md}
            />
          ))}
        </Grid>
        {!isMobile && (
          <Grid item xs={6} md={1}>
            <IconButton
              color={showSearchForm ? "primary" : "default"}
              onClick={onToggleSearchForm}
            >
              <FilterIcon />
            </IconButton>
          </Grid>
        )}
        {isMobile && (
          <>
            <Divider sx={{ padding: 1, width: "100%" }} />
            <Grid container xs={12} justifyContent="center">
              <Button onClick={onToggleSearchForm} startIcon={<FilterIcon />}>
                {!showSearchForm ? "Show" : "Hide"} Filters
              </Button>
            </Grid>
          </>
        )}
      </Stack>
      <Stack spacing={2}>
        {showSearchForm && (
          <SearchFlightsForm
            hidePaper
            loading={loading}
            onToggleSearchForm={onToggleSearchForm}
          />
        )}
      </Stack>
    </>
  );
};
