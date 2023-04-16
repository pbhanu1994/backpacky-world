import { v4 as uuidv4 } from "uuid";
import { db } from "../../../../handlers/firebaseClient";
import { doc, setDoc } from "firebase/firestore";
import {
  GET_BUCKET_LIST_ITEMS,
  ADD_BUCKET_LIST_SECTION,
} from "../../../actionTypes/journal";
import setAndShowErrorToast from "../../config/toast/setAndShowErrorToast";

const addBucketListSection = (position) => (dispatch, getState) => {
  const uid = getState().auth.user.uid;
  const oldState = getState().journal.bucketListItems;

  const addSection = {
    uid,
    sectionId: uuidv4(),
    sectionTitle: "Add section title",
    placeholderText: "Add Item.. e.g. Whitehaven Beach, Australia",
  };

  const addItem = {
    id: uuidv4(),
    uid,
    sectionId: addSection.sectionId,
    name: "Add new item",
    checked: false,
  };

  try {
    dispatch({
      type: ADD_BUCKET_LIST_SECTION,
      payload: {
        section: { ...addSection, sectionItems: [addItem] },
        position,
      },
    });

    const sectionRef = doc(
      db,
      "journal",
      uid,
      "bucketList",
      uid,
      "bucketListSections",
      addSection.sectionId
    );

    const sectionItemRef = doc(
      sectionRef,
      "bucketListSectionItems",
      addItem.id
    );

    setDoc(sectionRef, addSection);
    setDoc(sectionItemRef, addItem);
  } catch (err) {
    console.log("error", err);
    const errorMessage = `Whoops! Could not add the Section. Please try again.`;
    dispatch(setAndShowErrorToast(errorMessage));
    dispatch({
      type: GET_BUCKET_LIST_ITEMS,
      payload: oldState,
    });
  }
};

export default addBucketListSection;
