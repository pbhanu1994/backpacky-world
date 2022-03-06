import { SELECT_RANGE } from "../../actionTypes/calendar";
import setAndShowErrorToast from "../config/toast/setAndShowErrorToast";

const selectRange = (start, end) => (dispatch) => {
  try {
    dispatch({
      type: SELECT_RANGE,
      payload: {
        start: start.getTime(),
        end: end.getTime(),
      },
    });
  } catch (err) {
    console.log("error", err);
    const errorMessage = `Whoops! Could not select the range. Please try again.`;
    dispatch(setAndShowErrorToast(errorMessage));
  }
};

export default selectRange;
