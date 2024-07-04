import { UPDATE_SELECTED_FLIGHT_OFFER } from "../../../actionTypes/book";

const updateSelectedFlightOffer = (selectedFlightOffer) => (dispatch) => {
  dispatch({
    type: UPDATE_SELECTED_FLIGHT_OFFER,
    payload: selectedFlightOffer,
  });
};

export default updateSelectedFlightOffer;
