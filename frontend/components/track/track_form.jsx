import React from 'react';
import { RECEIVE_ALBUM } from '../../actions/album_actions';

class TrackForm extends React.Component {
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
      audio_link: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.selectArtist = this.selectArtist.bind(this);
    this.selectAlbum = this.selectAlbum.bind(this);
    this.artistResults = this.artistResults.bind(this);
    this.albumResults = this.albumResults.bind(this);
  }

  navigateToTrack(action) {
    this.props.history.push(`/tracks/${action.track.id}`);
  }

  handleUpdate(field) {
    const { searchArtists, searchAlbums } = this.props;
    return (e) => {
      const term = e.currentTarget.value;
      if (field == "artist") searchArtists(term);
      if (field == "album") searchAlbums(term);
      this.setState({[field]: e.currentTarget.value});
    }
  }

  handleSubmit(event) {
    
      event.preventDefault();
      const track = {... this.state};
      this.props.createTrack(track).then((action) => {
        this.navigateToTrack(action);
      });
  }

  // searchArtists(){
  //   const artistMatches = [];
  //   if (this.state.artist.length < 1) {
  //     return [];
  //   } else {
  //   Object.values(this.props.artists).forEach(artist => {
  //     let subslice = artist.name.slice(0, this.state.artist.length); //if the first X letter of an artist match query, 
  //     if (subslice.toLowerCase() === this.state.artist.toLowerCase()) { //then push them into artistMatches
  //       artistMatches.push(artist);
  //     }
  //   });}

  //   return artistMatches;
  // }

  selectArtist(event) {
    const selectedArtist = event.currentTarget;
    selectedArtist.classList.add('selected-artist-from-query');
    const name = event.currentTarget.innerText;
    this.setState({artist: name});
  }

  // searchAlbums() {
  //   const albumMatches = [];
  //   if (this.state.album.length < 1) {
  //     return [];
  //   } else {
  //   Object.values(this.props.albums).forEach(album => {
  //     let subslice = album.title.slice(0, this.state.album.length); //if the first X letter of an album match query, 
  //     if (subslice.toLowerCase() === this.state.album.toLowerCase()) { //then push them into albumMatches
  //       albumMatches.push(album);
  //     }
  //   });}

  //   return albumMatches;
  // }

  selectAlbum(event) {
    const selectedAlbum = event.currentTarget;
    selectedAlbum.classList.add('selected-album-from-query');
    const title = event.currentTarget.innerText;
    this.setState({album: title});
  }

  artistResults() {
    
    let { artists } = this.props;
    if (artists) artists = Object.values(artists)
    else { return null; }
  
    const results = artists.map((artist) => {
      
      return <li className="queried-artist" key={artist.id} onClick={this.selectArtist}>{artist.name}</li>
    })

    return (
      <ul className="queried-artists">
        {results}
      </ul> )
    }

  albumResults() {
    
    let { albums } = this.props;
    if (albums) albums = Object.values(albums)
    else { return null; }

    const results = albums.map((album) => {
      
      return <li className="queried-album" key={album.id} onClick={this.selectAlbum}>{album.title}</li>
    })

    return (
      <ul className="queried-albums">
        {results}
      </ul> )
    }


  render() {
    const { state, handleSubmit, handleUpdate, artistResults, albumResults } = this;
    return (
      <div className="center-flex">
      <div id="track-form-wrapper">
        <h1>Add Song</h1>
        <form id="track-form" onSubmit={handleSubmit}>
          <div id="track-form-data">
            <div className="primary-info">
                <h3>Primary Info</h3>
                <div>
                  <div className="form-inputs" id="track-form-title">
                    <label className="track-field-label">Title*</label>
                    <input
                      type="text"
                      value={state.description}
                      onChange={handleUpdate('title')}
                      className="track-string-input"
                    />
                  </div>

                  <div className="form-inputs" id="track-form-artist">
                    <label className="track-field-label">By*</label>
                    <input
                      type="text"
                      onChange={handleUpdate('artist')}
                      value={state.artist}
                      className="track-string-input"
                    />

                      {artistResults()}

                  </div>

                  <div className="form-inputs" id="track-form-album">
                    <label className="track-field-label">Album*</label>
                    <input
                      type="text"
                      onChange={handleUpdate('album')}
                      value={state.album}
                      className="track-string-input"
                    />
                    
                    {albumResults()}

                  </div>

                </div>
              </div>

            <div className="additional-metadata">
              <h3>Additional Metadata</h3>

              <div id="new-track-genre">
                  <label className="track-field-label">Primary tag</label>
                  <div className="genre-selector">
                    <input  type="radio" name="genre" className="genre_radio" 
                            value="Pop" onChange={handleUpdate('genre_tag')}/> 
                            Pop  
                    <input  type="radio" name="genre" className="genre_radio" 
                            value="Rock" onChange={handleUpdate('genre_tag')}/> 
                            Rock  
                    <input  type="radio" name="genre" className="genre_radio" 
                            value="Rap" onChange={handleUpdate('genre_tag')}/> 
                            Rap  
                    <input  type="radio" name="genre" className="genre_radio" 
                            value="Electronic" onChange={handleUpdate('genre_tag')}/> 
                            Electronic  
                    <input  type="radio" name="genre" className="genre_radio" 
                            value="Jazz" onChange={handleUpdate('genre_tag')}/> 
                            Jazz  
                    <input  type="radio" name="genre" className="genre_radio" 
                            value="Classical" onChange={handleUpdate('genre_tag')}/> 
                            Classical  
                    <input  type="radio" name="genre" className="genre_radio" 
                            value="Experimental" onChange={handleUpdate('genre_tag')}/> 
                            Experimental  
                  </div>

                  <p className="tag-note">Note: If you're not sure which tag to use
                        please select “Pop”— you can add secondary tags later.</p>
                  <br />

                  </div>
                  <div className="form-inputs" id="track-form-video">
                      <label className="track-field-label">Video URL:</label>
                      <input
                        type="text"
                        onChange={handleUpdate('audio_link')}
                        value={state.audio_link}
                        className="track-string-input"
                      />
                </div>
            </div>
          </div>
          <div id="new-track-lyrics">
                <h3>Lyrics</h3>
                <br />
                <textarea
                  value={state.lyrics}
                  onChange={handleUpdate('lyrics')}  ></textarea>
                <br />
                <div id="track-submit-wrapper">
                  <input className="button box-button" type="submit" value="Add track"></input>
                </div>
          </div>
          </form>
        </div>
    </div>      

    );
  }
}

export default TrackForm;