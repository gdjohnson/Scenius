import React from 'react';

import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';

import SignIn from '../session/sign_in';
import SignUp from '../session/sign_up';
import AddArt from '../tracks/album_form';
import AddBackground from '../tracks/background_img_form';
import AddAnnotation from '../tracks/annotation_form';

function AuthModal({ modal, closeModal }) {
  if (!modal) {
    return null;
  }
  let component;
  switch (modal.modal) {
    case 'signin':
      component = <SignIn />;
      break;
    case 'signup':
      component = <SignUp />;
      break;
    case 'add-art':
      component = <AddArt />;
      break;
    case 'add-bground':
      component = <AddBackground />;
      break;
    default:
      return null;
  }
  
  return (
    <div className="auth-modal-background" onClick={closeModal}>
      <div className="auth-modal-child" onClick={event => event.stopPropagation()}>
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

export default connect(mapStateToProps, mapDispatchToProps)(AuthModal);