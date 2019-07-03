import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchTracks } from '../actions/track_actions';

// Component
export class HomePage extends React.Component {
  constructor(props) { super(props); }

  componentDidMount() { this.props.fetchTracks(); }

  render() {
    const { tracks } = this.props;

    if  (Object.keys(tracks).length === 0 || tracks.id) { 
      return null; }

    const trackList = () => Object.values(tracks).map(
      (track, idx) => (
        <li className="homepage-track" key={idx}>
          <Link to={`/tracks/${track.id}`}>
            <span>{idx + 1}</span>
            <img src={track.album.artwork_url}/>
            <div className="homepage-track__info">
              <p className="homepage-track__title">{track.title}</p>
              <p className="homepage-track__artist">{track.artist.name}</p>
            </div>
          </Link>
        </li>
      )
    )
        
    return (
      <div className="homepage-wrap">
        <div className="homepage-track-list-container">
            <h3>Top Tracks</h3>
          <ul className="homepage-track-list">
            {trackList()}
          </ul>
        </div>
        <div className="app-info">
          <h3>About</h3><br /><br />
          <p className="app-info__quote">Brian Eno:</p><br />
          <p className="app-info__quote">When I was an art student, I was encouraged to believe that there were a few great figures like Picasso and Kandinsky, Rembrandt and Giotto and so on who sort-of appeared out of nowhere and produced artistic revolution. As I looked at art more and more, I discovered that that wasn’t really a true picture.</p><br /><p className="app-info-quote">What really happened was that there were sometimes very fertile scenes involving lots and lots of people – some of them artists, some of them collectors, some of them curators, thinkers, theorists, people who were fashionable and knew what the hip things were – all sorts of people who created a kind of ecology of talent. And out of that ecology arose some wonderful work... So I came up with this word <i>Scenius</i> – and scenius is the intelligence of a whole… operation or group of people.</p><br /><br />
          <p>Scenius is a fullstack app inspired by the lyrics & annotation site Genius. Built with React/Redux and Rails, Scenius allows users to add song lyrics (+ associated album, artist, and track data). Artist biographies and album art is automatically populated from Wikipedia by way of a webscraper (Nokogiri/WebURI), though it can be added or altered manually if missing. Much of the GUI design is inspired by the GSAPP GUI, <a href="https://are.na">Are.na</a>, and Artsy Magazine.</p>
        </div>
      </div>
    );
  }
};

// Container
const mapStateToProps = (state) => ({ tracks: state.entities.tracks });
const mapDispatchToProps = dispatch => ( { fetchTracks: () => dispatch(fetchTracks()) });

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
