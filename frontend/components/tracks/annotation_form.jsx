import React from 'react';
import { connect } from 'react-redux';
import { openModal, closeModal } from '../../actions/modal_actions';
import { createAnnotation } from '../../actions/annotation_actions';


class AnnotationForm extends React.Component {
  constructor(props) {
    super(props);
    const { track_id, user_id, currentUser, annotProps } = this.props;
    debugger
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
      debugger
      event.preventDefault();
      const annotation = Object.assign({}, this.state);
      this.props.createAnnotation(annotation);
      this.props.closeModal();
    };
  

  render() {
    return (
        <form className="annotation-form" onSubmit={this.handleSubmit}>
          <h2 className="annotation-form-head">Add Annotation</h2>
          <div>
              {this.props.annotProps.ref.toString()}
              <br />
                <input type="text"
                  className="annotation-form-input-field"
                  onChange={this.handleUpdate()}
                />
              <br />
            <input className="annotation-form-submit" type="submit" value="Submit" />
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

export default connect(mapStateToProps, mapDispatchToProps)(AnnotationForm);