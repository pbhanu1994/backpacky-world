import { cloneDeep } from "lodash";
import {
  GET_PACK_ITEMS,
  ADD_PACK_ITEM,
  UPDATE_PACK_ITEM,
  DELETE_PACK_ITEM,
} from "../actionTypes/journal";

const initialState = {
  packItems: [],
};

export const journalReducer = (state = initialState, action) => {
  switch (action.type) {
    // -- PACK -- //
    case GET_PACK_ITEMS:
      return { ...state, packItems: action.payload };

    case ADD_PACK_ITEM: {
      const items = cloneDeep(state.packItems);
      items.push(action.payload);
      return { ...state, packItems: items };
    }

    case UPDATE_PACK_ITEM: {
      const items = cloneDeep(state.packItems);
      const itemIndex = items.findIndex(
        (item) => item.name === action.payload.name
      );
      items[itemIndex].checked = !items[itemIndex].checked;
      return { ...state, packItems: items };
    }

    case DELETE_PACK_ITEM: {
      const items = cloneDeep(state.packItems);
      const itemIndex = items.findIndex(
        (item) => item.name === action.payload.name
      );
      items.splice(itemIndex, 1);
      return { ...state, packItems: items };
    }

    default:
      return state;
  }
};
