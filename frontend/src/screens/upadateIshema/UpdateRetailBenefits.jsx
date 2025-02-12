import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import CheckOutRetailSteps from "../../component/CheckOutRetailSteps";


const benefitOptions = [
  {
    value: "1",
    label:
      "All outpatient, dental, and optical claims shall be payable subject to 10% copay by the member.",
  },
  {
    value: "2",
    label: "Inpatient and maternity claims are covered 100% by insurer.",
  },
  {
    value: "3",
    label: "New staff/dependent shall be added at prorated annual price.",
  },
  {
    value: "4",
    label:
      "Invoice of additional staff should be paid Max in 15 days after receiving the Invoice.",
  },
  {
    value: "5",
    label:
      "Resigned staff shall be allowed prorated refund premium provided they have not lodged any claim.",
  },
  {
    value: "6",
    label:
      "Road and Air ambulance within the country for life threatening cases will be covered on reimbursement basis.",
  },
  {
    value: "7",
    label:
      "Pathology, X-ray, Ultrasound, ECG and Computerized Tomography, MRI Scans.",
  },
  { value: "8", label: "HIV/AIDS and related ailments." },
  { value: "9", label: "Circumcision for children under 13 years." },
  { value: "10", label: "Routine Immunization for children." },
  { value: "11", label: "Family Planning limited to Rwf 20,000 per visit." },
  { value: "12", label: "ICU/HDU and Theatre charges." },
  { value: "13", label: "Congenital Malformation is covered." },
  { value: "14", label: "Psychiatric cases covered." },
  {
    value: "15",
    label:
      "Hospital accommodation for accompanying parent and/or guardian for hospitalized children below 12 years.",
  },
  {
    value: "16",
    label: "Vaccine for Hepatitis B maximum Rwf 30,000 per patient.",
  },
  {
    value: "17",
    label:
      "Reimbursement shall be done where no providers exist within the geographical scope.",
  },
  {
    value: "18",
    label: "Free worldwide travel insurance to all insured members.",
  },
];
const UpdateRetailBenefits = () => {
    const params = useParams()
        const {id:retailId}=params
  const { state, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedRetailBenefits, setSelectedOptions] = useState(benefitOptions.map(option => ({ label: option.label, value: option.value })));
  const [newBenefitInput, setNewBenefitInput] = useState("");

  useEffect(() => {
    const savedOptions = localStorage.getItem("selectedBenefits");
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
      setSelectedOptions([...selectedRetailBenefits, newBenefit]);
      setNewBenefitInput("");
    }
  };

  const handleSubmit = () => {
    localStorage.setItem("selectedRetailBenefits", JSON.stringify(selectedRetailBenefits));
    dispatch({ type: "SET_SELECTED_RETAIL_BENEFITS", payload: selectedRetailBenefits });
    console.log("Selected Retail Benefits:", selectedRetailBenefits);
    navigate(`/updateRetail/${retailId}`);
  };

  return (
    <div>
      <CheckOutRetailSteps step1 step2 step3 step4 step5 step6 step7  />
      <Container>
        <Row className="my-4">
          <Col>
            <Form>
              <Form.Group controlId="benefitSelect">
                <Form.Label>Select Benefits</Form.Label>
                <Select
                  isMulti
                  options={benefitOptions}
                  value={selectedRetailBenefits}
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
};

export default UpdateRetailBenefits;


