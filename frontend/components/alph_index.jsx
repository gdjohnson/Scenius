import React from 'react';
import { Link } from 'react-router-dom';

class AlphIndex extends React.Component {
  constructor (props){
    super(props);

    this.state = { fetched: false }

    this.artistList = this.artistList.bind(this);
    this.albumList = this.albumList.bind(this);
    this.trackList = this.trackList.bind(this);
  }

  componentDidMount(){
    if (this.state.fetched === false) { this.setState({fetched: true}) };
    this.props.fetchArtistsByLetter(this.props.char);
  }

  componentDidUpdate(prevProps){
    const { char, fetchArtistsByLetter } = this.props;
    if (prevProps.char !== char) { fetchArtistsByLetter(char); }
  }

  artistList() {
    const { artists } = this.props;

    if (!Object.keys(artists).length || typeof Object.values(artists)[1] === 'string') {
      return ( 
        <span>
          There are no tracks or albums associated with this artist yet.  
          <Link id="album-show-add-track" to="/add">
            Add some!
          </Link>
        </span> 
      )}
    else {
      return Object.values(this.props.artists).map(
        (artist, idx) => {
          return (
            <div key={idx}>
              <li key={artist.id} 
                  className="alph-index-artist">
                  <Link to={`/artists/${this.props.char}/${artist.id}`}>
                      {artist.name}
                  </Link>
              </li>
              {this.albumList(artist.albums)}
            </div>
        )}
    )}
  }

  albumList(albums) {
    return albums.map(
      (album, idx) => {
        return (
            <div key={idx}>
                <li key={album.id} className="alph-index-album">
                    <Link to={`/albums/${album.id}`}>
                      {album.title} ({album.year})
                    </Link>
                  </li>
                {this.trackList(album.tracks)}
            </div>
      )}
  )}

  trackList(tracks) {
    return tracks.map(
      (track) => {
        return (
          <li key={track.id} className="alph-index-track">
              <Link to={`/tracks/${track.id}`}>
                {track.title}
              </Link>
          </li>
      )}
  )}

  render() {
    if (this.state.fetched === false) { return null; }
    return (
        <div className="alph-index-container">
            <div className="alph-index">
                <h3>Artists beginning with {this.props.char}:</h3>
                {this.artistList()}
            </div>
        </div>
    );
  }
};

export default AlphIndex;

