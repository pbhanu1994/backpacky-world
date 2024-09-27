import { ADD_LOCATION } from "../../actionTypes/explore";

const addLocation = (location) => (dispatch, getState) => {
  dispatch({
    type: ADD_LOCATION,
    payload: location,
  });
};

export default addLocation;
