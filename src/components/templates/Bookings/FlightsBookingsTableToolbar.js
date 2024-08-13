import PropTypes from "prop-types";
import {
  Stack,
  Box,
  Chip,
  Button,
  InputAdornment,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Iconify from "../../atoms/Iconify";
import DeleteIcon from "@mui/icons-material/Delete";

const INPUT_WIDTH = 160;

FlightsBookingsTableToolbar.propTypes = {
  tableDataCount: PropTypes.number,
  filterKeyword: PropTypes.string,
  filterStatus: PropTypes.string,
  filterDepartureDate: PropTypes.instanceOf(Date),
  filterReturnDate: PropTypes.instanceOf(Date),
  onFilterName: PropTypes.func,
  onFilterReturnDate: PropTypes.func,
  onFilterStatus: PropTypes.func,
  optionsStatus: PropTypes.arrayOf(PropTypes.string),
  onClearDepartureDate: PropTypes.func,
  onClearReturnDate: PropTypes.func,
  onClearKeyword: PropTypes.func,
  onClearAll: PropTypes.func,
};

export default function FlightsBookingsTableToolbar({
  tableDataCount,
  optionsStatus,
  filterDepartureDate,
  filterReturnDate,
  filterKeyword,
  filterStatus,
  onFilterName,
  onFilterStatus,
  onFilterDepartureDate,
  onFilterReturnDate,
  onClearDepartureDate,
  onClearReturnDate,
  onClearKeyword,
  onClearAll,
}) {
  return (
    <>
      <Stack
        spacing={2}
        direction={{ xs: "column", md: "row" }}
        sx={{ py: 2.5, px: 3 }}
      >
        <DatePicker
          label="Departure"
          format="DD/MM/YYYY"
          value={filterDepartureDate}
          onChange={onFilterDepartureDate}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              sx={{
                maxWidth: { md: INPUT_WIDTH },
              }}
            />
          )}
        />

        <DatePicker
          label="Return"
          format="DD/MM/YYYY"
          value={filterReturnDate}
          onChange={onFilterReturnDate}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              sx={{
                maxWidth: { md: INPUT_WIDTH },
              }}
            />
          )}
        />

        <TextField
          fullWidth
          value={filterKeyword}
          onChange={(event) => onFilterName(event.target.value)}
          placeholder="Booking ref or Passenger name or Departure city or Arrival city..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify
                  icon={"eva:search-fill"}
                  sx={{ color: "text.disabled", width: 20, height: 20 }}
                />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          select
          label="Status"
          value={filterStatus}
          onChange={onFilterStatus}
          SelectProps={{
            MenuProps: {
              sx: { "& .MuiPaper-root": { maxHeight: 260 } },
            },
          }}
          sx={{
            maxWidth: { md: INPUT_WIDTH },
            textTransform: "capitalize",
          }}
        >
          {optionsStatus.map((option) => (
            <MenuItem
              key={option}
              value={option}
              sx={{
                mx: 1,
                my: 0.5,
                borderRadius: 0.75,
                typography: "body2",
                textTransform: "capitalize",
              }}
            >
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Stack>
      {(filterDepartureDate || filterReturnDate || filterKeyword) && (
        <Stack spacing={2} sx={{ pb: 2.5, px: 3 }}>
          <Box display="flex">
            <Typography fontSize={14} fontWeight={700} marginRight={0.2}>
              {tableDataCount}
            </Typography>
            <Typography
              fontSize={14}
              fontWeight={100}
              sx={{ color: "text.disabled" }}
            >
              results found
            </Typography>
          </Box>
          <Stack direction="row" alignItems="center">
            {filterDepartureDate && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "max-content",
                  border: "1px dashed #d0d0d0",
                  borderRadius: "8px",
                  padding: "10px 8px",
                  marginRight: "8px",
                }}
              >
                <Typography fontSize={14} fontWeight="500" marginRight={1}>
                  Departure:
                </Typography>
                <Chip
                  size="small"
                  label={new Date(filterDepartureDate).toLocaleDateString([], {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                  onDelete={onClearDepartureDate}
                />
              </Box>
            )}

            {filterReturnDate && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "max-content",
                  border: "1px dashed #d0d0d0",
                  borderRadius: "8px",
                  padding: "10px 8px",
                  marginRight: "8px",
                }}
              >
                <Typography fontSize={14} fontWeight="500" marginRight={1}>
                  Return:
                </Typography>
                <Chip
                  size="small"
                  label={new Date(filterReturnDate).toLocaleDateString([], {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                  onDelete={onClearReturnDate}
                />
              </Box>
            )}

            {filterKeyword && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "max-content",
                  border: "1px dashed #d0d0d0",
                  borderRadius: "8px",
                  padding: "10px 8px",
                  marginRight: "8px",
                }}
              >
                <Typography fontSize={14} fontWeight="500" marginRight={1}>
                  Keyword:
                </Typography>
                <Chip
                  size="small"
                  label={filterKeyword}
                  onDelete={onClearKeyword}
                />
              </Box>
            )}

            <Box>
              <Button
                color="error"
                variant="text"
                startIcon={<DeleteIcon />}
                onClick={onClearAll}
              >
                Clear
              </Button>
            </Box>
          </Stack>
        </Stack>
      )}
    </>
  );
}
