//Action Types
import { DECREMENT_COUNTER } from "../../actionTypes/counter";

//Action Creator
const decrementCounter = () => ({
  type: DECREMENT_COUNTER,
});

export default decrementCounter;
