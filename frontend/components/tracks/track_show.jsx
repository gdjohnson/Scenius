import React from 'react';
import Player from 'react-player';
import { Link } from 'react-router-dom';

class TrackShow extends React.Component {

    constructor(props){
        super(props);
        this.state = { track: '' };
        this.pullSelection = this.pullSelection.bind(this)
        this.saveSelection = this.saveSelection.bind(this)
    }

    componentDidMount(){
        this.props.fetchTrack(this.props.match.params.id);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.props.fetchTrack(this.props.match.params.id);
        }
    }


    // ANNOTATIONS
    pullSelection() {
        if (window.getSelection && this.props.currentUser) {
            const ref = window.getSelection();
            const lyrics = document.getElementsByClassName("lyrics-body");
            
            //Creating and defining selection indices
            let range
            if (ref.rangeCount) {
                range = ref.getRangeAt(0).cloneRange();
            }
            let start_idx = range.startOffset
            let end_idx = range.endOffset  

            this.addAnnotation(ref, start_idx, end_idx)
            this.saveSelection(ref, range) 
        }
    }

    addAnnotation(ref, start, end){
        this.props.openModal({modal: 'add-annotation', annotProps: {ref, start, end}});
    }

    saveSelection(ref, range) {
        //Creating annotation span element
            let span = document.createElement("span")
            span.classList.add("annotated")
            
            //Assigning element to selection; replacing original element with new
            range.surroundContents(span);
            ref.removeAllRanges();
            ref.addRange(range);   
    }



    render (){
        if (Object.keys(this.props.track).length === 0 ||
            this.props.track.album === undefined ||
            typeof Object.values(this.props.artist)[0] === 'object') {
            return null;
        } 
        const { artist, album, track } = this.props;

        const artwork = () => {
            if (album.artwork_url){
                return <img className="track-show-track-art" src={album.artwork_url} />
            } else {
                return (
                    <span className="track-show-no-art">
                        <button type="submit" 
                                className="track-show-art-upload" 
                                onClick={() => this.props.openModal({modal: 'add-art'})}>Add Artwork</button>
                    </span>
                )
            }
        }

        const bgroundStyle = () => {
            if (album.background_photo){
                return {backgroundImage: 'url(' + album.background_photo + ')'}
            }}

        const bgroundButton = () => {
            if (!album.background_photo){
                return (
                        <button type="submit"
                                className="track-show-bground-upload"
                                onClick={() => this.props.openModal({modal: 'add-bground'})}>Add Background</button>
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

        const audioLink = () => {
            if (track.audio_link){
                return <Player  url={track.audio_link} 
                                playing={false}
                                width="250px" height="150px"
                                config={{ attributes: { autoPlay: false } }}/>
            }
        }

        return (
            <div className="track-show">
                <div className="track-header-container" style={bgroundStyle()}>
                    {bgroundButton()}
                    <div className="track-header">
                        <div className="track-show-track-art-container">
                            {artwork()}
                        </div>
                        <div className="track-show-meta-container">
                            <p className="track-show-track-title">{track.title}</p>
                            <Link to={`/artists/${artist.name.slice(0, 1).toUpperCase()}/${artist.id}`}><p className="track-show-track-artist">{artist.name}</p></Link>
                            <div className="track-show-album-container">
                                <p className="meta-tag">Album</p>
                                <Link to={`/albums/${album.id}`}><p className="track-show-track-album">{album.title}</p></Link>
                            </div>
                            {yearContainer()}
                        </div>
                    </div>
                </div>

                <div className="track-lyrics-and-annot">
                    <div className="lyrics-body" onMouseUp={this.pullSelection}>
                        <div className="lyrics-body-lyrics">
                            <p className="xsmall-track-title">{track.title} lyrics</p>
                            <p>{track.lyrics}</p>
                        </div>
                        <div className="lyrics-body-annotations">
                            {audioLink()}
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    }
};

export default TrackShow;