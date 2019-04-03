import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import SignIn from '../session/sign_in';
import SignUp from '../session/sign_up';
import AddArt from '../tracks/add_art';

function Modal({ modal, closeModal }) {
  if (!modal) {
    return null;
  }
  let component;
  switch (modal) {
    case 'signin':
      component = <SignIn />;
      break;
    case 'signup':
      component = <SignUp />;
      break;
    case 'add-art':
      component = <AddArt />;
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

export default connect(mapStateToProps, mapDispatchToProps)(Modal);