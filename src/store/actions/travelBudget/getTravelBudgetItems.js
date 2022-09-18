import _ from "lodash";
import { db } from "../../../handlers/firebaseClient";
import { GET_BUDGET_ITEMS } from "../../actionTypes/travelBudget";
import setAndShowErrorToast from "../config/toast/setAndShowErrorToast";

const getBudgetItems = () => async (dispatch, getState) => {
  const uid = getState().auth.user.uid;
  const budgetItemsResultArr = [];

  try {
    const travelBudgetItems = await db
      .collectionGroup("travelBudgetItems")
      .where("uid", "==", uid)
      .get();

    travelBudgetItems.docs.map((doc) => budgetItemsResultArr.push(doc.data()));

    const travelSectionItemsGrouped = _.groupBy(
      budgetItemsResultArr,
      "sectionId"
    );

    const { personalIncome, beforeILeave } = travelSectionItemsGrouped;

    const destinations = Object.fromEntries(
      Object.entries(travelSectionItemsGrouped).filter(
        ([key]) => key !== "beforeILeave" && key !== "personalIncome"
      )
    );

    const destinationSections = await db
      .collectionGroup("destinationSections")
      .where("uid", "==", uid)
      .get();

    destinationSections.docs.map(
      (doc) =>
        (destinations[doc.data().sectionId] = {
          sectionItems: [...destinations[doc.data().sectionId]],
          ...doc.data(),
        })
    );

    // Converting the Object to Array
    const destinationsArray = _.values(destinations);

    dispatch({
      type: GET_BUDGET_ITEMS,
      payload: {
        personalIncome,
        beforeILeave,
        destinations: destinationsArray,
      },
    });
  } catch (err) {
    console.log("error", err);
    const errorMessage = `Whoops! Could not fetch the Travel Budget sections & items`;
    dispatch(setAndShowErrorToast(errorMessage));
  }
};

export default getBudgetItems;
