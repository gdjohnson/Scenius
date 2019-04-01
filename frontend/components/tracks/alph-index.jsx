import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchTracks } from '../../actions/track_actions';

export class AlphIndex extends React.Component {
    constructor (){
        super(props)
    }

    componentWillMount(){
        this.props.fetchTracks()
        this.tracks = Object.values(this.props.tracks).filter(
            track => {
                return (track.title[0].toLowercase() === 
                        this.state.start_char.toLowercase()) 
            });
    }

    render (){

        const trackList = this.tracks.map(track => {
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

