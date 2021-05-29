import { ADD_ITEM } from "../../actionTypes/journal";

// const addItem = (item) => ({
//   type: ADD_ITEM,
//   payload: item,
// });

const addItem = (item) => (dispatch, getState) => {
  dispatch({
    type: ADD_ITEM,
    payload: item,
  });
};

export default addItem;
