import React from 'react';
import { connect } from 'react-redux';
import { openModal, closeModal } from '../../actions/modal_actions';
import { createAnnotation } from '../../actions/annotation_actions';


class AnnotationShow extends React.Component {
  constructor(props) {
    super(props);
    const { track_id, user_id, currentUser, annotProps } = this.props;
    this.state = {                   
      track_id,
      user_id: currentUser.id,
      content: '',
      start_idx: annotProps.start,
      end_idx: annotProps.end
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUpdate() {
    return (event) => this.setState({
      content: event.currentTarget.value
    });
  }

  handleSubmit(event) {
      event.preventDefault();
      const annotation = Object.assign({}, this.state);
      this.props.createAnnotation(annotation);
      this.props.closeModal();
    };
  

  render() {
    return (
        <form className="annotation-form" onSubmit={this.handleSubmit}>
              <div className="annotation-form-annotation">
                <textarea
                  className="annotation-form-input-field"
                  placeholder="Don't just put the lyric in your own words... drop some knowledge!"
                  onChange={this.handleUpdate()}
                ></textarea>
                <div className="annotation-form-sub-buttons">
                  <input type="submit" value="Save" />
                  <button onClick={this.props.closeModal}>Cancel</button>
                </div>
              </div>
        </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    track_id: state.entities.tracks.id,
    currentUser: state.entities.session.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createAnnotation: (annot) => dispatch(createAnnotation(annot)),
    closeModal: () => dispatch(closeModal()),
    openModal: (modal) => dispatch(openModal(modal))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnnotationShow);