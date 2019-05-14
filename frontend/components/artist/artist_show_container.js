import { connect } from 'react-redux';
import { fetchArtist } from '../../actions/artist_actions';
import { openModal } from '../../actions/modal_actions';
import ArtistShow from './artist_show'

const mapStateToProps = (state) => {
    return { artist: state.entities.artists };
};
  
const mapDispatchToProps = dispatch => {
    return { 
        fetchArtist: (id) => dispatch(fetchArtist(id)),
        openModal: (modal) => dispatch(openModal(modal)) };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(ArtistShow);
  