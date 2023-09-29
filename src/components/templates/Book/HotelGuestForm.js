import React from "react";
import {
  Stack,
  FormControl,
  InputLabel,
  Typography,
  Select,
  MenuItem,
  TextField,
  IconButton,
} from "@mui/material";
import Iconify from "../../atoms/Iconify";

export const HotelGuestForm = ({
  guest,
  index,
  numOfGuests,
  handleTitleChange,
  handleFirstNameChange,
  handleLastNameChange,
  handleEmailChange,
  handlePhoneChange,
  removeGuest,
}) => {
  const { name, contact } = guest;

  return (
    <Stack spacing={2}>
      {numOfGuests > 1 && (
        <Stack
          direction={{ xs: "row" }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography color="primary" variant="subtitle1">
            Guest {index + 1}
          </Typography>
          <IconButton
            size="small"
            color="error"
            onClick={() => removeGuest(index)}
          >
            <Iconify icon={"eva:trash-2-outline"} />
          </IconButton>
        </Stack>
      )}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <FormControl fullWidth>
          <InputLabel>Title</InputLabel>
          <Select
            label="Title"
            value={name.title}
            onChange={handleTitleChange}
            fullWidth
          >
            <MenuItem value="Mr">Mr.</MenuItem>
            <MenuItem value="Ms">Ms.</MenuItem>
            <MenuItem value="Mrs">Mrs.</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="First Name"
          value={name.firstName}
          onChange={handleFirstNameChange}
        />
        <TextField
          fullWidth
          label="Last Name"
          value={name.lastName}
          onChange={handleLastNameChange}
        />
      </Stack>
      <Stack spacing={2}>
        <TextField
          fullWidth
          label="Email"
          value={contact.email}
          onChange={handleEmailChange}
        />
        <TextField
          fullWidth
          label="Phone Number"
          value={contact.phone}
          onChange={handlePhoneChange}
        />
      </Stack>
    </Stack>
  );
};
