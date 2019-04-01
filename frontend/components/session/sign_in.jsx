import React from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../actions/session_actions';
import { openModal, closeModal } from '../../actions/modal_actions';

class SignIn extends React.Component {
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
      const user = Object.assign({}, this.state);
      this.props.signIn(user);
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
    if (Object.values(this.props.errors).length > 0){
      return (
        <ul>
          {Object.values(this.props.errors).map((error, i) => (
              <li key={`error-${i}`}>
                {error}
              </li>
          ))}
          </ul>
    );}
  }

  render() {
    return (
      <div>
        <form className="sign-in-form" onSubmit={this.handleSubmit()}>
          <p className="sign-in-form-head">Sign in to Scenius.</p>
          {this.renderErrors()}
          <div>
            <br />
              <input type="text"
                className="sign-in-input"
                value={this.state.username}
                placeholder="Username"
                onChange={this.handleUpdate('username')}
              />
            <br />
              <input type="password"
                className="sign-in-input"
                value={this.state.password}
                placeholder="Password"
                onChange={this.handleUpdate('password')}
              />
            <br />
              <input className="sign-in-form-submit" type="submit" value="Sign in" />
              <div className="addtl-sign-in-opts">
                <input className="addtl-sign-in-opt" type="submit" value="Create an account" onClick={() => this.props.openModal('signup')}/>
                <input className="addtl-sign-in-opt" type="submit" value="Demo Sign-in" onClick={() => this.signInGuest()}/>
              </div>
          </div>
        </form>
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
    closeModal: () => dispatch(closeModal()),
    openModal: (modal) => dispatch(openModal(modal))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);