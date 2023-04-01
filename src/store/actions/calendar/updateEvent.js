import { db } from "../../../handlers/firebaseClient";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
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

      const events = collection(db, "calendar", uid, "events");
      const eventQuery = query(
        events,
        where("uid", "==", uid),
        where("id", "==", eventId)
      );
      const event = await getDocs(eventQuery);

      const eventData = event.docs[0].data();
      const updateEvent = {
        ...eventData,
        ...updateEventData,
      };
      updateDoc(doc(events, eventId), updateEvent);
    } catch (err) {
      console.log("error", err);
      const errorMessage = `Whoops! Could not update the event. Please try again.`;
      dispatch({ type: HAS_ERROR });
      dispatch(setAndShowErrorToast(errorMessage));
      dispatch({
        type: GET_EVENTS,
        payload: oldState,
      });
    }
  };

export default updateEvent;
