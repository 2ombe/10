import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Container, Form, Modal, Table } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

function UpdateProfile() {
    const { state } = useContext(AuthContext);
        const { userInfo } = state;
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
     const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
      name: userInfo.name,
      email: userInfo.email,
      password: "",
      confirmPassword: "",
      role: userInfo.role,
    });
   

   
   
  

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
   
    const handleUpdateSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.put(`/api/auth/${selectedUser._id}`, formData,{
          headers:{Authorization:`Bearer ${userInfo.token}`}
        });
       
        toast.success(response.data.message);
        setShowUpdateModal(false);
      
       
      
      } catch (error) {
        console.error("Error updating user:", error);
        toast.error("Check if your password is strong")
      }
    };
  
   
    return (
        <Container className='small-container'>
          <h2>Update Profile</h2>
          
              <Form onSubmit={handleUpdateSubmit}>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Update with a strong password must contain 8 characters with a number, a capital letter and sign </Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Leave blank to keep current password"
                  />
                </Form.Group>
               
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </Form>
           
         
    
        
        </Container>
      );
}

export default UpdateProfile
