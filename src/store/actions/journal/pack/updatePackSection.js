import { db } from "../../../../handlers/firebaseClient";
import { UPDATE_PACK_SECTION } from "../../../actionTypes/journal";
import setAndShowErrorToast from "../../config/toast/setAndShowErrorToast";

const updatePackSection = (sectionId, sectionTitle) => (dispatch, getState) => {
  const uid = getState().auth.user.uid;
  const oldState = getState().journal.packItems;

  try {
    dispatch({
      type: UPDATE_PACK_SECTION,
      payload: {
        sectionId,
        sectionTitle,
      },
    });

    db.collection("journal")
      .doc(uid)
      .collection("pack")
      .doc(uid)
      .collection("packSections")
      .doc(sectionId)
      .update({ sectionTitle });
  } catch (err) {
    console.log("error", err);
    const errorMessage = `Whoops! Could not update the section. Please try again.`;
    dispatch(setAndShowErrorToast(errorMessage));
    dispatch({
      type: GET_PACK_ITEMS,
      payload: oldState,
    });
  }
};

export default updatePackSection;
