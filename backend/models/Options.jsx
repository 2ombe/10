import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Select from "react-select";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import CheckOutCooporateSteps from "../component/CheckOutCooporateSteps";

const benefitOptions = [
  {
    option: "OPTION 1",
    Locations: ["EAST AFRICA", "INDIA"],
    description: "Comprehensive health coverage for employees.",
  },
  {
    option: "OPTION 2",
    Locations: ["Rwanda"],
    description: "wide access to all our providers.",
  },
];

const ProvidedOption = () => {
  const { state, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const [selectedBenefits, setSelectedBenefits] = useState([]);
  const [newOptionInput, setNewOptionInput] = useState("");
  const [newLocationsInput, setNewLocationsInput] = useState("");
  const [newDescriptionInput, setNewDescriptionInput] = useState("");

  useEffect(() => {
    const savedBenefits = localStorage.getItem("selectedBenefits");
    if (savedBenefits) {
      setSelectedBenefits(JSON.parse(savedBenefits));
    }
  }, []);

  const handleSelectChange = (selected) => {
    setSelectedBenefits(selected.map((item) => benefitOptions.find((opt) => opt.option === item.value)));
  };

  const handleAddNewBenefit = () => {
    if (newOptionInput.trim() && newLocationsInput.trim() && newDescriptionInput.trim()) {
      const newBenefit = {
        option: newOptionInput,
        Locations: newLocationsInput.split(",").map((loc) => loc.trim()),
        description: newDescriptionInput,
      };
      setSelectedBenefits([...selectedBenefits, newBenefit]);
      setNewOptionInput("");
      setNewLocationsInput("");
      setNewDescriptionInput("");
    }
  };

  const handleSubmit = () => {
    localStorage.setItem("selectedBenefits", JSON.stringify(selectedBenefits));
    dispatch({ type: "SET_SELECTED_OPTION", payload: selectedBenefits });
    console.log("Selected Benefits:", selectedBenefits);
    navigate("/corpDentalBenefits");
  };

  const selectOptions = benefitOptions.map((option) => ({
    value: option.option,
    label: `${option.option} (${option.Locations.join(", ")})`,
  }));

  return (
    <div>
      <CheckOutCooporateSteps step1 step2 step3 step4 step5 step6 step7 />
      <Container>
        <Row className="my-4">
          <Col>
            <Form>
              <Form.Group controlId="benefitSelect">
                <Form.Label>Select Benefits</Form.Label>
                <Select
                  isMulti
                  options={selectOptions}
                  onChange={handleSelectChange}
                  placeholder="Select benefits..."
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row className="my-4">
          <Col>
            <Form.Group controlId="newOptionInput">
              <Form.Label>New Option</Form.Label>
              <Form.Control
                type="text"
                value={newOptionInput}
                onChange={(e) => setNewOptionInput(e.target.value)}
                placeholder="Enter option name..."
              />
            </Form.Group>
            <Form.Group controlId="newLocationsInput">
              <Form.Label>Locations (comma-separated)</Form.Label>
              <Form.Control
                type="text"
                value={newLocationsInput}
                onChange={(e) => setNewLocationsInput(e.target.value)}
                placeholder="Enter locations..."
              />
            </Form.Group>
            <Form.Group controlId="newDescriptionInput">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={newDescriptionInput}
                onChange={(e) => setNewDescriptionInput(e.target.value)}
                placeholder="Enter description..."
              />
            </Form.Group>
            <Button style={{ marginTop: "2rem" }} variant="success" onClick={handleAddNewBenefit}>
              Add New Benefit
            </Button>
          </Col>
        </Row>
        <Row className="my-4">
          <Col>
            <Button variant="success" onClick={handleSubmit}>
              Save And Continue
            </Button>
          </Col>
          <Col>
            <Button variant="success" onClick={() => navigate("/cooporateMaternity")}>
              Back
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProvidedOption;
