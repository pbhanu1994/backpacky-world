import _ from "lodash";
import { db } from "../../../../handlers/firebaseClient";
import { collectionGroup, query, where, getDocs } from "firebase/firestore";
import deletePackSection from "./deletePackSection";
import setAndShowErrorToast from "../../config/toast/setAndShowErrorToast";
import { GET_PACK_ITEMS } from "../../../actionTypes/journal";

const getPackItems = () => async (dispatch, getState) => {
  const uid = getState().auth.user.uid;
  const packSectionItemsResultArr = [];

  try {
    const packSectionItemsRef = collectionGroup(db, "packSectionItems");
    const packSectionItemsQuery = query(
      packSectionItemsRef,
      where("uid", "==", uid)
    );
    const packSectionItems = await getDocs(packSectionItemsQuery);

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

    const packSectionsRef = collectionGroup(db, "packSections");
    const packSectionsQuery = query(packSectionsRef, where("uid", "==", uid));
    const packSections = await getDocs(packSectionsQuery);

    packSections.docs.map(
      (doc) =>
        (packSectionItemsGrouped[doc.data().sectionId] = {
          ...packSectionItemsGrouped[doc.data().sectionId],
          ...doc.data(),
        })
    );

    // Converting the Object to Array
    const packSectionItemsGroupedArray = _.values(packSectionItemsGrouped);

    // Deleting the Sections with no Pack Items.
    const sectionsWithoutItems = packSectionItemsGroupedArray.filter(
      (packSectionItem) => !packSectionItem.sectionItems
    );
    sectionsWithoutItems.length > 0 &&
      sectionsWithoutItems.map((sectionWithoutItems) =>
        dispatch(deletePackSection(sectionWithoutItems.sectionId))
      );

    // Taking only the sections with packItems available
    const sectionsWithItems = packSectionItemsGroupedArray.filter(
      (packSectionItem) => packSectionItem.sectionItems
    );

    dispatch({
      type: GET_PACK_ITEMS,
      payload: sectionsWithItems,
    });
  } catch (err) {
    console.log("error", err);
    const errorMessage = `Whoops! Could not fetch the pack sections & items`;
    dispatch(setAndShowErrorToast(errorMessage));
  }
};

export default getPackItems;
