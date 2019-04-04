import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchArtistsByLetter } from '../../actions/artist_actions';

export class AlphIndex extends React.Component {
    constructor (props){
        super(props);
    }

    componentDidMount(){
        this.props.fetchArtistsByLetter(this.props.char);
    }

    componentDidUpdate(prevProps){
        if (prevProps.char !== this.props.char){
            this.props.fetchArtistsByLetter(this.props.char);
        }
    }

    render (){
        if (Object.keys(this.props.artists).length === 0){
            return null;
        }
        const artistList = () => Object.values(this.props.artists).map(
            (artist, i) => {
                return (
                    <div>
                        <li key={i} className="alph-index-artist"><Link to={`/artists/${this.props.char}/${artist.id}`}>{artist.name}</Link></li>
                        {artist.albums.map((album, idx) => {
                            return (
                                <div>
                                    <li key={idx} className="alph-index-album"><Link to={`/albums/${album.id}`}>{album.title} ({album.year})</Link></li>
                                    {album.tracks.map((track, idx) => {
                                        return <li key={idx} className="alph-index-track"><Link to={`/tracks/${track.id}`}>{track.title}</Link></li>})}
                                </div>)})}
                    </div>
                        )
                    }
        )
        return (
            <div className="alph-index-container">
                <div className="alph-index">
                    <h3>Artists beginning with {this.props.char}:</h3>
                    {artistList()}
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state, { match }) => {
    const char = match.params.char
    return ({
      artists: state.entities.artists,
      char
    });
  };
  
const mapDispatchToProps = dispatch => {
    return ({
        fetchArtistsByLetter: (char) => dispatch(fetchArtistsByLetter(char)),
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(AlphIndex);

