import React, { useContext, useEffect, useState } from 'react'
import Select from "react-select";
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import CheckOutCooporateSteps from '../../component/CheckOutCooporateSteps';

const generalInclusionbenefits = [
    {
      value: "1",
      label:
        "Infertility.",
    },
    {
      value: "2",
      label: "Alcohol and Substance Abuse.",
    },
    {
      value: "3",
      label: "Weight management treatments and drugs.",
    },
    {
      value: "4",
      label:
        "Cosmetic/plastic surgery and treatments.",
    },
    {
      value: "5",
      label:
        "Nutritional supplements unless prescribed as part of medical treatment of specified conditions.",
    },
    {
      value: "6",
      label:
        "Self-referred or self-prescribed treatment.",
    },
    {
      value: "7",
      label:
        "Treatment outside the appointed panel of service providers (unless pre- authorized).",
    },
    { value: "8", label: "Impotence drugs unless prescribed by a specialist Doctor." },
    { value: "9", label: "Alternative (acupuncture, chiropractor, homoeopathy etc) and herbal medicine." },
    { value: "10", label: "Diagnostic equipment (e.g. Glucometers, BP machines etc) and hearing aids. Such equipment’s are covered during hospitalization only." },
    { value: "11", label: "Experimental treatment." },
    { value: "12", label: "Maternity claims for children." },
    { value: "13", label: "External surgical appliances for term use (frames, wheelchairs). Short term use 6 weeks is covered." },
    { value: "14", label: "Claims incurred outside the benefit scope." },
    {
      value: "15",
      label:
        "Claims incurred above the limit.",
    },
    {
      value: "16",
      label: "Benefits not specified in the policy and or the quotation.",
    },
    {
      value: "17",
      label:
        "Plano glasses.",
    },
    {
      value: "18",
      label: "Pandemics and epidemics, natural disasters and unknown illnesses covering a wide geographical area with exception of covid 19 treatment as stated in the benefit highlights.",
    },
  ];
function UpdateGeneralInclusions() {
     const navigate = useNavigate();
      const { state, dispatch } = useContext(AuthContext);
        const { userInfo } = state;
                        const params = useParams()
                         const [loading, setLoading] = useState(true);
                                    const {id:corpotateId}=params
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
      navigate(`/updateCooporate/${corpotateId}`);
    };
  
    return (
      <div>
        <CheckOutCooporateSteps step1 step2 step3 step4 step5 step6 step7 />
        <Container className='small-container'>
          <Row className="my-4">
            <Col>
              <Form>
                <Form.Group controlId="benefitSelect">
                  <Form.Label>Select General Ixclusion Benefits</Form.Label>
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

export default UpdateGeneralInclusions
