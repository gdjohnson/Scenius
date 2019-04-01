import { connect } from 'react-redux';
import { fetchTrack } from '../../actions/track_actions';
import TrackShow from './track_show';

const mapStateToProps = (state, { match }) => {
    // debugger
    const id = parseInt(match.params.id);
    const track = state.entities.tracks[id];
    return ({
      id, 
      track
    });
  };
  
const mapDispatchToProps = dispatch => {
    return ({    
      fetchTrack: (id) => dispatch(fetchTrack(id))
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackShow);