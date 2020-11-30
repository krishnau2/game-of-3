import React, { useState } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const RegistrationForm = props => {
  const [user, setUser] = useState({});

  const _handleRegistrationFieldChange = e => {
    let newUser = { ...user };
    newUser[e.target.id] = e.target.value;
    setUser(newUser);
  };

  const _handleFormSubmit = () => {
    props.register(user);
  };

  const _renderGameStartingNumberField = () => {
    if (props.newGame) {
      return (
        <Form.Group controlId="startingNumber">
          <Form.Label>Starting Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Starting number"
            onChange={_handleRegistrationFieldChange}
          />
        </Form.Group>
      );
    } else {
      return null;
    }
  };

  return (
    <Modal {...props} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Registration
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            onChange={_handleRegistrationFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={_handleRegistrationFieldChange}
          />
        </Form.Group>
        {_renderGameStartingNumberField()}
        <Button onClick={_handleFormSubmit}>Create</Button>
      </Modal.Body>
    </Modal>
  );
};

export default RegistrationForm;
