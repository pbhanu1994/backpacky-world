import { db } from "../../../../handlers/firebaseClient";
import {
  collection,
  query,
  where,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import {
  GET_BUCKET_LIST_ITEMS,
  UPDATE_BUCKET_LIST_ITEM,
} from "../../../actionTypes/journal";
import setAndShowErrorToast from "../../config/toast/setAndShowErrorToast";

const updateBucketListItem =
  (sectionId, bucketListItem, toggle, editItemName) =>
  async (dispatch, getState) => {
    const uid = getState().auth.user.uid;
    const oldState = getState().journal.bucketListItems;

    try {
      dispatch({
        type: UPDATE_BUCKET_LIST_ITEM,
        payload: {
          sectionId,
          bucketListItem,
          toggle,
          editItemName,
        },
      });

      const bucketListSectionItemsRef = collection(
        db,
        "journal",
        uid,
        "bucketList",
        uid,
        "bucketListSections",
        sectionId,
        "bucketListSectionItems"
      );
      const bucketListSectionItemsQuery = query(
        bucketListSectionItemsRef,
        where("uid", "==", uid),
        where("id", "==", bucketListItem.id)
      );
      const item = await getDocs(bucketListSectionItemsQuery);

      const itemData = item.docs[0].data();
      toggle &&
        updateDoc(doc(bucketListSectionItemsRef, bucketListItem.id), {
          checked: !itemData.checked,
        });

      editItemName &&
        updateDoc(doc(bucketListSectionItemsRef, bucketListItem.id), {
          name: editItemName,
        });
    } catch (err) {
      console.log("error", err);
      const errorMessage = `Whoops! Could not update the item ${bucketListItem.name}. Please try again.`;
      dispatch(setAndShowErrorToast(errorMessage));
      dispatch({
        type: GET_BUCKET_LIST_ITEMS,
        payload: oldState,
      });
    }
  };

export default updateBucketListItem;
