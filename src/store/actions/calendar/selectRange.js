import { v4 as uuidv4 } from "uuid";
import { db } from "../../../handlers/firebaseClient";
import { SELECT_RANGE } from "../../actionTypes/calendar";
import setAndShowErrorToast from "../config/toast/setAndShowErrorToast";

const selectRange = (sectionId, event) => (dispatch, getState) => {
  const uid = getState().auth.user.uid;
  const oldState = getState().calendar;

  try {
    dispatch({
      type: SELECT_RANGE,
      //   payload: {
      //     sectionId,
      //     packItem,
      //   },
    });
  } catch (err) {
    console.log("error", err);
    const errorMessage = `Whoops! Could not select the range. Please try again.`;
    dispatch(setAndShowErrorToast(errorMessage));
    // dispatch({
    //   type: GET_PACK_ITEMS,
    //   payload: oldState,
    // });
  }
};

export default selectRange;
