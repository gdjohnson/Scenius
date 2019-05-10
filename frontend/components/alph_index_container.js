import { connect } from 'react-redux';
import { fetchArtistsByLetter } from '../actions/artist_actions';
import { openModal } from '../actions/modal_actions';
import AlphIndex from './alph_index';

const mapStateToProps = (state, { match }) => {
    const { char } = match.params;
    const { artists } = state.entities;
    return { artists, char };
};
  
const mapDispatchToProps = dispatch => {
    return { 
        fetchArtistsByLetter: (char) => dispatch(fetchArtistsByLetter(char)),
        openModal: (modal) => dispatch(openModal(modal))
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(AlphIndex);