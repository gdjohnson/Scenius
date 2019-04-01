import React from 'react';

class TrackShow extends React.Component {
    constructor(props){
        super(props);
        this.state = { track: '' };
    }

    componentDidMount(){
        // debugger
        this.props.fetchTrack(this.props.match.params.id);
    }

    render (){
        // debugger
        if (!this.props.track){
            return null;
        }
        const track = this.props.track;
        return (
            <div className="track-show">
                <h2>{track.title}</h2>
                <h3>{track.artist}</h3>
                <h3>{track.album}</h3>
                {/* <p>{track.album.year}</p> */}
                <p>{track.lyrics}</p>
            </div>
            
        );
    }
};

export default TrackShow;