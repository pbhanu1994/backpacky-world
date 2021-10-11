import _ from "lodash";
import { db } from "../../../../handlers/firebaseClient";
import { GET_PACK_ITEMS } from "../../../actionTypes/journal";
import setAndShowErrorToast from "../../config/toast/setAndShowErrorToast";

const getPackItems = () => async (dispatch, getState) => {
  const uid = getState().auth.user.uid;
  const packSectionItemsResultArr = [];

  try {
    const packSectionItems = await db
      .collectionGroup("packSectionItems")
      .where("uid", "==", uid)
      .get();

    packSectionItems.docs.map((doc) =>
      packSectionItemsResultArr.push(doc.data())
    );

    const packSectionItemsGrouped = _.groupBy(
      packSectionItemsResultArr,
      "sectionId"
    );

    Object.keys(packSectionItemsGrouped).map(
      (packItem) =>
        (packSectionItemsGrouped[packItem] = {
          sectionItems: [...packSectionItemsGrouped[packItem]],
        })
    );

    const packSections = await db
      .collectionGroup("packSections")
      .where("uid", "==", uid)
      .get();

    packSections.docs.map(
      (doc) =>
        (packSectionItemsGrouped[doc.data().sectionId] = {
          ...packSectionItemsGrouped[doc.data().sectionId],
          ...doc.data(),
        })
    );

    // Converting the Object to Array
    const packSectionItemsGroupedArray = _.values(packSectionItemsGrouped);

    dispatch({
      type: GET_PACK_ITEMS,
      payload: packSectionItemsGroupedArray,
    });
  } catch (err) {
    console.log("error", err);
    const errorMessage = `Whoops! Could not fetch the pack sections & items`;
    dispatch(setAndShowErrorToast(errorMessage));
  }
};

export default getPackItems;
