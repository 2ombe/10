import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';

const UpdateQuotation = () => {
  const { id } = useParams();
  const [quotation, setQuotation] = useState({
    plan: '',
    members: [],
    options: {},
    status: 'Pending'
  });

  useEffect(() => {
    const fetchQuotation = async () => {
      try {
        const response = await axios.get(`/api/quotations/${id}`);
        setQuotation(response.data);
      } catch (error) {
        console.error('Error fetching quotation:', error);
      }
    };

    fetchQuotation();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuotation({ ...quotation, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/quotations/${id}`, quotation);
      console.log('Updated Quotation:', response.data);
      // Handle success (e.g., redirect to the quotations list)
    } catch (error) {
      console.error('Error updating quotation:', error);
    }
  };

  return (
    <Container>
      <h1>Update Quotation</h1>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group controlId="plan">
          <Form.Label>Plan</Form.Label>
          <Form.Control
            type="text"
            name="plan"
            value={quotation.plan}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        {/* Add form controls for members, options, and status */}
        <Form.Group controlId="status">
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="select"
            name="status"
            value={quotation.status}
            onChange={handleInputChange}
            required
          >
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Update Quotation
        </Button>
      </Form>
    </Container>
  );
};

export default UpdateQuotation;
