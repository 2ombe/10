import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container } from 'react-bootstrap';

const QuotationsList = () => {
  const [quotations, setQuotations] = useState([]);

  useEffect(() => {
    const fetchQuotations = async () => {
      try {
        const response = await axios.get('/api/quotations');
        setQuotations(response.data);
      } catch (error) {
        console.error('Error fetching quotations:', error);
      }
    };

    fetchQuotations();
  }, []);

  return (
    <Container>
      <h1>Quotations List</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Company</th>
            <th>Details</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {quotations.map((quotation) => (
            <tr key={quotation._id}>
              <td>{quotation._id}</td>
              <td>{quotation.company}</td>
              <td>{quotation.details}</td>
              <td>{quotation.status}</td>
              <td>
                <a href={`/quotation/${quotation._id}`} className="btn btn-primary">
                  View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default QuotationsList;
