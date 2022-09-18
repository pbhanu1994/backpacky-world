import React, { useState, useEffect, memo } from "react";
import DatePicker from "@mui/lab/DatePicker";
import { Stack, TextField, InputAdornment } from "@mui/material";
import _ from "lodash";
import { RHFTextField } from "/src/components/hook-form";
import { fDecimalNumber } from "/src/utils/formatNumber";

export default memo(function PersonalIncomeSavings({
  personalIncomeData,
  getBudgetData,
  onGetBudgetData,
  onHandleSaveBtnChange,
}) {
  const { date: pDate } =
    _.find(personalIncomeData, (obj) => obj.id === "personalIncomeDate") || {};
  const { income: pIncome } =
    _.find(personalIncomeData, (obj) => obj.id === "personalIncomeIncome") ||
    {};
  const { savings: pSavings } =
    _.find(personalIncomeData, (obj) => obj.id === "personalIncomeSavings") ||
    {};
  const { other: pOther } =
    _.find(personalIncomeData, (obj) => obj.id === "personalIncomeOther") || {};

  const [personalIncomeDate, setPersonalIncomeDate] = useState(
    new Date(pDate) || new Date()
  );
  const [personalIncome, setPersonalIncome] = useState(pIncome);
  const [personalSavings, setPersonalSavings] = useState(pSavings);
  const [personalOtherSavings, setPersonalOtherSavings] = useState(pOther);

  const personalIncomeTotal = () => {
    return (
      (personalIncome || 0) +
      (personalSavings || 0) +
      (personalOtherSavings || 0)
    );
  };

  useEffect(() => {
    onGetBudgetData({
      personalIncome: {
        date: personalIncomeDate,
        income: personalIncome,
        savings: personalSavings,
        other: personalOtherSavings,
      },
    });
  }, [getBudgetData]);

  return (
    <Stack
      spacing={2}
      direction={{ xs: "column", sm: "row" }}
      sx={{ p: 3, bgcolor: "background.neutral" }}
    >
      <DatePicker
        label="Date"
        value={personalIncomeDate}
        onChange={(newValue) => {
          setPersonalIncomeDate(newValue);
          onHandleSaveBtnChange();
        }}
        inputFormat="dd/MM/yyyy"
        renderInput={(params) => <TextField {...params} fullWidth />}
      />

      <RHFTextField
        type="number"
        name="income"
        label="Income"
        placeholder="0.00"
        value={personalIncome}
        onChange={(event) => {
          setPersonalIncome(
            event.target.value ? Number(event.target.value) : ""
          );
          onHandleSaveBtnChange();
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
      />
      <RHFTextField
        type="number"
        name="savings"
        label="Savings"
        placeholder="0.00"
        value={personalSavings}
        onChange={(event) => {
          setPersonalSavings(
            event.target.value ? Number(event.target.value) : ""
          );
          onHandleSaveBtnChange();
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
      />
      <RHFTextField
        type="number"
        name="other"
        label="Other"
        placeholder="0.00"
        value={personalOtherSavings}
        onChange={(event) => {
          setPersonalOtherSavings(
            event.target.value ? Number(event.target.value) : ""
          );
          onHandleSaveBtnChange();
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
      />
      <RHFTextField
        disabled
        name="total"
        label="Total"
        value={fDecimalNumber(personalIncomeTotal())}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
      />
    </Stack>
  );
});
