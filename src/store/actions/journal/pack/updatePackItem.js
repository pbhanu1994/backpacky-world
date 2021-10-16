import { db } from "../../../../handlers/firebaseClient";
import { GET_PACK_ITEMS, UPDATE_PACK_ITEM } from "../../../actionTypes/journal";
import setAndShowErrorToast from "../../config/toast/setAndShowErrorToast";

const updatePackItem =
  (sectionId, packItem, toggle, editItemName) => async (dispatch, getState) => {
    const uid = getState().auth.user.uid;
    const oldState = getState().journal.packItems;

    try {
      dispatch({
        type: UPDATE_PACK_ITEM,
        payload: {
          sectionId,
          packItem,
          toggle,
          editItemName,
        },
      });

      const packSectionItems = db
        .collection("journal")
        .doc(uid)
        .collection("pack")
        .doc(uid)
        .collection("packSections")
        .doc(sectionId)
        .collection("packSectionItems");

      const item = await packSectionItems
        .where("uid", "==", uid)
        .where("id", "==", packItem.id)
        .get();

      const itemData = item.docs[0].data();
      toggle &&
        packSectionItems
          .doc(packItem.id)
          .update({ checked: !itemData.checked });

      editItemName &&
        packSectionItems.doc(packItem.id).update({ name: editItemName });
    } catch (err) {
      console.log("error", err);
      const errorMessage = `Whoops! Could not update the item ${packItem.name}. Please try again.`;
      dispatch(setAndShowErrorToast(errorMessage));
      dispatch({
        type: GET_PACK_ITEMS,
        payload: oldState,
      });
    }
  };

// const updatePackItem = (item) => ({
//   type: UPDATE_PACK_ITEM,
//   payload: item,
// });

export default updatePackItem;
