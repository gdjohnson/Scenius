import React from 'react';
import { connect } from 'react-redux';
import { alterAlbum } from '../../actions/album_actions';
import { openModal, closeModal } from '../../actions/modal_actions';

class AlbumForm extends React.Component {
  constructor(props) {
    super(props);
    const { title } = this.props.album;
    const artist_id = this.props.artist_id;
    const id = this.props.id;
    this.state = {
      id,
      title,
      artist_id,
      year: '',
      artwork_url: ''
    };
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
      const album = {... this.state};
      this.props.alterAlbum(album);
      this.props.closeModal();
    };
  }

  render() {
    return (
        <form className="album-form" onSubmit={this.handleSubmit()}>
          <h2 className="album-form-head">Add Addtl Album Info</h2>
          <div>
            <label className="add-album-art">Artwork URL</label>
              <br />
                <input type="text"
                  className="album-form-input-field"
                  value={this.state.artwork_url}
                  onChange={this.handleUpdate('artwork_url')}
                />
              <br />
            <label className="add-album-year">Year</label>
              <br />
                <input type="text"
                  className="album-form-input-field"
                  value={this.state.year}
                  onChange={this.handleUpdate('year')}
                />
              <br />
            <input className="album-form-submit" type="submit" value="Submit" />
          </div>
        </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    album: state.entities.albums,
    id: state.entities.tracks.album_id,
    artist_id: state.entities.tracks.artist_id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    alterAlbum: (album) => dispatch(alterAlbum(album)),
    closeModal: () => dispatch(closeModal()),
    openModal: (modal) => dispatch(openModal(modal))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumForm);