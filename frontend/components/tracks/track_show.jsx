import React from 'react';

class TrackShow extends React.Component {
    constructor(props){
        super(props);
        this.state = { track: '' };
    }

    componentDidMount(){
        debugger
        this.props.fetchTrack(this.props.match.params.id);
    }

    // componentDidUpdate(prevProps) {
    //     if (prevProps.match.params.id !== this.props.match.params.id) {
    //         this.props.fetchTrack(this.props.match.params.id);
    //     }
    // }

    render (){
        if (Object.keys(this.props.track).length === 0){
            return null;
        } 

        const { track, album, artist } = this.props;
        debugger
        return (
            <div className="track-show">
            <div className="track-header">
                <img className="track-show-track-art" src={album.artwork_url}/>
                <div className="track-show-meta-container">
                    <p className="track-show-track-title">{track.title}</p>
                    <p className="track-show-track-artist">{artist.name}</p>
                    <div className="track-show-album-container">
                        <p className="meta-tag">Album</p>
                            <p className="track-show-track-album"> {album.title}</p>
                    </div>
                    <div className="track-show-year-container">
                        <p className="meta-tag">Year</p>
                            <p className="track-show-track-year">{album.year}</p>
                    </div>
                </div>
            </div>
            <div className="lyrics-body">
                <p>{track.lyrics}</p>
            </div>
                
            </div>
            
        );
    }
};

export default TrackShow;