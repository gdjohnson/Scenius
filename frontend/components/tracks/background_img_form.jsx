import React from 'react';
import { connect } from 'react-redux';
import { alterAlbum } from '../../actions/album_actions';
import { openModal, closeModal } from '../../actions/modal_actions';

class BackgroundImgForm extends React.Component {
  constructor(props) {
    super(props);
    const { title, year, artwork_url } = this.props.album;
    const artist_id = this.props.artist_id;
    const id = this.props.id;
    this.state = {
      id,
      title,
      artist_id,
      year,
      artwork_url,
      background_photo: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUpdate() {
    return (event) => this.setState({
      background_photo: event.currentTarget.value
    });
  }

  handleSubmit(event) {
      event.preventDefault();
      const album = Object.assign({}, this.state);
      this.props.alterAlbum(album).then(this.props.closeModal());
    };
  

  render() {
    return (
        <form className="bground-img-form" onSubmit={this.handleSubmit}>
          <h2 className="bground-img-form-head">Add Background Image</h2>
          <div>
            <label className="add-bground-img">Image URL</label>
              <br />
                <input type="text"
                  className="bground-img-form-input-field"
                  value={this.state.background_photo}
                  onChange={this.handleUpdate()}
                />
              <br />
            <input className="bground-form-submit" type="submit" value="Submit" />
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

export default connect(mapStateToProps, mapDispatchToProps)(BackgroundImgForm);