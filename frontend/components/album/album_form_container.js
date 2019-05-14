import { connect } from 'react-redux';
import { alterAlbum } from '../../actions/album_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import AlbumForm from './album_form'


const mapStateToProps = state => {
  debugger
    return {
      album: state.entities.albums,
      id: state.entities.tracks.album_id,
      artist_id: state.entities.tracks.artist_id
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      alterAlbum: (album) => dispatch(alterAlbum(album)),
      closeModal: () => dispatch(closeModal()),
      openModal: (modal) => dispatch(openModal(modal))
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(AlbumForm);