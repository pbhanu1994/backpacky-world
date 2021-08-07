import { SET_AND_SHOW_TOAST_MESSAGE } from "../../../actionTypes/config";

const setAndShowInfoToast = (message) => (dispatch, getState) => {
  const toast = {
    open: true,
    color: "info",
    message,
  };

  dispatch({
    type: SET_AND_SHOW_TOAST_MESSAGE,
    payload: toast,
  });
};

export default setAndShowInfoToast;
