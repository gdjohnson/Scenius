import { RECEIVE_ARTIST, RECEIVE_ARTISTS } from '../actions/artist_actions';
import { RECEIVE_TRACK } from '../actions/track_actions';

const artistsReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_ARTIST:
      return Object.assign({}, state, action.artist);
    case RECEIVE_ARTISTS:
      return action.artists;
    case RECEIVE_TRACK:
      return action.data.associations.artist;
    default:
      return state;
  }
};

export default artistsReducer;