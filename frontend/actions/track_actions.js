import * as APIUtil from "../util/track_api_util";

export const RECEIVE_TRACKS = 'RECEIVE_TRACKS';
export const RECEIVE_TRACK = 'RECEIVE_TRACK';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const RECEIVE_SEARCHED_TRACKS = 'RECEIVE_SEARCHED_TRACKS';

export const createTrack = (track) => dispatch => {
  return APIUtil.createTrack(track).then(
    track => dispatch({ type: RECEIVE_TRACK, track }),
    errors => dispatch({ type: RECEIVE_ERRORS, errors: errors.responseJSON })
  );
};

export const fetchTrack = (id) => dispatch => {
  return APIUtil.fetchTrack(id).then(
    track => dispatch({ type: RECEIVE_TRACK, track }), 
    errors => dispatch({ type: RECEIVE_ERRORS, errors: errors.responseJSON })
  );
};

export const fetchTracks = () => dispatch => {
  return APIUtil.fetchTracks().then(
    tracks => dispatch({ type: RECEIVE_TRACKS, tracks }),
    errors => dispatch({ type: RECEIVE_ERRORS, errors: errors.responseJSON })
  );
};

export const searchTracks = (searchTerm) => dispatch => {
  return APIUtil.searchTracks(searchTerm).then(
    results => dispatch({ type: RECEIVE_SEARCHED_TRACKS, results }),
    errors => dispatch({ type: RECEIVE_SEARCHED_TRACKS, errors: errors.responseJSON })
  )
}

export const alterTrack = (track) => dispatch => {
  return APIUtil.alterTrack(track).then(
    track => dispatch({ type: RECEIVE_TRACK, track }),
    errors => dispatch({ type: RECEIVE_ERRORS, errors: errors.responseJSON })
  );
};

