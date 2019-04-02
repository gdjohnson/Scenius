import { connect } from 'react-redux';
import { fetchTrack } from '../../actions/track_actions';
import TrackShow from './track_show';

const mapStateToProps = (state, { match }) => {
  debugger
    const id = parseInt(match.params.id);
    const track = state.entities.tracks;
    const album = state.entities.albums[track.album_id];
    const artist = state.entities.artists[track.artist_id];
    return ({
      id, 
      track,
      album,
      artist
    });
  };
  
const mapDispatchToProps = dispatch => {
    return ({    
      fetchTrack: (id) => dispatch(fetchTrack(id))
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackShow);