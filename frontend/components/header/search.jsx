import React from 'react';
import { Link } from 'react-router-dom';

class Search extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleUpdate = this.handleUpdate.bind(this);
    this.closeSearch = this.closeSearch.bind(this);
    this.openSearch = this.openSearch.bind(this);
  }

  closeSearch() {
    const page = document.getElementById('main');
    const searchInput = document.getElementById('search-input');
    const resultsList = document.getElementById('search-results');

    searchInput.value = "";
    resultsList.className = "hidden-search";
    page.removeEventListener('click', this.closeSearch);
    searchInput.addEventListener('click', this.openSearch);
  }

  openSearch() {
    const page = document.getElementById('main');
    const searchInput = document.getElementById('search-input');
    const resultsList = document.getElementById('search-results');

    resultsList.className = "";
    searchInput.removeEventListener('click', this.openSearch);
    resultsList.addEventListener('click', this.closeSearch);
    page.addEventListener('click', this.closeSearch);
  }

  handleUpdate(e) {
    event.preventDefault();
    const { searchTracks } = this.props;
    const searchTerm = e.currentTarget.value;
    searchTracks(searchTerm);
  }

  searchResults() {
    let { tracks } = this.props;
    
    if (!this.props.tracks) { return null }

    tracks = Object.values(tracks)
    return tracks.map((track, idx) => {
      return (
      <li key={idx} className="search-result">
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
                onClick={this.openSearch}
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