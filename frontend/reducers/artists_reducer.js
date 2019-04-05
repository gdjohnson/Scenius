import { RECEIVE_ARTIST, RECEIVE_ARTISTS } from '../actions/artist_actions';
import { RECEIVE_TRACK } from '../actions/track_actions';

const artistsReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_ARTIST:
      debugger
      return Object.assign({}, action.artist);
    case RECEIVE_ARTISTS:
      return action.artists;
    case RECEIVE_TRACK:
      debugger
      return action.track.artist;
    default:
      return state;
  }
};

export default artistsReducer;