import { DELETE_PACK_SECTION } from "../../../actionTypes/journal";

const deletePackSection = (sectionId) => (dispatch, getState) => {
  dispatch({
    type: DELETE_PACK_SECTION,
    payload: { sectionId },
  });
};

export default deletePackSection;
