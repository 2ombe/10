import React, { useContext, useEffect, useState } from 'react';
import { Table, Form, Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const defaultValues = {
  'Option 1': {
    inpatientLimit: 25000,
    outpatientLimit: 25000,
    totalInpatientPremium: 0,
    totalOutpatientPremium: 0,
  },
  'Option 2': {
    inpatientLimit: 45000,
    outpatientLimit: 45000,
    totalInpatientPremium: 0,
    totalOutpatientPremium: 0,
  },
  'Option 3': {
    inpatientLimit: 60000,
    outpatientLimit: 60000,
    totalInpatientPremium: 0,
    totalOutpatientPremium: 0,
  },
  'Option 4': {
    inpatientLimit: 80000,
    outpatientLimit: 80000,
    totalInpatientPremium: 0,
    totalOutpatientPremium: 0,
  }
};

const UpdateIshema = () => {
   const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useContext(AuthContext);
  const { userInfo } = state;
  const [quotation, setQuotation] = useState(null);
const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    beneficiaryInfo: { name: '', address: '' },
    plan: '',
    discount: 1,
    members: [],
    options: {
      "Option 1": { ...defaultValues["Option 1"] },
      "Option 2": { ...defaultValues["Option 2"]},
      "Option 3": { ...defaultValues["Option 3"] },
      "Option 4": { ...defaultValues["Option 4"]},
 
    },
    benefits: [],
    status: 'Waiting'
  });

    useEffect(() => {
    axios.get(`/api/ishema/single/${id}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` }
    })
      .then(response => {
        const fetchedQuotation = response.data;
        setQuotation(fetchedQuotation);

        setFormData({
          beneficiaryInfo: fetchedQuotation.beneficiaryInfo || { name: '', address: '' },
          plan: fetchedQuotation.plan || '',
          discount: fetchedQuotation.discount || 1,
          members: fetchedQuotation.members || [],
          options: fetchedQuotation.options || {
            "Option 1": { ...defaultValues["Option 1"] },
            "Option 2": { ...defaultValues["Option 2"] },
            "Option 3": { ...defaultValues["Option 3"] },
            "Option 4": { ...defaultValues["Option 4"]},
          },
          benefits: fetchedQuotation.benefits || [],
          status: fetchedQuotation.status || 'Waiting'
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [id, userInfo]);


  
  const handleOptionChange = (e, option, field) => {
    setFormData({
      ...formData,
      options: {
        ...formData.options,
        [option]: {
          ...formData.options[option],
          [field]: parseFloat(e.target.value),
        },
      },
    });
  };

   const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/ishema/ishemaQuotation/${id}`, formData, {
      headers: { Authorization: `Bearer ${userInfo.token}` }
    })
      .then(response => {
        setMessage('Retail Quotation updated successfully!');
        setTimeout(() => {
          navigate('/ishemaList');
        }, 2000);
      })
      .catch(error => {
        console.error('Error updating document:', error);
        setMessage('Error updating document');
      });
  };



  if (!quotation) return <p>Loading...</p>;

  return (
    <Container>
      <h1>Update Ishema Quotation</h1>
      {message && <Alert variant="info">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Client Info</Card.Title>
              <Card.Text>
                <strong>Client Names:</strong> {formData.beneficiaryInfo.name}
                <br />
                <strong>Client Address:</strong> {formData.beneficiaryInfo.address}
              </Card.Text>
            </Card.Body>
          </Card>
        </Row>
        <Row>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Benefits</Card.Title>
              <Card.Text>
                {formData.benefits.length === 0 ? (
                  <p>No benefits selected.</p>
                ) : (
                  <ul>
                    {formData.benefits.map((benefit, index) => (
                      <li key={index}>{benefit.label}</li>
                    ))}
                  </ul>
                )}
              </Card.Text>
            </Card.Body>
          </Card>
        </Row>
        <Row className="justify-content-md-center">
          <Col md={12}>
            <Table bordered>
              <thead>
                <tr>
                  <th></th>
                  {Object.keys(defaultValues).map(option => (
                    <th key={option}>{option}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.keys(defaultValues["Option 1"]).map((attribute, index) => (
                  <tr key={index}>
                    <td>{attribute.replace(/([A-Z])/g, ' $1').toUpperCase()}</td>
                    {Object.keys(defaultValues).map(option => (
                      <td key={option}>
                        <Form.Control
                          type="number"
                          name={attribute}
                          value={formData.options[option][attribute]}
                          onChange={(e) => handleOptionChange(e, option, attribute)}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button variant="primary" type="submit" className="mt-3">
              Update Quotation
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default UpdateIshema;
