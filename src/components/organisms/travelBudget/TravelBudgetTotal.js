import React, { memo } from "react";
import { Stack, InputAdornment } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { RHFTextField } from "/src/components/hook-form";
import { fDecimalNumber } from "/src/utils/formatNumber";

export default memo(function TravelBudgetBudgetData({
  savingsTotal,
  beforeILeaveTotal,
  destinationsTotal,
}) {
  return (
    <Stack
      spacing={2}
      direction={{ xs: "column", sm: "row" }}
      sx={{
        p: 3,
        bgcolor: (theme) =>
          alpha(
            `${
              beforeILeaveTotal + destinationsTotal <= savingsTotal
                ? theme.palette.primary.main
                : theme.palette.error.main
            }`,
            0.08
          ),
      }}
    >
      <RHFTextField
        disabled
        type="text"
        name="income"
        label="Income / Savings / Other"
        placeholder="0.00"
        value={fDecimalNumber(savingsTotal)}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
      />
      <RHFTextField
        disabled
        type="text"
        name="savings"
        label="Before I Leave"
        placeholder="0.00"
        value={fDecimalNumber(beforeILeaveTotal)}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
      />
      <RHFTextField
        disabled
        type="text"
        name="destinations"
        label="Destinations"
        placeholder="0.00"
        value={fDecimalNumber(destinationsTotal)}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
      />
      <RHFTextField
        disabled
        type="text"
        name="total"
        label="Total (Before I Leave + Destinations)"
        value={fDecimalNumber(beforeILeaveTotal + destinationsTotal)}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
      />
    </Stack>
  );
});
