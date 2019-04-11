import React from 'react';
import Player from 'react-player';
import { Link } from 'react-router-dom';
import AnnoModal from './anno_modal';


class TrackShow extends React.Component {

    constructor(props){
        super(props);
        this.state = { track: '' };
        this.pullSelection = this.pullSelection.bind(this);
        this.addAnnotation = this.addAnnotation.bind(this);
        this.renderSelections = this.renderSelections.bind(this);
    }

    componentDidMount(){
        debugger
        this.props.fetchTrack(this.props.match.params.id)
    }

    componentDidUpdate(prevProps) {
        debugger
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.props.fetchTrack(this.props.match.params.id);
        }

        if (document.getElementsByClassName('lyrics-body') &&
            document.getElementsByClassName('annotated').length === 0){
            this.renderSelections()
        }
    }


    // ANNOTATIONS
    pullSelection(event) {
        event.preventDefault();
        debugger
        if (this.props.currentUser && 
            window.getSelection().toString().length > 0) {
            const ref = window.getSelection();
            
            //Creating and defining selection indices
            let range
            if (ref.rangeCount) {
                range = ref.getRangeAt(0).cloneRange();
            }
            let start_idx = range.startOffset
            let end_idx = range.endOffset  

            this.temporarySelection(ref)
            this.addAnnotation(ref, start_idx, end_idx)
        }
    }

    addAnnotation(ref, start, end){
        this.props.openModal({modal: 'add-annotation', annotProps: {ref, start, end}});
    }

    temporarySelection(ref){
        const range = ref.getRangeAt(0).cloneRange();
        let span = document.createElement("span");
        span.classList.add("annotated");
        range.surroundContents(span); 
    }

    renderSelections() {
        debugger
        
        this.props.track.annotations.forEach(
            (annotation, idx) => {
                let lyrics = document.getElementsByClassName("lyrics-body-lyrics")[0];
                console.log(lyrics)
                console.log(lyrics.childNodes)
                lyrics = lyrics.childNodes[1].childNodes[idx*2];

                let span = document.createElement("span")
                span.classList.add("annotated")
                span.id = annotation.id

                const annoLink = () => {
                    this.props.openModal({modal: 'show-annotation', annotProps: {id: event.target.id}});}
                span.addEventListener('click', annoLink);

                let range = document.createRange();
                console.log(annotation)

                range.setStart(lyrics, annotation.start_idx);
                range.setEnd(lyrics, annotation.end_idx);
                console.log(range)
                
                range.surroundContents(span); 
            })
    }



    render (){
        debugger
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
                                width="300px" height="200px"
                                config={{ attributes: { autoPlay: false } }}/>
            }
        }

        // document.addEventListener('click', function (event) {
        //     event.preventDefault();
        //     if (event.target.matches('.click-me')) return;
        //             console.log(event.target);
        
        // }, false);

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
                    <div className="lyrics-body">
                        <div className="lyrics-body-lyrics">
                            <p className="xsmall-track-title">{track.title} lyrics</p>
                            <p onMouseUp={this.pullSelection}>{track.lyrics}</p>
                        </div>
                        <div className="lyrics-body-annotations">
                            {audioLink()}
                            <AnnoModal />
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    }
};

export default TrackShow;