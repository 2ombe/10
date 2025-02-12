import React, { useContext, useEffect, useState } from 'react';
import { Table, Form, Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const defaultValues = {
  'Bronze': {
    inpatientLimit: 25000,
    outpatientLimit: 25000,
    DentalLimit: 150000,
    opticalLimit: 150000,
    maternityLimit: 300000,
    principleAge: 25000,
    totalInpatientPremium: 0,
    totalOutpatientPremium: 0,
  },
  'Silver': {
    inpatientLimit: 45000,
    outpatientLimit: 45000,
    DentalLimit: 150000,
    opticalLimit: 150000,
    maternityLimit: 300000,
    principleAge: 45000,
    totalInpatientPremium: 0,
    totalOutpatientPremium: 0,
  },
  'Gold': {
    inpatientLimit: 60000,
    outpatientLimit: 60000,
    DentalLimit: 150000,
    opticalLimit: 150000,
    maternityLimit: 300000,
    principleAge: 60000,
    totalInpatientPremium: 0,
    totalOutpatientPremium: 0,
  },
  'Platinum': {
    inpatientLimit: 80000,
    outpatientLimit: 80000,
    DentalLimit: 150000,
    opticalLimit: 150000,
    maternityLimit: 300000,
    principleAge: 80000,
    totalInpatientPremium: 0,
    totalOutpatientPremium: 0,
  },
  // 'Platinum Plus': {
  //   inpatientLimit: 100000,
  //   outpatientLimit: 100000,
  //   DentalLimit: 150000,
  //   opticalLimit: 150000,
  //   maternityLimit: 300000,
  //   principleAge: 100000,
  //   totalInpatientPremium: 0,
  //   totalOutpatientPremium: 0,
  // },
};


const UpdateLowCost= () => {
  const { id } = useParams();
  const quotationId=id
  const navigate = useNavigate();
  const { state } = useContext(AuthContext);
  const { userInfo } = state;
  const [quotation, setQuotation] = useState(null);
  const [formData, setFormData] = useState({
    beneficiaryInfo: { name: '', address: '' },
    plan: '',
    discount: 1,
    members: [],
    options: {
      Bronze: { ...defaultValues.Bronze },
      Silver: { ...defaultValues.Silver },
      Gold: { ...defaultValues.Gold },
      Platinum: { ...defaultValues.Platinum },
      // "Platinum Plus": { ...defaultValues["Platinum Plus"] }
    },
    benefits: [],
    status: 'Waiting'
  });
  const [message, setMessage] = useState('');


  useEffect(() => {
    axios.get(`/api/lowcost/single/${id}`, {
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
            Bronze: { ...defaultValues.Bronze },
            Silver: { ...defaultValues.Silver },
            Gold: { ...defaultValues.Gold },
            Platinum: { ...defaultValues.Platinum },
            // "Platinum Plus": { ...defaultValues["Platinum Plus"] }
          },
          benefits: fetchedQuotation.benefits || [],
          status: fetchedQuotation.status || 'Waiting'
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [id, userInfo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

 

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/lowcost/update/${id}`, formData, {
      headers: { Authorization: `Bearer ${userInfo.token}` }
    })
      .then(response => {
        setMessage('lowcost Quotation updated successfully!');
        setTimeout(() => {
          navigate('/lowcostList');
        }, 2000);
      })
      .catch(error => {
        console.error('Error updating document:', error);
        setMessage('Error updating document');
      });
  };

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

  if (!quotation) return <p>Loading...</p>;

   return (
    <Container>
      <h1>Update Lowcost Quotation</h1>
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
                {Object.keys(defaultValues.Bronze).map((attribute, index) => (
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

export default UpdateLowCost;
