import * as APIUtil from "../util/album_api_util";

export const RECEIVE_ALBUMS = 'RECEIVE_ALBUMS';
export const RECEIVE_ALBUM = 'RECEIVE_ALBUM';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const RECEIVE_SEARCHED_ALBUMS = 'RECEIVE_SEARCHED_ALBUMS';

export const createAlbum = (album) => dispatch => {
  return APIUtil.createAlbum(album).then(
    album => dispatch({ type: RECEIVE_ALBUM, album }),
    errors => dispatch({ type: RECEIVE_ERRORS, errors: errors.responseJSON })
  );
};

export const fetchAlbum = (id) => dispatch => {
  return APIUtil.fetchAlbum(id).then(
    album => dispatch({ type: RECEIVE_ALBUM, album }),
    errors => dispatch({ type: RECEIVE_ERRORS, errors: errors.responseJSON })
  );
};

export const fetchAlbums = () => dispatch => {
  return APIUtil.fetchAlbums().then(
    albums => dispatch({ type: RECEIVE_ALBUMS, albums }),
    errors => dispatch({ type: RECEIVE_ERRORS, errors: errors.responseJSON })
  );
};

export const searchAlbums = (searchTerm) => dispatch => {
  return APIUtil.searchAlbums(searchTerm).then(
    results => dispatch({ type: RECEIVE_SEARCHED_ALBUMS, results }),
    errors => dispatch({ type: RECEIVE_SEARCHED_ALBUMS, errors: errors.responseJSON })
  )
}

export const alterAlbum = (album) => dispatch => {
  return APIUtil.alterAlbum(album).then(
    album => dispatch({ type: RECEIVE_ALBUM, album }),
    errors => dispatch({ type: RECEIVE_ERRORS, errors: errors.responseJSON })
  );
};