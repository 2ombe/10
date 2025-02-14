import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { customAlphabet } from "nanoid";
import { useNavigate } from "react-router-dom";
import CheckOutRetailSteps from "../component/CheckOutRetailSteps";

const LowcostBeneficiary = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const nanoid6 = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", 6)
  const id = nanoid6();
  // Consolidate all form data in a single state object
  const [formData, setFormData] = useState({
    CUSTOMER_ID: `OM/RW/Lo-${id}`,
    CUSTOMER_NAME: "",
    SALUTATION: "",
    CUSTOMER_GENDER: "",
    MARITAL_STATUS: "",
    DATE_OF_BIRTH: "",
    PLACE_OF_BIRTH: "",
    SPOUSE_NAME: "",
    EMAIL_ID: "",
    HOME_TELEPHONE: "",
    OCCUPATION: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleRegister = () => {
    try {
      localStorage.setItem("retailInfo", JSON.stringify(formData));
      dispatch({ type: "SET_RETAIL_INFO", payload: formData });
      console.log(formData);
      setFormData({
        CUSTOMER_ID: `OM/RW/Lo-${id}`,
        CUSTOMER_NAME: "",
        CUSTOMER_OPEN_DATE: "",
        SALUTATION: "",
        CUSTOMER_GENDER: "",
        MARITAL_STATUS: "",
        DATE_OF_BIRTH: "",
        PLACE_OF_BIRTH: "",
        SPOUSE_NAME: "",
        EMAIL_ID: "",
        HOME_TELEPHONE: "",
        OCCUPATION: "",
      });

      navigate("/lowcostOption");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-3">
<CheckOutRetailSteps step1/>
    <Container className="small-container">
      <h2 className="mt-3">Add Client Info</h2>
      <Form onSubmit={handleRegister}>
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

    
       

       <Button variant="primary" type="submit" className="mt-3">Save and Continue</Button>
      </Form>
    </Container>
    </div>
  );
};

export default LowcostBeneficiary;
