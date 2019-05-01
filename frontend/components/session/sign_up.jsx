import React from 'react';
import { connect } from 'react-redux';
import { signUp } from '../../actions/session_actions';
import { closeModal } from '../../actions/modal_actions';

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
      this.props.closeModal();
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
        <form onSubmit={this.handleSubmit()}>
          Enter a username and password to sign up.
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
            <input type="submit" value="Sign up" />
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
    signUp: (user) => dispatch(signUp(user)),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);