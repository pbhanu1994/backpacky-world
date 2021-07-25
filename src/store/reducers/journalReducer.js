import { cloneDeep } from "lodash";
import {
  GET_PACK_ITEMS,
  ADD_PACK_SECTION,
  UPDATE_PACK_SECTION,
  DELETE_PACK_SECTION,
  ADD_PACK_ITEM,
  UPDATE_PACK_ITEM,
  DELETE_PACK_ITEM,
} from "../actionTypes/journal";

const initialState = {
  total: 0,
  completed: 0,
  packItems: [],
};

export const journalReducer = (state = initialState, action) => {
  switch (action.type) {
    // -- PACK -- //
    case GET_PACK_ITEMS:
      return { ...state, packItems: action.payload };

    case ADD_PACK_SECTION: {
      const { section, position } = action.payload;
      const items = cloneDeep(state.packItems);
      position === "start" ? items.unshift(section) : items.push(section);
      return {
        ...state,
        packItems: items,
      };
    }

    case UPDATE_PACK_SECTION: {
      const { sectionId, sectionTitle } = action.payload;
      const items = cloneDeep(state.packItems);
      const sectionIndex = items.findIndex(
        (item) => item.sectionId === sectionId
      );
      items[sectionIndex].sectionTitle = sectionTitle;
      return { ...state, packItems: items };
    }

    case DELETE_PACK_SECTION: {
      const { sectionId } = action.payload;
      const items = cloneDeep(state.packItems);
      const sectionIndex = items.findIndex(
        (item) => item.sectionId === sectionId
      );
      items.splice(sectionIndex, 1);
      return { ...state, packItems: items };
    }

    case ADD_PACK_ITEM: {
      const { sectionId, packItem } = action.payload;
      const items = cloneDeep(state.packItems);
      const sectionIndex = items.findIndex(
        (item) => item.sectionId === sectionId
      );
      items[sectionIndex].sectionItems.push(packItem);
      return { ...state, packItems: items };
    }

    case UPDATE_PACK_ITEM: {
      const { sectionId, packItem, toggle, editItemName } = action.payload;
      const items = cloneDeep(state.packItems);
      const sectionIndex = items.findIndex(
        (item) => item.sectionId === sectionId
      );
      const itemIndex = items[sectionIndex].sectionItems.findIndex(
        (sectionItem) => sectionItem.name === packItem.name
      );

      if (toggle)
        items[sectionIndex].sectionItems[itemIndex].checked =
          !items[sectionIndex].sectionItems[itemIndex].checked;

      if (editItemName)
        items[sectionIndex].sectionItems[itemIndex].name =
          editItemName && editItemName;

      return { ...state, packItems: items };
    }

    case DELETE_PACK_ITEM: {
      const { sectionId, packItem } = action.payload;
      const items = cloneDeep(state.packItems);
      const sectionIndex = items.findIndex(
        (item) => item.sectionId === sectionId
      );
      const itemIndex = items[sectionIndex].sectionItems.findIndex(
        (sectionItem) => sectionItem.name === packItem.name
      );
      items[sectionIndex].sectionItems.splice(itemIndex, 1);
      return { ...state, packItems: items };
    }

    default:
      return state;
  }
};
