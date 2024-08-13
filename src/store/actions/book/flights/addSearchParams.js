import { ADD_SEARCH_PARAMS } from "../../../actionTypes/book";

const addSearchParamsForFlight = (searchParams) => (dispatch, getState) => {
  dispatch({
    type: ADD_SEARCH_PARAMS,
    payload: searchParams,
  });
};

export default addSearchParamsForFlight;
