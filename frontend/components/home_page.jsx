import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchTracks } from '../actions/track_actions';

export class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchTracks();
  }

  render() {
    if  (Object.keys(this.props.tracks).length === 0 ||
        this.props.tracks.id) {
      return null;
    }

    const trackList = () => Object.values(this.props.tracks).map(
      (track, idx) => {
          return (
              <li className="home-track-container" key={idx}>
                <Link to={`/tracks/${track.id}`}>
                  <span>{idx}</span>
                  <img src={track.album.artwork_url}/>
                  <div className="home-track-info">
                    <p className="home-track-title">{track.title}</p>
                    <p className="home-track-artist">{track.artist.name}</p>
                  </div>
                </Link>
              </li>
          )
        }
    )
    return (
      <div className="home-track-list-container" id="home-track-list-container">
          <h3>Recent Tracks:</h3>
        <ul>
          {trackList()}
        </ul>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return ({
    tracks: state.entities.tracks
  });
};

const mapDispatchToProps = dispatch => {
  return ({
    fetchTracks: () => dispatch(fetchTracks()),
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

