import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import CheckOutCooporateSteps from "../../component/CheckOutCooporateSteps";


const benefitDentalOptions = [
  {
    value: "1",
    label:
      "Extraction.",
  },
  {
    value: "2",
    label: "Scaling necessitated by a medical condition and prescribed by our appointed dentist once a year",
  },
  {
    value: "3",
    label: "Extraction (normal or non-surgical extractions)",
  },
  {
    value: "4",
    label:
      "Examinations",
  },
  {
    value: "5",
    label:
      "Root canal treatment",
  },
  {
    value: "6",
    label:
      "Normal compound fillings",
  },
  {
    value: "7",
    label:
      "Removal of roots",
  },
  { value: "8", label: "Apicectomy" },
  { value: "9", label: "Removal of solid odontomas" },
  { value: "10", label: "Removal of impacted tooth buried or unerupted teeth." },
  { value: "11", label: "Scaling necessitated by a medical condition and prescribed by our appointed dentist once a year." },
  { value: "12", label: "Crowns, bridges, orthodontics, dentures and Self-prescribed scaling are excluded from this benefit." }
];
const UpdateCorporateDentalBenefits = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { userInfo } = state;
                const params = useParams()
                 const [loading, setLoading] = useState(true);
                            const {id:corpotateId}=params
  const navigate = useNavigate();
  const [selectedDentalBenefits, setSelectedDentalOptions] = useState(benefitDentalOptions.map(option => ({ label: option.label, value: option.value })));
  const [newBenefitInput, setNewBenefitInput] = useState("");

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/cooporate/single/${corpotateId}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        selectedDentalBenefits(data.selectedDentalBenefits);
        console.log(data.selectedDentalBenefits);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [corpotateId,userInfo]);

  const handleSelectChange = (selected) => {
    setSelectedDentalOptions(selected);
  };

  const handleAddNewBenefit = () => {
    if (newBenefitInput.trim() !== "") {
      const newBenefit = { label: newBenefitInput, value: newBenefitInput };
      setSelectedDentalOptions([...selectedDentalBenefits, newBenefit]);
      setNewBenefitInput("");
    }
  };

  const handleSubmit = () => {
    localStorage.setItem("selectedDentalBenefits", JSON.stringify(selectedDentalBenefits));
    dispatch({ type: "SET_DENTAL_SELECTED_BENEFITS", payload: selectedDentalBenefits });
    console.log("Selected Dental Benefits:", selectedDentalBenefits);
    navigate(`/UpdateCorpOpticalBenefits/${corpotateId}`);
  };

  return (
    <div>
      <CheckOutCooporateSteps step1 step2 step3 step4 step5 step6 step7 step8 />
      <Container>
        <Row className="my-4">
          <Col>
            <Form>
              <Form.Group controlId="benefitSelect">
                <Form.Label>Select Dental Benefits</Form.Label>
                <Select
                  isMulti
                  options={benefitDentalOptions}
                  value={selectedDentalBenefits}
                  onChange={handleSelectChange}
                  placeholder="Select dental benefits..."
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
                placeholder="Enter new dental benefit..."
              />
            </Form.Group>
            <Button style={{marginTop:"2rem"}} variant="success" onClick={handleAddNewBenefit}>
              Add New Dental Benefit
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

export default UpdateCorporateDentalBenefits;


