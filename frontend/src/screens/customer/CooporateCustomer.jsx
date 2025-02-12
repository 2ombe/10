import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Alert, Button, Card, Col, Container, Form, Modal, Row, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

function CooporateCustomer() {
  const {id}=useParams()
const [customer, setCustomer] = useState(null);
 const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [error, setError] = useState(null);
 const [formData, setFormData] = useState({
        salutation: '',
        institutionName: '',
        CUSTOMER_ID:id,
        registrationNumber: '',
        tin: '',
        countryOfRegistration: '',
        dateOfRegistration: '',
        telephoneNumber: '',
        email: '',
        postOffice: '',
        town: '',
        corporateCategory: ''
    });
    const [showModal, setShowModal] = useState(false);
  // Fetch all companies
  const fetchCompanies = async () => {
    try {
        const response = await axios.get(`/api/cooporateDetails/${id}`);
        setCustomer(response.data);
    } catch (error) {
        setError(error.response ? error.response.data.message : "An error occurred");
    }finally {
        setLoading(false);
      }
};
    useEffect(() => {
        fetchCompanies();
        
      }, [id]);
      console.log(customer);

    

      // Update a company
    const handleUpdateCompany = async () => {
        try {
            await axios.put(`/api/cooporateDetails/${id}`, formData);
            fetchCompanies();
            setShowModal(false);
        } catch (error) {
            console.error('Error updating company:', error);
        }
    };
 const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
     // Handle selecting a company to view/edit
    const handleSelectCompany = (customer) => {
        setSelectedCompany(customer);
        setFormData(customer);
        setShowModal(true);
    };

   // Delete a company
    const handleDeleteCompany = async (id) => {
        try {
            await axios.delete(`/api/cooporateDetails/${id}`);
            fetchCompanies();
        } catch (error) {
            console.error('Error deleting company:', error);
        }
    };
 if (loading) {
    return <Spinner animation="border" variant="primary" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!customer) {
    return <Alert variant="warning">Customer not found</Alert>;
  }
  return (
  <Container className="my-5">
      <Card>
        <Card.Header as="h4">Company Details</Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col md={4}><strong>Salutation:</strong></Col>
            <Col md={8}>{customer.salutation}</Col>
          </Row>
          <Row className="mb-3">
            <Col md={4}><strong>Institution Name:</strong></Col>
            <Col md={8}>{customer.institutionName}</Col>
          </Row>
          <Row className="mb-3">
            <Col md={4}><strong>Registration Number:</strong></Col>
            <Col md={8}>{customer.registrationNumber}</Col>
          </Row>
          <Row className="mb-3">
            <Col md={4}><strong>TIN:</strong></Col>
            <Col md={8}>{customer.tin}</Col>
          </Row>
          <Row className="mb-3">
            <Col md={4}><strong>Country of Registration:</strong></Col>
            <Col md={8}>{customer.countryOfRegistration}</Col>
          </Row>
          <Row className="mb-3">
            <Col md={4}><strong>Date of Registration:</strong></Col>
            <Col md={8}>{new Date(customer.dateOfRegistration).toLocaleDateString()}</Col>
          </Row>
          <Row className="mb-3">
            <Col md={4}><strong>Telephone Number:</strong></Col>
            <Col md={8}>{customer.telephoneNumber}</Col>
          </Row>
          <Row className="mb-3">
            <Col md={4}><strong>Email:</strong></Col>
            <Col md={8}>{customer.email}</Col>
          </Row>
          <Row className="mb-3">
            <Col md={4}><strong>Post Office:</strong></Col>
            <Col md={8}>{customer.postOffice || "N/A"}</Col>
          </Row>
          <Row className="mb-3">
            <Col md={4}><strong>Town:</strong></Col>
            <Col md={8}>{customer.town}</Col>
          </Row>
          <Row className="mb-3">
            <Col md={4}><strong>Corporate Category:</strong></Col>
            <Col md={8}>{customer.corporateCategory}</Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <Row>
<Col>
          <Button variant="success" onClick={() => navigate("/welcome")}>Go Back</Button>
</Col>
<Col>
<Button variant="info" onClick={() => handleSelectCompany(customer)}>Edit</Button>{' '}
                               
</Col>
<Col>
 <Button variant="danger" onClick={() => handleDeleteCompany(customer._id)}>Delete</Button>
</Col>
          </Row>
        </Card.Footer>
      </Card>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Company</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                      
                <Form.Group className="mb-3">
                    <Form.Label>Salutation</Form.Label>
                    <Form.Control type="text" name="salutation" value={formData.salutation} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Institution Name</Form.Label>
                    <Form.Control type="text" name="institutionName" value={formData.institutionName} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Registration Number</Form.Label>
                    <Form.Control type="text" name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>TIN</Form.Label>
                    <Form.Control type="text" name="tin" value={formData.tin} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Country of Registration</Form.Label>
                    <Form.Control type="text" name="countryOfRegistration" value={formData.countryOfRegistration} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Date of Registration</Form.Label>
                    <Form.Control type="date" name="dateOfRegistration" value={formData.dateOfRegistration} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Telephone Number</Form.Label>
                    <Form.Control type="text" name="telephoneNumber" value={formData.telephoneNumber} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Post Office</Form.Label>
                    <Form.Control type="text" name="postOffice" value={formData.postOffice} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Town</Form.Label>
                    <Form.Control type="text" name="town" value={formData.town} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Corporate Category</Form.Label>
                    <Form.Control as="select" name="corporateCategory" value={formData.corporateCategory} onChange={handleChange} required>
<option>--Select corporate category--</option>
<option value="Micro Enterprises">Micro Enterprises</option>
<option value="Small Enterprises">Small Enterprises</option>
<option value="Medium Enterprises">Medium Enterprises</option>
<option value="Large Enterprises">Large Enterprises</option>
<option value="Retail or Individuals">Retail or Individuals</option>
<option value="NGOs, charity/welfare organisations">NGOs, charity/welfare organisations</option>
<option value="Business Groups/Community">Business Groups/Community</option>
                    </Form.Control>
                </Form.Group>
             
                    <Button variant="success" onClick={handleUpdateCompany}>Update</Button>
                </Modal.Body>
            </Modal>
    </Container>
  );
};

export default CooporateCustomer
