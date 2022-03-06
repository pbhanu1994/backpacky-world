import { db } from "../../../handlers/firebaseClient";
import {
  START_LOADING,
  HAS_ERROR,
  UPDATE_EVENT,
  GET_EVENTS,
} from "../../actionTypes/calendar";
import setAndShowErrorToast from "../config/toast/setAndShowErrorToast";

const updateEvent =
  (eventId, updateEventData) => async (dispatch, getState) => {
    const uid = getState().auth.user.uid;
    const oldState = getState().calendar;

    dispatch({ type: START_LOADING });
    try {
      dispatch({
        type: UPDATE_EVENT,
        payload: {
          eventId,
          event: updateEventData,
        },
      });

      const events = db.collection("calendar").doc(uid).collection("events");

      const event = await events
        .where("uid", "==", uid)
        .where("id", "==", eventId)
        .get();

      const eventData = event.docs[0].data();
      const updateEvent = {
        ...eventData,
        ...updateEventData,
      };
      events.doc(eventId).update(updateEvent);
    } catch (err) {
      console.log("error", err);
      const errorMessage = `Whoops! Could not update the event ${event}. Please try again.`;
      dispatch({ type: HAS_ERROR });
      dispatch(setAndShowErrorToast(errorMessage));
      dispatch({
        type: GET_EVENTS,
        payload: oldState,
      });
    }
  };

export default updateEvent;
