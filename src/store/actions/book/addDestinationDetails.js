import { ADD_DESTINATION_DETAILS } from "../../actionTypes/book";

const addDestinationDetails = (destinationDetails) => (dispatch, getState) => {
  dispatch({
    type: ADD_DESTINATION_DETAILS,
    payload: destinationDetails,
  });
};

export default addDestinationDetails;
