import { v4 as uuidv4 } from "uuid";
import { db } from "../../../handlers/firebaseClient";
import { DELETE_EVENT } from "../../actionTypes/calendar";
import setAndShowErrorToast from "../config/toast/setAndShowErrorToast";

const deleteEvent = (sectionId, event) => (dispatch, getState) => {
  const uid = getState().auth.user.uid;
  const oldState = getState().calendar;

  try {
    dispatch({
      type: DELETE_EVENT,
      //   payload: {
      //     sectionId,
      //     packItem,
      //   },
    });
  } catch (err) {
    console.log("error", err);
    const errorMessage = `Whoops! Could not delete the event ${event}. Please try again.`;
    dispatch(setAndShowErrorToast(errorMessage));
    // dispatch({
    //   type: GET_PACK_ITEMS,
    //   payload: oldState,
    // });
  }
};

export default deleteEvent;
