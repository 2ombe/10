import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { customAlphabet } from "nanoid";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CheckOutRetailSteps from "../component/CheckOutRetailSteps";

const RetailBeneficiary = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const nanoid6 = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", 6)
  const id = nanoid6();
  // Consolidate all form data in a single state object
  const [formData, setFormData] = useState({
    CUSTOMER_ID: `OM/RW/Re-${id}`,
    CUSTOMER_NAME: "",
    CUSTOMER_OPEN_DATE: "",
    SALUTATION: "",
    SURNAME: "",
    FORENAME_1: "",
    FORENAME_2: "",
    CUSTOMER_ACRONYM: "",
    CUSTOMER_GENDER: "",
    MARITAL_STATUS: "",
    DATE_OF_BIRTH: "",
    PLACE_OF_BIRTH: "",
    SPOUSE_NAME: "",
    EMAIL_ID: "",
    WORK_TELEPHONE: "",
    HOME_TELEPHONE: "",
    CUSTOMER_TIN: "",
    NATIONAL_ID_TYPE: "",
    NATIONAL_ID_NUMBER: "",
    HEALTH_INSURANCE_NUMBER: "",
    OCCUPATION: "",
    NEXT_OF_KIN_NAME: "",
    NEXT_OF_KIN_ID_TYPE: "",
    NEXT_OF_KIN_ID_NUMBER: "",
    NEXT_OF_KIN_TELEPHONE: "",
    NEXT_OF_KIN_EMAIL_ID: "",
    NUMBER_OF_DEPENDANTS: "",
    ACCOUNT_MANDATE_NAME: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    try {
      localStorage.setItem("retailBeneficiaryData", JSON.stringify(formData));
      
      dispatch({ type: "SET_RETAIL_INFO", payload: formData });

      console.log("Form Data Saved:", formData);

      setFormData({
        CUSTOMER_ID: `OM/RW/Re-${id}`,
        CUSTOMER_NAME: "",
        CUSTOMER_OPEN_DATE: "",
        SALUTATION: "",
        SURNAME: "",
        FORENAME_1: "",
        FORENAME_2: "",
        CUSTOMER_ACRONYM: "",
        CUSTOMER_GENDER: "",
        MARITAL_STATUS: "",
        DATE_OF_BIRTH: "",
        PLACE_OF_BIRTH: "",
        SPOUSE_NAME: "",
        EMAIL_ID: "",
        WORK_TELEPHONE: "",
        HOME_TELEPHONE: "",
        CUSTOMER_TIN: "",
        NATIONAL_ID_TYPE: "",
        NATIONAL_ID_NUMBER: "",
        HEALTH_INSURANCE_NUMBER: "",
        OCCUPATION: "",
        NEXT_OF_KIN_NAME: "",
        NEXT_OF_KIN_ID_TYPE: "",
        NEXT_OF_KIN_ID_NUMBER: "",
        NEXT_OF_KIN_TELEPHONE: "",
        NEXT_OF_KIN_EMAIL_ID: "",
        NUMBER_OF_DEPENDANTS: "",
        ACCOUNT_MANDATE_NAME: "",
      });

      // Navigate to the next step
      navigate("/retailOption");
    } catch (error) {
      console.error("Error saving form data:", error);
    }
  };


  return (
    <div className="mt-3">
<CheckOutRetailSteps step1/>
    <Container className="small-container">
      <h2 className="mt-3">Add Client Info</h2>
      <Form onSubmit={handleSubmit}>
        {/* Customer Basic Information */}
        <Row>
          
           <Col md={6}>
            <Form.Group controlId="CUSTOMER_NAME">
              <Form.Label>Customer Name</Form.Label>
              <Form.Control
                type="text"
                name="CUSTOMER_NAME"
                value={formData.CUSTOMER_NAME}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="CUSTOMER_OPEN_DATE">
              <Form.Label>Customer Open Date</Form.Label>
              <Form.Control
                type="date"
                name="CUSTOMER_OPEN_DATE"
                value={formData.CUSTOMER_OPEN_DATE}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="SALUTATION">
              <Form.Label>Salutation</Form.Label>
              <Form.Control
                as="select"
                name="SALUTATION"
                value={formData.SALUTATION}
                onChange={handleChange}
              >
                <option >--Select saluation type--</option>
                <option value="Miss">MISS</option>
                <option value="Mr">Mister</option>
                <option value="Mrs">Mrs</option>
                <option value="MS">Miss/Mrs</option>
                <option value="CORP">Company</option>
                <option value="JOINT">Joint/Group Acc</option>
                <option value="GOV">Goverment Institution</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        {/* Personal Information */}
        <Row>
          <Col md={6}>
            <Form.Group controlId="SURNAME">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                type="text"
                name="SURNAME"
                value={formData.SURNAME}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="FORENAME_1">
              <Form.Label>First Forename</Form.Label>
              <Form.Control
                type="text"
                name="FORENAME_1"
                value={formData.FORENAME_1}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="FORENAME_2">
              <Form.Label>Second Forename</Form.Label>
              <Form.Control
                type="text"
                name="FORENAME_2"
                value={formData.FORENAME_2}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="CUSTOMER_ACRONYM">
              <Form.Label>Acronym</Form.Label>
              <Form.Control
                type="text"
                name="CUSTOMER_ACRONYM"
                value={formData.CUSTOMER_ACRONYM}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="CUSTOMER_GENDER">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                name="CUSTOMER_GENDER"
                value={formData.CUSTOMER_GENDER}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Corporate">Corporate</option>
                <option value="Other">Other</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="MARITAL_STATUS">
              <Form.Label>Martial Status</Form.Label>
              <Form.Control
                as="select"
                name="MARITAL_STATUS"
                value={formData.MARITAL_STATUS}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divirced</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="DATE_OF_BIRTH">
              <Form.Label>Customer Date of birth</Form.Label>
              <Form.Control
                type="date"
                name="DATE_OF_BIRTH"
                value={formData.DATE_OF_BIRTH}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="PLACE_OF_BIRTH">
              <Form.Label>Place of birth</Form.Label>
              <Form.Control
                type="text"
                name="PLACE_OF_BIRTH"
                value={formData.PLACE_OF_BIRTH}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
          <Form.Group controlId="SPOUSE_NAME">
              <Form.Label>Spause Name</Form.Label>
              <Form.Control
                type="text"
                name="SPOUSE_NAME"
                value={formData.SPOUSE_NAME}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Contact Information */}
        <Row>
          <Col md={6}>
            <Form.Group controlId="EMAIL_ID">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="EMAIL_ID"
                value={formData.EMAIL_ID}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="WORK_TELEPHONE">
              <Form.Label>Work Telephone</Form.Label>
              <Form.Control
                type="text"
                name="WORK_TELEPHONE"
                value={formData.WORK_TELEPHONE}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="HOME_TELEPHONE">
              <Form.Label>Home Telephone</Form.Label>
              <Form.Control
                type="text"
                name="HOME_TELEPHONE"
                value={formData.HOME_TELEPHONE}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="CUSTOMER_TIN">
              <Form.Label>Customer Tin</Form.Label>
              <Form.Control
                type="text"
                name="CUSTOMER_TIN"
                value={formData.CUSTOMER_TIN}
                onChange={handleChange}
               
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="NATIONAL_ID_TYPE">
              <Form.Label>Natinal Id type</Form.Label>
              <Form.Control
                type="text"
                name="NATIONAL_ID_TYPE"
                value={formData.NATIONAL_ID_TYPE}
                onChange={handleChange}
               
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="NATIONAL_ID_NUMBER">
              <Form.Label>National Id Number</Form.Label>
              <Form.Control
                type="text"
                name="NATIONAL_ID_NUMBER"
                value={formData.NATIONAL_ID_NUMBER}
                onChange={handleChange}
               
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="HEALTH_INSURANCE_NUMBER">
              <Form.Label>Health Insurance Number</Form.Label>
              <Form.Control
                type="text"
                name="HEALTH_INSURANCE_NUMBER"
                value={formData.HEALTH_INSURANCE_NUMBER}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="OCCUPATION">
              <Form.Label>Occupation</Form.Label>
              <Form.Control
                type="text"
                name="OCCUPATION"
                value={formData.OCCUPATION}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Next of Kin Information */}
        <Row>
          <Col md={6}>
            <Form.Group controlId="NEXT_OF_KIN_NAME">
              <Form.Label>Next of Kin Name</Form.Label>
              <Form.Control
                type="text"
                name="NEXT_OF_KIN_NAME"
                value={formData.NEXT_OF_KIN_NAME}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="NEXT_OF_KIN_ID_TYPE">
              <Form.Label>Next of Kin id type</Form.Label>
              <Form.Control
                type="text"
                name="NEXT_OF_KIN_ID_TYPE"
                value={formData.NEXT_OF_KIN_ID_TYPE}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="NEXT_OF_KIN_ID_NUMBER">
              <Form.Label>Next of Kin id number</Form.Label>
              <Form.Control
                type="text"
                name="NEXT_OF_KIN_ID_NUMBER"
                value={formData.NEXT_OF_KIN_ID_NUMBER}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="NEXT_OF_KIN_TELEPHONE">
              <Form.Label>Next of Kin Telephone</Form.Label>
              <Form.Control
                type="text"
                name="NEXT_OF_KIN_TELEPHONE"
                value={formData.NEXT_OF_KIN_TELEPHONE}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="NEXT_OF_KIN_EMAIL_ID">
              <Form.Label>Next of Kin email</Form.Label>
              <Form.Control
                type="email"
                name="NEXT_OF_KIN_TELEPHONE"
                value={formData.NEXT_OF_KIN_EMAIL_ID}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="NUMBER_OF_DEPENDANTS">
              <Form.Label>Number of dependant</Form.Label>
              <Form.Control
                type="number"
                name="NUMBER_OF_DEPENDANTS"
                value={formData.NUMBER_OF_DEPENDANTS}
                onChange={handleChange}
           
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="ACCOUNT_MANDATE_NAME">
              <Form.Label>Account mandate name</Form.Label>
              <Form.Control
                type="text"
                name="ACCOUNT_MANDATE_NAME"
                value={formData.ACCOUNT_MANDATE_NAME}
                onChange={handleChange}
          
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="ACCOUNT_MANDATE_ID_TYPE">
              <Form.Label>Account mandate id type</Form.Label>
              <Form.Control
                type="text"
                name="ACCOUNT_MANDATE_ID_TYPE"
                value={formData.ACCOUNT_MANDATE_ID_TYPE}
                onChange={handleChange}
          
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="ACCOUNT_MANDATE_ID_NUMBER">
              <Form.Label>Account mandate id number</Form.Label>
              <Form.Control
                type="text"
                name="ACCOUNT_MANDATE_ID_NUMBER"
                value={formData.ACCOUNT_MANDATE_ID_NUMBER}
                onChange={handleChange}
          
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="NATIONALITY">
              <Form.Label>Nationality</Form.Label>
              <Form.Control
                type="text"
                name="NATIONALITY"
                value={formData.NATIONALITY}
                onChange={handleChange}
        
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="RESIDENCE">
              <Form.Label>Residence</Form.Label>
              <Form.Control
                type="text"
                name="RESIDENCE"
                value={formData.RESIDENCE}
                onChange={handleChange}
      
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit" className="mt-3">Add Customer</Button>
      </Form>
    </Container>
    </div>
  );
};

export default RetailBeneficiary;
