import { ADD_PACK_ITEM } from "../../../actionTypes/journal";

const addPackItem = (item) => (dispatch, getState) => {
  const packItem = {
    name: item,
    checked: false,
  };
  dispatch({
    type: ADD_PACK_ITEM,
    payload: packItem,
  });
};

export default addPackItem;
