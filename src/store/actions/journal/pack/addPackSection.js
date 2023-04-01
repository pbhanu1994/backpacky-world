import { v4 as uuidv4 } from "uuid";
import { db } from "../../../../handlers/firebaseClient";
import { doc, setDoc } from "firebase/firestore";
import { GET_PACK_ITEMS, ADD_PACK_SECTION } from "../../../actionTypes/journal";
import setAndShowErrorToast from "../../config/toast/setAndShowErrorToast";

const addPackSection = (position) => (dispatch, getState) => {
  const uid = getState().auth.user.uid;
  const oldState = getState().journal.packItems;

  const addSection = {
    uid,
    sectionId: uuidv4(),
    sectionTitle: "Add section title",
    placeholderText: "Add Item.. e.g. Face mask",
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
      type: ADD_PACK_SECTION,
      payload: {
        section: { ...addSection, sectionItems: [addItem] },
        position,
      },
    });

    const sectionRef = doc(
      db,
      "journal",
      uid,
      "pack",
      uid,
      "packSections",
      addSection.sectionId
    );

    const sectionItemRef = doc(sectionRef, "packSectionItems", addItem.id);

    setDoc(sectionRef, addSection);
    setDoc(sectionItemRef, addItem);
  } catch (err) {
    console.log("error", err);
    const errorMessage = `Whoops! Could not add the Section. Please try again.`;
    dispatch(setAndShowErrorToast(errorMessage));
    dispatch({
      type: GET_PACK_ITEMS,
      payload: oldState,
    });
  }
};

export default addPackSection;
