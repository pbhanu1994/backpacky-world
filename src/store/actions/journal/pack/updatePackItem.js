import { UPDATE_PACK_ITEM } from "../../../actionTypes/journal";

const updatePackItem = (item) => (dispatch, getState) => {
  dispatch({
    type: UPDATE_PACK_ITEM,
    payload: item,
  });
};

// const updatePackItem = (item) => ({
//   type: UPDATE_PACK_ITEM,
//   payload: item,
// });

export default updatePackItem;
