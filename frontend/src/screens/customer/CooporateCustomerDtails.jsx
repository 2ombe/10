import React, { useState, useEffect } from 'react';
import { Form, Button, Table, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CooporateCustomerDetails = () => {
    const {id}=useParams()
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


  

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Create a company
    const handleCreateCompany = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/cooporateDetails', formData);
          
            setFormData({
                salutation: '',
                CUSTOMER_ID:id,
                institutionName: '',
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
        } catch (error) {
            console.error('Error creating company:', error);
        }
    };

   



    return (
        <div className="container mt-5">
            <h2>Company Management</h2>
            <Form onSubmit={handleCreateCompany}>
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
                <Button variant="primary" type="submit">Create Company</Button>
            </Form>
         
        </div>
    );
};

export default CooporateCustomerDetails;
