import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import { fetchTrack } from '../../actions/track_actions';
import { deleteAnnotation } from '../../actions/annotation_actions';


class AnnotationShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mounted: false };

    this.unwrap = this.unwrap.bind(this);
    this.deleteAnno = this.deleteAnno.bind(this);
  }

  componentDidMount() {
    const { fetchTrack, track } = this.props;

    fetchTrack(track.id).then(() => {
      if (this.state.mounted === false) { this.setState({ mounted: true }); }
    });
  }

  deleteAnno(id) {
    const { closeModal, deleteAnnotation } = this.props;
    this.unwrap(id);
    deleteAnnotation(id).then(
    closeModal());
  }

  unwrap(id) {
    const span = document.getElementById(id);
    const text = span.firstChild;
    const parent = span.parentElement;
    parent.insertBefore(text, span)
    parent.removeChild(span);
  }

  render() {
    const { annotations, annotProps, closeModal } = this.props;
    let annoId = annotProps.id;

    if (this.state.mounted == true) {
      if (annoId === undefined){
        annoId = annotations[annotations.length-1].id;
      }
      else {
        document.getElementsByName('trash')[0].addEventListener('click', () => this.deleteAnno(annoId))
      }
    }

    const annotation = (id) => {
        return annotations.map(anno => {
            if (anno.id == id){ 
                return anno.content;} })}

    return (
      <div id="anno-show-wrapper">
        <h3  id="anno-show-header">Scenius Annotation</h3>
        <p>{annotation(annoId)}</p>
        <div id="anno-show-footer">
          <ion-icon name="trash"></ion-icon>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { tracks } = state.entities;
  return {
    annotations: tracks.annotations,
    track: tracks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTrack: (id) => dispatch(fetchTrack(id)),
    deleteAnnotation: (id) => dispatch(deleteAnnotation(id)),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnnotationShow);