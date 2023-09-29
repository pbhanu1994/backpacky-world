import { combineReducers } from "@reduxjs/toolkit";
// import storage from "redux-persist/lib/storage";
import { authReducer } from "./authReducer";
import { counterReducer } from "./counterReducer";
import { journalReducer } from "./journalReducer";
import { travelBudgetReducer } from "./travelBudgetReducer";
import { calendarReducer } from "./calendarReducer";
import { configReducer } from "./configReducer";
import { bookReducer } from "./bookReducer";
// import { SIGN_OUT } from "../actionTypes/auth";

const rootReducer = combineReducers({
  auth: authReducer,
  counter: counterReducer,
  journal: journalReducer,
  travelBudget: travelBudgetReducer,
  calendar: calendarReducer,
  config: configReducer,
  book: bookReducer,
});

// TODO: Check with an experienced dev if this is a good approach
// Currently we're clearing the store on logout.
// const rootReducer = (state, action) => {
//   if (action.type === SIGN_OUT) {
//     // for all keys defined in your persistConfig(s)
//     storage.removeItem("persist:root");
//     // storage.removeItem('persist:otherKey')

//     /* As we know, reducers are supposed to return the initial
//     state when they are called with undefined as the first argument,
//     no matter the action. So, let's pass undefined as an argument */
//     return appReducer(undefined, action);
//   }
//   return appReducer(state, action);
// };

export default rootReducer;
