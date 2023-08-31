import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function HomelessModal({ show, handleClose, handleSave }) {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [story, setStory] = useState('');
  const [needs, setNeeds] = useState('');
  const [email, setEmail] = useState('');

  const handleSaveClick = () => {
    const location = { city, state, country };

    // Split needs input into an array
    const needsArray = needs.split(',').map(item => item.trim());

    // Create the new homeless profile object
    const newHomelessProfile = {
      name,
      email,
      location,
      story,
      needs: needsArray,
      sponsor: null,
      photoURL: '/path-to-your-profile-pic.jpg',
    };

    handleSave(newHomelessProfile);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Are You Homeless? Create Your Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" value={name} onChange={e => setName(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="Enter your city" value={city} onChange={e => setCity(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="state">
            <Form.Label>State</Form.Label>
            <Form.Control type="text" placeholder="Enter your state" value={state} onChange={e => setState(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control type="text" placeholder="Enter your country" value={country} onChange={e => setCountry(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="story">
            <Form.Label>Your Story</Form.Label>
            <Form.Control as="textarea" rows={4} placeholder="Share your story" value={story} onChange={e => setStory(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="needs">
            <Form.Label>Needs (comma-separated)</Form.Label>
            <Form.Control type="text" placeholder="Enter your needs (e.g., Food, Shelter)" value={needs} onChange={e => setNeeds(e.target.value)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSaveClick}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default HomelessModal;