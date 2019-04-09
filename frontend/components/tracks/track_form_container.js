import { connect } from 'react-redux';
import { createTrack } from '../../actions/track_actions';
import { createArtist, fetchArtists } from '../../actions/artist_actions';
import { createAlbum, fetchAlbums } from '../../actions/album_actions';
import TrackForm from './track_form';


const mapStateToProps = state => {
  return ({
    artists: state.entities.artists,
    albums: state.entities.albums,
    currentUser: state.entities.session.currentUser
  });
};

const mapDispatchToProps = dispatch => {
  return ({
    fetchArtists: () => dispatch(fetchArtists()),
    fetchAlbums: () => dispatch(fetchAlbums()),
    createTrack: track => dispatch(createTrack(track)),
    createArtist: artist => dispatch(createArtist(artist)),
    createAlbum: album => dispatch(createAlbum(album)),
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackForm);