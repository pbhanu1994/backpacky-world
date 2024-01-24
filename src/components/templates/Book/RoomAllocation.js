import React from "react";
import {
  Grid,
  Stack,
  Card,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
} from "@mui/material";

export const RoomAllocation = ({
  guests,
  guestRooms,
  roomQuantity,
  errors,
  touched,
  handleBlur,
  handleRoomChange,
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
            <Typography variant="subtitle1">Room Allocation</Typography>
            <Typography variant="caption">
              *Ensure that all rooms are selected.
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="flex-start" spacing={2}>
            <TableContainer component={Paper}>
              {/* Display all error messages */}
              {touched && errors && (
                <Stack
                  sx={{
                    padding: "0.5rem",
                    marginBottom: "0.5rem",
                    backgroundColor: "#ffeeee", // Light red background
                    border: "1px solid #ff5454", // Red border
                    borderRadius: "0.5rem",
                  }}
                >
                  {Object.entries(errors).map(([roomKey, errorMessage]) => (
                    <Typography key={roomKey} color="error" variant="body2">
                      {errorMessage}
                    </Typography>
                  ))}
                </Stack>
              )}
              <Table>
                <TableBody>
                  {guests.map((guest, guestIndex) => (
                    <TableRow key={`guest${guestIndex + 1}`}>
                      <TableCell>
                        <Typography color="primary" variant="subtitle1">
                          Guest {guestIndex + 1}{" "}
                          {guest.name.firstName && `(${guest.name.firstName})`}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <RadioGroup
                          row
                          name={`selectedRooms[${guestIndex}]`}
                          value={guestRooms[guestIndex + 1] || ""}
                          onChange={(e) =>
                            handleRoomChange(
                              guestIndex + 1,
                              Number(e.target.value)
                            )
                          }
                          onBlur={handleBlur}
                        >
                          {Array.from(
                            { length: roomQuantity },
                            (_, roomIndex) => (
                              <FormControlLabel
                                key={roomIndex + 1}
                                value={(roomIndex + 1).toString()}
                                control={<Radio />}
                                label={`Room ${roomIndex + 1}`}
                              />
                            )
                          )}
                        </RadioGroup>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </Stack>
      </Box>
    </Card>
  </Grid>
);
