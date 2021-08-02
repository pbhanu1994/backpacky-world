import { combineReducers } from "redux";
import { counterReducer } from "./counterReducer";
import { journalReducer } from "./journalReducer";
import { configReducer } from "./configReducer";

const rootReducer = combineReducers({
  counter: counterReducer,
  journal: journalReducer,
  config: configReducer,
});

export default rootReducer;
