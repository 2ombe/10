import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import CheckOutRetailSteps from "../../component/CheckOutRetailSteps";


const UpdateLowcostBeneficiary = () => {
const navigate = useNavigate();
  const { dispatch, state } = useContext(AuthContext);
  const { userInfo } = state;
  const params = useParams();
  const { id: lowcostId } = params;

  const [fetchRetailData, setFetchRetailData] = useState({
    beneficiaryInfo: {},
  });
  const [CUSTOMER_ID, setCUSTOMER_ID] = useState("");
  const [CUSTOMER_NAME, setCUSTOMER_NAME] = useState("");
  const [CUSTOMER_OPEN_DATE, setCUSTOMER_OPEN_DATE] = useState("");
  const [SALUTATION, setSALUTATION] = useState("");
  const [SURNAME, setSURNAME] = useState("");
  const [CUSTOMER_GENDER, setCUSTOMER_GENDER] = useState("");
  const [MARITAL_STATUS, setMARITAL_STATUS] = useState("");
  const [DATE_OF_BIRTH, setDATE_OF_BIRTH] = useState("");
  const [PLACE_OF_BIRTH, setPLACE_OF_BIRTH] = useState("");
  const [SPOUSE_NAME, setSPOUSE_NAME] = useState("");
  const [EMAIL_ID, setEMAIL_ID] = useState("");
  const [NUMBER_OF_DEPENDANTS, setNUMBER_OF_DEPENDANTS] = useState("");
  const [ACCOUNT_MANDATE_NAME, setACCOUNT_MANDATE_NAME] = useState("");
  const [ACCOUNT_MANDATE_ID_NUMBER, setACCOUNT_MANDATE_ID_NUMBER] = useState("");

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/lowcost/single/${lowcostId}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        const beneficiaryInfo = response.data.beneficiaryInfo || {};
        setFetchRetailData(response.data);
        setCUSTOMER_ID(beneficiaryInfo.CUSTOMER_ID || "");
        setCUSTOMER_NAME(beneficiaryInfo.CUSTOMER_NAME || "");
        setCUSTOMER_OPEN_DATE(beneficiaryInfo.CUSTOMER_OPEN_DATE || "");
        setSALUTATION(beneficiaryInfo.SALUTATION || "");
        setSURNAME(beneficiaryInfo.SURNAME || "");
        setCUSTOMER_GENDER(beneficiaryInfo.CUSTOMER_GENDER || "");
        setMARITAL_STATUS(beneficiaryInfo.MARITAL_STATUS || "");
        setDATE_OF_BIRTH(beneficiaryInfo.DATE_OF_BIRTH || "");
        setPLACE_OF_BIRTH(beneficiaryInfo.PLACE_OF_BIRTH || "");
        setSPOUSE_NAME(beneficiaryInfo.SPOUSE_NAME || "");
        setEMAIL_ID(beneficiaryInfo.EMAIL_ID || "");
        setNUMBER_OF_DEPENDANTS(beneficiaryInfo.NUMBER_OF_DEPENDANTS || "");
        setACCOUNT_MANDATE_NAME(beneficiaryInfo.ACCOUNT_MANDATE_NAME || "");
        setACCOUNT_MANDATE_ID_NUMBER(beneficiaryInfo.ACCOUNT_MANDATE_ID_NUMBER || "");
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [lowcostId, userInfo.token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      CUSTOMER_ID,
      CUSTOMER_NAME,
      CUSTOMER_OPEN_DATE,
      SALUTATION,
      SURNAME,
      CUSTOMER_GENDER,
      MARITAL_STATUS,
      DATE_OF_BIRTH,
      PLACE_OF_BIRTH,
      SPOUSE_NAME,
      EMAIL_ID,
      NUMBER_OF_DEPENDANTS,
      ACCOUNT_MANDATE_NAME,
      ACCOUNT_MANDATE_ID_NUMBER,
    };

    try {
      localStorage.setItem("retailBeneficiaryData", JSON.stringify(formData));
      dispatch({ type: "SET_RETAIL_INFO", payload: formData });
      console.log("Form Data Saved:", formData);
      navigate(`/updateLowcostIn/${lowcostId}`);
    } catch (error) {
      console.error("Error saving form data:", error);
    }
  };
 

  return (
    <div className="mt-3">
<CheckOutRetailSteps step1/>
<Container className="small-container">
      <h2 className="mt-3">Update Client Info</h2>
      <Form onSubmit={handleSubmit} >
        <Row>
          
           <Col md={6}>
            <Form.Group controlId="CUSTOMER_NAME">
              <Form.Label>Customer Name</Form.Label>
              <Form.Control
                type="text"
                name="CUSTOMER_NAME"
                value={CUSTOMER_NAME}
                onChange={(e)=>setCUSTOMER_NAME(e.target.value)}
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
                value={CUSTOMER_OPEN_DATE}
                onChange={(e)=>setCUSTOMER_OPEN_DATE(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="SALUTATION">
              <Form.Label>Salutation</Form.Label>
              <Form.Control
                as="select"
                name="SALUTATION"
                value={SALUTATION}
                onChange={(e)=>setSALUTATION(e.target.value)}
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
                value={SURNAME}
                onChange={(e)=>setSURNAME(e.target.value)}
              />
            </Form.Group>
          </Col>
          
        </Row>

        <Row>
        
       
          <Col md={6}>
            <Form.Group controlId="CUSTOMER_GENDER">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                name="CUSTOMER_GENDER"
                value={CUSTOMER_GENDER}
                onChange={(e)=>setCUSTOMER_GENDER(e.target.value)}
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
                value={MARITAL_STATUS}
                onChange={(e)=>setMARITAL_STATUS(e.target.value)}
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
                value={DATE_OF_BIRTH}
                onChange={(e)=>setDATE_OF_BIRTH(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="PLACE_OF_BIRTH">
              <Form.Label>Place of birth</Form.Label>
              <Form.Control
                type="text"
                name="PLACE_OF_BIRTH"
                value={PLACE_OF_BIRTH}
                onChange={(e)=>setPLACE_OF_BIRTH(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
          <Form.Group controlId="SPOUSE_NAME">
              <Form.Label>Spause Name</Form.Label>
              <Form.Control
                type="text"
                name="SPOUSE_NAME"
                value={SPOUSE_NAME}
                onChange={(e)=>setSPOUSE_NAME(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="EMAIL_ID">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="EMAIL_ID"
                value={EMAIL_ID}
                onChange={(e)=>setEMAIL_ID(e.target.value)}
              />
            </Form.Group>
          </Col>
         
        </Row>

      

        <Row>
          
          <Col md={6}>
            <Form.Group controlId="NUMBER_OF_DEPENDANTS">
              <Form.Label>Number of dependant</Form.Label>
              <Form.Control
                type="number"
                name="NUMBER_OF_DEPENDANTS"
                value={NUMBER_OF_DEPENDANTS}
                onChange={(e)=>setNUMBER_OF_DEPENDANTS(e.target.value)}
           
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="ACCOUNT_MANDATE_NAME">
              <Form.Label>Account mandate name</Form.Label>
              <Form.Control
                type="text"
                name="ACCOUNT_MANDATE_NAME"
                value={ACCOUNT_MANDATE_NAME}
                onChange={(e)=>setACCOUNT_MANDATE_NAME(e.target.value)}
          
              />
            </Form.Group>
          </Col>
          
          <Col md={6}>
          </Col>
         
        
        </Row>

        <Button variant="primary" type="submit" className="mt-3">Add Customer</Button>
      </Form>
    </Container>
    </div>
  );
};

export default UpdateLowcostBeneficiary;
