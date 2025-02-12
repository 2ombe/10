import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';

const UpdateQuotation = () => {
  const { id } = useParams();
  const [quotation, setQuotation] = useState({
    company: '',
    details: '',
    members: [],
    benefits: []
  });

  useEffect(() => {
    const fetchQuotation = async () => {
      try {
        const response = await axios.get(`/api/quotation/${id}`);
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
      const response = await axios.put(`/api/quotation/${id}`, quotation);
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
        <Form.Group controlId="company">
          <Form.Label>Company</Form.Label>
          <Form.Control
            type="text"
            name="company"
            value={quotation.company}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="details">
          <Form.Label>Details</Form.Label>
          <Form.Control
            type="text"
            name="details"
            value={quotation.details}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        {/* Add form controls for members and benefits as needed */}
        <Button variant="primary" type="submit">
          Update Quotation
        </Button>
      </Form>
    </Container>
  );
};

export default UpdateQuotation;
