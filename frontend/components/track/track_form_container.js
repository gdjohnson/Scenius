import { connect } from 'react-redux';
import { createTrack } from '../../actions/track_actions';
import { createArtist, fetchArtists, searchArtists } from '../../actions/artist_actions';
import { createAlbum, fetchAlbums, searchAlbums } from '../../actions/album_actions';

import TrackForm from './track_form';

const mapStateToProps = state => {
  return ({
    artists: state.search.artists,
    albums: state.search.albums,
    currentUser: state.entities.session.currentUser
  });
};

const mapDispatchToProps = dispatch => {
  return ({
    searchArtists: (searchTerm) => dispatch(searchArtists(searchTerm)),
    searchAlbums: (searchTerm) => dispatch(searchAlbums(searchTerm)),
    createTrack: track => dispatch(createTrack(track)),
    createArtist: artist => dispatch(createArtist(artist)),
    createAlbum: album => dispatch(createAlbum(album)),
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackForm);