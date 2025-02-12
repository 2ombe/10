import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CheckOutCooporateSteps from "../../component/CheckOutCooporateSteps";
import { AuthContext } from "../../context/AuthContext";

const benefitOptitalOptions = [
  {
    value: "1",
    label: "We shall provide an outpatient optical cover as a stand-alone benefit."
  },
  {
    value: "2",
    label:
      "This benefit caters for expenses related to eye treatment, including but not limited to correction of refractive errors and cost of glasses and frames. Frames shall be covered maximum 50% of the optical limit. Optical shops will prescribe glasses, but dispensing is done by another shop.",
  }
  
 
];
const UpdateCorporateOpticalBenefits = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { userInfo } = state;
                  const params = useParams()
                   const [loading, setLoading] = useState(true);
                              const {id:corpotateId}=params
  const navigate = useNavigate();
  const [selectedOpticalBenefits, setSelectedOpticalOptions] = useState(benefitOptitalOptions.map(option => ({ label: option.label, value: option.value })));
  const [newBenefitInput, setNewBenefitInput] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/cooporate/single/${corpotateId}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setSelectedOpticalOptions(data.selectedOpticalBenefits
        );
        
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [corpotateId,userInfo]);

  const handleSelectChange = (selected) => {
    setSelectedOpticalOptions(selected);
  };

  const handleAddNewBenefit = () => {
    if (newBenefitInput.trim() !== "") {
      const newBenefit = { label: newBenefitInput, value: newBenefitInput };
      setSelectedOpticalOptions([...selectedOpticalBenefits, newBenefit]);
      setNewBenefitInput("");
    }
  };

  const handleSubmit = () => {
    localStorage.setItem("selectedOpticalBenefits", JSON.stringify(selectedOpticalBenefits));
    dispatch({ type: "SET_OPTICAL_SELECTED_BENEFITS", payload: selectedOpticalBenefits });
    console.log("Selected Optical Benefits:", selectedOpticalBenefits);
    navigate(`/updateCooporate/${corpotateId}`);
  };

  return (
    <div>
      <CheckOutCooporateSteps step1 step2 step3 step4 step5 step6 step7 step8 step9/>
      <Container>
        <Row className="my-4">
          <Col>
            <Form>
              <Form.Group controlId="benefitSelect">
                <Form.Label>Select Optical Benefits</Form.Label>
                <Select
                  isMulti
                  options={benefitOptitalOptions}
                  value={selectedOpticalBenefits}
                  onChange={handleSelectChange}
                  placeholder="Select Optical benefits..."
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
                placeholder="Enter new optical benefit..."
              />
            </Form.Group>
            <Button style={{marginTop:"2rem"}} variant="success" onClick={handleAddNewBenefit}>
              Add New Optical Benefit
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

export default UpdateCorporateOpticalBenefits;


