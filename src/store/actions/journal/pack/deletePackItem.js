import { DELETE_PACK_ITEM } from "../../../actionTypes/journal";

const deletePackItem = (sectionId, packItem) => (dispatch, getState) => {
  dispatch({
    type: DELETE_PACK_ITEM,
    payload: {
      sectionId,
      packItem,
    },
  });
};

export default deletePackItem;
