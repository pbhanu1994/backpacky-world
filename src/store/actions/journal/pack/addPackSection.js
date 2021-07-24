import { ADD_PACK_SECTION } from "../../../actionTypes/journal";

const addSection = {
  sectionId: 6,
  sectionTitle: "Meds/First Aid",
  placeholderText: "Add Item.. e.g. Vitamins",
  sectionItems: [],
};

const addPackSection = (position) => (dispatch, getState) => {
  dispatch({
    type: ADD_PACK_SECTION,
    payload: { section: addSection, position },
  });
};

export default addPackSection;
