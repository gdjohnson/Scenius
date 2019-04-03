import { RECEIVE_ALBUM, RECEIVE_ALBUMS } from '../actions/album_actions';
import { RECEIVE_TRACK } from '../actions/track_actions';


const albumsReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_ALBUM:
      debugger
    return Object.assign({}, state, action.album );
    case RECEIVE_ALBUMS:
    return action.albums;
    case RECEIVE_TRACK:
      return action.data.associations.album;
    default:
      return state;
  }
};

export default albumsReducer;