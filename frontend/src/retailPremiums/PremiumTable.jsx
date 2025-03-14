import React, { useContext, useEffect } from 'react'; 
import { Container, Table, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import CheckOutRetailSteps from '../component/CheckOutRetailSteps';

const premiumData = {
  "19-29": {
    principal: [119850, 134775, 191175, 212475, 242475],
    spouse: [100350, 112200, 161550, 179550, 204375],
    child: [55725, 71475, 109425, 121575, 136125],
  },
  "30-40": {
    principal: [126075, 141900, 201600, 224025, 255825],
    spouse: [105375, 117975, 170250, 189150, 215400],
    child: [55725, 71475, 109425, 121575, 136125],
  },
  "41-50": {
    principal: [132975, 149475, 235725, 261975, 272025],
    spouse: [110325, 123450, 196875, 218775, 227025],
    child: [55725, 71475, 109425, 121575, 136125],
  },
  "51-65": {
    principal: [164850, 188475, 255675, 284100, 324150],
    spouse: [134700, 154950, 213375, 237150, 269700],
    child: [55725, 71475, 109425, 121575, 136125],
  },
};


const PremiumTable = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { cart } = state;
  const { principalAgeGroup, spouseAgeGroup, children, principalCount, spouseCount, childCount } = cart;
  const optionLimits = [3750000,7500000,15000000, 22500000, 37500000];
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('authState', JSON.stringify(state));
  }, [state]);

  const handleAgeGroupChange = (type) => (event) => {
    dispatch({ type, payload: event.target.value });
  };

  const handleChildAgeChange = (index) => (event) => {
    const newChildren = [...children];
    newChildren[index].ageGroup = event.target.value;
    dispatch({ type: 'SET_CHILDREN', payload: newChildren });
  };

  const handleChildAbove18Change = (index) => (event) => {
    const newChildren = [...children];
    newChildren[index].above18 = event.target.checked;
    dispatch({ type: 'SET_CHILDREN', payload: newChildren });
  };

  const addChild = () => {
    const newChildren = [...children, { ageGroup: '19-29', above18: false }];
    dispatch({ type: 'ADD_CHILD', payload: newChildren });
    dispatch({ type: 'SET_CHILD_COUNT', payload: childCount + 1 });
  };

  const removeChild = (index) => {
    const newChildren = children.filter((_, i) => i !== index);
    dispatch({ type: 'SET_CHILDREN', payload: newChildren });
    dispatch({ type: 'SET_CHILD_COUNT', payload: childCount - 1 });
  };

  const addSpouse = () => {
    dispatch({ type: 'SET_SPOUSE_AGE_GROUP', payload: '19-29' });
  };

  const removeSpouse = () => {
    dispatch({ type: 'SET_SPOUSE_AGE_GROUP', payload: '' });
  };

  const calculateTotalPremium = (optionIndex) => {
    const principalPremium = premiumData[principalAgeGroup]?.principal[optionIndex] || 0;
    const spousePremium = spouseAgeGroup ? (premiumData[spouseAgeGroup]?.spouse[optionIndex] || 0) : 0;
    const childrenPremium = children.reduce((total, child) => {
      const childPremium = child.above18
        ? premiumData[principalAgeGroup]?.principal[optionIndex] || 0
        : premiumData[child.ageGroup]?.child[optionIndex] || 0;
      return total + childPremium;
    }, 0);
    return principalPremium + spousePremium + childrenPremium;
  };

  const saveDataAndNavigate = () => {
    const newTotalPremium = optionLimits.map((limit, index) => calculateTotalPremium(index));
    const totalMembers = 1 + (spouseAgeGroup ? 1 : 0) + childCount;
    dispatch({ type: 'SET_TOTAL_PREMIUM', payload: newTotalPremium });
    dispatch({ type: 'SET_TOTAL_MEMBERS', payload: totalMembers });
    localStorage.setItem('totalPerPremium', JSON.stringify(newTotalPremium));
    localStorage.setItem('totalMembers', totalMembers);
    console.log('Total Premiums:', newTotalPremium);
    console.log('Total Members:', totalMembers);
    localStorage.setItem('authState', JSON.stringify(state));
    navigate('/retailOut');
  };

  return (
    <div>
      <CheckOutRetailSteps step1 step2 />
      <Container>
        <h2>Inpatient Premiums</h2>
        <Row>
          <Col>
            <h3>Principal</h3>
            <Form.Group>
              <Form.Label>Principal Member Age Group:</Form.Label>
              <Form.Control as="select" value={principalAgeGroup} onChange={handleAgeGroupChange('SET_PRINCIPAL_AGE_GROUP')}>
                <option value="19-29">19 - 29 years</option>
                <option value="30-40">30 - 40 years</option>
                <option value="41-50">41 - 50 years</option>
                <option value="51-65">51 - 65 years</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <h3>Spouse</h3>
            <Form.Group>
              <Form.Label>Spouse Age Group:</Form.Label>
              <Form.Control as="select" value={spouseAgeGroup} onChange={handleAgeGroupChange('SET_SPOUSE_AGE_GROUP')}>
                <option value="">Not Applicable</option>
                <option value="19-29">19 - 29 years</option>
                <option value="30-40">30 - 40 years</option>
                <option value="41-50">41 - 50 years</option>
                <option value="51-65">51 - 65 years</option>
              </Form.Control>
            </Form.Group>
            {!spouseAgeGroup && <Button onClick={addSpouse}>Add Spouse</Button>}
            {spouseAgeGroup && <Button onClick={removeSpouse}>Remove Spouse</Button>}
          </Col>
          <Col>
            <h3>Children</h3>
            {children.map((child, index) => (
              <div key={index}>
                <Form.Group>
                  <Form.Label>Child {index + 1} Age Group:</Form.Label>
                  <Form.Control as="select" value={child.ageGroup} onChange={handleChildAgeChange(index)}>
                    <option value="19-29">1 month to 18 years</option>
                    <option value="30-40">19 - 29 years</option>
                    <option value="41-50">30 - 40 years</option>
                    <option value="51-65">41 - 50 years</option>
                    <option value="51-65">51 - 65 years</option>
                  </Form.Control>
                </Form.Group>
                <Form.Check
                  type="checkbox"
                  label="Above 18"
                  checked={child.above18}
                  onChange={handleChildAbove18Change(index)}
                />
                <Button variant="danger" onClick={() => removeChild(index)}>Remove Child</Button>
              </div>
            ))}
            <Button onClick={addChild}>Add Child</Button>
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
              {premiumData[principalAgeGroup].principal.map((premium, index) => (
                <td key={index}>{premium.toLocaleString()}</td>
              ))}
            </tr>
            {spouseAgeGroup && (
              <tr>
                <td>Spouse</td>
                {premiumData[spouseAgeGroup].spouse.map((premium, index) => (
                  <td key={index}>{premium.toLocaleString()}</td>
                ))}
              </tr>
            )}
            {children.map((child, index) => (
              <tr key={index}>
                <td>Child {index + 1}</td>
                {child.above18
                  ? premiumData[principalAgeGroup].principal.map((premium, i) => (
                      <td key={i}>{premium.toLocaleString()}</td>
                    ))
                  : premiumData[child.ageGroup].child.map((premium, i) => (
                      <td key={i}>{premium.toLocaleString()}</td>
                    ))}
              </tr>
            ))}
            <tr>
              <td>Total Premium</td>
              {optionLimits.map((_, index) => (
                <td key={index}>{calculateTotalPremium(index).toLocaleString()}</td>
              ))}
            </tr>
          </tbody>
        </Table>
        <Button onClick={saveDataAndNavigate}>Save & Proceed</Button>
      </Container>
    </div>
  );
};

export default PremiumTable;
