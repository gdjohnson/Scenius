import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchArtist } from '../actions/artist_actions';
// import rp from 'request-promise';
// import $ from 'cheerio';

export class ArtistShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchArtist(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.fetchArtist(this.props.match.params.id);
    }
  }

  render() {
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
    const albumList = () => Object.values(artist.albums).map(
      (album, idx) => {
        return (
          <li className="artist-show-album" key={idx}>
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
                <img className="artist-show-image" src={artist.image_url}/>
            )
        } else {
            return (
              <div className="artist-show-empty-artist-image">
                    <button type="submit"
                    className="artist-show-photo-upload"
                        onClick={() => this.props.openModal({modal: 'add-photo'})}>Add Background Photo</button>
                </div>
            )}}

    // const url = 'https://en.wikipedia.org/wiki/Roxy_Music';

    return (
      <div className="artist-show-container">
         {/* {rp(url)} */}
        <div className="artist-show-image-div">
         {artistImage()}
         <h3>{artist.name}</h3>
        </div>
        <div className="artist-show-album-list">
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

export default connect(mapStateToProps, mapDispatchToProps)(ArtistShow);

