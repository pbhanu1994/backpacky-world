import { SET_AND_SHOW_PLAIN_DIALOG } from "../../../actionTypes/config";

const setAndShowPlainDialog = (title, body) => (dispatch) => {
  const dialog = {
    open: true,
    type: "plain",
    color: "primary",
    title,
    body,
    buttonText: {
      close: "Close",
    },
  };

  dispatch({
    type: SET_AND_SHOW_PLAIN_DIALOG,
    payload: dialog,
  });
};

export default setAndShowPlainDialog;
