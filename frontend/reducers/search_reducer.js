import { RECEIVE_SEARCHED_TRACKS } from '../actions/track_actions';
import { RECEIVE_SEARCHED_ALBUMS } from '../actions/album_actions';
import { RECEIVE_SEARCHED_ARTISTS } from '../actions/artist_actions';


const searchReducer = (state = {}, action) => {
  Object.freeze(state);
  let stateClone = {...state};
  switch (action.type) {
    case RECEIVE_SEARCHED_TRACKS:
      let tracks =  {tracks: action.results};
      return Object.assign(stateClone, tracks);
    case RECEIVE_SEARCHED_ALBUMS:
      let albums = {albums: action.results};
      return Object.assign(stateClone, albums);
    case RECEIVE_SEARCHED_ARTISTS:
      let artists = {artists: action.results};
      return Object.assign(stateClone, artists);
    default:
      return state;
  }
};

export default searchReducer;