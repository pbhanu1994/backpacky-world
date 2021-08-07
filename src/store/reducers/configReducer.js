import { cloneDeep } from "lodash";
import {
  SET_AND_SHOW_TOAST_MESSAGE,
  CLOSE_TOAST,
  SET_AND_SHOW_DELETE_DIALOG,
  CLOSE_DIALOG,
} from "../actionTypes/config";

const initialState = {
  toast: {
    open: false,
    color: "error",
    message: "",
  },
  dialog: {
    open: false,
    color: "primary",
    title: "",
    body: "",
    buttonText: {
      cancel: "",
      confirm: "",
    },
    onConfirm: null,
  },
};

export const configReducer = (state = initialState, action) => {
  switch (action.type) {
    // -- TOAST -- //
    case SET_AND_SHOW_TOAST_MESSAGE: {
      return { ...state, toast: action.payload };
    }

    case CLOSE_TOAST: {
      const toast = cloneDeep(state.toast);
      toast.open = false;
      return { ...state, toast };
    }

    // -- DIALOG -- //
    case SET_AND_SHOW_DELETE_DIALOG: {
      return { ...state, dialog: action.payload };
    }

    case CLOSE_DIALOG: {
      const dialog = cloneDeep(state.dialog);
      dialog.open = false;

      return { ...state, dialog };
    }

    default:
      return state;
  }
};
