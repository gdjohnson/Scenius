import React from 'react';

class AlbumForm extends React.Component {
  constructor(props) {
    super(props);
    const { album } = this.props;
    const { id, artist_id, title } = album;
    const year = album.year || ''; 
    this.state = {
      id, title, artist_id, year: '', artwork_url: ''
    };
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUpdate(field) {
    return (event) => this.setState({
      [field]: event.currentTarget.value
    });
  }

  handleSubmit() {
    return (event) => {
      event.preventDefault();
      const { alterAlbum, closeModal } = this.props;
      const album = {... this.state};
      alterAlbum(album);
      closeModal();
    };
  }

  render() {
    const { artwork_url, year } = this.state;
    const { handleSubmit, handleUpdate } = this;
    return (
        <form className="album-form" onSubmit={handleSubmit()}>
          <h2 className="album-form-head">Add Addtl Album Info</h2>
          <div>
            <label className="add-album-art">Artwork URL</label>
              <br />
                <input type="text"
                  className="album-form-input-field"
                  value={artwork_url}
                  onChange={handleUpdate('artwork_url')}
                />
              <br />
            <label className="add-album-year">Year</label>
              <br />
                <input type="text"
                  className="album-form-input-field"
                  value={year}
                  onChange={handleUpdate('year')}
                />
              <br />
            <input className="album-form-submit" type="submit" value="Submit" />
          </div>
        </form>
    );
  }
}

export default AlbumForm;