import React, { Component } from 'react';
import { Modal, Button, Form, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

class LoginModal extends Component {
  state = {
    email: '',
    password: '',
    error: null,
    loggedIn: false,
    showForgotPasswordForm: false,
  };

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      this.setState({ loggedIn: true });
      this.props.onClose();
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  handleForgotPassword = () => {
    this.setState({ showForgotPasswordForm: true });
  };

  handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();

    const { email } = this.state;

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      this.setState({ showForgotPasswordForm: false });
      alert('Password reset email sent. Check your inbox for further instructions.');
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  render() {
    const { showForgotPasswordForm, loggedIn } = this.state;

    if (loggedIn) {
      return <Navigate to="/dashboard" />;
    }

    return (
      <div className={`login-modal ${this.props.showModal ? 'show' : ''}`}>
        <Modal show={this.props.showModal} onHide={this.props.onClose} dialogClassName="modal-dialog-centered">
          <Modal.Header>
            <Modal.Title>Log In</Modal.Title>
            <Button className="close-button" variant="link" onClick={this.props.onClose}>
              X
            </Button>
          </Modal.Header>
          <Modal.Body>
            {showForgotPasswordForm ? (
              <div>
                <h4>Forgot Password?</h4>
                <p>Enter your email to receive a password reset link.</p>
                <Form onSubmit={this.handleForgotPasswordSubmit}>
                  <FormGroup controlId="email">
                    <FormLabel>Email</FormLabel>
                    <FormControl type="email" placeholder="Enter email" onChange={this.handleEmailChange} />
                  </FormGroup>
                  <Button variant="primary" type="submit" block>
                    Reset Password
                  </Button>
                </Form>
              </div>
            ) : (
              <div>
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup controlId="email">
                    <FormLabel>Email</FormLabel>
                    <FormControl type="email" placeholder="Enter email" onChange={this.handleEmailChange} />
                  </FormGroup>
                  <FormGroup controlId="password">
                    <FormLabel>Password</FormLabel>
                    <FormControl type="password" placeholder="Password" onChange={this.handlePasswordChange} />
                  </FormGroup>
                  {this.state.error && <p className="error-message">{this.state.error}</p>}
                  <Button className="loginButton" variant="primary" type="submit" block>
                    Log In
                  </Button>
                </Form>
                <div className="forgot-password-link">
                  <Button variant="link" onClick={this.handleForgotPassword}>
                    Forgot Password?
                  </Button>
                </div>
              </div>
            )}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default LoginModal;