import { combineReducers } from '';
import sessionReducer from './session_reducer';

export const combineReducers = () => ({
    entities: entitiesReducer,
    sessions: sessionReducer
})