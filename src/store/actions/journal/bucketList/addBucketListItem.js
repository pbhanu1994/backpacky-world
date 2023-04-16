import { v4 as uuidv4 } from "uuid";
import { db } from "../../../../handlers/firebaseClient";
import { doc, setDoc } from "firebase/firestore";
import {
  GET_BUCKET_LIST_ITEMS,
  ADD_BUCKET_LIST_ITEM,
} from "../../../actionTypes/journal";
import setAndShowErrorToast from "../../config/toast/setAndShowErrorToast";

const addBucketListItem = (sectionId, item) => (dispatch, getState) => {
  const uid = getState().auth.user.uid;
  const oldState = getState().journal.bucketListItems;

  const bucketListItem = {
    id: uuidv4(),
    uid,
    sectionId,
    name: item,
    checked: false,
  };

  try {
    dispatch({
      type: ADD_BUCKET_LIST_ITEM,
      payload: {
        sectionId,
        bucketListItem,
      },
    });

    setDoc(
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
      ),
      bucketListItem
    );
  } catch (err) {
    console.log("error", err);
    const errorMessage = `Whoops! Could not add the item ${item}. Please try again.`;
    dispatch(setAndShowErrorToast(errorMessage));
    dispatch({
      type: GET_BUCKET_LIST_ITEMS,
      payload: oldState,
    });
  }
};

export default addBucketListItem;
