import { RECEIVE_ALBUM, RECEIVE_ALBUMS } from '../actions/album_actions';
import { RECEIVE_TRACK } from '../actions/track_actions';
import { RECEIVE_ARTIST } from '../actions/artist_actions';


const albumsReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_ALBUM:
      debugger
      return Object.assign({}, action.album );
    case RECEIVE_ALBUMS:
      return action.albums;
    case RECEIVE_TRACK:
      debugger
      return action.track.album;
    case RECEIVE_ARTIST:
      debugger
      return action.artist.albums;
    default:
      return state;
  }
};

export default albumsReducer;