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
      if (this.props.errors.length) > 0 {
        this.props.closeModal();
      } else {
        this.renderErrors();
      }
      
    };
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
      <div>
        <form className="sign-in-form" onSubmit={this.handleSubmit()}>
          <p className="sign-in-form-head">Sign in to Scenius.</p>
          {this.renderErrors()}
          <div>
            <br />
            <label>Username:
              <input type="text"
                value={this.state.username}
                onChange={this.handleUpdate('username')}
              />
            </label>
            <br />
            <label>Password:
              <input type="password"
                value={this.state.password}
                onChange={this.handleUpdate('password')}
              />
            </label>
            <br />
            <input className="sign-in-form-submit" type="submit" value="Sign In" />
            <input className="sign-in-form-create-button" type="submit" value="CREATE AN ACCOUNT" onClick={() => this.props.openModal('signup')}/>
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