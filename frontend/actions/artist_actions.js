import * as APIUtil from "../util/artist_api_util";

export const RECEIVE_ARTISTS = 'RECEIVE_ARTISTS';
export const RECEIVE_ARTIST = 'RECEIVE_ARTIST';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

export const createArtist = (artist) => dispatch => {
  return APIUtil.createArtist(artist).then(
    artist => dispatch({ type: RECEIVE_ARTIST, artist }),
    errors => dispatch({ type: RECEIVE_ERRORS, errors: errors.responseJSON })
  );
};

export const fetchArtist = (id) => dispatch => {
  return APIUtil.fetchArtist(id).then(
    artist =>{
      return dispatch({ type: RECEIVE_ARTIST, artist });
    }, 
    errors => dispatch({ type: RECEIVE_ERRORS, errors: errors.responseJSON })
  );
};

export const fetchArtists = () => dispatch => {
  return APIUtil.fetchArtists().then(
    artists => dispatch({ type: RECEIVE_ARTISTS, artists }),
    errors => dispatch({ type: RECEIVE_ERRORS, errors: errors.responseJSON })
  );
};

export const fetchArtistsByLetter = (char) => dispatch => {
  return APIUtil.fetchArtistsByLetter(char).then(
    artists => dispatch({ type: RECEIVE_ARTISTS, artists }),
    errors => dispatch({ type: RECEIVE_ERRORS, errors: errors.responseJSON })
  );
};


export const alterArtist = (artist) => dispatch => {
  return APIUtil.alterArtist(artist).then(
    artist => dispatch({ type: RECEIVE_ARTIST, artist }),
    errors => dispatch({ type: RECEIVE_ERRORS, errors: errors.responseJSON })
  );
};