import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAlbum } from '../actions/album_actions';

export class AlbumShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchAlbum(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.fetchAlbum(this.props.match.params.id);
    }
  }

  render() {
    const { album } = this.props;

    if (Object.keys(album).length === 0 ||
        album.tracks === undefined) {
      return null;
    }

    const yearContainer = () => (
        album.year ? <h5 className="album-show-track-year">Released in {album.year}.</h5> : null
    )

    const trackList = () => Object.values(album.tracks).map(
      (track, idx) => {
        return (
          <li className="album-show-track" key={idx}>
            <Link to={`/tracks/${track.id}`}>
              <p>{track.title}</p>
            </Link>
          </li>
        )
      }
    )
    
    const albumCover = () => (
            album.artwork_url ? <img className="album-show-album-art" src={album.artwork_url}/> : ""
    )

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

const mapStateToProps = (state) => {
  return ({
    album: state.entities.albums
  });
};

const mapDispatchToProps = dispatch => {
  return ({
    fetchAlbum: (id) => dispatch(fetchAlbum(id)),
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumShow);

