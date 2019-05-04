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
        <form className="sign-in-form" onSubmit={this.handleSubmit()}>
          <p className="sign-in-form-head">Sign up for Scenius.</p>
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
            <input className="sign-in-form-submit" type="submit" value="Sign up" />
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