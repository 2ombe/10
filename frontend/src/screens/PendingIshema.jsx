import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container } from 'react-bootstrap';

const PendingQuotations = () => {
  const [quotations, setQuotations] = useState([]);

  useEffect(() => {
    const fetchPendingQuotations = async () => {
      try {
        const response = await axios.get('/api/quotations/status/pending');
        setQuotations(response.data);
      } catch (error) {
        console.error('Error fetching pending quotations:', error);
      }
    };

    fetchPendingQuotations();
  }, []);

  return (
    <Container>
      <h1>Pending Quotations</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Plan</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {quotations.map((quotation) => (
            <tr key={quotation._id}>
              <td>{quotation._id}</td>
              <td>{quotation.plan}</td>
              <td>{quotation.status}</td>
              <td>
                <a href={`/quotation/${quotation._id}`} className="btn btn-primary">
                  View
                </a>
                <a href={`/quotation/update/${quotation._id}`} className="btn btn-secondary ml-2">
                  Update
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

module.exports=PendingQuotations
