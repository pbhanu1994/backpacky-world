import { db } from "../../../../handlers/firebaseClient";
import { collection, doc, getDocs, deleteDoc } from "firebase/firestore";
import {
  GET_PACK_ITEMS,
  DELETE_PACK_SECTION,
} from "../../../actionTypes/journal";
import setAndShowErrorToast from "../../config/toast/setAndShowErrorToast";

const deletePackSection = (sectionId) => async (dispatch, getState) => {
  const uid = getState().auth.user.uid;
  const oldState = getState().journal.packItems;

  try {
    dispatch({
      type: DELETE_PACK_SECTION,
      payload: { sectionId },
    });

    const packSectionItemsRef = collection(
      db,
      "journal",
      uid,
      "pack",
      uid,
      "packSections",
      sectionId,
      "packSectionItems"
    );

    const packSectionRef = doc(
      db,
      "journal",
      uid,
      "pack",
      uid,
      "packSections",
      sectionId
    );

    const packSectionItems = await getDocs(packSectionItemsRef);

    // First, deleting the subcollection docs
    packSectionItems.docs.length > 0 &&
      packSectionItems.docs.map((document) =>
        deleteDoc(doc(packSectionItemsRef, document.id))
      );
    // Second, deleting the document itself
    deleteDoc(packSectionRef);
  } catch (err) {
    console.log("error", err);
    const errorMessage = `Whoops! Could not delete the Section. Please try again.`;
    dispatch(setAndShowErrorToast(errorMessage));
    dispatch({
      type: GET_PACK_ITEMS,
      payload: oldState,
    });
  }
};

export default deletePackSection;
