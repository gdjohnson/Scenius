import { connect } from 'react-redux';
import { openModal, closeModal } from '../../actions/modal_actions';
import { createAnnotation } from '../../actions/annotation_actions';
import AnnotationForm from './annotation_form';

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