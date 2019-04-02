export const UPDATE_BOUNDS = 'UPDATE_BOUNDS';
import * as ArtistUtil from '../util/artist_api_util';

export const updateBounds = (bounds) => dispatch => {
  return ArtistUtil.fetchArtists(track).then(
    (track) => (dispatch({ type: RECEIVE_TRACK, track }), errors => dispatch({ type: RECEIVE_ERRORS, errors: errors.responseJSON })
    ));
};