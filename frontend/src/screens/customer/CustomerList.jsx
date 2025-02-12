import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('/api/customers');
        setCustomers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <Container>
      <h2>Customer List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer._id}>
              <td>{customer.CUSTOMER_ID}</td>
              <td>{customer.CUSTOMER_NAME}</td>
              <td>
                <Button
                  variant="info"
                  onClick={() => navigate(`/customers/${customer._id}`)}
                >
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default CustomerList;
