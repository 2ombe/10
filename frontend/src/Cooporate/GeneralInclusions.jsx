import React, { useContext, useEffect, useState } from 'react'
import Select from "react-select";
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import CheckOutCooporateSteps from '../component/CheckOutCooporateSteps';

const generalInclusionbenefits = [
  {
    value: "1",
    label: "Alcohol and Substance Abuse.",
  },
  {
    value: "2",
    label: "Infertility and impotence treatment and related investigations.",
  },
  {
    value: "3",
    label: "Weight management treatments and drugs.",
  },
  {
    value: "4",
    label: "Plano glasses.",
  },
  {
    value: "5",
    label: "Allergy tests other than blood tests.",
  },
  {
    value: "6",
    label: "Cosmetic Treatments.",
  },
  {
    value: "7",
    label: "Nutritional supplements unless prescribed as part of medical treatment of specified conditions.",
  },
  {
    value: "8",
    label: "Self-referred or self-prescribed treatment.",
  },
  {
    value: "9",
    label: "Treatment outside the appointed panel of service providers (unless pre-authorized or where there is no provider).",
  },
  {
    value: "10",
    label: "Vitamins unless part of medical treatment.",
  },
  {
    value: "11",
    label: "Alternative (acupuncture, chiropractor, homoeopathy etc.) and herbal medicine.",
  },
  {
    value: "12",
    label: "Diagnostic equipment (e.g., Glucometers, BP machines etc.) and hearing aids.",
  },
  {
    value: "13",
    label: "Experimental treatment.",
  },
  {
    value: "14",
    label: "Maternity claims for children.",
  },
  {
    value: "15",
    label: "External surgical appliances except short-term use (maximum 6 weeks). Orthopedic shoes, wheelchairs, and others for long-term use are excluded.",
  },
  {
    value: "16",
    label: "Expenses incurred for medicines, vitamins, lotions, cosmetics, cold remedies, etc., that are available over the counter.",
  },
  {
    value: "17",
    label: "Pandemics, epidemics, natural disasters, and unknown illnesses covering a wide geographical area.",
  },
  {
    value: "18",
    label: "Underground mining.",
  },
  {
    value: "19",
    label: "Accidents/injuries related to professional sports.",
  },
  {
    value: "20",
    label: "Crowns, bridges, orthodontics, dentures, and self-prescribed scaling.",
  },
  {
    value: "21",
    label: "Claims incurred outside the benefit scope.",
  },
  {
    value: "22",
    label: "Claims incurred above the limit.",
  },
  {
    value: "23",
    label: "Benefits not specified in the policy and/or the quotation.",
  },
];
function GeneralInclusions() {
    const {  dispatch } = useContext(AuthContext);
    const navigate = useNavigate();
    const [selectedBenefits, setSelectedOptions] = useState(generalInclusionbenefits.map(option => ({ label: option.label, value: option.value })));
    const [newBenefitInput, setNewBenefitInput] = useState("");
  
    useEffect(() => {
      const savedOptions = localStorage.getItem("generalInclusionBenefits");
      if (savedOptions) {
        setSelectedOptions(JSON.parse(savedOptions));
      }
    }, []);
  
    const handleSelectChange = (selected) => {
      setSelectedOptions(selected);
    };
  
    const handleAddNewBenefit = () => {
      if (newBenefitInput.trim() !== "") {
        const newBenefit = { label: newBenefitInput, value: newBenefitInput };
        setSelectedOptions([...selectedBenefits, newBenefit]);
        setNewBenefitInput("");
      }
    };
  
    const handleSubmit = () => {
      localStorage.setItem("generalInclusionBenefits", JSON.stringify(selectedBenefits));
      dispatch({ type: "SET_GENERAL_INCLUSION_BENEFITS", payload: selectedBenefits });
      console.log("Selected Benefits:", selectedBenefits);
      navigate("/cooporate");
    };
  
    return (
      <div>
        <CheckOutCooporateSteps step1 step2 step3 step4 step5 step6 step7 />
        <Container className='small-container'>
          <Row className="my-4">
            <Col>
              <Form>
                <Form.Group controlId="benefitSelect">
                  <Form.Label>Select General exclusion Benefits</Form.Label>
                  <Select
                    isMulti
                    options={generalInclusionbenefits}
                    value={selectedBenefits}
                    onChange={handleSelectChange}
                    placeholder="Select benefits..."
                  />
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <Row className="my-4">
            <Col>
              <Form.Group controlId="newBenefitInput">
                <Form.Label>Add New Benefit</Form.Label>
                <Form.Control
                  type="text"
                  value={newBenefitInput}
                  onChange={(e) => setNewBenefitInput(e.target.value)}
                  placeholder="Enter new benefit..."
                />
              </Form.Group>
              <Button style={{marginTop:"2rem"}} variant="success" onClick={handleAddNewBenefit}>
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
}

export default GeneralInclusions
