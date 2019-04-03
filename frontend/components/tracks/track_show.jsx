import React from 'react';

class TrackShow extends React.Component {

    constructor(props){
        super(props);
        this.state = { track: '' };
    }

    componentDidMount(){
        this.props.fetchTrack(this.props.match.params.id);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.props.fetchTrack(this.props.match.params.id);
        }
    }

    render (){

        if (Object.keys(this.props.track).length === 0){
            return null;
        } 

        const { track, album, artist } = this.props;

        const artwork = () => {
            if (album.artwork_url){
                return <img className="track-show-track-art" src={album.artwork_url} />
            } else {
                return (
                    <div className="track-show-no-art">
                        <button type="submit" 
                                className="track-show-art-upload" 
                                onClick={() => this.props.openModal('add-art')}>Add Artwork</button>
                    </div>
                )
            }
        }

        const yearContainer = ()  => {
            if (album.year){
                return (
                    <div className="track-show-year-container">
                        <p className="meta-tag">Year</p>
                        <p className="track-show-track-year">{album.year}</p>
                    </div>
                )
            } else {
                return <div></div>
            }
        }

        // const artistImage = () => {
        //     if (artist.image_url){
        //         return (
        //             <img className="track-header-artist-image" src={artist.image_url}/>
        //         )
        //     } else {
        //         return (
        //             <div className="track-header-empty-artist-image">
        //                 <button type="submit"
        //                     className="track-show-art-upload"
        //                     onClick={() => this.props.openModal('add-photo')}>Add Background Photo</button>
        //             </div>
        //         )
        //     }
        // }

        return (
            <div className="track-show">

                <div className="track-header">
                    {/* {artistImage} */}
                    <div className="track-show-track-art-container">
                        {artwork()}
                    </div>
                    <div className="track-show-meta-container">
                        <p className="track-show-track-title">{track.title}</p>
                        <p className="track-show-track-artist">{artist.name}</p>
                        <div className="track-show-album-container">
                            <p className="meta-tag">Album</p>
                            <p className="track-show-track-album"> {album.title}</p>
                        </div>
                        { yearContainer()}
                    </div>
                </div>

                <div className="lyrics-body">
                    <div className="lyrics-body-lyrics">
                        <p>{track.lyrics}</p>
                    </div>
                    <div className="lyrics-body-annotations">
                        <p>annotations!</p>
                    </div>
                </div>
                
            </div>
            
        );
    }
};

export default TrackShow;