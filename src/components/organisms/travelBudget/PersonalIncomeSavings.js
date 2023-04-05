import React, { useState, useEffect, memo } from "react";
import dayjs from "dayjs";
import _ from "lodash";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Stack, InputAdornment } from "@mui/material";
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
    dayjs(new Date(pDate) || new Date())
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
      sx={{ p: 3, bgcolor: "background.neutral", alignItems: "baseline" }}
    >
      <DatePicker
        label="Date"
        value={personalIncomeDate}
        format="DD/MM/YYYY"
        sx={{ width: "100%" }}
        onChange={(newValue) => {
          setPersonalIncomeDate(newValue);
          onHandleSaveBtnChange();
        }}
      />

      <RHFTextField
        type="number"
        name="income"
        label="Income"
        placeholder="0.00"
        value={personalIncome === 0 ? "" : personalIncome}
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
        value={personalSavings === 0 ? "" : personalSavings}
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
        value={personalOtherSavings === 0 ? "" : personalOtherSavings}
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
