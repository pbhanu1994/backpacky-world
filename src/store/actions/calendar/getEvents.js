import { db } from "../../../handlers/firebaseClient";
import setAndShowErrorToast from "../config/toast/setAndShowErrorToast";
import {
  START_LOADING,
  HAS_ERROR,
  GET_EVENTS,
} from "../../actionTypes/calendar";

const getEvents = () => async (dispatch, getState) => {
  const uid = getState().auth.user.uid;
  const eventsArr = [];

  dispatch({ type: START_LOADING });
  try {
    const events = await db
      .collectionGroup("events")
      .where("uid", "==", uid)
      .get();
    events.docs.map((event) => {
      const eventObj = {
        ...event.data(),
        start: event.data().start.toDate(),
        end: event.data().end.toDate(),
      };
      eventsArr.push(eventObj);
    });

    dispatch({
      type: GET_EVENTS,
      payload: { events: eventsArr },
    });
  } catch (err) {
    console.log("error", err);
    const errorMessage = "Whoops! Could not fetch the Calendar Events";
    dispatch({ type: HAS_ERROR });
    dispatch(setAndShowErrorToast(errorMessage));
  }
};

export default getEvents;
