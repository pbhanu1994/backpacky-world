import { useState, useCallback, memo } from "react";
import { cloneDeep } from "lodash";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import {
  Box,
  Stack,
  Button,
  Divider,
  Typography,
  InputAdornment,
} from "@mui/material";
import Iconify from "/src/components/atoms/Iconify";
import { RHFTextField } from "/src/components/hook-form";
import DestinationSection from "./DestinationSection";
import { fDecimalNumber } from "/src/utils/formatNumber";

export default memo(function Destinations({
  destinationsData,
  getBudgetData,
  onGetBudgetData,
  showAllTotal,
  onHandleSaveBtnChange,
}) {
  const [destinations, setDestinations] = useState(destinationsData);
  const uid = useSelector((state) => state.auth.user.uid);

  const destinationsTotal = () => {
    return destinations.reduce(
      (prevObject, currentObject) => prevObject + (currentObject.total || 0),
      0
    );
  };

  const handleDestinationTotal = useCallback((sectionId, total) => {
    setDestinations((prevItems) =>
      prevItems.map((eventOption) => {
        return eventOption.sectionId !== sectionId
          ? eventOption
          : {
              ...eventOption,
              total: total ? Number(total) : "",
            };
      })
    );
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ color: "text.disabled", mb: 3 }}>
        Destinations:
      </Typography>

      {destinations.map((item, index) => (
        <DestinationSection
          key={item.sectionId + item.uid + index}
          destination={item}
          getBudgetData={getBudgetData}
          onGetBudgetData={onGetBudgetData}
          onHandleDestinationTotal={handleDestinationTotal}
          onHandleSaveBtnChange={onHandleSaveBtnChange}
        />
      ))}

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
            const destinationsArr = cloneDeep(destinations);
            const sectionId = uuidv4();
            destinationsArr.push({
              sectionId,
              sectionTitle: "Destination name",
              uid,
              sectionItems: [
                {
                  id: uuidv4(),
                  uid,
                  sectionId,
                  name: "",
                  actual: "",
                  budget: "",
                },
              ],
            });
            setDestinations(destinationsArr);
            onHandleSaveBtnChange();
          }}
          sx={{ flexShrink: 0 }}
        >
          Add new destination
        </Button>

        {showAllTotal && (
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
              label="Destination Total"
              value={fDecimalNumber(destinationsTotal())}
              sx={{ maxWidth: { md: 339 }, marginRight: { md: "3.5rem" } }}
              placeholder="0.00"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
          </Stack>
        )}
      </Stack>
    </Box>
  );
});
