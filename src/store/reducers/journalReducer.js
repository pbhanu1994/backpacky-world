import { cloneDeep } from "lodash";
import {
  // PACK
  GET_PACK_ITEMS,
  ADD_PACK_SECTION,
  UPDATE_PACK_SECTION,
  DELETE_PACK_SECTION,
  ADD_PACK_ITEM,
  UPDATE_PACK_ITEM,
  DELETE_PACK_ITEM,
  // BUCKET LIST
  GET_BUCKET_LIST_ITEMS,
  ADD_BUCKET_LIST_SECTION,
  UPDATE_BUCKET_LIST_SECTION,
  DELETE_BUCKET_LIST_SECTION,
  ADD_BUCKET_LIST_ITEM,
  UPDATE_BUCKET_LIST_ITEM,
  DELETE_BUCKET_LIST_ITEM,
} from "../actionTypes/journal";

const initialState = {
  total: 0,
  completed: 0,
  packItems: [],
  bucketListItems: [],
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
        (sectionItem) => sectionItem.id === packItem.id
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
        (sectionItem) => sectionItem.id === packItem.id
      );
      items[sectionIndex].sectionItems.splice(itemIndex, 1);
      return { ...state, packItems: items };
    }

    // -- BUCKET LIST -- //
    case GET_BUCKET_LIST_ITEMS:
      return { ...state, bucketListItems: action.payload };

    case ADD_BUCKET_LIST_SECTION: {
      const { section, position } = action.payload;
      const items = cloneDeep(state.bucketListItems);
      position === "start" ? items.unshift(section) : items.push(section);
      return {
        ...state,
        bucketListItems: items,
      };
    }

    case UPDATE_BUCKET_LIST_SECTION: {
      const { sectionId, sectionTitle } = action.payload;
      const items = cloneDeep(state.bucketListItems);
      const sectionIndex = items.findIndex(
        (item) => item.sectionId === sectionId
      );
      items[sectionIndex].sectionTitle = sectionTitle;
      return { ...state, bucketListItems: items };
    }

    case DELETE_BUCKET_LIST_SECTION: {
      const { sectionId } = action.payload;
      const items = cloneDeep(state.bucketListItems);
      const sectionIndex = items.findIndex(
        (item) => item.sectionId === sectionId
      );
      items.splice(sectionIndex, 1);
      return { ...state, bucketListItems: items };
    }

    case ADD_BUCKET_LIST_ITEM: {
      const { sectionId, bucketListItem } = action.payload;
      const items = cloneDeep(state.bucketListItems);
      const sectionIndex = items.findIndex(
        (item) => item.sectionId === sectionId
      );
      items[sectionIndex].sectionItems.push(bucketListItem);
      return { ...state, bucketListItems: items };
    }

    case UPDATE_BUCKET_LIST_ITEM: {
      const { sectionId, bucketListItem, toggle, editItemName } =
        action.payload;
      const items = cloneDeep(state.bucketListItems);
      const sectionIndex = items.findIndex(
        (item) => item.sectionId === sectionId
      );
      const itemIndex = items[sectionIndex].sectionItems.findIndex(
        (sectionItem) => sectionItem.id === bucketListItem.id
      );

      if (toggle)
        items[sectionIndex].sectionItems[itemIndex].checked =
          !items[sectionIndex].sectionItems[itemIndex].checked;

      if (editItemName)
        items[sectionIndex].sectionItems[itemIndex].name =
          editItemName && editItemName;

      return { ...state, bucketListItems: items };
    }

    case DELETE_BUCKET_LIST_ITEM: {
      const { sectionId, bucketListItem } = action.payload;
      const items = cloneDeep(state.bucketListItems);
      const sectionIndex = items.findIndex(
        (item) => item.sectionId === sectionId
      );
      const itemIndex = items[sectionIndex].sectionItems.findIndex(
        (sectionItem) => sectionItem.id === bucketListItem.id
      );
      items[sectionIndex].sectionItems.splice(itemIndex, 1);
      return { ...state, bucketListItems: items };
    }

    default:
      return state;
  }
};
