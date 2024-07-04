import { ADD_DESTINATION_DETAILS_FOR_HOTEL } from "../../../actionTypes/book";

const addDestinationDetailsForHotel =
  (destinationDetails) => (dispatch, getState) => {
    dispatch({
      type: ADD_DESTINATION_DETAILS_FOR_HOTEL,
      payload: destinationDetails,
    });
  };

export default addDestinationDetailsForHotel;
