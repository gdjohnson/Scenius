import { connect } from "react-redux";
import Search from './search';
import { searchTracks } from '../../actions/track_actions';

export const mapStateToProps = state => {
    return ({
        tracks: state.search.tracks
    });
};

export const mapDispatchToProps = dispatch => {
    return ({
        searchTracks: (searchTerm) => dispatch(searchTracks(searchTerm))
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);