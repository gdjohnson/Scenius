import React from 'react';
import { Link } from 'react-router-dom';


export class AlbumShow extends React.Component {
  constructor(props) {
    super(props);

    this.yearContainer = this.yearContainer.bind(this);
    this.trackList = this.trackList.bind(this);
    this.albumCover = this.albumCover.bind(this);
    this.bgroundStyle = this.bgroundStyle.bind(this);
    this.bgroundButton = this.bgroundButton.bind(this);
  }

  componentDidMount() {
    this.props.fetchAlbum(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.fetchAlbum(this.props.match.params.id);
    }
  }

  // Returns album year if present in DB
  yearContainer() {
    const { album } = this.props;
    return album.year ? <h5 className="album-show-track-year">Released in {album.year}.</h5> : null
  }

  // Returns album cover if present in DB
  albumCover() {
    const { album } = this.props;
    const noArt = (<span className="track-show-no-art">
                        <button type="submit" 
                                onClick={() => this.props.openModal({modal: 'add-art'})}>
                                Add Artwork</button>
                    </span>)
    return album.artwork_url ? <img className="album-show-album-art" src={album.artwork_url}/> : noArt;
  }

  // Returns album background image as a CSS style if present in DB
  bgroundStyle() {
    const { album } = this.props;
    return album.background_photo ? { backgroundImage: 'url(' + album.background_photo + ')' } : null
  }

   // In the case of no background photo, allow user upload
   bgroundButton() {
    const { album, openModal } = this.props;
      if (!album.background_photo){
          return (
                  <button type="submit"
                          className="bground-upload-button"
                          onClick={() => openModal({modal: 'add-bground'})}>Add Background</button>
          )
      }
  }

  // Returns album tracklist
  trackList() {
    const { album } = this.props;
    if (!album.tracks.length) {
      return ( <span className="album-show-no-tracks">
                  There are no tracks yet for this album. 
                  <Link id="album-show-add-track" to="/add">
                    Add some!
                  </Link>
                </span> )
    }
    
    return Object.values(album.tracks).map(
      (track, idx) => {
        return (
          <li className="album-show-track" key={idx}>
            <Link to={`/tracks/${track.id}`}>
              <p>{track.title}</p>
            </Link>
          </li>
        )
    })
  }

  render() {
    const { album } = this.props;
    const { yearContainer, trackList, albumCover, bgroundStyle, bgroundButton } = this;

    if (Object.keys(album).length === 0 || album.tracks === undefined) {
      return null;
    }

    return (
      <div className="album-show">
        <div className="album-header-container" style={bgroundStyle()}>
            {bgroundButton()}
            <div className="album-header">
                <div className="album-show-album-art-container">
                    {albumCover()}
                </div>
                <div className="album-show-meta-container">
                    <h3>{album.title}</h3>
                    <h4><Link   to={`/artists/${album.artist.name.slice(0, 1).toUpperCase()}/${album.artist_id}`}>
                                {album.artist.name}</Link></h4>
                    {yearContainer()}
                </div>
            </div>
        </div>

        
        <div className="album-show-track-list-container">
            <div className="album-show-track-list">
                <h4>Track Listing</h4>
                <br />
                <ul>
                    {trackList()}
                </ul>
            </div>
        </div>
      </div>
    );
  }
};

export default AlbumShow;