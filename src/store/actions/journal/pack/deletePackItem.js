import { db } from "../../../../handlers/firebaseClient";
import { GET_PACK_ITEMS, DELETE_PACK_ITEM } from "../../../actionTypes/journal";
import setAndShowErrorToast from "../../config/toast/setAndShowErrorToast";

const deletePackItem = (sectionId, packItem) => async (dispatch, getState) => {
  const uid = getState().auth.user.uid;
  const oldState = getState().journal.packItems;

  try {
    dispatch({
      type: DELETE_PACK_ITEM,
      payload: {
        sectionId,
        packItem,
      },
    });

    db.collection("journal")
      .doc(uid)
      .collection("pack")
      .doc(uid)
      .collection("packSections")
      .doc(sectionId)
      .collection("packSectionItems")
      .doc(packItem.id)
      .delete();
  } catch (err) {
    console.log("error", err);
    const errorMessage = `Whoops! Could not delete the item ${packItem.name}. Please try again.`;
    dispatch(setAndShowErrorToast(errorMessage));
    dispatch({
      type: GET_PACK_ITEMS,
      payload: oldState,
    });
  }
};

export default deletePackItem;
