import React from 'react';
import { Link } from 'react-router-dom';

class Search extends React.Component {
  constructor(props) {
    super(props);
    const { searchTerm } = this.props
    this.state = { searchTerm }
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  handleUpdate(e) {
    const { searchTracks } = this.props;

    event.preventDefault();
    const searchTerm = e.currentTarget.value;
    searchTracks(searchTerm);
  }

  searchResults() {
    let { tracks } = this.props;
    
    if (!this.props.tracks) { return null }

    tracks = Object.values(tracks)
    return tracks.map((track, idx) => {
      return (<li key={idx} className="search-result">
        <Link to={`/tracks/${track.id}`}>
          <img src={track.album.artwork_url}/>
        </Link>
        <div className="search-metadata">
          <Link to={`/tracks/${track.id}`}>
            <b>{track.title}</b>
            <p>{track.artist.name}</p>
          </Link>
        </div>
      </li>)
    })

  }

  render() {
    const results = this.searchResults();
    

    return (
      <div id="search">
        <form id="search-form">
        <ion-icon name="search"></ion-icon>
        <input  id="search-input"
                placeholder="Search Scenius"
                onChange={this.handleUpdate}>
        </input>
        </form>
        <ul id="search-results">
          { results }
        </ul>
      </div>
    );
  }
};

export default Search;