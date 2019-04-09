import { connect } from 'react-redux';
import { openModal } from '../../actions/modal_actions';
import { fetchTrack } from '../../actions/track_actions';
import { fetchAlbum } from '../../actions/album_actions';
import { fetchArtist } from '../../actions/artist_actions';
import TrackShow from './track_show';


const mapStateToProps = (state, { match }) => {
    const id = parseInt(match.params.id);
    const { tracks, albums, artists } = state.entities;
    return ({
      id, 
      track: tracks,
      album: albums,
      artist: artists,
      currentUser: state.entities.session.currentUser
    });
  };
  
const mapDispatchToProps = dispatch => {
    return ({    
      fetchTrack: (id) => dispatch(fetchTrack(id)),
      fetchAlbum: (id) => dispatch(fetchAlbum(id)),
      fetchArtist: (id) => dispatch(fetchArtist(id)),
      openModal: (modal) => dispatch(openModal(modal))
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackShow);