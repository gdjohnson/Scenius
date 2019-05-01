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
      ref: annotProps.ref
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.cancelAnnotation = this.cancelAnnotation.bind(this);
  }

  componentDidMount() {
    debugger
    this.temporarySelection(this.state.ref);

    //Tracks for click-off cancellation of annotation
    setTimeout(() => {
      document.getElementsByClassName('annotation-form')[0].addEventListener('click', 
        (e) => { e.stopPropagation();}, true);
      document.getElementById('root').addEventListener('click', this.cancelAnnotation, false);
    }, 1000)
  }

  temporarySelection(ref){
    const range = ref.getRangeAt(0).cloneRange();
    let span = document.createElement("span");
    span.id = "temp-annotated";
    range.surroundContents(span); 
  }

  cancelAnnotation() {
    debugger
    document.getElementById('root').removeEventListener('click', this.cancelAnnotation, false);
    debugger
    const el = document.getElementById('temp-annotated');
    const parent = el.parentNode;
    while (el.firstChild) parent.insertBefore(el.firstChild, el);
    parent.removeChild(el);
    debugger
    this.props.closeModal();
  }

  handleUpdate() {
    return (event) => this.setState({
      content: event.currentTarget.value
    });
  }

  handleSubmit(event) {
      debugger
      event.preventDefault();
      const annotation = {... this.state};
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
                  style={{cursor: "text"}}
                ></textarea>
                <div className="annotation-form-sub-buttons">
                  <input id="save-anno" type="submit" value="Save"/>
                  {/* <input id="cancel-anno" type="button" value="Cancel" onClick={this.cancelAnnotation}/> */}
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
  debugger
  return {
    createAnnotation: (annot) => dispatch(createAnnotation(annot)),
    closeModal: () => dispatch(closeModal()),
    openModal: (modal) => dispatch(openModal(modal))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnnotationForm);