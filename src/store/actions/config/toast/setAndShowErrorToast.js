import { SET_AND_SHOW_TOAST_MESSAGE } from "../../../actionTypes/config";

const setAndShowErrorToast = (message) => (dispatch, getState) => {
  const toast = {
    open: true,
    color: "error",
    message,
  };

  dispatch({
    type: SET_AND_SHOW_TOAST_MESSAGE,
    payload: toast,
  });
};

export default setAndShowErrorToast;
