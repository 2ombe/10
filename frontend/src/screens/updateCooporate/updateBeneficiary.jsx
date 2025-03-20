import { useContext, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import CheckOutCooporateSteps from "../../component/CheckOutCooporateSteps";

const UpdateCompanyRegistration = () => {
  const navigate = useNavigate();
  const { dispatch,state } = useContext(AuthContext);
  const { userInfo } = state;
  const params = useParams();
    const { id: corpotateId } = params;
  const [fetchRetailData, setFetchRetailData] = useState({
    companyInfo: {},
  });
  const [CUSTOMER_ID, setCUSTOMER_ID] = useState("");
  const [salutation, setSalutation] = useState("");
  const [institutionName, setInstitutionName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [tin, setTin] = useState("");
  const [countryOfRegistration, setCountryOfRegistration] = useState("");
  const [dateOfRegistration, setDateOfRegistration] = useState("");
  const [telephoneNumber, setTelephoneNumber] = useState("");
  const [ email, setEmail] = useState("");
  const [postOffice, setPostOffice] = useState("");
  const [town, setTown] = useState("");
  const [ corporateCategory, setCorporateCategory] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/cooporate/single/${corpotateId}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });  
        const companyInfo = response.data.companyInfo || {};
       
        
        setFetchRetailData(response.data);
        setCUSTOMER_ID(companyInfo.CUSTOMER_ID || "");
        setSalutation(companyInfo.salutation || "");
        setInstitutionName(companyInfo.institutionName || "");
        setRegistrationNumber(companyInfo.registrationNumber || "");
        setTin(companyInfo.tin || "");
        setCountryOfRegistration(companyInfo.countryOfRegistration || "");
        setDateOfRegistration(companyInfo.dateOfRegistration || "");
        setTelephoneNumber(companyInfo.telephoneNumber|| "");
        setEmail(companyInfo.email || "");
        setPostOffice(companyInfo.postOffice || "");
        setTown(companyInfo.town || "");
        setCorporateCategory(companyInfo.corporateCategory || "");
       
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [corpotateId, userInfo.token]);

  const handleRegister = (e) => {
    e.preventDefault();
    const formData={
        CUSTOMER_ID,
salutation,
institutionName,
registrationNumber,
tin,
countryOfRegistration,
dateOfRegistration,
telephoneNumber,
email,
postOffice,
town,
corporateCategory
    }
    try {
      localStorage.setItem("companyInfo", JSON.stringify(formData));
      dispatch({ type: "SET_COMPANY_INFO", payload: formData });
      console.log("Company Info saved:", formData);
      navigate(`/updateAgent/${corpotateId}`);
    } catch (error) {
      console.log("Error saving company info:", error);
    }
  };

  return (
    <div className="mt-3">
      <CheckOutCooporateSteps step1 />
      <Container className="small-container">
        <h2 className="mt-3">Add Corporate Info</h2>
        <Form onSubmit={handleRegister}>
          
          <Form.Group className="mb-3">
            <Form.Label>Institution Name</Form.Label>
            <Form.Control
              type="text"
              name="institutionName"
              value={institutionName}
              onChange={(e)=>setInstitutionName(e.target.value)}
              required
            />
          </Form.Group>
         
          <Form.Group className="mb-3">
            <Form.Label>TIN</Form.Label>
            <Form.Control
              type="text"
              name="tin"
              value={tin}
              onChange={(e)=>setTin(e.target.value)}
              
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Country of Registration</Form.Label>
            <Form.Control
              type="text"
              name="countryOfRegistration"
              value={countryOfRegistration}
              onChange={(e)=>setCountryOfRegistration(e.target.value)}
              
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date of Registration</Form.Label>
            <Form.Control
              type="date"
              name="dateOfRegistration"
              value={dateOfRegistration}
              onChange={(e)=>setDateOfRegistration(e.target.value)}
              
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Telephone Number</Form.Label>
            <Form.Control
              type="text"
              name="telephoneNumber"
              value={telephoneNumber}
              onChange={(e)=>setTelephoneNumber(e.target.value)}
              
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Post Office</Form.Label>
            <Form.Control
              type="text"
              name="postOffice"
              value={postOffice}
              onChange={(e)=>setPostOffice(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Town</Form.Label>
            <Form.Control
              type="text"
              name="town"
              value={town}
              onChange={(e)=>setTown(e.target.value)}
              
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Corporate Category</Form.Label>
            <Form.Control
              as="select"
              name="corporateCategory"
              value={corporateCategory}
              onChange={(e)=>setCorporateCategory(e.target.value)}
              
            >
              <option value="">--Select corporate category--</option>
              <option value="Micro Enterprises">Micro Enterprises</option>
              <option value="Small Enterprises">Small Enterprises</option>
              <option value="Medium Enterprises">Medium Enterprises</option>
              <option value="Large Enterprises">Large Enterprises</option>
              <option value="Retail or Individuals">Retail or Individuals</option>
              <option value="NGOs, charity/welfare organisations">
                NGOs, charity/welfare organisations
              </option>
              <option value="Business Groups/Community">
                Business Groups/Community
              </option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">Create Company</Button>
        </Form>
      </Container>
    </div>
  );
};

export default UpdateCompanyRegistration;
