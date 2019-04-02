import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class NewTrackForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      title: '',
      lyrics: '',
      poster_id: this.props.currentUser.id,
      artist: '',
      artist_id: '',
      album: '',
      album_id: '',
      genre_tag: '',
      audio_link: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.searchArtists = this.searchArtists.bind(this);
    this.selectArtist = this.selectArtist.bind(this);
    this.searchAlbums = this.searchAlbums.bind(this);
    this.selectAlbum = this.selectAlbum.bind(this);
  }

  componentWillMount(){
    this.props.fetchArtists();
    this.props.fetchAlbums();
  }

  navigateToTrack(id) {
    debugger
    this.props.history.push(`/tracks/${id}`);
  }

  handleUpdate(field) {
    return (event) => this.setState({
      [field]: event.currentTarget.value
    });
  }

  handleSubmit() {
    return (event) => {
      event.preventDefault();
      const track = Object.assign({}, this.state);
      this.props.createTrack(track).then((track) => {
        debugger
        return this.navigateToTrack(track.id);
      });
    };
  }

  searchArtists() {
    // this.setState({ 'artist': event.currentTarget.value });
    const artistMatches = [];

    if (this.state.artist.length < 1) {
      return [];
    } else {
    Object.keys(this.props.artists).forEach(artist => {
      let subslice = artist.slice(0, this.state.artist.length); //if the first X letter of an artist match query, 
      if (subslice.toLowerCase() === this.state.artist.toLowerCase()) { //then push them into artistMatches
        artistMatches.push(artist);
      }
    });};

    return artistMatches;
  }

  selectArtist(event) {
    const name = event.currentTarget.innerText;
    this.setState({artist: name});
    const selectedArtist = event.currentTarget;
    selectedArtist.classList.add('selected-artist-from-query');
  }

  searchAlbums() {
    const albumMatches = [];

    if (this.state.album.length < 1) {
      return [];
    } else {
    Object.keys(this.props.albums).forEach(album => {
      let subslice = album.slice(0, this.state.album.length); //if the first X letter of an album match query, 
      if (subslice.toLowerCase() === this.state.album.toLowerCase()) { //then push them into albumMatches
        albumMatches.push(album);
      }
    });};

    return albumMatches;
  }

  selectAlbum(event) {
    const title = event.currentTarget.innerText;
    this.setState({album: title});
    const selectedAlbum = event.currentTarget;
    selectedAlbum.classList.add('selected-album-from-query');
  }


  render() {
    const artistResults = this.searchArtists().map((artist, idx) => {
      return <li className="queried-artist" key={idx} onClick={this.selectArtist}>{artist}</li>;
    });

    const albumResults = this.searchAlbums().map((album, idx) => {
      return <li className="queried-album" key={idx} onClick={this.selectAlbum}>{album}</li>;
    });

    return (
      <div className="track-form"><h1>Add Song</h1>

        <form onSubmit={this.handleSubmit()}>
        <div className="primary-info">
            <h3>Primary Info</h3>
            <div className="form-inputs">
              <div id="new-track-artist">
                <label className="track-field-label">By*</label>
                <br />
                <input
                  type="text"
                  onChange={this.handleUpdate('artist')}
                  value={this.state.artist}
                  className="track-string-input"
                />
                <ul className="queried-artists">
                  <ReactCSSTransitionGroup
                    transitionName='auto'
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}>
                    {artistResults}
                  </ReactCSSTransitionGroup>
                </ul>
                <br />
              </div>

              <div id="new-track-title">
                <label className="track-field-label">Title*</label>
                <br />
                <input
                  type="text"
                  value={this.state.description}
                  onChange={this.handleUpdate('title')}
                  className="track-string-input"
                />
                <br />
              </div>

              <div id="new-track-genre">
                <label className="track-field-label">Primary tag</label>
                <div className="genre-selector">
                  <input  type="radio" name="genre" className="genre_radio" 
                          value="Pop" onChange={this.handleUpdate('genre_tag')}/> 
                          Pop  
                  <input  type="radio" name="genre" className="genre_radio" 
                          value="Rock" onChange={this.handleUpdate('genre_tag')}/> 
                          Rock  
                  <input  type="radio" name="genre" className="genre_radio" 
                          value="Rap" onChange={this.handleUpdate('genre_tag')}/> 
                          Rap  
                  <input  type="radio" name="genre" className="genre_radio" 
                          value="Electronic" onChange={this.handleUpdate('genre_tag')}/> 
                          Electronic  
                  <input  type="radio" name="genre" className="genre_radio" 
                          value="Jazz" onChange={this.handleUpdate('genre_tag')}/> 
                          Jazz  
                  <br />
                  <input  type="radio" name="genre" className="genre_radio" 
                          value="Classical" onChange={this.handleUpdate('genre_tag')}/> 
                          Classical  
                  <input  type="radio" name="genre" className="genre_radio" 
                          value="Experimental" onChange={this.handleUpdate('genre_tag')}/> 
                          Experimental  
                </div>

                <p className="tag-note">Note: If you're not sure which tag to use
                      please select “Pop”— you can add secondary tags later.</p>
              </div>

              <div id="new-track-lyrics">
                <label className="track-field-label">Lyrics*</label>
                <br />
                <textarea
                  value={this.state.lyrics}
                  onChange={this.handleUpdate('lyrics')}
                ></textarea>
              </div>
            </div>
          </div>

          <div className="additional-metadata">
            <h3>Additional Metadata</h3>
            <div className="form-inputs">
              <div id="new-track-album">
                <label className="track-field-label">Album</label>
                <br />
                <input
                  type="text"
                  onChange={this.handleUpdate('album')}
                  value={this.state.album}
                  className="track-string-input"
                />
                <ul className="queried-albums">
                  <ReactCSSTransitionGroup
                    transitionName='auto'
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}>
                    {albumResults}
                  </ReactCSSTransitionGroup>
                </ul>
                <br />
              </div>

              <div id="new-track-audio">
                <label className="track-field-label">Audio URL:</label>
                <br />
                <input
                  type="text"
                  onChange={this.handleUpdate('audio_link')}
                  value={this.state.audio_link}
                  className="track-string-input"
                />
                <br />
              </div>
            </div>
          </div>

          <input className="track-submit" type="submit" value="Add track"></input>
          </form>
        </div>
          

    );
  }
}

export default NewTrackForm;