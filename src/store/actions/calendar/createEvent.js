import { v4 as uuidv4 } from "uuid";
import { db } from "../../../handlers/firebaseClient";
import { CREATE_EVENT } from "../../actionTypes/calendar";
import setAndShowErrorToast from "../config/toast/setAndShowErrorToast";

const createEvent = (sectionId, event) => (dispatch, getState) => {
  const uid = getState().auth.user.uid;
  const oldState = getState().calendar;

  try {
    dispatch({
      type: CREATE_EVENT,
      //   payload: {
      //     sectionId,
      //     packItem,
      //   },
    });
  } catch (err) {
    console.log("error", err);
    const errorMessage = `Whoops! Could not create the event ${event}. Please try again.`;
    dispatch(setAndShowErrorToast(errorMessage));
    // dispatch({
    //   type: GET_PACK_ITEMS,
    //   payload: oldState,
    // });
  }
};

export default createEvent;
