import { connect } from 'react-redux';
import { fetchArtistsByLetter } from '../actions/artist_actions';
import AlphIndex from './alph_index';

const mapStateToProps = (state, { match }) => {
    const { char } = match.params;
    const { artists } = state.entities;
    return { artists, char };
};
  
const mapDispatchToProps = dispatch => {
    return { fetchArtistsByLetter: (char) => dispatch(fetchArtistsByLetter(char)) };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(AlphIndex);