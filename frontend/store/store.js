import rootReducer from '../reducers/root_reducer';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = (preloadedState = {}) => (
    
    createStore(
        rootReducer,
        preloadedState,
        composeEnhancers(
            applyMiddleware(thunk)
        )
    )
);

export default configureStore;