import React from 'react';

class TrackShow extends React.Component {
    constructor(props){
        super(props);
    }

    render (){
        debugger
        const track = this.props.track;
        return (
            <div className="track-show">
                <h2>{track.title}</h2>
                <h3>{track.artist}</h3>
                <h3>{track.album}</h3>
                <p>{track.album.year}</p>
                <p>{track.lyrics}</p>
            </div>
            
        );
    }
};

export default TrackShow;