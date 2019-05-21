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

    document.getElementsByName('close')[0].addEventListener('click', closeModal );
    Array.from(document.getElementsByTagName('a')).forEach(el => el.addEventListener('click', closeModal));
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

  trash(id) {
    const {annotations, currentUser} = this.props;
    if (currentUser && annotations.length){ 
      const anno = annotations.filter(anno => anno.id == id)[0];
      if (currentUser.id == anno.user_id){
        return <ion-icon name="trash" onClick={() => this.deleteAnno(id)}></ion-icon>
      }
    }
  }

  annotation(id) {
    const { annotations } = this.props;
    if (annotations.length) return annotations.filter(anno => anno.id == id)[0].content
  }

  render() {
    const { annotProps } = this.props;
    const annoId = annotProps.id;

    return (
      <div id="anno-show-wrapper">
        <div id="anno-show-header">
          <h3>Scenius Annotation</h3>
          <ion-icon name="close"></ion-icon>
        </div>
        <p>{this.annotation(annoId)}</p>
        <div id="anno-show-footer">
          {this.trash(annoId)}
        </div>
      </div>
    );
  }
}

export default AnnotationShow;