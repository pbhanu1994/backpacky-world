import { combineReducers } from "redux";
import { counterReducer } from "./counterReducer";
import { journalReducer } from "./journalReducer";

const rootReducer = combineReducers({
  counter: counterReducer,
  journal: journalReducer,
});

export default rootReducer;
