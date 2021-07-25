import { UPDATE_PACK_SECTION } from "../../../actionTypes/journal";

const updatePackSection = (sectionId, sectionTitle) => (dispatch, getState) => {
  dispatch({
    type: UPDATE_PACK_SECTION,
    payload: {
      sectionId,
      sectionTitle,
    },
  });
};

export default updatePackSection;
