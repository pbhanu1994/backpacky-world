//Action Types
import { DECREMENT_COUNTER } from "../../types/counter";

//Action Creator
const decrementCounter = () => ({
    type: DECREMENT_COUNTER
});

export default decrementCounter;