import { ADD_PACK_ITEM } from "../../../actionTypes/journal";

const addPackItem = (sectionId, item) => (dispatch, getState) => {
  const packItem = {
    name: item,
    checked: false,
  };
  dispatch({
    type: ADD_PACK_ITEM,
    payload: {
      sectionId,
      packItem,
    },
  });
};

export default addPackItem;
