import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { customAlphabet } from "nanoid";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CheckOutCooporateSteps from "../component/CheckOutCooporateSteps";

const CompanyRegistration = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const nanoid6 = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", 6)
  const id = nanoid6(); 

  const [formData, setFormData] = useState({
    CUSTOMER_ID:`OM/RW/Co-${id}`,
    salutation: "",
    institutionName: "",
    tin: "",
    countryOfRegistration: "",
    dateOfRegistration: "",
    telephoneNumber: "",
    email: "",
    postOffice: "",
    town: "",
    corporateCategory: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    try {
      localStorage.setItem("companyInfo", JSON.stringify(formData));
      dispatch({ type: "SET_COMPANY_INFO", payload: formData });
      console.log("Company Info saved:", formData);
      setFormData({
        CUSTOMER_ID:`OM/RW/co-${id}`,
        salutation: "",
        institutionName: "",
        tin: "",
        countryOfRegistration: "",
        dateOfRegistration: "",
        telephoneNumber: "",
        email: "",
        postOffice: "",
        town: "",
        corporateCategory: "",
      });
      navigate("/brockers");
    } catch (error) {
      console.log("Error saving company info:", error);
    }
  };

  return (
    <div className="mt-3">
      <CheckOutCooporateSteps step1 />
      <Container className="small-container">
        <h2 className="mt-3">Add Corporate Info</h2>
        <Form onSubmit={handleRegister}>
          
          <Form.Group className="mb-3">
            <Form.Label>Institution Name</Form.Label>
            <Form.Control
              type="text"
              name="institutionName"
              value={formData.institutionName}
              onChange={handleChange}
              
            />
          </Form.Group>
         
          <Form.Group className="mb-3">
            <Form.Label>TIN</Form.Label>
            <Form.Control
              type="text"
              name="tin"
              value={formData.tin}
              onChange={handleChange}
              
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Country of Registration</Form.Label>
            <Form.Control
              type="text"
              name="countryOfRegistration"
              value={formData.countryOfRegistration}
              onChange={handleChange}
              
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date of Registration</Form.Label>
            <Form.Control
              type="date"
              name="dateOfRegistration"
              value={formData.dateOfRegistration}
              onChange={handleChange}
              
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Telephone Number</Form.Label>
            <Form.Control
              type="text"
              name="telephoneNumber"
              value={formData.telephoneNumber}
              onChange={handleChange}
              
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Post Office</Form.Label>
            <Form.Control
              type="text"
              name="postOffice"
              value={formData.postOffice}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Town</Form.Label>
            <Form.Control
              type="text"
              name="town"
              value={formData.town}
              onChange={handleChange}
              
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Corporate Category</Form.Label>
            <Form.Control
              as="select"
              name="corporateCategory"
              value={formData.corporateCategory}
              onChange={handleChange}
              
            >
              <option value="">--Select corporate category--</option>
              <option value="Micro Enterprises">Micro Enterprises</option>
              <option value="Small Enterprises">Small Enterprises</option>
              <option value="Medium Enterprises">Medium Enterprises</option>
              <option value="Large Enterprises">Large Enterprises</option>
              <option value="Retail or Individuals">Retail or Individuals</option>
              <option value="NGOs, charity/welfare organisations">
                NGOs, charity/welfare organisations
              </option>
              <option value="Business Groups/Community">
                Business Groups/Community
              </option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">Create Company</Button>
        </Form>
      </Container>
    </div>
  );
};

export default CompanyRegistration;
