import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { map, pick, reduce } from "lodash";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { Card, Stack } from "@mui/material";
import { FormProvider } from "/src/components/hook-form";
import BeforeILeave from "./BeforeILeave";
import Destinations from "./Destinations";
import PersonalIncomeSavings from "./PersonalIncomeSavings";
import TravelBudgetTotal from "./TravelBudgetTotal";
import getTravelBudgetItems from "../../../store/actions/travelBudget/getTravelBudgetItems";
import updateTravelBudgetItems from "../../../store/actions/travelBudget/updateTravelBudgetItems";

export default function TravelBudget() {
  const [savingsTotal, setSavingsTotal] = useState(0);
  const [beforeILeaveTotal, setBeforeILeaveTotal] = useState(0);
  const [destinationsTotal, setDestinationsTotal] = useState(0);
  const [getBudgetData, setBudgetData] = useState(false);
  const [showSaveBtn, setShowSaveBtn] = useState(false);
  const [showAllTotal, setShowAllTotal] = useState(false);
  const { personalIncome, beforeILeave, destinations } = useSelector(
    (state) => state.travelBudget
  );

  const [getPersonalIncome, setGetPersonalIncome] = useState({});
  const [getBeforeILeave, setGetBeforeILeave] = useState({});
  const [getDestinations, setGetDestinations] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTravelBudgetItems());
  }, []);

  useEffect(() => {
    setBudgetData(false);

    const personalIncomeTotal = reduce(
      map(
        map(personalIncome, (obj) => pick(obj, ["income", "savings", "other"])),
        (obj) => Object.values(obj)
      ),
      (acc, arr) => acc + Number(arr),
      0
    );

    const beforeILeaveTotal = reduce(
      beforeILeave,
      (acc, obj) => acc + obj.actual,
      0
    );

    const destinationsTotal = reduce(
      map(destinations, ({ sectionItems }) =>
        reduce(sectionItems, (acc, obj) => acc + Number(obj.actual), 0)
      ),
      (acc, val) => acc + val,
      0
    );

    if (personalIncomeTotal && beforeILeaveTotal && destinationsTotal) {
      setSavingsTotal(personalIncomeTotal);
      setBeforeILeaveTotal(beforeILeaveTotal);
      setDestinationsTotal(destinationsTotal);
      setShowAllTotal(true);
    }
  }, [personalIncome, beforeILeave, destinations]);

  const handleSaveBtn = useCallback(() => {
    !showSaveBtn && setShowSaveBtn(true);
    setShowAllTotal(false);
  }, []);

  // FIXME: Please work on cancel feature
  // const handleCancel = () => {
  //   window.location.reload(false);
  // };

  let destinationsObj = {};
  const handleTravelBudgetObject = (getObject) => {
    destinationsObj = !getObject.personalIncome &&
      !getObject.beforeILeave && { ...destinationsObj, ...getObject };
    getObject.personalIncome && setGetPersonalIncome(getObject);
    getObject.beforeILeave && setGetBeforeILeave(getObject);
    !getObject.personalIncome &&
      !getObject.beforeILeave &&
      setGetDestinations(destinationsObj);
  };

  // Passing the Data to the Store to update & in DB
  useEffect(() => {
    if (!_.isEmpty(getPersonalIncome) && !_.isEmpty(getBeforeILeave)) {
      const combined = {
        personalIncome: getPersonalIncome.personalIncome,
        beforeILeave: getBeforeILeave.beforeILeave,
        destinations: getDestinations,
      };
      dispatch(updateTravelBudgetItems(combined));
    }
  }, [getPersonalIncome, getBeforeILeave, getDestinations]);

  return (
    <FormProvider methods={useForm()}>
      <Card>
        <PersonalIncomeSavings
          personalIncomeData={personalIncome}
          getBudgetData={getBudgetData}
          onGetBudgetData={useCallback((personalIncomeSavingsObject) => {
            handleTravelBudgetObject(personalIncomeSavingsObject);
          }, [])}
          onHandleSaveBtnChange={handleSaveBtn}
        />
        <BeforeILeave
          beforeILeaveData={beforeILeave}
          getBudgetData={getBudgetData}
          onGetBudgetData={useCallback((beforeILeaveObject) => {
            handleTravelBudgetObject(beforeILeaveObject);
          }, [])}
          showSaveBtn={showSaveBtn}
          onHandleSaveBtnChange={handleSaveBtn}
        />
        <Destinations
          destinationsData={destinations}
          getBudgetData={getBudgetData}
          onGetBudgetData={useCallback((destinationsObject) => {
            handleTravelBudgetObject(destinationsObject);
          }, [])}
          showAllTotal={showAllTotal}
          onHandleSaveBtnChange={handleSaveBtn}
        />
        {showAllTotal && (
          <TravelBudgetTotal
            savingsTotal={savingsTotal}
            beforeILeaveTotal={beforeILeaveTotal}
            destinationsTotal={destinationsTotal}
          />
        )}
      </Card>

      <Stack
        justifyContent="flex-end"
        direction="row"
        spacing={2}
        sx={{ mt: 3 }}
      >
        {/* FIXME: Enable the Cancel once it's fixed */}
        {/* {showSaveBtn && (
          <LoadingButton
            color="inherit"
            size="large"
            variant="contained"
            // loading={loadingSave && isSubmitting}
            onClick={handleCancel}
          >
            Cancel
          </LoadingButton>
        )} */}

        {showSaveBtn && (
          <LoadingButton
            size="large"
            variant="contained"
            onClick={() => {
              setBudgetData(true);
              setShowSaveBtn(false);
            }}
          >
            Calculate & Save
          </LoadingButton>
        )}
      </Stack>
    </FormProvider>
  );
}
