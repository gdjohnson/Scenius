import { RECEIVE_TRACK, RECEIVE_TRACKS } from '../actions/track_actions';
import { merge } from 'lodash';

const tracksReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_TRACK:
      return merge({}, state, { [action.track.id]: action.track });
    case RECEIVE_TRACKS:
      debugger
      return action.tracks;
    default:
      return state;
  }
};

export default tracksReducer;