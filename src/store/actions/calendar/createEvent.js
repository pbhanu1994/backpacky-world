import { v4 as uuidv4 } from "uuid";
import { db } from "../../../handlers/firebaseClient";
import {
  START_LOADING,
  HAS_ERROR,
  CREATE_EVENT,
  GET_EVENTS,
} from "../../actionTypes/calendar";
import setAndShowErrorToast from "../config/toast/setAndShowErrorToast";

const createEvent = (eventData) => (dispatch, getState) => {
  const uid = getState().auth.user.uid;
  const oldState = getState().calendar;

  const newEvent = {
    id: uuidv4(),
    uid,
    ...eventData,
  };

  dispatch({ type: START_LOADING });
  try {
    dispatch({
      type: CREATE_EVENT,
      payload: {
        newEvent,
      },
    });

    db.collection("calendar")
      .doc(uid)
      .collection("events")
      .doc(newEvent.id)
      .set(newEvent);
  } catch (err) {
    console.log("error", err);
    const errorMessage = `Whoops! Could not create the event ${newEvent.title}. Please try again.`;
    dispatch({ type: HAS_ERROR });
    dispatch(setAndShowErrorToast(errorMessage));
    dispatch({
      type: GET_EVENTS,
      payload: oldState,
    });
  }
};

export default createEvent;
