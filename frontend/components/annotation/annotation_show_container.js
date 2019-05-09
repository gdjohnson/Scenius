import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import { fetchTrack } from '../../actions/track_actions';
import { deleteAnnotation } from '../../actions/annotation_actions';
import AnnotationShow from './annotation_show';

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