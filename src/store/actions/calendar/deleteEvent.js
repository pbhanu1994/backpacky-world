import { db } from "../../../handlers/firebaseClient";
import {
  START_LOADING,
  HAS_ERROR,
  DELETE_EVENT,
  GET_EVENTS,
} from "../../actionTypes/calendar";
import setAndShowErrorToast from "../config/toast/setAndShowErrorToast";

const deleteEvent = (eventId) => (dispatch, getState) => {
  const uid = getState().auth.user.uid;
  const oldState = getState().calendar;

  dispatch({ type: START_LOADING });
  try {
    dispatch({
      type: DELETE_EVENT,
      payload: {
        eventId,
      },
    });

    db.collection("calendar")
      .doc(uid)
      .collection("events")
      .doc(eventId)
      .delete();
  } catch (err) {
    console.log("error", err);
    const errorMessage = `Whoops! Could not delete the event ${event}. Please try again.`;
    dispatch({ type: HAS_ERROR });
    dispatch(setAndShowErrorToast(errorMessage));
    dispatch({
      type: GET_EVENTS,
      payload: oldState,
    });
  }
};

export default deleteEvent;
