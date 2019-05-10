import React from 'react';

import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';

import AnnotationFormContainer from './annotation_form_container';
import AnnotationShowContainer from './annotation_show_container';

function AnnoModal({ modal }) {
  if (!modal) {
    return null;
  }
  let component;
  switch (modal.modal) {
    case 'add-annotation':
      component = <AnnotationFormContainer annotProps={modal.annotProps}/>;
      break;
    case 'show-annotation':
      component = <AnnotationShowContainer annotProps={modal.annotProps}/>;
      break;
    default:
      return null;
  }
  
  return (
      <div className="anno-modal-child" onClick={event => event.stopPropagation()}>
        {component}
      </div>
  );
}

const mapStateToProps = state => {
  return { modal: state.ui.modal };
};

const mapDispatchToProps = dispatch => {
  return { closeModal: () => dispatch(closeModal()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnnoModal);