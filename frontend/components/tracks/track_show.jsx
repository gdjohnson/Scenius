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
        this.state = { track: '' };
        this.pullSelection = this.pullSelection.bind(this);
        this.renderSelections = this.renderSelections.bind(this);
        this.findPrecedent = this.findPrecedent.bind(this);
        this.newRange = this.newRange.bind(this);
    }

    componentDidMount(){
        this.props.fetchTrack(this.props.match.params.id);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.props.fetchTrack(this.props.match.params.id);
        }

        if (this.props.track.annotations.length > document.getElementsByClassName("annotated").length) {
            this.renderSelections();
        }
    }

    // ANNOTATIONS
    pullSelection(event) {
        event.preventDefault();
        if (this.props.currentUser && window.getSelection().toString().length > 0) {
            let ref = window.getSelection();            
            let range = ref.getRangeAt(0).cloneRange();

            let startParent = range.startContainer.parentElement;
            let endParent = range.endContainer.parentElement;
            let priorAnnotation = range.startContainer.previousElementSibling;

            //If a selection ends and starts in an existing anno, reject selection
            if (startParent.className == "annotated" && endParent.className == "annotated") { return; }

            let tempRange;
            let precedent = 0;
            let start = 0;
            let end = 0;

            if (startParent === endParent) {
                if (priorAnnotation) { 
                    precedent = this.findPrecedent(priorAnnotation.id).end_idx;
                    tempRange = range; }
            } else {
                debugger
                //...and the selection begins in an existing anno, truncate beginning to exclude that anno's bounds
                if (startParent.className == "annotated") { 
                    start = this.findPrecedent(startParent.id).end_idx;
                    tempRange = this.newRange(range, 0, range.endOffset); }

                //...and the selection ends in an existing anno, truncate end to exclude that anno's bounds
                if (endParent.className == "annotated") { 
                    end = this.findPrecedent(endParent.id).start_idx - 1;
                    precedent = this.findPrecedent(range.startContainer.previousElementSibling.id).end_idx;
                    //for while precedent and endBound will be used for the abs idx locations, endOffset/startOffset
                    //allow temporary CSS annotation of the range
                    let endOffset = range.startContainer.wholeText.length-1;
                    tempRange = this.newRange(range, range.startOffset, endOffset) } 
                    //set absStart to precedent + startOffset, absEnd to endBound
            }
            
            end = end || range.endOffset + precedent + start;
            start = start || range.startOffset + precedent;
            debugger
            this.styleTempSelection(tempRange);
            this.props.openModal({modal: 'add-annotation', annotProps: {start, end}});
        }
    }

    newRange(range, startOffset, endOffset) {
        let newRange = document.createRange();
        debugger
        const startNode = range.startContainer.parentElement.nextSibling || range.endContainer.parentElement.previousSibling;
        const endNode = startNode;
        newRange.setStart(startNode, startOffset);
        newRange.setEnd(endNode, endOffset);
        return newRange;   
    }

    styleTempSelection(range){
        let span = document.createElement("span");
        span.id = "temp-annotated";
        debugger
        range.surroundContents(span); 
    }

    findPrecedent(id) {
        return this.props.track.annotations.find(anno => anno.id == id)
    }

    renderSelections() {
        let { annotations } = this.props.track;
        annotations = this.sortAnnotations(annotations);
        
        annotations.forEach((annotation, idx) => {

            let lyricSection = document.getElementById("lyrics").childNodes[idx*2];

            // Prepare span element for wrapping
            let span = document.createElement("span")
            span.classList.add("annotated")
            span.id = annotation.id

            // Add eventListener to span element to show annotation
            span.addEventListener('click', () => {
                this.props.openModal({   
                    modal: 'show-annotation', 
                    annotProps: {id: event.target.id}});
            });

            // Create range from annotation props
            let range = document.createRange();

            // Determine relative pos of anno in lyricSection given its absolute pos in lyrics
            let precedent;
            debugger
            if (annotations[idx-1]) {precedent = annotations[idx-1].end_idx} 
            else { precedent = 0 };
            const relativeStart = annotation.start_idx - precedent;
            const relativeEnd = annotation.end_idx - precedent;

            range.setStart(lyricSection, relativeStart);
            range.setEnd(lyricSection, relativeEnd);
            
            // Put it all together
            range.surroundContents(span); 
        })
    }

    sortAnnotations(annotations) {
        if (Array.isArray(annotations) === false){
            annotations = Array.from(annotations);
        }

        if (annotations.length === 1) return annotations;
        if (annotations.length < 1) return [];

        const pivot = annotations[0];
        let left = [];
        let right = [];

        annotations.slice(1).forEach(anno => {
            if (anno.start_idx < pivot.start_idx) {
                left.push(anno);
            } else {
                right.push(anno)
            }
        })
        
        return this.sortAnnotations(left).concat(pivot).concat(this.sortAnnotations(right));
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

                <div id="lyrics-wrapper-1">
                    <div id="lyrics-wrapper-2">
                        <div id="lyrics-wrapper-3">
                            <p className="xsmall-track-title">{track.title} lyrics</p>
                            <p id="lyrics" onMouseUp={this.pullSelection}>{track.lyrics}</p>
                        </div>
                        <div id="annotations">
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