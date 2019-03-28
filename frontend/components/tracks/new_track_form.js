import React from 'react';

class NewTrackForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      title: '',
      lyrics: '',
      // poster_id: this.props.currentUser.id,
      artist_id: '',
      album_id: '',
      genre_tag: '',
      audio_link: ''
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

      // const artist_id = this.searchArtists(this.state.artist);
      // delete this.state.artist;

      // const album_id = this.searchAlbums(this.state.album);
      // delete this.state.album;
      
      // const track = Object.assign({ artist_id, album_id}, this.state);

      const track = Object.assign({}, this.state);
      this.props.createTrack(track);
    };
  }

  // searchArtists(artistName){
  //   this.props.updateBounds({name: artistName});
  // }

  // searchAlbums(albumTitle) {
  //   this.props.updateBounds({ name: albumName });
  // }

  render() {
    debugger
    return (
      <div className="track-form"><h1>Add Song</h1>

        <form onSubmit={this.handleSubmit()}>
        <div className="primary-info">
            <h3>Primary Info</h3>
            <div className="form-inputs">
              <div id="new-track-artist">
                <label className="track-field-label">By*</label>
                <br />
                <select>
                  {Object.values(this.props.artists).map(artist => {
                    <option value={artist.id} onChange={this.handleUpdate('artist_id')}>
                      {artist.name}
                    </option>
                  })
                  }
                </select>
                {/* <input
                  type="text"
                  onChange={this.handleUpdate('artist')}
                  className="track-string-input"
                />
                <br /> */}
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