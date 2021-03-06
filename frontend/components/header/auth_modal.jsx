import React from 'react';

import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';

import SignIn from '../session/sign_in';
import SignUp from '../session/sign_up';
import AddArt from '../album/album_form_container';
import AddBackground from '../track/background_img_form';

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
    <div className="modal-background modal-background--auth" onClick={closeModal}>
      <div className="modal-child modal-child--auth" onClick={event => event.stopPropagation()}>
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