import { GET_PACK_ITEMS } from "../../../actionTypes/journal";

const INITIAL_PACK_ITEMS = [
  { id: 1, name: "Passport", checked: false },
  { id: 2, name: "Flight Ticket", checked: false },
  { id: 3, name: "Visa", checked: true },
  { id: 4, name: "Charger", checked: false },
  { id: 5, name: "Medicines", checked: false },
];

// Check if the response is null or length of 0 and then send the above object
const getPackItems = () => (dispatch, getState) => {
  dispatch({
    type: GET_PACK_ITEMS,
    payload: INITIAL_PACK_ITEMS,
  });
};

export default getPackItems;
