import { connect } from 'react-redux';
import { fetchAlbum } from '../../actions/album_actions';
import { openModal } from '../../actions/modal_actions';
import AlbumShow from './album_show';

const mapStateToProps = (state) => {
    return ({
      album: state.entities.albums
    });
  };
  
  const mapDispatchToProps = dispatch => {
    return ({
      fetchAlbum: (id) => dispatch(fetchAlbum(id)),
      openModal: (type) => dispatch(openModal(type))
    });
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(AlbumShow);
  