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
      audio_link: '',
      submitted: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.searchArtists = this.searchArtists.bind(this);
    this.selectArtist = this.selectArtist.bind(this);
    this.searchAlbums = this.searchAlbums.bind(this);
    this.selectAlbum = this.selectAlbum.bind(this);
  }

  componentDidMount(){
    this.props.fetchArtists();
    this.props.fetchAlbums();
  }

  navigateToTrack(action) {
    this.props.history.push(`/tracks/${action.track.id}`);
  }

  handleUpdate(field) {
    return (event) => this.setState({
      [field]: event.currentTarget.value
    });
  }

  handleSubmit(event) {
      event.preventDefault();
      this.setState({ submitted: true }, () =>{
        const track = {... this.state};
        this.props.createTrack(track).then((action) => {
          return this.navigateToTrack(action);
        });
      });
    }

  searchArtists(){
    const artistMatches = [];
    if (this.state.artist.length < 1) {
      return [];
    } else {
    Object.values(this.props.artists).forEach(artist => {
      let subslice = artist.name.slice(0, this.state.artist.length); //if the first X letter of an artist match query, 
      if (subslice.toLowerCase() === this.state.artist.toLowerCase()) { //then push them into artistMatches
        artistMatches.push(artist);
      }
    });}

    return artistMatches;
  }

  selectArtist(event) {
    const selectedArtist = event.currentTarget;
    selectedArtist.classList.add('selected-artist-from-query');
    const name = event.currentTarget.innerText;
    this.setState({artist: name});
  }

  searchAlbums() {
    const albumMatches = [];
    if (this.state.album.length < 1) {
      return [];
    } else {
    Object.values(this.props.albums).forEach(album => {
      let subslice = album.title.slice(0, this.state.album.length); //if the first X letter of an album match query, 
      if (subslice.toLowerCase() === this.state.album.toLowerCase()) { //then push them into albumMatches
        albumMatches.push(album);
      }
    });}

    return albumMatches;
  }

  selectAlbum(event) {
    const selectedAlbum = event.currentTarget;
    selectedAlbum.classList.add('selected-album-from-query');
    const title = event.currentTarget.innerText;
    this.setState({album: title});
  }


  render() {
    if (Object.values(this.props.artists).length === 0 ||
        Object.values(this.props.albums).length === 0){
          return null;
        }
    
    let artistResults;
    let albumResults;
    if (this.state.submitted === false){
      artistResults = () => { 
        return (
        <ul className="queried-artists">
          {this.searchArtists().map((artist) => {
          return <li className="queried-artist" key={artist.id} onClick={this.selectArtist}>{artist.name}</li>
          })}
        </ul> )
      }

      albumResults = () => {
        return (
        <ul className="queried-albums">
          {this.searchAlbums().map((album, idx) => {
          return <li className="queried-album" key={idx} onClick={this.selectAlbum}>{album.title}</li>
          })}
        </ul> )
      }
    }

    return (
      <div className="center-flex">
      <div id="track-form-wrapper">
        <h1>Add Song</h1>
        <form id="track-form" onSubmit={this.handleSubmit}>
          <div id="track-form-data">
            <div className="primary-info">
                <h3>Primary Info</h3>
                <div>
                  <div className="form-inputs" id="track-form-title">
                    <label className="track-field-label">Title*</label>
                    <input
                      type="text"
                      value={this.state.description}
                      onChange={this.handleUpdate('title')}
                      className="track-string-input"
                    />
                  </div>

                  <div className="form-inputs" id="track-form-artist">
                    <label className="track-field-label">By*</label>
                    <input
                      type="text"
                      onChange={this.handleUpdate('artist')}
                      value={this.state.artist}
                      className="track-string-input"
                    />

                      {artistResults()}

                  </div>

                  <div className="form-inputs" id="track-form-album">
                    <label className="track-field-label">Album*</label>
                    <input
                      type="text"
                      onChange={this.handleUpdate('album')}
                      value={this.state.album}
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
                    <input  type="radio" name="genre" className="genre_radio" 
                            value="Classical" onChange={this.handleUpdate('genre_tag')}/> 
                            Classical  
                    <input  type="radio" name="genre" className="genre_radio" 
                            value="Experimental" onChange={this.handleUpdate('genre_tag')}/> 
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
                        onChange={this.handleUpdate('audio_link')}
                        value={this.state.audio_link}
                        className="track-string-input"
                      />
                </div>
            </div>
          </div>
          <div id="new-track-lyrics">
                <h3>Lyrics</h3>
                <br />
                <textarea
                  value={this.state.lyrics}
                  onChange={this.handleUpdate('lyrics')}  ></textarea>
                <br />
                <div id="track-submit-wrapper">
                  <input className="track-submit" type="submit" value="Add track"></input>
                </div>
          </div>
          </form>
        </div>
    </div>      

    );
  }
}

export default TrackForm;