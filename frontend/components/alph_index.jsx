import React from 'react';
import { Link } from 'react-router-dom';

export class AlphIndex extends React.Component {
  constructor (props){
    super(props);

    this.state = { fetched: false }

    this.artistList = this.artistList.bind(this);
    this.albumList = this.albumList.bind(this);
    this.trackList = this.trackList.bind(this);
    this.coverImg = this.coverImg.bind(this);
    this.randomImg = this.randomImg.bind(this);
    this.modalLink = this.modalLink.bind(this);
  }

  componentDidMount(){
    if (this.state.fetched === false) { this.setState({fetched: true}) };
    this.props.fetchArtistsByLetter(this.props.char);
  }

  componentDidUpdate(prevProps){
    const { char, fetchArtistsByLetter } = this.props;
    if (prevProps.char !== char) { fetchArtistsByLetter(char); }
  }

  modalLink() {
    if (this.props.currentUser) {
      return (
        <Link className="alph-index--missing__link" to="/add">
            Add some!
         </Link>
      )
    }

    const { openModal } = this.props;
    return (
      <a className="alph-index--missing__link" onClick={() => openModal({modal: 'signin'})}>
            Sign in to add some!
      </a>
    )
  }

  artistList() {
    const { artists } = this.props;
    const { coverImg, modalLink } = this;


    if (!Object.keys(artists).length || typeof Object.values(artists)[1] === 'string') {
      return ( 
        <span className="alph-index--missing">
          There are no tracks or albums associated with this letter yet.&nbsp;
          {modalLink()}
        </span> 
      )}
    else {
      const artistsPresent = Object.values(this.props.artists).map(
        (artist, idx) => {
          return (
            <div key={idx}>
              <li key={artist.id} 
                  className="alph-index__artists-container__artist">
                  <Link to={`/artists/${this.props.char}/${artist.id}`}>
                      {artist.name}
                  </Link>
              </li>
              {this.albumList(artist.albums)}
            </div>
        )}
      )

    return (
      <div>
        <div className="alph-index">
          <h3>Artists beginning with {this.props.char}</h3>
          <div className="alph-index__artists-container">
            { artistsPresent }
          </div>
        </div>
        { coverImg() } 
      </div>)
    }

  }
    

  albumList(albums) {
    return albums.map(
      (album, idx) => {
        return (
            <div key={idx}>
                <li key={album.id} className="alph-index__artists-container__album">
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
          <li key={track.id} className="alph-index__artists-container__track">
              <Link to={`/tracks/${track.id}`}>
                {track.title}
              </Link>
          </li>
      )}
  )}

  coverImg() {
    const artists = this.props;
    if (Object.values(artists)) { 
      const img = this.randomImg();
      return <img className="alph-index__art" src={img}/> 
    } 
  }

  randomImg() {
    const { artists } = this.props;
    let albums = [];
    Object.values(artists).forEach(artist => {
      albums = albums.concat(artist.albums);
    })

    const num = Math.floor(Math.random() * albums.length);
    return albums[num].artwork_url;
  }

  render() {
    if (this.state.fetched === false) { return null; }
    const index = this.artistList();
    return (
        <div className="alph-index-container">
            {index}
        </div>
    );
  }
};

export default AlphIndex;

