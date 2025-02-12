import React, { useContext, useEffect } from 'react';
import { Container, Table, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import CheckOutIshemaSteps from '../../component/CheckOutIshemaSteps';


const premiumData = {
  "65-80": {
    principal: [38051, 57076, 76101, 95126],
    spouse: [31860, 47789, 63719, 79649],
  }
};

const UpdateInshemaInpatient = () => {
  const { state, dispatch } = useContext(AuthContext);
  const params = useParams()
  const {id:ishemaId}=params
  const { ishemaCart } = state;
  const { principalAgeGroup = "65-80", spouseAgeGroup = "65-80" } = ishemaCart; // Default age groups
  const optionLimits = [1500000, 2250000, 3000000, 3750000];
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('authState', JSON.stringify(state));
  }, [state]);

  const handleAgeGroupChange = (type) => (event) => {
    dispatch({ type, payload: event.target.value });
  };

  const calculateTotalPremium = (optionIndex) => {
    const principalPremium = premiumData[principalAgeGroup]?.principal[optionIndex] || 0;
    const spousePremium = premiumData[spouseAgeGroup]?.spouse[optionIndex] || 0;
    const totalPremium = principalPremium + spousePremium;
    return totalPremium;
  };

  const saveDataAndNavigate = () => {
    const newTotalPremium = optionLimits.map((limit, index) => calculateTotalPremium(index));
    dispatch({ type: "SET_ISHEMA_TOTAL_PREMIUM", payload: newTotalPremium });
    localStorage.setItem('totalPerPremium', JSON.stringify(newTotalPremium));
    console.log(newTotalPremium);
    localStorage.setItem('authState', JSON.stringify(state));
    navigate(`/ishemaOut/${ishemaId}`);
  };

  return (
    <div>
      <CheckOutIshemaSteps step1 />
      <Container>
        <h2>Inpatient Premiums</h2>
        <Row>
          <Col>
            <h3>Principal</h3>
            <Form.Group>
              <Form.Label>Principal Member Age Group:</Form.Label>
              <Form.Control as="select" value={principalAgeGroup} onChange={handleAgeGroupChange("SET_ISHEMA_PRINCIPAL_AGE_GROUP")}>
                {Object.keys(premiumData).map((ageGroup) => (
                  <option key={ageGroup} value={ageGroup}>{ageGroup}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <h3>Spouse</h3>
            <Form.Group>
              <Form.Label>Spouse Age Group:</Form.Label>
              <Form.Control as="select" value={spouseAgeGroup} onChange={handleAgeGroupChange("SET_ISHEMA_SPOUSE_AGE_GROUP")}>
                {Object.keys(premiumData).map((ageGroup) => (
                  <option key={ageGroup} value={ageGroup}>{ageGroup}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Plan</th>
              {optionLimits.map((limit, index) => (
                <th key={index}>{limit.toLocaleString()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Principal Member</td>
              {premiumData[principalAgeGroup]?.principal.map((premium, index) => (
                <td key={index}>{premium.toLocaleString()}</td>
              ))}
            </tr>
            <tr>
              <td>Spouse</td>
              {premiumData[spouseAgeGroup]?.spouse.map((premium, index) => (
                <td key={index}>{premium.toLocaleString()}</td>
              ))}
            </tr>
            <tr>
              <td>Total Premium</td>
              {optionLimits.map((_, index) => (
                <td key={index}>{calculateTotalPremium(index).toLocaleString()}</td>
              ))}
            </tr>
          </tbody>
        </Table>

        <Button variant="primary" onClick={saveDataAndNavigate}>
          Save and Continue
        </Button>
      </Container>
    </div>
  );
};

export default UpdateInshemaInpatient;
