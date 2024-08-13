import PropTypes from "prop-types";
import {
  Stack,
  Box,
  Chip,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Iconify from "../../atoms/Iconify";
import DeleteIcon from "@mui/icons-material/Delete";

const INPUT_WIDTH = 160;

HotelsBookingsTableToolbar.propTypes = {
  tableDataCount: PropTypes.number,
  filterKeyword: PropTypes.string,
  filterCheckInDate: PropTypes.instanceOf(Date),
  filterCheckOutDate: PropTypes.instanceOf(Date),
  onFilterName: PropTypes.func,
  onfilterCheckInDate: PropTypes.func,
  onfilterCheckOutDate: PropTypes.func,
  onClearCheckInDate: PropTypes.func,
  onClearCheckOutDate: PropTypes.func,
  onClearKeyword: PropTypes.func,
  onClearAll: PropTypes.func,
};

export default function HotelsBookingsTableToolbar({
  tableDataCount,
  filterCheckInDate,
  filterCheckOutDate,
  filterKeyword,
  onFilterName,
  onfilterCheckInDate,
  onfilterCheckOutDate,
  onClearCheckInDate,
  onClearCheckOutDate,
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
          label="Check-In"
          format="DD/MM/YYYY"
          value={filterCheckInDate}
          onChange={onfilterCheckInDate}
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
          label="Check-Out"
          format="DD/MM/YYYY"
          value={filterCheckOutDate}
          onChange={onfilterCheckOutDate}
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
          placeholder="Booking ref or Guest name or Hotel name or City..."
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
      </Stack>
      {(filterCheckInDate || filterCheckOutDate || filterKeyword) && (
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
            {filterCheckInDate && (
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
                  Check-In:
                </Typography>
                <Chip
                  size="small"
                  label={new Date(filterCheckInDate).toLocaleDateString([], {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                  onDelete={onClearCheckInDate}
                />
              </Box>
            )}

            {filterCheckOutDate && (
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
                  Check-Out:
                </Typography>
                <Chip
                  size="small"
                  label={new Date(filterCheckOutDate).toLocaleDateString([], {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                  onDelete={onClearCheckOutDate}
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
