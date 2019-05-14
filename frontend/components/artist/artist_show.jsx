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
    return Object.values(albums).map(album => {
      const { id, artwork_url, title } = album;
      return (
        <li className="artist-show-album" key={id}>
          <Link to={`/albums/${id}`}>
            <img src={artwork_url} />
            <p>{title}</p> 
            {this.yearContainer(album)}
          </Link>
        </li>
      )
  })}

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
    const { openModal } = this.props;
    if (image_url){
        return <img className="artist-show-image" src={image_url}/>
    } else {
        return (
          <div className="artist-show-empty-artist-image">
            <button type="submit"
                    className="artist-show-photo-upload"
                    onClick={() => {
                      debugger
                      openModal({modal: 'add-photo'})}}>
                    Add Artist Photo
            </button>
          </div>
        )
  }}

  render() {
    const { artist } = this.props;
    const { name, albums } = artist;

    if (Object.keys(artist).length === 0 || albums === undefined) {
      return null;
    }

    return (
      <div className="center-flex">
      <div className="artist-show-container">
        <div className="artist-show-image-div">
         {this.artistImage()}
         <h3>{name}</h3>
        </div>
        <div className="artist-show-album-list">
          <ul>
            {this.albumList()}
          </ul>
          <h4>{name} Albums</h4>
        </div>
      </div>
    </div>
    );
  }
};

export default ArtistShow;