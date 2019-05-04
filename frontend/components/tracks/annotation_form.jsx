import React from 'react';
import { connect } from 'react-redux';
import { openModal, closeModal } from '../../actions/modal_actions';
import { createAnnotation } from '../../actions/annotation_actions';


class AnnotationForm extends React.Component {
  constructor(props) {
    super(props);
    const { track_id, currentUser, annotProps } = this.props;
    this.state = {                   
      track_id,
      user_id: currentUser.id,
      content: '',
      start_idx: annotProps.start,
      end_idx: annotProps.end,
      range: annotProps.range
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.cancelForm = this.cancelForm.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      document.getElementById('anno-form').addEventListener('click', 
        (e) => { 
          const { id } = e.srcElement;
          if (id === 'cancel-anno') { this.cancelForm() }
          if (id === 'save-anno') { 
            e.stopPropagation();
            this.handleSubmit(); }
          else { e.stopPropagation(); } }, true) 
      document.getElementById('root').addEventListener('click', this.cancelForm, false);
    }, 1000)
  }

  cancelForm() {
    const el = document.getElementById('temp-annotated');
    const parent = el.parentNode;
    while (el.firstChild) parent.insertBefore(el.firstChild, el);
    parent.removeChild(el);
    this.closeModal();
  }

  closeModal() {
    document.getElementById('root').removeEventListener('click', this.cancelForm, false);
    this.props.closeModal();
  }

  handleUpdate() {
    return (event) => this.setState({
      content: event.currentTarget.value
    });
  }

  handleSubmit() {
      delete this.state.range;
      const annotation = {... this.state};
      this.props.createAnnotation(annotation).then(
      this.closeModal)
  };
  
  render() {
    return (
        <form id="anno-form">
              <div id="new-anno-wrapper">
                <textarea
                  id="anno-input"
                  placeholder="Don't just put the lyric in your own words... drop some knowledge!"
                  onChange={this.handleUpdate()}
                  style={{cursor: "text"}}
                ></textarea>
                <div id="anno-submit">
                  <input id="save-anno" type="submit" value="Save"/>
                  <input id="cancel-anno" type="button" value="Cancel"/>
                </div>
              </div>
        </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    track_id: state.entities.tracks.id,
    annotations: state.entities.annotations,
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