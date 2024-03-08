import React from "react";
import {
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";

export const GuestForm = ({
  guestIndex,
  hotelGuests,
  errors,
  touched,
  handleTitleChange,
  handleFirstNameChange,
  handleLastNameChange,
  handleEmailChange,
  handlePhoneChange,
}) => (
  <Stack spacing={2}>
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
      <FormControl fullWidth>
        <InputLabel>Title</InputLabel>
        <Select
          label="Title"
          value={hotelGuests[guestIndex].name.title}
          onChange={(e) => handleTitleChange(e, guestIndex)}
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
        value={hotelGuests[guestIndex].name.firstName}
        error={Boolean(
          touched &&
            touched[guestIndex]?.name?.firstName &&
            errors &&
            errors[guestIndex]?.name?.firstName
        )}
        helperText={
          touched &&
          touched[guestIndex]?.name?.firstName &&
          errors &&
          errors[guestIndex]?.name?.firstName
        }
        onChange={(e) => handleFirstNameChange(e, guestIndex)}
      />
      <TextField
        fullWidth
        label="Last Name"
        value={hotelGuests[guestIndex].name.lastName}
        error={Boolean(
          touched &&
            touched[guestIndex]?.name?.lastName &&
            errors &&
            errors[guestIndex]?.name?.lastName
        )}
        helperText={
          touched &&
          touched[guestIndex]?.name?.lastName &&
          errors &&
          errors[guestIndex]?.name?.lastName
        }
        onChange={(e) => handleLastNameChange(e, guestIndex)}
      />
    </Stack>
    <Stack spacing={2}>
      <TextField
        fullWidth
        label="Email"
        value={hotelGuests[guestIndex].contact.email}
        error={Boolean(
          touched &&
            touched[guestIndex]?.contact?.email &&
            errors &&
            errors[guestIndex]?.contact?.email
        )}
        helperText={
          touched &&
          touched[guestIndex]?.contact?.email &&
          errors &&
          errors[guestIndex]?.contact?.email
        }
        onChange={(e) => handleEmailChange(e, guestIndex)}
      />
      <TextField
        fullWidth
        label="Phone Number"
        value={hotelGuests[guestIndex].contact.phone}
        error={Boolean(
          touched &&
            touched[guestIndex]?.contact?.phone &&
            errors &&
            errors[guestIndex]?.contact?.phone
        )}
        helperText={
          touched &&
          touched[guestIndex]?.contact?.phone &&
          errors &&
          errors[guestIndex]?.contact?.phone
        }
        onChange={(e) => handlePhoneChange(e, guestIndex)}
      />
    </Stack>
  </Stack>
);
