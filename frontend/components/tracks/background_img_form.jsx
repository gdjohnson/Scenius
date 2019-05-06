import React from 'react';
import { connect } from 'react-redux';
import { alterAlbum } from '../../actions/album_actions';
import { openModal, closeModal } from '../../actions/modal_actions';

class BackgroundImgForm extends React.Component {
  constructor(props) {
    super(props);
    const { id, title, year, artist_id, artwork_url } = this.props.album;
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
      debugger
      const album = {... this.state};
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
  debugger
  return {
    album: state.entities.albums,
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