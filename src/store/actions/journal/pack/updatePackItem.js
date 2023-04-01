import { db } from "../../../../handlers/firebaseClient";
import {
  collection,
  query,
  where,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
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
      const packSectionItemsQuery = query(
        packSectionItemsRef,
        where("uid", "==", uid),
        where("id", "==", packItem.id)
      );
      const item = await getDocs(packSectionItemsQuery);

      const itemData = item.docs[0].data();
      toggle &&
        updateDoc(doc(packSectionItemsRef, packItem.id), {
          checked: !itemData.checked,
        });

      editItemName &&
        updateDoc(doc(packSectionItemsRef, packItem.id), {
          name: editItemName,
        });
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
