import _ from "lodash";
import { db } from "../../../handlers/firebaseClient";
import setAndShowErrorToast from "../config/toast/setAndShowErrorToast";
import { GET_EVENTS } from "../../actionTypes/calendar";

const getEvents = () => async (dispatch, getState) => {
  const uid = getState().auth.user.uid;

  try {
    dispatch({
      type: GET_EVENTS,
      //   payload: sectionsWithItems,
    });
  } catch (err) {
    console.log("error", err);
    const errorMessage = "Whoops! Could not fetch the Calendar Events";
    dispatch(setAndShowErrorToast(errorMessage));
  }
};

export default getEvents;
