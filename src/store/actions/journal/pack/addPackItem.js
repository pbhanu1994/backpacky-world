import { v4 as uuidv4 } from "uuid";
import { db } from "../../../../handlers/firebaseClient";
import { doc, setDoc } from "firebase/firestore";
import { GET_PACK_ITEMS, ADD_PACK_ITEM } from "../../../actionTypes/journal";
import setAndShowErrorToast from "../../config/toast/setAndShowErrorToast";

const addPackItem = (sectionId, item) => (dispatch, getState) => {
  const uid = getState().auth.user.uid;
  const oldState = getState().journal.packItems;

  const packItem = {
    id: uuidv4(),
    uid,
    sectionId,
    name: item,
    checked: false,
  };

  try {
    dispatch({
      type: ADD_PACK_ITEM,
      payload: {
        sectionId,
        packItem,
      },
    });

    setDoc(
      doc(
        db,
        "journal",
        uid,
        "pack",
        uid,
        "packSections",
        sectionId,
        "packSectionItems",
        packItem.id
      ),
      packItem
    );
  } catch (err) {
    console.log("error", err);
    const errorMessage = `Whoops! Could not add the item ${item}. Please try again.`;
    dispatch(setAndShowErrorToast(errorMessage));
    dispatch({
      type: GET_PACK_ITEMS,
      payload: oldState,
    });
  }
};

export default addPackItem;
