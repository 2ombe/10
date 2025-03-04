import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Form, Modal, Table } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

function AdminRole() {
    const { state } = useContext(AuthContext);
        const { userInfo } = state;
    const [users, setUsers] = useState([]);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
     const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
    });
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await axios
          .get("/api/auth",{
            headers:{Authorization:`Bearer ${userInfo.token}`}
          });
          setUsers(response.data);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };
      fetchUsers();
    }, [userInfo]);

    const handleUpdateClick = (user) => {
      setSelectedUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        password: "",
        role: user.role,
      });
      setShowUpdateModal(true);
    };
  
    const handleRegisterClick = () => {
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
      });
      setShowRegisterModal(true);
    };
  

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const isStrongPassword = (password) => {
      const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return strongPasswordRegex.test(password);
    };
  
    const handleUpdateSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.put(`/api/auth/${selectedUser._id}`, formData,{
          headers:{Authorization:`Bearer ${userInfo.token}`}
        });
       
        toast.success(response.data.message);
        setShowUpdateModal(false);
      
        const updatedUsers = await axios.get("/api/auth",{
          headers:{Authorization:`Bearer ${userInfo.token}`}
        });
        setUsers(updatedUsers.data);
      
      } catch (error) {
        console.error("Error updating user:", error);
        toast.error("Check if your password is strong")
      }
    };
  
   
    const handleRegisterSubmit = async (e) => {
      e.preventDefault();
      const { name, email, password, confirmPassword, role } = formData;
  
      
      if (!isStrongPassword(password)) {
        toast.error(
          "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
        );
        return;
      }
  
 
      if (password !== confirmPassword) {
        toast.error("Passwords do not match.");
        return;
      }
  
      try {
        const response = await axios.post("/api/auth/register", {
          name,
          email,
          password,
          role,
        },{
          headers:{Authorization:`Bearer ${userInfo.token}`}
        });
        toast.success("User registered successfully!");
        setShowRegisterModal(false);
        const updatedUsers = await axios.get("/api/auth",{
          headers:{Authorization:`Bearer ${userInfo.token}`}
        });
        setUsers(updatedUsers.data);
      } catch (error) {
        console.error("Error registering user:", error);
        toast.error("Failed to register user. Please check the input.");
      }
    };
    return (
        <div>
          <h2>User List</h2>
          <Button variant="success" onClick={handleRegisterClick} className="mb-3">
            Register New User
          </Button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <Button variant="primary" onClick={() => handleUpdateClick(user)}>
                      Update
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
    
          {/* Update User Modal */}
          <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Update User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Leave blank to keep current password"
                  />
                </Form.Group>
                <Form.Group controlId="role">
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    as="select"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="assistant_underwriter">Assistant Underwriter</option>
                    <option value="underwriter">Underwriter</option>
                    <option value="senior_underwriter">Senior Underwriter</option>
                    <option value="medical_manager">Medical Manager</option>
                    <option value="operational_manager">Operational Manager</option>
                    <option value="admin">Admin</option>
                  </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
    
          <Modal show={showRegisterModal} onHide={() => setShowRegisterModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Register New User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleRegisterSubmit}>
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
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="role">
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    as="select"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="assistant_underwriter">Assistant Underwriter</option>
                    <option value="underwriter">Underwriter</option>
                    <option value="senior_underwriter">Senior Underwriter</option>
                    <option value="medical_manager">Medical Manager</option>
                    <option value="operational_manager">Operational Manager</option>
                    <option value="admin">Admin</option>
                  </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Register
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      );
}

export default AdminRole
