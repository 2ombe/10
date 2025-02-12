import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { Container, Table, Spinner, Alert, Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const IshemaDetails = () => {
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
        `/api/ishema/${retailId}`,
        { status },
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      setMessage(data.message);
      setError(null);
    } catch (error) {
      console.log(error);
      setMessage('');
    } finally {
      setLoading(false);
    }
  };
  const downloadPDF = async () => {
    try {
      const response = await axios.get(`/api/ishema/${retailId}/download`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${response.data.beneficiaryInfo.name} Quotation.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      setError('Failed to download PDF');
    }
  };
  
  useEffect(() => {
    const fetchQuotation = async () => {
      try {
        const { data } = await axios.get(`/api/ishema/single/${retailId}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` }
        });
       
        setQuotation(data);
      } catch (error) {
        console.log(error);
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
console.log(quotation.createdBy);
  return (
    <Container>
      
      <h2>Ishema Quotation Details</h2>
      <Row>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Client Info</Card.Title>
              <Card.Text>
              <strong>Client Names:</strong> {quotation.beneficiaryInfo.CUSTOMER_NAME}
                <br />
                <strong>Client Address:</strong> {quotation.beneficiaryInfo.CUSTOMER_ID}
                <br />
               
              </Card.Text>
             
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
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{quotation.plan}</td>
            <td>{quotation.status}</td>
            <td>{new Date(quotation.createdAt).toLocaleDateString()}</td>
          </tr>
        </tbody>
      </Table>

      <h3>Members</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Type</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {quotation.members.map((member, index) => (
            <tr key={index}>
              <td>{member.type}</td>
              <td>{member.age}</td>
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
                <td>{option.basicPremium.toLocaleString()}</td>
                <td>{option.mituelleDeSante.toLocaleString()}</td>
                <td>{option.administrationFees.toLocaleString()}</td>
                <td>{option.totalPremium.toLocaleString()}</td>
              </tr>
              
              </>
            );
          })}
        </tbody>
      </Table>
      <Row>
<Col>
      <Button variant="success" onClick={() => navigate("/ishemaList")}>
        Back
      </Button>
</Col>
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}

{/* approval processes */}

      {userInfo&&(userInfo._id!==quotation.user._id&&userInfo.role==="senior_underwriter")&&(quotation.status!==("Rejected"||"Accepted"||"Approved"))&&(
        <>
      <Col>
      <Button variant="success" onClick={() => updateStatus('Approved')}>
        Approve
      </Button>
      </Col>
</>
      )}
      {userInfo&&(userInfo._id!==quotation.user._id&&userInfo.role==="senior_underwriter")&&(quotation.status!==("Rejected"||"Accepted"||"Block"))&&(
        <>
      <Col>
      <Button variant="danger" onClick={() => updateStatus('Block')}>
        Block
      </Button>
      </Col>
</>
      )}
      <Col>
      <Button variant='success' onClick={()=>navigate(`/ishemaInfo/${quotation._id}`)}>
                  Revise
                </Button>
    </Col>
      <Col>
      {userInfo&&(userInfo._id===quotation.user._id)&&(quotation.status!=="Block")&&(
        <Row>
     
   
    {quotation.status==="Approved"&&(
<>
    <Col>
    <Button variant="success" onClick={() => updateStatus('Accepted')}>
        Closed
      </Button>
    </Col>
    
    <Col>
    <Button variant="success" onClick={() => updateStatus('Rejected')}>
        Reject by client
      </Button>
    </Col>
</>
    )}
  
     
</Row>
      )}
                </Col>
      {userInfo&&(userInfo._id===quotation.user._id)&&(quotation.status==="Approved"||quotation.status==="Accepted")&&(
        <>
      <Col>

          <Button variant="info" onClick={downloadPDF}>Download PDF</Button>
        </Col>
        <Col>
        {customer!==null?(

  <Button variant="info" onClick={()=>navigate(`/customers/details/${retailId}`)}>Customer details</Button>
):(
  <Button variant="info" onClick={()=>navigate(`/customers/new/${retailId}`)}>Add customer Details</Button>
)}
        </Col>
        </>
      )}
      </Row>
    </Container>
  );
};

export default IshemaDetails;
