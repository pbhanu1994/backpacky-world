import { SELECT_EVENT } from "../../actionTypes/calendar";
import setAndShowErrorToast from "../config/toast/setAndShowErrorToast";

const selectEvent = (eventId) => (dispatch, getState) => {
  try {
    dispatch({
      type: SELECT_EVENT,
      payload: {
        eventId,
      },
    });
  } catch (err) {
    console.log("error", err);
    const errorMessage = `Whoops! Could not select the event ${event}. Please try again.`;
    dispatch(setAndShowErrorToast(errorMessage));
  }
};

export default selectEvent;
