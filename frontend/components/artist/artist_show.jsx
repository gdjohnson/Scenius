import React from 'react';
import { Link } from 'react-router-dom';

export class ArtistShow extends React.Component {
  constructor(props) {
    super(props);
    this.albumList = this.albumList.bind(this);
    this.yearContainer = this.yearContainer.bind(this);
    this.artistImage = this.artistImage.bind(this);
  }

  componentDidMount() {
    this.props.fetchArtist(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.fetchArtist(this.props.match.params.id);
    }
  }

  // Returns all albums associated with given artist
  albumList() {
    const { albums } = this.props.artist;
    const { albumArtPresent, albumArtAbsent } = this;
    let artwork
    
    return Object.values(albums).map(album => {
      const { id, artwork_url, title } = album;
      artwork_url ? artwork = albumArtPresent : artwork = albumArtAbsent;
      return (
        <li className="artist-show-album" key={id}>
          <Link to={`/albums/${id}`}>
            {artwork(artwork_url)}
            <p>{title}</p> 
            {this.yearContainer(album)}
          </Link>
        </li>
      )
  })}

  albumArtPresent(url){
    return <img src={url} />
  }

  albumArtAbsent(){
    return <button className="artist-show-album-art-missing"></button>
  }

  // Helper method returns album year if present
  yearContainer(album) {
    const { year } = album;
    if (year) {
      return <p className="track-show-track-year">({year})</p>
    } else {
      return <div></div>
    }
  }

  // Helper method returns artist photo if present
  artistImage() {
    const { image_url } = this.props.artist;
    let img
    image_url ? img = this.artistImagePresent(image_url) : img = this.artistImageAbsent();
    return img
  }

  artistImageAbsent() {
    const { openModal } = this.props;
    return (
      <div className="artist-show-empty-artist-image">
        <button type="submit"
                className="artist-show-photo-upload"
                onClick={() => {
                  openModal({modal: 'add-photo'})}}>
                Add Artist Photo
        </button>
      </div>
    )
  }

  artistImagePresent(url) {
    return <img className="artist-show-image" src={url}/>
  }

  render() {
    const { artist } = this.props;
    const { name, albums, bio } = artist;
    
    if (Object.keys(artist).length === 0 || albums === undefined) {
      return null;
    }

    return (
      <div className="center-flex">
        <div className="artist-show-container">
          <div className="artist-show-image-div">
            {this.artistImage()}
            <div className="artist-bio-wrap">
              <h3>{name}</h3>
              <p className="artist-bio">{bio}</p>
              <div className="artist-show-album-list">
                <ul>
                  {this.albumList()}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ArtistShow;