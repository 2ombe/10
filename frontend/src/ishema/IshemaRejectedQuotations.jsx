
import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const IshemaRejectedQuotations = () => {
    const {state}=useContext(AuthContext)
    const {userInfo}=state
  const [quotations, setQuotations] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear()); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuotations = async () => {
      try {
        const response = await axios.get('/api/ishema/rejected', {
  headers: { Authorization: `Bearer ${userInfo.token}` },
  params: { month, year }
});
        setQuotations(response.data);
      } catch (error) {
        console.error("Error fetching quotations:", error);
      }
    };
    fetchQuotations();
  }, [month, year,userInfo]);


  const handleViewDetails = (quotationId) => {
    navigate(`/ishema/${quotationId}`);
  };

  return (
    <div>
      <h2>Rejected Ishema Quotations</h2>
      

      <Form style={{margin:"2rem"}} inline>
        <h3 style={{textAlign:"center"}}>Select date</h3>
          <Row>
            <Col>
        <Form.Group className="mr-2">
          <Form.Label>Month:</Form.Label>
          <Form.Control
            as="select"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i + 1}>
                {new Date(0, i).toLocaleString('en', { month: 'long' })}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
            </Col>
            <Col>
        <Form.Group>
          <Form.Label>Year:</Form.Label>
          <Form.Control
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            min="2000"
          />
        </Form.Group>
            </Col>
          </Row>
      </Form>

     
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Status</th>
            <th>Date Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {quotations.map((quotation) => (
            <tr key={quotation._id}>
              <td>{quotation.beneficiaryInfo.CUSTOMER_NAME}</td>
              <td>{quotation.status}</td>
              <td>{new Date(quotation.createdAt).toLocaleDateString()}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => handleViewDetails(quotation._id)}
                >
                  View Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default IshemaRejectedQuotations;
