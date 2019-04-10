import React from 'react';

import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';

import AnnotationForm from '../tracks/annotation_form';
import AnnotationShow from '../tracks/annotation_show';

function AnnoModal({ modal, closeModal }) {
  if (!modal) {
    return null;
  }
  let component;
  switch (modal.modal) {
    case 'add-annotation':
      component = <AnnotationForm annotProps={modal.annotProps}/>;
      break;
    case 'show-annotation':
      component = <AnnotationShow annotProps={modal.annotProps}/>;
      break;
    default:
      return null;
  }
  
  return (
    <div className="modal-background" onClick={closeModal}>
      <div className="modal-child" onClick={event => event.stopPropagation()}>
        {component}
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    modal: state.ui.modal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnnoModal);