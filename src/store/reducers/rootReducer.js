import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { counterReducer } from "./counterReducer";
import { journalReducer } from "./journalReducer";
import { calendarReducer } from "./calendarReducer";
import { configReducer } from "./configReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  counter: counterReducer,
  journal: journalReducer,
  calendar: calendarReducer,
  config: configReducer,
});

export default rootReducer;
