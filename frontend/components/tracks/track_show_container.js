import { connect } from 'react-redux';
import { openModal } from '../../actions/modal_actions';
import { fetchTrack } from '../../actions/track_actions';
import { fetchAlbum } from '../../actions/album_actions';
import { fetchArtist } from '../../actions/artist_actions';
import { createAnnotation } from '../../actions/annotation_actions';
import TrackShow from './track_show';


const mapStateToProps = (state, { match }) => {
    const id = parseInt(match.params.id);
    const track = state.entities.tracks;
    const album = state.entities.albums;
    const artist = state.entities.artists;
    return ({
      id, 
      track,
      album,
      artist
    });
  };
  
const mapDispatchToProps = dispatch => {
    return ({    
      fetchTrack: (id) => dispatch(fetchTrack(id)),
      fetchAlbum: (id) => dispatch(fetchAlbum(id)),
      fetchArtist: (id) => dispatch(fetchArtist(id)),
      createAnnotation: (annot) => dispatch(createAnnotation(annot)),
      openModal: (modal) => dispatch(openModal(modal))
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackShow);