import { ADD_TO_DETAILS_FOR_FLIGHT } from "../../../actionTypes/book";

const addToDetailsForFlight = (toDetails) => (dispatch, getState) => {
  dispatch({
    type: ADD_TO_DETAILS_FOR_FLIGHT,
    payload: toDetails,
  });
};

export default addToDetailsForFlight;
