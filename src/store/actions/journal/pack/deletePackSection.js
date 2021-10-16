import { db } from "../../../../handlers/firebaseClient";
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

    const packSectionItemsRef = db
      .collection("journal")
      .doc(uid)
      .collection("pack")
      .doc(uid)
      .collection("packSections")
      .doc(sectionId)
      .collection("packSectionItems");

    const packSectionRef = db
      .collection("journal")
      .doc(uid)
      .collection("pack")
      .doc(uid)
      .collection("packSections")
      .doc(sectionId);

    const packSectionItems = await packSectionItemsRef.get();
    // First, deleting the subcollection docs
    packSectionItems.docs.length > 0 &&
      packSectionItems.docs.map((doc) =>
        packSectionItemsRef.doc(doc.id).delete()
      );
    // Second, deleting the document itself
    packSectionRef.delete();
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
