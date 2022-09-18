import { useState, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cloneDeep, map } from "lodash";
import { v4 as uuidv4 } from "uuid";
import {
  Stack,
  Button,
  Divider,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Iconify from "/src/components/atoms/Iconify";
import { RHFTextField } from "/src/components/hook-form";
import { EditSectionText } from "/src/components/atoms/EditSectionText";
import { fDecimalNumber } from "/src/utils/formatNumber";
import setAndShowDeleteDialog from "../../../store/actions/config/dialog/setAndShowDeleteDialog";

export default memo(function DestinationSection({
  getBudgetData,
  onGetBudgetData,
  destination,
  onHandleDestinationTotal,
  onHandleSaveBtnChange,
}) {
  const [destinationDetails, setDestinationDetails] = useState(destination);
  const [editDestinationTitle, setEditDestinationTitle] = useState(false);
  const uid = useSelector((state) => state.auth.user.uid);

  const dispatch = useDispatch();

  const handleTotal = () => {
    const total =
      destinationDetails.sectionItems?.length > 0 &&
      destinationDetails.sectionItems.reduce(
        (prevObject, currentObject) =>
          prevObject + (Number(currentObject.actual) || 0),
        0
      );
    return total;
  };

  const handleAddDestination = (undefined, destinationText) => {
    onHandleSaveBtnChange();
    setDestinationDetails({
      ...destinationDetails,
      sectionTitle: destinationText,
    });
  };

  const handleDeleteDestination = () => {
    onHandleSaveBtnChange();
    setDestinationDetails({});
  };

  useEffect(() => {
    !_.isEmpty(destinationDetails) &&
      onGetBudgetData({
        [destinationDetails.sectionId]: destinationDetails,
      });
  }, [getBudgetData]);

  useEffect(() => {
    onHandleDestinationTotal(destinationDetails.sectionId, handleTotal());
  }, [destinationDetails]);

  return (
    !_.isEmpty(destinationDetails) && (
      <Stack sx={{ mb: 4 }}>
        <Stack direction={{ xs: "row" }} sx={{ mb: 4 }} alignItems="center">
          {!editDestinationTitle && (
            <Typography variant="h6" color="primary">
              {destinationDetails.sectionTitle}
            </Typography>
          )}
          {editDestinationTitle && (
            <EditSectionText
              inputText={destinationDetails.sectionTitle}
              sectionId={destinationDetails.sectionId}
              placeholderText="Destination Name"
              onAddItem={handleAddDestination}
              edit={editDestinationTitle}
              onHandleEdit={(isEdit) => setEditDestinationTitle(isEdit)}
              styles={{ width: "50%", margin: "none" }}
            />
          )}
          {!editDestinationTitle && (
            <>
              <IconButton
                aria-label="Edit Destination"
                color="secondary"
                onClick={() => setEditDestinationTitle(true)}
              >
                <Iconify icon="eva:edit-fill" />
              </IconButton>
              {destinationDetails.sectionId !== "destinationOne" && (
                <IconButton
                  aria-label="Delete Destination"
                  size="small"
                  color="error"
                  onClick={() => {
                    dispatch(
                      setAndShowDeleteDialog(
                        destinationDetails.sectionTitle,
                        () =>
                          handleDeleteDestination(destinationDetails.sectionId) // Storing function reference (callback?) in the store to use later
                      )
                    );
                  }}
                >
                  <Iconify icon="eva:trash-2-fill" />
                </IconButton>
              )}
            </>
          )}
        </Stack>

        <Stack spacing={3}>
          {destinationDetails.sectionItems?.length > 0 &&
            destinationDetails.sectionItems.map((item, index) => (
              <Stack
                key={item.uid + item.sectionId + index}
                alignItems="flex-end"
                spacing={1.5}
              >
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
                      const updateDestinationOptions = map(
                        destinationDetails.sectionItems,
                        (eventOption) => {
                          if (eventOption.id === item.id) {
                            return { ...eventOption, name: event.target.value };
                          }
                          return eventOption;
                        }
                      );
                      setDestinationDetails({
                        ...destinationDetails,
                        sectionItems: updateDestinationOptions,
                      });
                      onHandleSaveBtnChange();
                    }}
                    InputLabelProps={{ shrink: true }}
                  />
                  <RHFTextField
                    size="small"
                    type="number"
                    name="budget"
                    label="Budget"
                    placeholder="0.00"
                    value={item.budget}
                    onChange={(event) => {
                      const updateDestinationOptions = map(
                        destinationDetails.sectionItems,
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
                      setDestinationDetails({
                        ...destinationDetails,
                        sectionItems: updateDestinationOptions,
                      });
                      onHandleSaveBtnChange();
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
                    value={item.actual}
                    onChange={(event) => {
                      const updateDestinationOptions = map(
                        destinationDetails.sectionItems,
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
                      setDestinationDetails({
                        ...destinationDetails,
                        sectionItems: updateDestinationOptions,
                      });
                      onHandleSaveBtnChange();
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                  />
                  <IconButton
                    aria-label="Delete Item"
                    size="small"
                    color="error"
                    onClick={() => {
                      const destinationOptionsArr = cloneDeep(
                        destinationDetails.sectionItems
                      );
                      const optionIndex = destinationOptionsArr.findIndex(
                        (event) => event.id === item.id
                      );
                      destinationOptionsArr.splice(optionIndex, 1);
                      setDestinationDetails({
                        ...destinationDetails,
                        sectionItems: destinationOptionsArr,
                      });
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
              const destinationOptionsArr = cloneDeep(
                destinationDetails.sectionItems
              );
              destinationOptionsArr.push({
                id: uuidv4(),
                uid,
                name: "",
                sectionId: destinationDetails.sectionId,
                actual: 0,
                budget: 0,
              });
              setDestinationDetails({
                ...destinationDetails,
                sectionItems: destinationOptionsArr,
              });
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
              value={fDecimalNumber(handleTotal())}
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
      </Stack>
    )
  );
});
