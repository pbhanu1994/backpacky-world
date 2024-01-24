import React from "react";
import { Grid, Box, Stack, Card, Typography, IconButton } from "@mui/material";
import Iconify from "../../atoms/Iconify";
import { GuestForm } from "./GuestForm";
import { AddItem } from "./AddItem";

export const HotelGuestForm = ({
  hotelGuests,
  numOfGuests,
  showAdditionalGuests,
  errors,
  touched,
  handleTitleChange,
  handleFirstNameChange,
  handleLastNameChange,
  handleEmailChange,
  handlePhoneChange,
  handleAddAdditionalGuests,
  handleRemoveHotelGuest,
}) => (
  <Grid item xs={12} md={8}>
    <Card variant="outlined">
      <Box
        sx={{
          padding: 3,
          borderRadius: 1,
        }}
      >
        <Stack spacing={3}>
          <Stack>
            <Typography variant="subtitle1">Enter Guest Details</Typography>
            <Typography variant="caption">
              Enter the details of guests that will be staying at the hotel.
              Please provide accurate information to ensure a smooth check-in
              process and a comfortable stay.
            </Typography>
          </Stack>
          {numOfGuests > 1 && (
            <Typography color="primary" variant="subtitle1">
              Guest 1
            </Typography>
          )}
          <GuestForm
            guestIndex={0}
            hotelGuests={hotelGuests}
            errors={errors}
            touched={touched}
            handleTitleChange={handleTitleChange}
            handleFirstNameChange={handleFirstNameChange}
            handleLastNameChange={handleLastNameChange}
            handleEmailChange={handleEmailChange}
            handlePhoneChange={handlePhoneChange}
          />

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
                (guest, guestNumberIndex) =>
                  guestNumberIndex > 0 && (
                    <React.Fragment key={guestNumberIndex}>
                      <Stack
                        direction={{ xs: "row" }}
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ paddingY: 1.2 }}
                      >
                        <Typography color="primary" variant="subtitle1">
                          Guest {guestNumberIndex + 1}
                        </Typography>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() =>
                            handleRemoveHotelGuest(guestNumberIndex)
                          }
                        >
                          <Iconify icon={"eva:trash-2-outline"} />
                        </IconButton>
                      </Stack>
                      <GuestForm
                        guestIndex={guestNumberIndex}
                        hotelGuests={hotelGuests}
                        errors={errors}
                        touched={touched}
                        handleTitleChange={handleTitleChange}
                        handleFirstNameChange={handleFirstNameChange}
                        handleLastNameChange={handleLastNameChange}
                        handleEmailChange={handleEmailChange}
                        handlePhoneChange={handlePhoneChange}
                      />
                    </React.Fragment>
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
      </Box>
    </Card>
  </Grid>
);
