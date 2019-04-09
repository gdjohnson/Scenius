import { combineReducers } from 'redux';
import sessionReducer from './session_reducer';
import usersReducer from './users_reducer';
import tracksReducer from './tracks_reducer';
import albumsReducer from './albums_reducer';
import artistsReducer from './artists_reducer';
import annotationsReducer from './annotations_reducer';

export default combineReducers({
    session: sessionReducer,
    users: usersReducer,
    tracks: tracksReducer,
    artists: artistsReducer,
    albums: albumsReducer,
    annotations: annotationsReducer
});
