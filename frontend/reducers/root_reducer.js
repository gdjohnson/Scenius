import { combineReducers } from 'redux';
import entitiesReducer from './entities_reducer';
import uiReducer from './ui_reducer';
import errorReducer from './errors_reducer';
import searchReducer from './search_reducer';

const rootReducer = combineReducers({
    entities: entitiesReducer,
    ui: uiReducer,
    search: searchReducer,
    errors: errorReducer
});

export default rootReducer;