import React from 'react';
import Player from 'react-player';
import { Link } from 'react-router-dom';
import AnnoModal from './anno_modal';

// Selection objects' start and end nodes are determined by direction user selects (left to right or right to left) which caused 
// problems for the kind of conditional logic and math I needed to properly index in to the lyrics accounting for the linked span eles
// Solved it by researching the Range and Selection docs, realizing that their offSet and Container properties varied slightly, and that
// range gave me the lower idx number in the lyrics html as start and highest index as end, regardless

// Started by accounting for every one in a scenario and then refactoring the possibility tree to a compressed logic
// reducing nested conditionals by a factor of 3

// Was incredibly explicit writing out an explanation for all non-obvious code
// Diligent about testing modularly, holding variables constant


class TrackShow extends React.Component {

    constructor(props){
        super(props);
        this.state = {  track: '' };

        this.pullSelection = this.pullSelection.bind(this);
        this.createAnnoSpan = this.createAnnoSpan.bind(this);
        this.renderAnnotations = this.renderAnnotations.bind(this);
        this.searchAnnotations = this.searchAnnotations.bind(this);
        this.newRange = this.newRange.bind(this);
    }

    componentDidMount(){
        this.props.fetchTrack(this.props.match.params.id);
    }

    componentDidUpdate(prevProps) {
        const { track, annotations, openModal } = this.props;
        const prevParams = prevProps.match.params;
        const params = this.props.match.params;
        const annoSpans = document.getElementsByClassName("annotated");
        const tempSpan = document.getElementById('temp-annotated');

        let stableState = () => { return annotations.length === track.annotations.length };
        stableState = stableState.bind(this);

        if (prevParams.id === params.id && stableState() ) {
            if (annoSpans.length === 0) this.renderAnnotations(track.annotations);
            if (tempSpan) this.getNewAnno(tempSpan, track);
        } else {
            this.props.fetchTrack(this.props.match.params.id);
        }

        if (document.getElementById('require-login')){
            document.getElementById('anno-signin').addEventListener('click', () => {
                openModal({modal: 'signin'})
            })
            document.getElementById('anno-signup').addEventListener('click', () => {
                openModal({modal: 'signup'})
            })
        }
    }

    //// Rendering Annotations

    // If fresh page...
    renderAnnotations(annotations) {        
        const sortedAnnos = this.sortAnnotations(annotations);

        sortedAnnos.forEach((annotation, idx) => {
            this.createAnnoSpan(annotation, idx, sortedAnnos);   
        })
    }

    sortAnnotations(annotations) {
        if (annotations.length === 1) return annotations;
        if (annotations.length < 1) return [];

        const pivot = annotations[0];
        let left = [];
        let right = [];

        annotations.slice(1).forEach(anno => {
            if (anno.start_idx < pivot.start_idx) left.push(anno);
            else right.push(anno);
        })
        
        return this.sortAnnotations(left).concat(pivot).concat(this.sortAnnotations(right));
    }

    createAnnoSpan(annotation, idx, sortedAnnos) { //helper method to create DOM span eles for each anno
        let lyricSection = document.getElementById("lyrics").childNodes[idx*2];

        let span = document.createElement("span")
        span.classList.add("annotated")
        span.id = annotation.id
        this.linkSpanToAnno(span);

        // Determine relative pos of anno in lyricSection given its absolute pos in lyrics
        
        let prevAnno = sortedAnnos[idx-1];
        let precedent;
        if (prevAnno) precedent = prevAnno.end_idx;
        else precedent = 0;
        
        const relativeStart = annotation.start_idx - precedent;
        const relativeEnd = annotation.end_idx - precedent;
        
        let range = document.createRange();
        range.setStart(lyricSection, relativeStart);
        range.setEnd(lyricSection, relativeEnd);
        range.surroundContents(span); 
    }

    linkSpanToAnno(annoSpan) {
        annoSpan.addEventListener('click', (event) => {
            this.props.openModal({   
                modal: 'show-annotation', 
                annotProps: {id: event.target.id}});
        })
    }

    // Adding a new annotation...

    pullSelection(event) {
        event.preventDefault();
        if (this.props.currentUser && window.getSelection().toString().length > 0) {
            const ref = window.getSelection();            
            const range = ref.getRangeAt(0).cloneRange();

            const startParent = range.startContainer.parentElement;
            const endParent = range.endContainer.parentElement;
            const priorAnnotation = range.startContainer.previousElementSibling;

            //If a selection ends & starts in an existing anno, or encompasses an anno, reject selection
            if (startParent.className == "annotated" && endParent.className == "annotated") { return; }

            let tempRange;
            let precedent = 0;
            let start = 0;
            let end = 0;
            if (startParent === endParent) {
                if (priorAnnotation) precedent = this.searchAnnotations(priorAnnotation.id).end_idx;
                tempRange = range;
            } else {
                //...and the selection begins in an existing anno, truncate beginning to exclude that anno's bounds
                if (startParent.className == "annotated") { 
                    start = this.searchAnnotations(startParent.id).end_idx;
                    tempRange = this.newRange(range, 0, range.endOffset); }

                //...and the selection ends in an existing anno, truncate end to exclude that anno's bounds
                if (endParent.className == "annotated") { 
                    end = this.searchAnnotations(endParent.id).start_idx - 1;
                    precedent = this.searchAnnotations(range.startContainer.previousElementSibling.id).end_idx;
                    //for while precedent and endBound will be used for the abs idx locations, endOffset/startOffset
                    //allow temporary CSS annotation of the range
                    let endOffset = range.startContainer.wholeText.length-1;
                    tempRange = this.newRange(range, range.startOffset, endOffset) } 
                    //set absStart to precedent + startOffset, absEnd to endBound
            }
            
            end = end || range.endOffset + precedent + start;
            start = start || range.startOffset + precedent;

            // If new anno straddles an existing anno, reject it
            const straddled = this.searchAnnotations(null, start, end);
            if (straddled) {
                if (straddled.length > 0) end = straddled[0].start_idx; 
            } 
            
            // Style temporary annotation
            this.styleTempSpan(tempRange);
            this.props.openModal({modal: 'add-annotation', annotProps: {start, end}});
        }
    }

    newRange(range, startOffset, endOffset) {
        let newRange = document.createRange();
        const startNode = range.startContainer.parentElement.nextSibling || range.endContainer.parentElement.previousSibling;
        const endNode = startNode;
        newRange.setStart(startNode, startOffset);
        newRange.setEnd(endNode, endOffset);
        return newRange;   
    }

    searchAnnotations(id, start, end) {
        const { annotations } = this.props.track;
        if (id) return annotations.find(
            anno => anno.id == id);
        if (start && end) return annotations.filter(
            anno => anno.start_idx > 69 && anno.end_idx < 85)
    }

    // After adding an annotation...
    getNewAnno(tempSpan, track) {
        const anno = track.annotations[track.annotations.length - 1];
        if (anno.id) {
            tempSpan.id = anno.id;
            this.linkSpanToAnno(tempSpan);
        }
    }

    styleTempSpan(range){
        let span = document.createElement("span");
        span.className = "annotated";
        span.id = "temp-annotated";
        range.surroundContents(span); 
    }

    render (){
        const { artist, album, track, currentUser } = this.props;
        if (!track.id || !album.id || typeof Object.values(artist)[0] === 'object') return null;

        const { year } = album;
        const { lyrics, audio_link } = track;
        const { name } = artist;
        const artwork = album.artwork_url;
        const bground = album.background_photo;

        const artworkEle = () => {
            if (artwork){
                return <img className="track-show-track-art" src={artwork} />
            } else {
                return (
                    <span className="track-show-no-art">
                        <button type="submit" 
                                className="track-show-art-upload" 
                                onClick={() => this.props.openModal({modal: 'add-art'})}>
                                Add Artwork</button>
                    </span>
            )}
        }

        const bgroundStyle = () => {
            if (bground) return {backgroundImage: 'url(' + bground + ')'}
        }

        const bgroundButton = () => {
            if (!bground){
                return (<button type="submit"
                                className="track-show-bground-upload"
                                onClick={() => this.props.openModal({modal: 'add-bground'})}>
                                Add Background</button>
                )
            }
        }

        const yearContainer = ()  => {
            if (year){
                return (
                    <div className="track-show-year-container">
                        <p className="meta-tag">Year</p>
                        <p className="track-show-track-year">{year}</p>
                    </div>
                )
            } else {
                return <div></div>
            }
        }

        const audioLink = () => {
            if (audio_link){
                return (
                <div id="player">
                    <Player  url={audio_link} 
                                    playing={false}
                                    width="100%" height="100%" 
                                    config={{ attributes: { autoPlay: false } }}/>
                </div>)
            }
        }

        const requireLogin = () => {
            if (!currentUser) {
                return (
                    <div id="require-login">
                        <p>Please <b id="anno-signin">log in</b> or <b id="anno-signup">create an account</b> to add annotations.</p>
                    </div>
                )
            }
        }

        return (
            <div className="track-show">
                <div className="track-header-container" style={bgroundStyle()}>
                    {bgroundButton()}
                    <div className="track-header">
                        <div className="track-show-track-art-container">
                            {artworkEle()}
                        </div>
                        <div className="track-show-meta-container">
                            <p className="track-show-track-title">{track.title}</p>
                            <Link to={`/artists/${name.slice(0, 1).toUpperCase()}/${artist.id}`}><p className="track-show-track-artist">{name}</p></Link>
                            <div className="track-show-album-container">
                                <p className="meta-tag">Album</p>
                                <Link to={`/albums/${album.id}`}><p className="track-show-track-album">{album.title}</p></Link>
                            </div>
                            {yearContainer()}
                        </div>
                    </div>
                </div>

                <div id="lyrics-wrapper-1">
                    <div id="lyrics-wrapper-2">
                        <div id="lyrics-wrapper-3">
                            <p className="xsmall-track-title">{track.title} lyrics</p>
                            <p id="lyrics" onMouseUp={this.pullSelection}>{lyrics}</p>
                        </div>
                        <div id="annotations">
                            {audioLink()}
                            {requireLogin()}
                            <AnnoModal />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default TrackShow;