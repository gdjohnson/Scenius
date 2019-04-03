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
        debugger

        if (Object.keys(this.props.artists).length === 0) {
            this.props.fetchArtistsByLetter(this.props.char);
        }

        if (prevProps.char !== this.props.char){
            this.props.fetchArtistsByLetter(this.props.char);
        }

    }

    render (){
        debugger
        if (Object.keys(this.props.artists).length === 0){
            return null;
        }

        const artistList = Object.values(this.props.artists).forEach(
            artist => {
                const tracks = Object.values(artist.tracks).map(
                    track => <p>{track.title}</p>)
                const albums = Object.values(artist.albums).map(
                    album => <p>{album.title}</p>
                )
                return (
                    <div>
                        <li key={artist.id} className="alph-index-artist"><Link path={`api/artists/${this.char}/${artist.id}`}>{artist.name}</Link></li>
                        {tracks}
                        {albums}
                    </div>
            )}
        )

        return (
            <div className="alph-artist-index">
                {artistList}
            </div>
            
        );
    }
};

const mapStateToProps = (state, { match }) => {
    debugger
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

