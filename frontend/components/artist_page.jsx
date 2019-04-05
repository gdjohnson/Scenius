import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchArtist } from '../actions/artist_actions';

export class ArtistPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchArtist(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.fetchTrack(this.props.match.params.id);
    }
  }

  render() {
    debugger

    const { artist } = this.props;

    if (Object.keys(artist).length === 0 ||
        artist.albums === undefined) {
      return null;
    }

    const yearContainer = (album) => {
      if (album.year) {
        return <p className="track-show-track-year">({album.year})</p>
      } else {
        return <div></div>
      }
    }
    debugger
    const albumList = () => Object.values(artist.albums).map(
      (album, idx) => {
        debugger
        return (
          <li className="artist-page-album" key={idx}>
            <Link to={`/albums/${album.id}`}>
              <img src={album.artwork_url} />
              <p>{album.title}</p> 
              <p>{yearContainer(album)}</p>
            </Link>
          </li>
        )
      }
    )

    const artistImage = () => {
        if (artist.image_url){
            return (
                <img className="artist-page-image" src={artist.image_url}/>
            )
        } else {
            return (
              <div className="artist-page-empty-artist-image">
                    <button type="submit"
                    className="artist-page-photo-upload"
                        onClick={() => this.props.openModal('add-photo')}>Add Background Photo</button>
                </div>
            )}}

    return (
      <div className="artist-page-container">
        <div className="artist-page-image-div">
         {artistImage()}
         <h3>{artist.name}</h3>
        </div>
        <div className="artist-page-album-list">
          <ul>
            {albumList()}
          </ul>
          <h4>{artist.name} Albums</h4>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return ({
    artist: state.entities.artists
  });
};

const mapDispatchToProps = dispatch => {
  return ({
    fetchArtist: (id) => dispatch(fetchArtist(id)),
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistPage);

