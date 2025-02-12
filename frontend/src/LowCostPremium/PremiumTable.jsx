import React, { useContext, useEffect } from 'react';
import { Container, Table, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import CheckOutRetailSteps from '../component/CheckOutRetailSteps';

const premiumData = {
  "19-29": {
    principal: [38051, 57076, 76101, 95126],
    spouse: [31860, 47789, 63719, 79649],
    child: [17692, 26538, 35384, 44230]
  },
  "30-40": {
    principal: [40027, 60040, 80054, 100067],
    spouse: [33455, 50182, 66910, 83637],
    child: [17692, 26538, 35384, 44230]
  },
  "41-50": {
    principal: [42218, 63326, 84435, 105544],
    spouse: [35026, 52540, 70053, 87566],
    child: [17692, 26538, 35384, 44230]
  },
  "51-65": {
    principal: [52337, 78506, 104675, 130843],
    spouse: [42765, 64148, 85530, 106913],
    child: [17692, 26538, 35384, 44230]
  }
};


const LPremiumTable = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { cart } = state;
  const { principalAgeGroup, spouseAgeGroup, children, principalCount, spouseCount, childCount } = cart;
  console.log(childCount);
  const optionLimits = [1500000, 2250000, 3000000, 3750000];
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
    dispatch({ type: "SET_CHILDREN", payload: newChildren });
  };

  const handleChildAbove18Change = (index) => (event) => {
    const newChildren = [...children];
    newChildren[index].above18 = event.target.checked;
    dispatch({ type: "SET_CHILDREN", payload: newChildren });
  };

  const addChild = () => {
    const newChildren = [...children, { ageGroup: "19-29", above18: false }];
    dispatch({ type: "ADD_CHILD", payload: newChildren });
  };

  const calculateTotalPremium = (optionIndex) => {
    const principalPremium = premiumData[principalAgeGroup]?.principal[optionIndex] || 0;
    const spousePremium = premiumData[spouseAgeGroup]?.spouse[optionIndex] || 0;
    const childrenPremium = children.reduce((total, child) => {
      const childPremium = child.above18
        ? premiumData[principalAgeGroup]?.principal[optionIndex] || 0
        : premiumData[child.ageGroup]?.child[optionIndex] || 0;
      return total + childPremium;
    }, 0);
    const totalPerPremium = principalPremium + spousePremium + childrenPremium;
    return totalPerPremium;
  };

  const saveDataAndNavigate = () => {
    const newTotalPremium = optionLimits.map((limit, index) => calculateTotalPremium(index));
    dispatch({ type: "SET_TOTAL_PREMIUM", payload: newTotalPremium });
    localStorage.setItem('totalPerPremium', JSON.stringify(newTotalPremium));
    localStorage.setItem('authState', JSON.stringify(state));
    navigate('/lowcostOut');
  };

  // Save count of principal, spouse, and children to localStorage
  useEffect(() => {
    localStorage.setItem('principalCount', principalCount);
    localStorage.setItem('spouseCount', spouseCount);
    localStorage.setItem('childCount', childCount);
  }, [principalCount, spouseCount, childCount]);
  return (
    <div>
      <CheckOutRetailSteps step1 step2/>
      <Container>
        <h2>Inpatient Premiums</h2>
        <Form.Group>
          <Form.Label>Principal Member Age Group:</Form.Label>
          <Form.Control as="select" value={principalAgeGroup} onChange={handleAgeGroupChange("SET_PRINCIPAL_AGE_GROUP")}>
            <option value="19-29">19 - 29 years</option>
            <option value="30-40">30 - 40 years</option>
            <option value="41-50">41 - 50 years</option>
            <option value="51-65">51 - 65 years</option>
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Spouse Age Group:</Form.Label>
          <Form.Control as="select" value={spouseAgeGroup} onChange={handleAgeGroupChange("SET_SPOUSE_AGE_GROUP")}>
            <option value="19-29">19 - 29 years</option>
            <option value="30-40">30 - 40 years</option>
            <option value="41-50">41 - 50 years</option>
            <option value="51-65">51 - 65 years</option>
          </Form.Control>
        </Form.Group>

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
          </div>
        ))}
        <Button onClick={addChild}>Add Child</Button>

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
            <tr>
              <td>Spouse</td>
              {premiumData[spouseAgeGroup].spouse.map((premium, index) => (
                <td key={index}>{premium.toLocaleString()}</td>
              ))}
            </tr>
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

        <Button variant="primary" onClick={saveDataAndNavigate}>
          Save and Continue
        </Button>
      </Container>
    </div>
  );
};

export default LPremiumTable;
