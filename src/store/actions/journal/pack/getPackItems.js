import { GET_PACK_ITEMS } from "../../../actionTypes/journal";

// const INITIAL_PACK_ITEMS = [
//   { id: 1, name: "Passport", checked: false },
//   { id: 2, name: "Flight Ticket", checked: false },
//   { id: 3, name: "Visa", checked: true },
//   { id: 4, name: "Charger", checked: false },
//   { id: 5, name: "Medicines", checked: false },
// ];

const INITIAL_PACK_ITEMS = [
  {
    sectionId: 1,
    sectionTitle: "Documents",
    placeholderText: "Add Item: e.g. Hotel Booking Info",
    sectionItems: [
      { id: 1, name: "Passport", checked: false },
      { id: 2, name: "Flight Ticket", checked: false },
      { id: 3, name: "Visa", checked: true },
      { id: 4, name: "Health Records", checked: false },
      { id: 5, name: "Drivers License", checked: false },
    ],
  },
  {
    sectionId: 2,
    sectionTitle: "Electronics",
    placeholderText: "Add Item.. e.g. iPad",
    sectionItems: [
      { id: 1, name: "Phone + Charger", checked: false },
      { id: 2, name: "Camera + Charger", checked: false },
      { id: 3, name: "Headphones", checked: true },
      { id: 4, name: "Laptop", checked: false },
      { id: 5, name: "Selfie Stick", checked: false },
    ],
  },
  {
    sectionId: 3,
    sectionTitle: "Clothing",
    placeholderText: "Add Item.. e.g. Shorts",
    sectionItems: [
      { id: 1, name: "T-Shirts", checked: false },
      { id: 2, name: "Jeans", checked: false },
      { id: 3, name: "Scarf", checked: true },
      { id: 4, name: "Rain Jacket", checked: false },
      { id: 5, name: "Pajamas", checked: false },
    ],
  },
  {
    sectionId: 4,
    sectionTitle: "Toiletries",
    placeholderText: "Add Item.. e.g. Comb",
    sectionItems: [
      { id: 1, name: "Shampoo + Conditioner", checked: false },
      { id: 2, name: "Toothpaste + Brush", checked: false },
      { id: 3, name: "Sunscreen", checked: true },
      { id: 4, name: "Body Wash", checked: false },
      { id: 5, name: "Deodrant", checked: false },
    ],
  },
  {
    sectionId: 5,
    sectionTitle: "Shoes",
    placeholderText: "Add Item.. e.g. Running Shoes",
    sectionItems: [
      { id: 1, name: "Sandals", checked: false },
      { id: 2, name: "Tennis Shoes", checked: false },
      { id: 3, name: "Ankle Boots", checked: true },
    ],
  },
];

// Check if the response is null or length of 0 and then send the above object
const getPackItems = () => (dispatch, getState) => {
  dispatch({
    type: GET_PACK_ITEMS,
    payload: INITIAL_PACK_ITEMS,
  });
};

export default getPackItems;
