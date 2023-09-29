import { UPDATE_SELECTED_HOTEL } from "../../../actionTypes/book";

const updateSelectedHotel = (selectedHotel) => (dispatch) => {
  dispatch({
    type: UPDATE_SELECTED_HOTEL,
    payload: selectedHotel,
  });
};

export default updateSelectedHotel;
