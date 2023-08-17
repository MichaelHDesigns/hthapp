import React, { Component } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import LoginModal from './Modals/LoginModal';
import { auth } from '../index';

class Login extends Component {
  state = {
    user: null,
    email: '',
    password: '',
    errorMessage: '',
    showModal: false,
  };

  componentDidMount() {
    // Check if a user is already logged in
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.setState({ user });
      }
    });
  }

  handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      this.setState({ user });
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  handleEmailSignUp = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;
      this.setState({ user, email: '', password: '', errorMessage: '' });
    } catch (error) {
      console.error('Email sign-up error:', error);
      this.setState({ errorMessage: 'Error signing up with email and password.' });
    }
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { user, email, password, errorMessage, showModal } = this.state;

    if (user) {
      return <Navigate to="/dashboard" />;
    }

    return (
<div> 
<br />
<br />
       <div className="login-container">
        <div className="login-card">
          <h2>Login with Google or Email to experience more!!</h2>
          <button className="login-button" onClick={this.handleGoogleLogin}>
            Google
          </button>

          <div className="divider">or</div>

          <form onSubmit={this.handleEmailSignUp}>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={this.handleInputChange}
              required
            />
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={this.handleInputChange}
              required
            />
            <button className="login-button" type="submit">
              Sign Up with Email
            </button>
          </form>

          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <br />
          <button
            className="login-button"
            onClick={() => this.setState({ showModal: true })}
          >
            Already have an account? Log in
          </button>

          <LoginModal
            showModal={showModal}
            onClose={() => this.setState({ showModal: false })}
          />
        </div>
      </div>
</div>
    );
  }
}

export default Login;
