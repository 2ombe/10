import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { Container, Table, Spinner, Alert, Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const RetailDetails = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const params = useParams();
  const { state } = useContext(AuthContext);
  const { userInfo } = state;
  const { id: retailId } = params;
  const [quotation, setQuotation] = useState(null);
  const [customer,setCustomer]=useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const updateStatus = async (status) => {
    setLoading(true);
    try {
      const { data } = await axios.put(
        `/api/retail/${retailId}`,
        { status },
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      setMessage(data.message);
      setError(null);
    } catch (error) {
      setError('Failed to update status',error);
      setMessage('');
    } finally {
      setLoading(false);
    }
  };
  const downloadPDF = async () => {
    try {
      const response = await axios.get(`/api/retail/${retailId}/download`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${retailId} Quotation.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(error);
      setError('Failed to download PDF');
    }
  };
  
  useEffect(() => {
    const fetchQuotation = async () => {
      try {
        const { data } = await axios.get(`/api/retail/single/${retailId}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` }
        });
        setQuotation(data);
      } catch (error) {
        setError('Failed to fetch quotation');
      } finally {
        setLoading(false);
      }
    };

    fetchQuotation();
  }, [userInfo, retailId]);

  useEffect(()=>{
    const fetchCustomerById=async()=>{
      try {
        
        const customer = await axios.get(`/api/customers/${retailId}`)
        setCustomer(customer.data)
      } catch (error) {
        console.log(error);
        
      }
    }
    fetchCustomerById()
  },[retailId])

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!quotation) {
    return <Alert variant="danger">No quotation found</Alert>;
  }

  return (
    <Container>
      
      <h2>Retail Quotation Details</h2>
      <Row>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Client Info</Card.Title>             
            </Card.Body>
          </Card>
        </Row>
      <Row>
      <Card className="mb-3">
            <Card.Body>
              <Card.Title>Selected Benefits</Card.Title>
              <Card.Text>
                {quotation.benefits.length === 0 ? (
                  <p>No benefits selected.</p>
                ) : (
                  <ul>
                    {quotation.benefits.map((benefit, index) => (
                      <li key={index}>{benefit.label}</li>
                    ))}
                  </ul>
                )}
              </Card.Text>
            </Card.Body>
          </Card>

      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Plan</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Total lives</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{quotation.plan}</td>
            <td>{quotation.status}</td>
            <td>{new Date(quotation.createdAt).toLocaleDateString()}</td>
            <td>{quotation.totalMembers}</td>
          </tr>
        </tbody>
      </Table>

      <Table striped bordered hover>
      <thead>
          <tr>

          <th>Principle Age Group</th>
          <th>Spause Age Group</th>
          </tr>
        </thead>
        <tbody>
          <tr>

          <td>{quotation.principalAgeGroup||""}</td>
          <td>{quotation.spouseAgeGroup||""}</td>
          </tr>
        </tbody>
        <h4>Children Info</h4>
        <thead>
          <tr>
            <th>Age Group</th>
            <th>Above 18</th>
          </tr>
        </thead>
        <tbody>
          {quotation.children.map((child, index) => (
            <tr key={index}>
              <td>{child.ageGroup||""}</td>
              <td>{child.above18 ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
        
      </Table>
  
      <h3>Options</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Option</th>
            <th>Total Inpatient Premium</th>
            <th>Total Outpatient Premium</th>
            <th>Dental Premium</th>
            <th>Optical Premium</th>
            <th>Maternity Premium</th>
            <th>Basic Premium</th>
            <th>Mituelle De Sante</th>
            <th>Administration Fees</th>
            <th>Total Premium</th>
          </tr>
        </thead>
        <tbody>
          {quotation.options && Object.keys(quotation.options).map((optionKey, index) => {
            const option = quotation.options[optionKey];
            return (
              <>
              <tr key={index}>
                <td>{optionKey}</td>
                <td>{option.totalInpatientPremium.toLocaleString()}</td>
                <td>{option.totalOutpatientPremium.toLocaleString()}</td>
                <td>{option.dentalPremium.toLocaleString()}</td>
                <td>{option.opticalPremium.toLocaleString()}</td>
                <td>{option.maternityPremium.toLocaleString()}</td>
                <td>{option.basicPremium.toLocaleString()}</td>
                <td>{option.mituelleDeSante.toLocaleString()}</td>
                <td>{option.administrationFees.toLocaleString()}</td>
                <td>{option.totalPremium.toLocaleString()}</td>
              </tr>
             <tr>
              
              </tr>
              </>
            );
          })}
        </tbody>
      </Table>
      <Row>
<Col>
      <Button variant="success" style={{marginBottom:"2rem"}} onClick={() => navigate("/retailList")}>
        Back
      </Button>
</Col>
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}


<Col>
      <Button variant='success' onClick={()=>navigate(`/retailInfo/${quotation._id}`)}>
                  Revise
                </Button>
    </Col>
      <Col>
      {userInfo&&(userInfo._id===quotation.user._id)&&(quotation.status!=="Block")&&(
        <Row>
     
    
</Row>
      )}
                </Col>
      {userInfo&&(userInfo._id)&&(

      <Col>

          <Button variant="success" onClick={downloadPDF}>Download PDF</Button>
        </Col>

      )}
      </Row>
    </Container>
  );
};

export default RetailDetails;
