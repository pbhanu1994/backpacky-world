import { SET_AND_SHOW_TOAST_MESSAGE } from "../../actionTypes/config";

const setAndShowToastMessage =
  (open, color, message) => (dispatch, getState) => {
    dispatch({
      type: SET_AND_SHOW_TOAST_MESSAGE,
      payload: {
        open,
        color,
        message,
      },
    });
  };

export default setAndShowToastMessage;
