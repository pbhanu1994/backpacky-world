import { createStore, applyMiddleware, compose } from 'redux';
import {composeWithDevTools} from "redux-devtools-extension";
import rootReducer from './reducers/rootReducer';

const initStore = (initialState, options) => {
    const store = createStore(rootReducer, initialState, composeWithDevTools());

    return store;
};

export default initStore;