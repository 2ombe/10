// src/components/RegisterForm.js
import React, { useContext, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import {  useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const RegisterForm = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'assistant_underwriter'
  });
  const { register } = useContext(AuthContext);
  const navigate= useNavigate()

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(userData);
    navigate('/quotation-form');
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>Register</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={userData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={userData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={userData.password}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicRole">
              <Form.Label>Role</Form.Label>
              <Form.Control as="select" name="role" value={userData.role} onChange={handleChange}>
                <option value="assistant_underwriter">Assistant Underwriter</option>
                <option value="underwriter">Underwriter</option>
                <option value="senior_underwriter">Senior Underwriter</option>
                <option value="medical_manager">Medical Manager</option>
                <option value="operational_manager">Operational Manager</option>
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterForm;
