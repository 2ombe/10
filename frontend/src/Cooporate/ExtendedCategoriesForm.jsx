import React, { useState, useContext } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CheckOutCooporateSteps from "../component/CheckOutCooporateSteps";
import { AuthContext } from "../context/AuthContext";


const ExtendedCategoriesForm = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext); 
  const [formData, setFormData] = useState({
    chronicPercentage: "",
    congenitalConditions: "",
    inpatientOphthalmology: "",
    inpatientDentalCover: "",
    validityPeriod: "",
    initiatedDiscount:0
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "SAVE_EXTENDED", payload: formData }); 
    navigate("/lastExpense");
  };

  return (
    <Container className="small-container mt-4">
      <CheckOutCooporateSteps step1 step2 step3 step4 step5 step6 step7 step8 step9 step10></CheckOutCooporateSteps>
      <h2>Extended Categories </h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="chronicPercentage">
          <Form.Label>Chronic condition percentage</Form.Label>
          <Form.Control
            type="number"
            name="chronicPercentage"
            value={formData.chronicPercentage}
            onChange={handleChange}
            
          />
        </Form.Group>

        <Form.Group controlId="congenitalConditions">
          <Form.Label>Congenital Conditions</Form.Label>
          <Form.Control
            type="number"
            name="congenitalConditions"
            value={formData.congenitalConditions}
            onChange={handleChange}
            
          />
        </Form.Group>

        <Form.Group controlId="inpatientOphthalmology">
          <Form.Label>Inpatient Ophthalmology</Form.Label>
          <Form.Control
            type="number"
            name="inpatientOphthalmology"
            value={formData.inpatientOphthalmology}
            onChange={handleChange}
            
          />
        </Form.Group>

        <Form.Group controlId="inpatientDentalCover">
          <Form.Label>Inpatient Dental Cover</Form.Label>
          <Form.Control
            type="number"
            name="inpatientDentalCover"
            value={formData.inpatientDentalCover}
            onChange={handleChange}
            
          />
        </Form.Group>

        <Form.Group controlId="validityPeriod">
          <Form.Label>Validity Period</Form.Label>
          <Form.Control
            type="text"
            name="validityPeriod"
            value={formData.validityPeriod}
            onChange={handleChange}
            
          />
        </Form.Group>
        <Form.Group controlId="initiateDiscount">
          <Form.Label>Initiate Discount</Form.Label>
          <Form.Control
            type="number"
            name="initiatedDiscount"
            value={formData.initiatedDiscount}
            onChange={handleChange}
            
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Save and Continue
        </Button>
      </Form>
    </Container>
  );
};

export default ExtendedCategoriesForm;