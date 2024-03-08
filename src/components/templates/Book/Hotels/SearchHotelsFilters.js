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
import SearchHotelsForm from "./SearchHotelsForm";
import { fDate } from "../../../../utils/formatTime";

export const SearchHotelsFilters = ({
  loading,
  destination,
  checkInDate,
  checkOutDate,
  numRooms,
  numGuests,
  showSearchForm,
  onToggleSearchForm,
}) => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const filterItems = [
    { label: "Destination", value: destination, xs: 12, md: 3 },
    { label: "Check-In", value: fDate(checkInDate), xs: 6, md: 2 },
    { label: "Check-Out", value: fDate(checkOutDate), xs: 6, md: 2 },
    { label: "Rooms", value: numRooms, xs: 6, md: 2 },
    { label: "Guests", value: numGuests, xs: 6, md: 2 },
  ];
  const FilterItem = ({ label, value, xs, md }) => (
    <Grid item xs={xs} md={md}>
      <Typography variant="h6">{label}</Typography>
      <Typography variant="body1">{value}</Typography>
    </Grid>
  );

  return (
    <Stack
      spacing={2}
      direction={{ xs: "column" }}
      sx={{
        p: 3,
        bgcolor: "background.neutral",
        borderRadius: 2,
        alignItems: "baseline",
      }}
    >
      <Grid container item spacing={2} alignItems="center">
        {filterItems.map(({ label, value, xs, md }, index) => (
          <FilterItem key={index} label={label} value={value} xs={xs} md={md} />
        ))}
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
      </Grid>
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
      {showSearchForm && (
        <SearchHotelsForm
          hidePaper
          loading={loading}
          onToggleSearchForm={onToggleSearchForm}
        />
      )}
    </Stack>
  );
};
