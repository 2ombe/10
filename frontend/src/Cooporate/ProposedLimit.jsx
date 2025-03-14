import React, { useContext, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const AddLimitInfo = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const savedProposedLimit = {
    requestedInpatientLimit: "",
    requestedOutPatientLimit: "",
    requestedOpticalLimit: "",
    requestedDentalLimit: "",
    maternityLimit: "",
  };

  const [limitInfo, setLimitInfo] = useState(savedProposedLimit);

  const handleInputChange = (field, value) => {
    setLimitInfo((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      localStorage.setItem("limitInfo", JSON.stringify(limitInfo));
      dispatch({ type: "SET_LIMIT_INFO", payload: limitInfo });
      console.log("Limit Info saved:", limitInfo);
      toast.success("Data saved successfully!");
      navigate("/incooporate");
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while saving data.");
    }
  };

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="requestedInpatientLimit">
              <Form.Label>Select proposed inpatient limit</Form.Label>
              <Form.Control
                type="number"
                value={limitInfo.requestedInpatientLimit}
                onChange={(e) => handleInputChange("requestedInpatientLimit", e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="requestedOutPatientLimit">
              <Form.Label>Select proposed outpatient limit</Form.Label>
              <Form.Control
                type="number"
                value={limitInfo.requestedOutPatientLimit}
                onChange={(e) => handleInputChange("requestedOutPatientLimit", e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="requestedOpticalLimit">
              <Form.Label>Select proposed optical limit</Form.Label>
              <Form.Control
                type="number"
                value={limitInfo.requestedOpticalLimit}
                onChange={(e) => handleInputChange("requestedOpticalLimit", e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="requestedDentalLimit">
              <Form.Label>Select proposed dental limit</Form.Label>
              <Form.Control
                type="number"
                value={limitInfo.requestedDentalLimit}
                onChange={(e) => handleInputChange("requestedDentalLimit", e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="maternityLimit">
              <Form.Label>Select proposed maternity limit</Form.Label>
              <Form.Control
                type="number"
                value={limitInfo.maternityLimit}
                onChange={(e) => handleInputChange("maternityLimit", e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" style={{ marginTop: "1rem" }}>
              Save
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddLimitInfo;
