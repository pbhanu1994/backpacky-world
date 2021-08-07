import { SET_AND_SHOW_TOAST_MESSAGE } from "../../../actionTypes/config";

const setAndShowWarningToast = (message) => (dispatch, getState) => {
  const toast = {
    open: true,
    color: "warning",
    message,
  };

  dispatch({
    type: SET_AND_SHOW_TOAST_MESSAGE,
    payload: toast,
  });
};

export default setAndShowWarningToast;
