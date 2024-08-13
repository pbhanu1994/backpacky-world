import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import { TableRow, TableCell, Typography } from "@mui/material";
import FlightIcon from "@mui/icons-material/Flight";
import Label from "../../atoms/Label";
import { TableMoreMenu } from "../../atoms/table";
import { TICKETING_AGREEMENT_OPTION_TYPE } from "../../../constants/flightBooking";

FlightsBookingsTableRow.propTypes = {
  actions: PropTypes.node,
  row: PropTypes.object.isRequired,
  onViewRow: PropTypes.func,
};

export default function FlightsBookingsTableRow({ actions, row, onViewRow }) {
  const theme = useTheme();

  const {
    bookingRef,
    createdDate,
    passengers,
    flightSegments,
    departureCity,
    arrivalCity,
    departureDate,
    returnDate,
    ticketingAgreementOption,
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
        {new Date(createdDate).toLocaleDateString([], {
          day: "numeric",
          month: "short",
          year: "2-digit",
        })}
      </TableCell>

      <TableCell align="left">
        {passengers.map((passenger) => (
          <span style={{ textTransform: "capitalize" }}>{passenger}</span>
        ))}
      </TableCell>

      <TableCell align="left">
        {flightSegments.map((segment, i) => {
          const [departure, arrivalAndCode] = segment.split("::FLIGHT_ICON::");
          const [arrival, code] = arrivalAndCode.split("::NEW_LINE::");
          return (
            <div>
              <span
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {departure} <FlightIcon sx={{ rotate: "90deg", width: 14 }} />
                {arrival}
              </span>
              <span>{code}</span>
            </div>
          );
        })}
      </TableCell>

      <TableCell align="left">{departureCity}</TableCell>

      <TableCell align="left">{arrivalCity}</TableCell>

      <TableCell align="left">
        {new Date(departureDate).toLocaleDateString([], {
          day: "numeric",
          month: "short",
          year: "2-digit",
        })}
      </TableCell>

      <TableCell align="left">
        {returnDate
          ? new Date(returnDate).toLocaleDateString([], {
              day: "numeric",
              month: "short",
              year: "2-digit",
            })
          : "-"}
      </TableCell>

      <TableCell align="left">
        <Label
          variant={theme.palette.mode === "light" ? "ghost" : "filled"}
          color={
            (ticketingAgreementOption ===
              TICKETING_AGREEMENT_OPTION_TYPE.CONFIRM &&
              "success") ||
            (ticketingAgreementOption ===
              TICKETING_AGREEMENT_OPTION_TYPE.DELAY_TO_QUEUE &&
              "warning") ||
            (ticketingAgreementOption ===
              TICKETING_AGREEMENT_OPTION_TYPE.DELAY_TO_CANCEL &&
              "error") ||
            "default"
          }
          sx={{ textTransform: "capitalize" }}
        >
          {TICKETING_AGREEMENT_OPTION_TYPE[ticketingAgreementOption]}
        </Label>
      </TableCell>

      <TableCell align="right">
        <TableMoreMenu actions={actions} />
      </TableCell>
    </TableRow>
  );
}
