import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Modal } from 'react-bootstrap';

const CustomerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({});
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`/api/customers/${id}`);
        setCustomer(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCustomer();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(`/api/customers/${id}`, customer);
      alert('Customer updated successfully');
      setShowUpdateModal(false);
    } catch (error) {
      console.error(error);
      alert('Failed to update customer');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/customers/${id}`);
      alert('Customer deleted successfully');
      navigate('/customers');
    } catch (error) {
      console.error(error);
      alert('Failed to delete customer');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  return (
    <Container>
      <h2>Customer Details</h2>
      <Form>
        <Form.Group controlId="CUSTOMER_ID">
          <Form.Label>Customer ID</Form.Label>
          <Form.Control
            type="text"
            name="CUSTOMER_ID"
            value={customer.CUSTOMER_ID || ''}
            onChange={handleChange}
            disabled
          />
        </Form.Group>
        <Form.Group controlId="CUSTOMER_NAME">
          <Form.Label>Customer Name</Form.Label>
          <Form.Control
            type="text"
            name="CUSTOMER_NAME"
            value={customer.CUSTOMER_NAME || ''}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" onClick={() => setShowUpdateModal(true)}>
          Update Customer
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete Customer
        </Button>
      </Form>

      {/* Update Modal */}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to update this customer's information?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Confirm Update
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CustomerDetail;
