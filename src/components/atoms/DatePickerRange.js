import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

const DatePickerRange = ({
  value,
  onDateChange,
  startText,
  endText,
  disablePast,
}) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DateRangePicker
      disablePast={disablePast}
      value={value}
      format="DD/MM/YYYY"
      onChange={(newValue) => {
        onDateChange(newValue);
      }}
      localeText={{ start: startText, end: endText }}
    />
  </LocalizationProvider>
);

export default DatePickerRange;
