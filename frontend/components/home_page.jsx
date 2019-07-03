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
                  <span>{idx + 1}</span>
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
      <div id="homepage-wrap">
        <div className="home-track-list-container" id="home-track-list-container">
            <h3>Recent Tracks:</h3>
          <ul>
            {trackList()}
          </ul>
        </div>
        <div id="app-info">
          <h3>About</h3>
          <p class="body-text">Brian Eno:
          <br />
          <br />
          <div id="app-info-quote">When I was an art student, I was encouraged to believe that there were a few great figures like Picasso and Kandinsky, Rembrandt and Giotto and so on who sort-of appeared out of nowhere and produced artistic revolution. As I looked at art more and more, I discovered that that wasn’t really a true picture.
          </div>
          <br />
          <div id="app-info-quote">What really happened was that there were sometimes very fertile scenes involving lots and lots of people – some of them artists, some of them collectors, some of them curators, thinkers, theorists, people who were fashionable and knew what the hip things were – all sorts of people who created a kind of ecology of talent. And out of that ecology arose some wonderful work... So I came up with this word SCENIUS – and scenius is the intelligence of a whole… operation or group of people.</div>
          <br />
          Scenius is a fullstack app inspired by the lyrics & annotation site Genius. Built with React/Redux and Rails,, Scenius allows users to add song lyrics (+ associated album, artist, and track data). Artist biographies and album art is automatically populated from Wikipedia with a Nokogiri webscraper, though it can be added or altered manually if missing. Much of the GUI design is inspired by Artsy Magazine.
          </p>
        </div>
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

