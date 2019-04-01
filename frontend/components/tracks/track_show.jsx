import React from 'react';

class TrackShow extends React.Component {
    constructor(props){
        super(props);
        this.state = { track: '' };
    }

    componentDidMount(){
        this.props.fetchTrack(this.props.match.params.id);
    }

    render (){
        if (!this.props.track){
            return null;
        }
        const track = this.props.track;
        return (
            <div className="track-show">
            <div className="track-header">
                <img src={this.props.track.album.artwork_url}
            </div>
                <h2>{track.title}</h2>
                <h3>{track.artist}</h3>
                <h3>{track.album}</h3>
                {/* <p>{track.album.year}</p> */}
                <div className="lyrics-body">
                    <p>{track.lyrics}</p>
                </div>
                
            </div>
            
        );
    }
};

export default TrackShow;