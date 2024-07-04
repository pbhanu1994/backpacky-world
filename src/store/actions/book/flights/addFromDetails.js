import { ADD_FROM_DETAILS_FOR_FLIGHT } from "../../../actionTypes/book";

const addFromDetailsForFlight = (fromDetails) => (dispatch, getState) => {
  dispatch({
    type: ADD_FROM_DETAILS_FOR_FLIGHT,
    payload: fromDetails,
  });
};

export default addFromDetailsForFlight;
