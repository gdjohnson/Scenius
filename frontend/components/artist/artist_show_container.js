import { connect } from 'react-redux';
import { fetchArtist } from '../../actions/artist_actions';
import ArtistShow from './artist_show'

const mapStateToProps = (state) => {
    return { artist: state.entities.artists };
};
  
const mapDispatchToProps = dispatch => {
    return { fetchArtist: (id) => dispatch(fetchArtist(id)) };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(ArtistShow);
  