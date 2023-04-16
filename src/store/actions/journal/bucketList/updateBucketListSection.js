import { db } from "../../../../handlers/firebaseClient";
import { doc, updateDoc } from "firebase/firestore";
import {
  GET_BUCKET_LIST_ITEMS,
  UPDATE_BUCKET_LIST_SECTION,
} from "../../../actionTypes/journal";
import setAndShowErrorToast from "../../config/toast/setAndShowErrorToast";

const updateBucketListSection =
  (sectionId, sectionTitle) => (dispatch, getState) => {
    const uid = getState().auth.user.uid;
    const oldState = getState().journal.bucketListItems;

    try {
      dispatch({
        type: UPDATE_BUCKET_LIST_SECTION,
        payload: {
          sectionId,
          sectionTitle,
        },
      });

      updateDoc(
        doc(
          db,
          "journal",
          uid,
          "bucketList",
          uid,
          "bucketListSections",
          sectionId
        ),
        {
          sectionTitle,
        }
      );
    } catch (err) {
      console.log("error", err);
      const errorMessage = `Whoops! Could not update the section. Please try again.`;
      dispatch(setAndShowErrorToast(errorMessage));
      dispatch({
        type: GET_BUCKET_LIST_ITEMS,
        payload: oldState,
      });
    }
  };

export default updateBucketListSection;
