import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchTracks } from '../../actions/track_actions';

export class AlphIndex extends React.Component {
    constructor (props){
        super(props);
        this.state = {tracks: []};
    }

    componentWillMount(){
        debugger
        this.props.fetchTracks();
        const arr = Array.from(Object.values(this.props.tracks));
        debugger
        const tracks = arr.filter(
            track => track.title[0].toLowercase() === this.props.location.start_char.toLowercase());
        this.setState({tracks: tracks});
    }

    render (){
        debugger
        const trackList = this.state.tracks.map(track => {
            <li><Link path={`api/tracks/{track.id}`}>{track.title} by {track.artist}</Link></li>
        })

        return (
            <div className="track-show">
                {trackList}
            </div>
            
        );
    }
};

const mapStateToProps = state => {
    return ({
      tracks: state.entities.tracks
    });
  };
  
const mapDispatchToProps = dispatch => {
    return ({
        fetchTracks: () => dispatch(fetchTracks()),
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(AlphIndex);

