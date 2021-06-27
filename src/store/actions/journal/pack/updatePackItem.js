import { UPDATE_PACK_ITEM } from "../../../actionTypes/journal";

const updatePackItem = (sectionId, packItem) => (dispatch, getState) => {
  dispatch({
    type: UPDATE_PACK_ITEM,
    payload: {
      sectionId,
      packItem,
    },
  });
};

// const updatePackItem = (item) => ({
//   type: UPDATE_PACK_ITEM,
//   payload: item,
// });

export default updatePackItem;
