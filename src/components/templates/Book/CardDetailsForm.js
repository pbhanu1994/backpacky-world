import React from "react";
import {
  Box,
  Stack,
  Card,
  Typography,
  TextField,
  InputAdornment,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Iconify from "../../atoms/Iconify";

const CardDetailsForm = ({
  cardType,
  formattedCardNumber,
  formattedExpiryDate,
  errors,
  touched,
  handleCardNumberChange,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Card variant="outlined">
      <Box
        sx={{
          padding: 3,
          borderRadius: 1,
          bgcolor: "background.neutral",
        }}
      >
        <Stack spacing={3}>
          <Stack>
            <Typography variant="subtitle1">Enter Card Details</Typography>
            <Typography variant="caption">
              Please be assured that your provided card details will solely be
              utilized for hotel record-keeping purposes, and no immediate
              payment will be processed at this time.
            </Typography>
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              style={{ width: isMobile ? "100%" : "70%" }}
              label="Card number"
              name="cardNumber"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Iconify icon={`logos:${cardType}`} />
                  </InputAdornment>
                ),
              }}
              value={formattedCardNumber}
              error={Boolean(
                touched &&
                  touched[0]?.card.cardNumber &&
                  errors &&
                  errors[0]?.card?.cardNumber
              )}
              helperText={
                touched &&
                touched[0]?.card.cardNumber &&
                errors &&
                errors[0]?.card?.cardNumber
              }
              onChange={handleCardNumberChange}
            />
            <TextField
              style={{ width: isMobile ? "100%" : "30%" }}
              label="Expiration date"
              name="expiryDate"
              placeholder="MM/YY"
              value={formattedExpiryDate}
              error={Boolean(
                touched &&
                  touched[0]?.card.expiryDate &&
                  errors &&
                  errors[0]?.card?.expiryDate
              )}
              helperText={
                touched &&
                touched[0]?.card.expiryDate &&
                errors &&
                errors[0]?.card?.expiryDate
              }
              onChange={handleCardNumberChange}
            />
          </Stack>
        </Stack>
      </Box>
    </Card>
  );
};

export default CardDetailsForm;
