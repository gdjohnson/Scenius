import React from 'react';
import { connect } from 'react-redux';
import { signUp, signIn } from '../../actions/session_actions';
import { openModal, closeModal } from '../../actions/modal_actions';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUpdate(field) {
    return (event) => this.setState({
      [field]: event.currentTarget.value
    });
  }

  handleSubmit() {
    return (event) => {
      event.preventDefault();
      const user = {... this.state};
      this.props.signUp(user);
      if (this.props.errors.length < 1) {
        this.props.closeModal();
      } else {
        this.renderErrors();
      }
    };
  }

  signInGuest(){
    this.props.signIn({ username: 'temerity', password: '123456' });
    this.props.closeModal();
  }

  renderErrors() {
    return (
      <ul>
        {Object.values(this.props.errors).map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="modal__form-wrap">
        <p className="modal__form__header button">S c e n i u s</p>
        <form className="modal__form modal__form__sign-up" onSubmit={this.handleSubmit()}>
          <p className="modal__form__type">Sign up.</p>
          {this.renderErrors()}
          <div>
              <input type="text"
                className="modal__form__input"
                value={this.state.username}
                placeholder="Username"
                onChange={this.handleUpdate('username')}
              />
              <input type="password"
                className="modal__form__input"
                value={this.state.password}
                placeholder="Password"
                onChange={this.handleUpdate('password')}
              />
            <input className="button box-button box-button--modal" type="submit" value="Sign up" />
          </div>
        </form>
        <div className="addtl-sign-in-opts">
          <input className="addtl-sign-in-opt" type="submit" value="Sign in" onClick={() => this.props.openModal({modal: 'signin'})}/>
          <input className="addtl-sign-in-opt" type="submit" value="Demo Sign-in" onClick={() => this.signInGuest()}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ errors }) => {
  return {
    errors: errors.session,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: (user) => dispatch(signIn(user)),
    signUp: (user) => dispatch(signUp(user)),
    openModal: (modal) => dispatch(openModal(modal)),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);