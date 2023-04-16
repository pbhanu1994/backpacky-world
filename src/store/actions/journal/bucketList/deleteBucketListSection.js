import { db } from "../../../../handlers/firebaseClient";
import { collection, doc, getDocs, deleteDoc } from "firebase/firestore";
import {
  GET_BUCKET_LIST_ITEMS,
  DELETE_BUCKET_LIST_SECTION,
} from "../../../actionTypes/journal";
import setAndShowErrorToast from "../../config/toast/setAndShowErrorToast";

const deleteBucketListSection = (sectionId) => async (dispatch, getState) => {
  const uid = getState().auth.user.uid;
  const oldState = getState().journal.bucketListItems;

  try {
    dispatch({
      type: DELETE_BUCKET_LIST_SECTION,
      payload: { sectionId },
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

    const bucketListSectionRef = doc(
      db,
      "journal",
      uid,
      "bucketList",
      uid,
      "bucketListSections",
      sectionId
    );

    const bucketListSectionItems = await getDocs(bucketListSectionItemsRef);

    // First, deleting the subcollection docs
    bucketListSectionItems.docs.length > 0 &&
      bucketListSectionItems.docs.map((document) =>
        deleteDoc(doc(bucketListSectionItemsRef, document.id))
      );
    // Second, deleting the document itself
    deleteDoc(bucketListSectionRef);
  } catch (err) {
    console.log("error", err);
    const errorMessage = `Whoops! Could not delete the Section. Please try again.`;
    dispatch(setAndShowErrorToast(errorMessage));
    dispatch({
      type: GET_BUCKET_LIST_ITEMS,
      payload: oldState,
    });
  }
};

export default deleteBucketListSection;
