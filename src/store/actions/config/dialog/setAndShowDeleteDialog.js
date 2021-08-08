import { SET_AND_SHOW_DELETE_DIALOG } from "../../../actionTypes/config";

const setAndShowDeleteDialog =
  (deleteIemText, onConfirm) => (dispatch, getState) => {
    const dialog = {
      open: true,
      type: "delete",
      color: "error",
      title: "Are you sure?",
      body: `Are you sure you want to delete ${deleteIemText}?`,
      buttonText: {
        close: "Cancel",
        confirm: "Delete",
      },
      onConfirm,
    };

    dispatch({
      type: SET_AND_SHOW_DELETE_DIALOG,
      payload: dialog,
    });
  };

export default setAndShowDeleteDialog;
