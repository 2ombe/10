import React, { useState, useContext } from "react";
import { Form, Button, Container} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import CheckOutCooporateSteps from "../../component/CheckOutCooporateSteps";

const UpdateExtendedCategoriesForm = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AuthContext);
    const { userInfo } = state;
                    const params = useParams()
                     const [loading, setLoading] = useState(true);
                                const {id:corpotateId}=params
   
  const [formData, setFormData] = useState({
    chronicPercentage: "",
    congenitalConditions: "",
    inpatientOphthalmology: "",
    inpatientDentalCover: "",
    inpatientTreatment: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "SAVE_EXTENDED", payload: formData }); 
    navigate(`/lastExpense/${corpotateId}`);
 
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
            type="text"
            name="congenitalConditions"
            value={formData.congenitalConditions}
            onChange={handleChange}
        
          />
        </Form.Group>

        <Form.Group controlId="inpatientOphthalmology">
          <Form.Label>Inpatient Ophthalmology</Form.Label>
          <Form.Control
            type="text"
            name="inpatientOphthalmology"
            value={formData.inpatientOphthalmology}
            onChange={handleChange}
         
          />
        </Form.Group>

        <Form.Group controlId="inpatientDentalCover">
          <Form.Label>Inpatient Dental Cover</Form.Label>
          <Form.Control
            type="text"
            name="inpatientDentalCover"
            value={formData.inpatientDentalCover}
            onChange={handleChange}
          
          />
        </Form.Group>

        <Form.Group controlId="inpatientTreatment">
          <Form.Label>Inpatient Treatment</Form.Label>
          <Form.Control
            type="text"
            name="inpatientTreatment"
            value={formData.inpatientTreatment}
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

export default UpdateExtendedCategoriesForm;