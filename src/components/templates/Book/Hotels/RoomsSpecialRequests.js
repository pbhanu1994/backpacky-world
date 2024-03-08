import React from "react";
import {
  Grid,
  Box,
  Stack,
  Card,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import Iconify from "../../../atoms/Iconify";
import { AddItem } from "./AddItem";

export const RoomSpecialRequests = ({
  roomQuantity,
  specialRequests,
  handleAddSpecialRequests,
  handleRemoveSpecialRequest,
  handleSpecialRequestChange,
}) => (
  <Grid item xs={12} md={8}>
    {specialRequests.length > 0 && (
      <Card variant="outlined">
        <Box
          sx={{
            padding: 3,
            borderRadius: 1,
          }}
        >
          <Stack spacing={3}>
            <Stack>
              <Typography variant="subtitle1">
                Special Requests{" "}
                <Typography variant="caption">(optional)</Typography>
              </Typography>
              <Typography variant="caption">
                Do you have any special requests or preferences for your stay?
                Let us know how we can make your stay more enjoyable. Whether
                it's a bottle of champagne, extra towels, or any other request,
                we're here to assist you.
              </Typography>
            </Stack>
            {specialRequests.map((room, specialRequestIndex) => (
              <Stack key={specialRequestIndex}>
                <Stack
                  direction={{ xs: "row" }}
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ paddingY: 1.2 }}
                >
                  <Typography color="primary" variant="subtitle1">
                    {`Special Request for Room${
                      roomQuantity === 1 ? "" : ` ${specialRequestIndex + 1}`
                    }`}
                  </Typography>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() =>
                      handleRemoveSpecialRequest(specialRequestIndex)
                    }
                  >
                    <Iconify icon={"eva:trash-2-outline"} />
                  </IconButton>
                </Stack>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Special Requests"
                  variant="outlined"
                  placeholder="Enter your special requests here..."
                  value={specialRequests[specialRequestIndex]?.specialRequest}
                  onChange={(event) =>
                    handleSpecialRequestChange(event, specialRequestIndex)
                  }
                />
              </Stack>
            ))}
            {specialRequests.length < roomQuantity && (
              <AddItem
                itemName="Special Request"
                onAddItem={() => handleAddSpecialRequests(true)}
              />
            )}
          </Stack>
        </Box>
      </Card>
    )}
    {specialRequests.length === 0 && (
      <AddItem
        itemName="Special Requests"
        onAddItem={() => handleAddSpecialRequests(false)}
      />
    )}
  </Grid>
);
