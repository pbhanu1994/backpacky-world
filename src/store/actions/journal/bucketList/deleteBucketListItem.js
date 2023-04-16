import { db } from "../../../../handlers/firebaseClient";
import { doc, deleteDoc } from "firebase/firestore";
import {
  GET_BUCKET_LIST_ITEMS,
  DELETE_BUCKET_LIST_ITEM,
} from "../../../actionTypes/journal";
import setAndShowErrorToast from "../../config/toast/setAndShowErrorToast";

const deleteBucketListItem =
  (sectionId, bucketListItem) => async (dispatch, getState) => {
    const uid = getState().auth.user.uid;
    const oldState = getState().journal.bucketListItems;

    try {
      dispatch({
        type: DELETE_BUCKET_LIST_ITEM,
        payload: {
          sectionId,
          bucketListItem,
        },
      });

      deleteDoc(
        doc(
          db,
          "journal",
          uid,
          "bucketList",
          uid,
          "bucketListSections",
          sectionId,
          "bucketListSectionItems",
          bucketListItem.id
        )
      );
    } catch (err) {
      console.log("error", err);
      const errorMessage = `Whoops! Could not delete the item ${bucketListItem.name}. Please try again.`;
      dispatch(setAndShowErrorToast(errorMessage));
      dispatch({
        type: GET_BUCKET_LIST_ITEMS,
        payload: oldState,
      });
    }
  };

export default deleteBucketListItem;
