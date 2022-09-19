import { useState, useEffect, memo } from "react";
import { useSelector } from "react-redux";
import { cloneDeep, map } from "lodash";
import { v4 as uuidv4 } from "uuid";
import {
  Box,
  Stack,
  Button,
  Divider,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Iconify from "/src/components/atoms/Iconify";
import { RHFTextField } from "/src/components/hook-form";
import { fDecimalNumber } from "/src/utils/formatNumber";

export default memo(function BeforeILeave({
  beforeILeaveData,
  getBudgetData,
  onGetBudgetData,
  onHandleSaveBtnChange,
  showSaveBtn,
}) {
  const [beforeILeaveOptions, setBeforeILeaveOptions] =
    useState(beforeILeaveData);

  const uid = useSelector((state) => state.auth.user.uid);
  const sectionId = "beforeILeave";

  const beforeILeaveTotal = () => {
    return beforeILeaveOptions.reduce(
      (prevObject, currentObject) =>
        prevObject + (Number(currentObject.actual) || 0),
      0
    );
  };

  useEffect(() => {
    onGetBudgetData({ beforeILeave: beforeILeaveOptions });
  }, [getBudgetData]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ color: "text.disabled", mb: 3 }}>
        Before I Leave:
      </Typography>

      <Stack spacing={3}>
        {beforeILeaveOptions?.map((item, index) => (
          <Stack key={item.id} alignItems="flex-end" spacing={1.5}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2}
              sx={{ width: 1 }}
            >
              <RHFTextField
                size="small"
                name={item.name}
                placeholder="Item Name"
                value={item.name}
                onChange={(event) => {
                  const updateBeforeILeaveOptions = map(
                    beforeILeaveOptions,
                    (eventOption) => {
                      if (eventOption.id === item.id) {
                        return { ...eventOption, name: event.target.value };
                      }
                      return eventOption;
                    }
                  );
                  setBeforeILeaveOptions(updateBeforeILeaveOptions);
                  !showSaveBtn && onHandleSaveBtnChange();
                }}
                InputLabelProps={{ shrink: true }}
              />
              <RHFTextField
                size="small"
                type="number"
                name="budget"
                label="Budget"
                placeholder="0.00"
                value={item.budget === 0 ? "" : item.budget}
                onChange={(event) => {
                  const updateBeforeILeaveOptions = map(
                    beforeILeaveOptions,
                    (eventOption) => {
                      if (eventOption.id === item.id) {
                        return {
                          ...eventOption,
                          budget: event.target.value
                            ? Number(event.target.value)
                            : "",
                        };
                      }
                      return eventOption;
                    }
                  );
                  setBeforeILeaveOptions(updateBeforeILeaveOptions);
                  !showSaveBtn && onHandleSaveBtnChange();
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
              <RHFTextField
                size="small"
                type="number"
                name="actual"
                label="Actual"
                placeholder="0.00"
                value={item.actual === 0 ? "" : item.actual}
                onChange={(event) => {
                  const updateBeforeILeaveOptions = map(
                    beforeILeaveOptions,
                    (eventOption) => {
                      if (eventOption.id === item.id) {
                        return {
                          ...eventOption,
                          actual: event.target.value
                            ? Number(event.target.value)
                            : "",
                        };
                      }
                      return eventOption;
                    }
                  );
                  setBeforeILeaveOptions(updateBeforeILeaveOptions);
                  !showSaveBtn && onHandleSaveBtnChange();
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
              <IconButton
                size="small"
                color="error"
                onClick={() => {
                  const beforeILeaveOptionsArr = cloneDeep(beforeILeaveOptions);
                  const optionIndex = beforeILeaveOptionsArr.findIndex(
                    (event) => event.id === item.id
                  );
                  beforeILeaveOptionsArr.splice(optionIndex, 1);
                  setBeforeILeaveOptions(beforeILeaveOptionsArr);
                  onHandleSaveBtnChange();
                }}
                sx={{ width: 40, height: 40 }}
              >
                <Iconify icon="eva:trash-2-outline" />
              </IconButton>
            </Stack>
          </Stack>
        ))}
      </Stack>

      <Divider sx={{ my: 3, borderStyle: "dashed" }} />

      <Stack
        spacing={2}
        direction={{ xs: "column-reverse", md: "row" }}
        alignItems={{ xs: "flex-start", md: "center" }}
      >
        <Button
          size="small"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => {
            const beforeILeaveOptionsArr = cloneDeep(beforeILeaveOptions);
            beforeILeaveOptionsArr.push({
              uid,
              id: uuidv4(),
              sectionId,
              name: "",
              budget: 0,
              actual: 0,
            });
            setBeforeILeaveOptions(beforeILeaveOptionsArr);
            onHandleSaveBtnChange();
          }}
          sx={{ flexShrink: 0 }}
        >
          Add new item
        </Button>

        <Stack
          spacing={2}
          justifyContent="flex-end"
          direction={{ xs: "column", md: "row" }}
          sx={{ width: 1 }}
        >
          <RHFTextField
            disabled
            size="small"
            name="total"
            label="Total"
            value={fDecimalNumber(beforeILeaveTotal())}
            sx={{ maxWidth: { md: 339 }, marginRight: { md: "3.5rem" } }}
            placeholder="0.00"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </Stack>
      </Stack>
    </Box>
  );
});
