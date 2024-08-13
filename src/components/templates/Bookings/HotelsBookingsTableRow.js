import PropTypes from "prop-types";
import { TableRow, TableCell, Typography } from "@mui/material";
import { TableMoreMenu } from "../../atoms/table";

HotelsBookingsTableRow.propTypes = {
  actions: PropTypes.node,
  onViewRow: PropTypes.func,
  row: PropTypes.object.isRequired,
};

export default function HotelsBookingsTableRow({ actions, row, onViewRow }) {
  const {
    bookingRef,
    createdAt,
    guests,
    hotelName,
    city,
    checkInDate,
    checkOutDate,
  } = row;

  return (
    <TableRow hover onClick={onViewRow} sx={{ cursor: "pointer" }}>
      <TableCell>
        <Typography
          variant="subtitle2"
          noWrap
          sx={{
            color: "text.disabled",
            textTransform: "capitalize",
          }}
        >
          {bookingRef}
        </Typography>
      </TableCell>

      <TableCell align="left">
        {new Date(createdAt).toLocaleDateString([], {
          day: "numeric",
          month: "short",
          year: "2-digit",
        })}
      </TableCell>

      <TableCell align="left">
        {guests.map((guest) => (
          <span style={{ textTransform: "capitalize" }}>{guest}</span>
        ))}
      </TableCell>

      <TableCell align="left">{hotelName}</TableCell>

      <TableCell align="left">{city}</TableCell>

      <TableCell align="left">
        {new Date(checkInDate).toLocaleDateString([], {
          day: "numeric",
          month: "short",
          year: "2-digit",
        })}
      </TableCell>

      <TableCell align="left">
        {new Date(checkOutDate).toLocaleDateString([], {
          day: "numeric",
          month: "short",
          year: "2-digit",
        })}
      </TableCell>

      <TableCell align="right">
        <TableMoreMenu actions={actions} />
      </TableCell>
    </TableRow>
  );
}
