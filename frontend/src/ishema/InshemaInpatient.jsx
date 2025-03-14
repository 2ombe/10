import React, { useContext, useEffect, useState } from 'react';
import { Container, Table, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import CheckOutIshemaSteps from '../component/CheckOutIshemaSteps';

const premiumData = {
  "65-80": {
    principal: [294551, 336763, 507623, 579182],
    spouse: [294551, 336763, 507623, 579182],
  }
};

const InshemaInpatient = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { ishemaCart } = state;
  const { principalAgeGroup = "65-80", spouseAgeGroup = "65-80" } = ishemaCart; // Default age groups
  const [hasSpouse, setHasSpouse] = useState(!!spouseAgeGroup); // Track if spouse is present
  const optionLimits = [4250000, 8500000, 25500000, 42500000];
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('authState', JSON.stringify(state));
  }, [state]);

  const handleAgeGroupChange = (type) => (event) => {
    dispatch({ type, payload: event.target.value });
  };

  const addSpouse = () => {
    setHasSpouse(true);
    dispatch({ type: 'SET_ISHEMA_SPOUSE_AGE_GROUP', payload: "65-80" }); // Default spouse age group
  };

  const removeSpouse = () => {
    setHasSpouse(false);
    dispatch({ type: 'SET_ISHEMA_SPOUSE_AGE_GROUP', payload: "" }); // Clear spouse age group
  };

  const calculateTotalPremium = (optionIndex) => {
    const principalPremium = premiumData[principalAgeGroup]?.principal[optionIndex] || 0;
    const spousePremium = hasSpouse ? (premiumData[spouseAgeGroup]?.spouse[optionIndex] || 0) : 0;
    const totalPremium = principalPremium + spousePremium;
    return totalPremium;
  };

  const saveDataAndNavigate = () => {
    const newTotalPremium = optionLimits.map((limit, index) => calculateTotalPremium(index));
    const totalMembers = 1 + (hasSpouse ? 1 : 0); // Calculate total members
    dispatch({ type: "SET_ISHEMA_TOTAL_PREMIUM", payload: newTotalPremium });
    dispatch({ type: "SET_ISHEMA_TOTAL_MEMBERS", payload: totalMembers }); // Dispatch total members to state
    localStorage.setItem('totalPerPremium', JSON.stringify(newTotalPremium));
    localStorage.setItem('totalMembers', totalMembers); // Save total members to localStorage
    console.log('Total Premiums:', newTotalPremium);
    console.log('Total Members:', totalMembers);
    localStorage.setItem('authState', JSON.stringify(state));
    navigate('/ishemaOut');
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
              <Form.Control
                as="select"
                value={spouseAgeGroup}
                onChange={handleAgeGroupChange("SET_ISHEMA_SPOUSE_AGE_GROUP")}
                disabled={!hasSpouse} // Disable if spouse is not present
              >
                {Object.keys(premiumData).map((ageGroup) => (
                  <option key={ageGroup} value={ageGroup}>{ageGroup}</option>
                ))}
              </Form.Control>
            </Form.Group>
            {!hasSpouse && <Button onClick={addSpouse}>Add Spouse</Button>}
            {hasSpouse && <Button variant="danger" onClick={removeSpouse}>Remove Spouse</Button>}
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
            {hasSpouse && (
              <tr>
                <td>Spouse</td>
                {premiumData[spouseAgeGroup]?.spouse.map((premium, index) => (
                  <td key={index}>{premium.toLocaleString()}</td>
                ))}
              </tr>
            )}
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

export default InshemaInpatient;