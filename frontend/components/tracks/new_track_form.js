import React from 'react';
import { createArtist } from '../../util/artist_api_util';

class NewTrackForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      title: '',
      lyrics: '',
      // poster_id: this.props.currentUser.id,
      artist: '',
      artist_id: '',
      album: '',
      genreTag: '',
      audioLink: '',
      inputVal: ''
    };
  }

  componentDidMount(){
    this.props.fetchArtists();
    this.props.fetchAlbums();
  }

  handleUpdate(field) {
    return (event) => this.setState({
      [field]: event.currentTarget.value
    });
  }

  handleSubmit() {
    return (event) => {
      event.preventDefault();

      if (this.searchArtists(this.state.artist).length === 0){
        this.props.createArtist({name: this.state.artist})
      } else {
        this.state.artist_id = this.props.entities.inputVal.id;
      };
      
      
      delete this.state.artist;

      // const album_id = this.searchAlbums(this.state.album);
      // delete this.state.album;
      
      // const track = Object.assign({ artist_id, album_id}, this.state);

      const track = Object.assign({}, this.state);
      this.props.createTrack(track);
    };
  }

  searchArtists(event) {
    // this.setState({ 'artist': event.currentTarget.value });

    const artistMatches = [];

    if (this.state.artist.length === 0) {
      return [];
    } else {
    this.props.entities.artists.forEach(artist => {
      let subslice = artist.name.slice(0, this.state.artist.length);
      if (subslice.toLowerCase() === this.state.artist.toLowerCase()) {
        artistMatches.push(name);
      }
    });};

    return artistMatches;
  }

  selectArtist(event) {
    const name = event.currentTarget.innerText;
    this.setState({artist: name});
  }


  render() {
    const artistResults = this.artistMatches().map((artist, idx) => {
      return <li key={idx} onClick={this.selectArtist}>{artist.name}</li>;
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
                <ul>
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
                          value="Pop" onChange={this.handleUpdate('genreTag')}/> 
                          Pop  
                  <input  type="radio" name="genre" className="genre_radio" 
                          value="Rock" onChange={this.handleUpdate('genreTag')}/> 
                          Rock  
                  <input  type="radio" name="genre" className="genre_radio" 
                          value="Rap" onChange={this.handleUpdate('genreTag')}/> 
                          Rap  
                  <input  type="radio" name="genre" className="genre_radio" 
                          value="Electronic" onChange={this.handleUpdate('genreTag')}/> 
                          Electronic  
                  <input  type="radio" name="genre" className="genre_radio" 
                          value="Jazz" onChange={this.handleUpdate('genreTag')}/> 
                          Jazz  
                  <br />
                  <input  type="radio" name="genre" className="genre_radio" 
                          value="Classical" onChange={this.handleUpdate('genreTag')}/> 
                          Classical  
                  <input  type="radio" name="genre" className="genre_radio" 
                          value="Experimental" onChange={this.handleUpdate('genreTag')}/> 
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
                <select>
                  {Object.values(this.props.albums).map(album => { 
                    <option value={album.id} onChange={this.handleUpdate('album_id')}>
                      {album.title}
                    </option>
                  })
                  }
                </select>
                {/* <input
                  type="text"
                  onChange={this.handleUpdate('album')}
                  value={this.state.album}
                  className="track-string-input"
                /> */}
                <br />
              </div>

              <div id="new-track-audio">
                <label className="track-field-label">Audio URL:</label>
                <br />
                <input
                  type="text"
                  onChange={this.handleUpdate('audioLink')}
                  value={this.state.audioLink}
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