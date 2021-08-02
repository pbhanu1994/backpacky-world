import { cloneDeep } from "lodash";
import { SET_AND_SHOW_TOAST_MESSAGE } from "../actionTypes/config";

const initialState = {
  toast: {
    open: false,
    color: "error",
    message: "",
  },
};

export const configReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AND_SHOW_TOAST_MESSAGE: {
      const { open, color, message } = action.payload;

      const toast = cloneDeep(state.toast);
      toast.open = open;
      toast.color = color ?? toast.color;
      toast.message = message;

      return { ...state, toast };
    }

    default:
      return state;
  }
};
