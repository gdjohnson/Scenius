import rootReducer from '../reducers/root_reducer';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const configureStore = (preloadedState = {}) => (
    createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(thunk)
    )
);

export default configureStore;