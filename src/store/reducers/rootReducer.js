import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { counterReducer } from "./counterReducer";
import { journalReducer } from "./journalReducer";
import { configReducer } from "./configReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  counter: counterReducer,
  journal: journalReducer,
  config: configReducer,
});

export default rootReducer;
