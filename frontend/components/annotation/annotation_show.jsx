import React from 'react';

class AnnotationShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mounted: false };

    this.unwrap = this.unwrap.bind(this);
    this.deleteAnno = this.deleteAnno.bind(this);
  }

  componentDidMount() {
    const { fetchTrack, track, closeModal } = this.props;

    fetchTrack(track.id).then(() => {
      if (this.state.mounted === false) { this.setState({ mounted: true }); }
    });

    document.getElementsByName('close')[0].addEventListener('click', () => closeModal() )
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
        <div id="anno-show-header">
          <h3>Scenius Annotation</h3>
          <ion-icon name="close"></ion-icon>
        </div>
        <p>{annotation(annoId)}</p>
        <div id="anno-show-footer">
          <ion-icon name="trash"></ion-icon>
        </div>
      </div>
    );
  }
}

export default AnnotationShow;