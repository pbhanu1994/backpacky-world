import { DELETE_PACK_ITEM } from "../../../actionTypes/journal";

const deletePackItem = (item) => (dispatch, getState) => {
  dispatch({
    type: DELETE_PACK_ITEM,
    payload: item,
  });
};

export default deletePackItem;
