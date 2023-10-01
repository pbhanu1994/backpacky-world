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
import { AddItem } from "./AddItem";

export const HotelGuestForm = ({
  hotelGuests,
  numOfGuests,
  handleTitleChange,
  handleFirstNameChange,
  handleLastNameChange,
  handleEmailChange,
  handlePhoneChange,
  showAdditionalGuests,
  handleAddAdditionalGuests,
  handleRemoveHotelGuest,
}) => {
  return (
    <Stack spacing={2}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <FormControl fullWidth>
          <InputLabel>Title</InputLabel>
          <Select
            label="Title"
            value={hotelGuests[0].name.title}
            onChange={(e) => handleTitleChange(e, 0)}
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
          value={hotelGuests[0].name.firstName}
          onChange={(e) => handleFirstNameChange(e, 0)}
        />
        <TextField
          fullWidth
          label="Last Name"
          value={hotelGuests[0].name.lastName}
          onChange={(e) => handleLastNameChange(e, 0)}
        />
      </Stack>
      <Stack spacing={2}>
        <TextField
          fullWidth
          label="Email"
          value={hotelGuests[0].contact.email}
          onChange={handleEmailChange}
        />
        <TextField
          fullWidth
          label="Phone Number"
          value={hotelGuests[0].contact.phone}
          onChange={handlePhoneChange}
        />
      </Stack>

      {/* Additional Guests */}
      {numOfGuests > 1 && showAdditionalGuests && (
        <Stack>
          {hotelGuests.length !== 1 && (
            <Stack sx={{ paddingY: 1 }}>
              <Typography variant="subtitle1">
                Additional Guests{" "}
                <Typography variant="caption">(optional)</Typography>
              </Typography>
              <Typography variant="caption">
                Do you want to add your guests' names to this reservation?
                Please provide any additional guest names below:
              </Typography>
            </Stack>
          )}

          {hotelGuests.map(
            (guest, index) =>
              index > 0 && (
                <>
                  <Stack
                    direction={{ xs: "row" }}
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ paddingY: 1.2 }}
                  >
                    <Typography color="primary" variant="subtitle1">
                      Guest {index}
                    </Typography>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleRemoveHotelGuest(index)}
                    >
                      <Iconify icon={"eva:trash-2-outline"} />
                    </IconButton>
                  </Stack>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <FormControl fullWidth>
                      <InputLabel>Title</InputLabel>
                      <Select
                        label="Title"
                        value={guest.name.title}
                        onChange={(e) => handleTitleChange(e, index)}
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
                      value={guest.name.firstName}
                      onChange={(e) => handleFirstNameChange(e, index)}
                    />
                    <TextField
                      fullWidth
                      label="Last Name"
                      value={guest.name.lastName}
                      onChange={(e) => handleLastNameChange(e, index)}
                    />
                  </Stack>
                </>
              )
          )}
        </Stack>
      )}
      {numOfGuests > 1 && hotelGuests.length === 1 ? (
        <AddItem
          itemName="Additional Guests"
          onAddItem={() => handleAddAdditionalGuests(false)}
        />
      ) : (
        numOfGuests - 1 !== hotelGuests.length - 1 && (
          <AddItem
            itemName="Additional Guest"
            onAddItem={() => handleAddAdditionalGuests(true)}
          />
        )
      )}
    </Stack>
  );
};
