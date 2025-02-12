import React, { useContext, useEffect, useState } from 'react';
import { Container, Table, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import CheckOutRetailSteps from '../component/CheckOutRetailSteps';

const premiumData = {
  "19-29": {
    principal: [126075, 141900, 201600, 224025, 255825],
    spouse: [105375, 117975, 170250, 189150, 215400],
    child: [55725, 71475, 109425, 121575, 136125]
  },
  "30-40": {
    principal: [126075, 141900, 201600, 224025, 255825],
    spouse: [105375, 117975, 170250, 189150, 215400],
    child: [55725, 71475, 109425, 121575, 136125]
  },
  "41-50": {
    principal: [132975, 149475, 235725, 261975, 272025],
    spouse: [110325, 123450, 196875, 218775, 227025],
    child: [55725, 71475, 109425, 121575, 136125]
  },
  "51-65": {
    principal: [164850, 188475, 255675, 284100, 324150],
    spouse: [134700, 154950, 213375, 237150, 269700],
    child: [55725, 71475, 109425, 121575, 136125]
  }
};

const SPremiumTable = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { cart } = state;
  const { principalAgeGroup, spouseAgeGroup, children, principalCount, spouseCount, childCount } = cart;
  const [spouses, setSpouses] = useState([{ ageGroup: "19-29" }]);
  const [principals, setPrincipals] = useState([{ ageGroup: "19-29" }]);
  const optionLimits = [1500000, 2250000, 3000000, 3750000, 100];
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('authState', JSON.stringify(state));
  }, [state]);

  const handleAgeGroupChange = (type, target) => (event) => {
    dispatch({ type, payload: event.target.value, target });
  };

  const handleChildAgeChange = (index) => (event) => {
    const newChildren = [...children];
    newChildren[index].ageGroup = event.target.value;
    dispatch({ type: "SET_CHILDREN", payload: newChildren });
  };

  const handleSpouseAgeChange = (index) => (event) => {
    const newSpouses = [...spouses];
    newSpouses[index].ageGroup = event.target.value;
    setSpouses(newSpouses);
  };

  const handlePrincipalAgeChange = (index) => (event) => {
    const newPrincipals = [...principals];
    newPrincipals[index].ageGroup = event.target.value;
    setPrincipals(newPrincipals);
  };

  const addSpouse = () => {
    setSpouses([...spouses, { ageGroup: "19-29" }]);
  };

  const addPrincipal = () => {
    setPrincipals([...principals, { ageGroup: "19-29" }]);
  };

  const calculateTotalPremium = (optionIndex) => {
    let totalPremium = 0;
    principals.forEach(principal => {
      totalPremium += premiumData[principal.ageGroup]?.principal[optionIndex] || 0;
    });
    spouses.forEach(spouse => {
      totalPremium += premiumData[spouse.ageGroup]?.spouse[optionIndex] || 0;
    });
    children.forEach(child => {
      totalPremium += child.above18
        ? premiumData[principals[0].ageGroup]?.principal[optionIndex] || 0
        : premiumData[child.ageGroup]?.child[optionIndex] || 0;
    });
    return totalPremium;
  };

  const saveDataAndNavigate = () => {
    const newTotalPremium = optionLimits.map((limit, index) => calculateTotalPremium(index));
    dispatch({ type: "SET_TOTAL_PREMIUM", payload: newTotalPremium });
    localStorage.setItem('totalPerPremium', JSON.stringify(newTotalPremium));
    localStorage.setItem('authState', JSON.stringify(state));
    navigate('/smeOut');
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

  // Save count of principal, spouse, and children to localStorage
  useEffect(() => {
    localStorage.setItem('principalCount', principals.length);
    localStorage.setItem('spouseCount', spouses.length);
    localStorage.setItem('childCount', childCount);
  }, [principals.length, spouses.length, childCount]);

  return (
    <div>
      <CheckOutRetailSteps step1 step2/>
      <Container>
        <h2>Inpatient Premiums</h2>
<Row>
<Col>
        {principals.map((principal, index) => (
          <div key={index}>
            <Form.Group>
              <Form.Label>Principal {index + 1} Age Group:</Form.Label>
              <Form.Control as="select" value={principal.ageGroup} onChange={handlePrincipalAgeChange(index)}>
                <option value="19-29">19 - 29 years</option>
                <option value="30-40">30 - 40 years</option>
                <option value="41-50">41 - 50 years</option>
                <option value="51-65">51 - 65 years</option>
              </Form.Control>
            </Form.Group>
          </div>
        ))}
        <Button onClick={addPrincipal}>Add Principal</Button>
        <Form.Group>
          <Form.Label>Principal Member Age Group:</Form.Label>
          <Form.Control as="select" value={principalAgeGroup} onChange={handleAgeGroupChange("SET_PRINCIPAL_AGE_GROUP", "principal")}>
            <option value="19-29">19 - 29 years</option>
            <option value="30-40">30 - 40 years</option>
            <option value="41-50">41 - 50 years</option>
            <option value="51-65">51 - 65 years</option>
          </Form.Control>
        </Form.Group>
</Col>
<Col>
        {spouses.map((spouse, index) => (
          <div key={index}>
            <Form.Group>
              <Form.Label>Spouse {index + 1} Age Group:</Form.Label>
              <Form.Control as="select" value={spouse.ageGroup} onChange={handleSpouseAgeChange(index)}>
                <option value="19-29">19 - 29 years</option>
                <option value="30-40">30 - 40 years</option>
                <option value="41-50">41 - 50 years</option>
                <option value="51-65">51 - 65 years</option>
              </Form.Control>
            </Form.Group>
          </div>
        ))}
        <Button onClick={addSpouse}>Add Spouse</Button>
        <Form.Group>
          <Form.Label>Spouse Age Group:</Form.Label>
          <Form.Control as="select" value={spouseAgeGroup} onChange={handleAgeGroupChange("SET_SPOUSE_AGE_GROUP", "spouse")}>
            <option value="19-29">19 - 29 years</option>
            <option value="30-40">30 - 40 years</option>
            <option value="41-50">41 - 50 years</option>
            <option value="51-65">51 - 65 years</option>
          </Form.Control>
        </Form.Group>
</Col>
<Col>
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
            </tr>-
            {principals.map((principal, pIndex) => (
              <tr key={`principal_${pIndex}`}>
                <td>Principal {pIndex + 1}</td>
                {premiumData[principal.ageGroup].principal.map((premium, index) => (
                  <td key={index}>{premium.toLocaleString()}</td>
                ))}
              </tr>
            ))}
            <tr>
              <td>Spouse</td>
              {premiumData[spouseAgeGroup].spouse.map((premium, index) => (
                <td key={index}>{premium.toLocaleString()}</td>
              ))}
            </tr>
            {spouses.map((spouse, sIndex) => (
              <tr key={`spouse_${sIndex}`}>
                <td>Spouse {sIndex + 1}</td>
                {premiumData[spouse.ageGroup].spouse.map((premium, index) => (
                  <td key={index}>{premium.toLocaleString()}</td>
                ))}
              </tr>
            ))}
            {children.map((child, index) => (
              <tr key={`child_${index}`}>
                <td>Child {index + 1}</td>
                {child.above18
                  ? premiumData[principals[0].ageGroup].principal.map((premium, index) => (
                      <td key={index}>{premium.toLocaleString()}</td>
                    ))
                  : premiumData[child.ageGroup].child.map((premium, index) => (
                      <td key={index}>{premium.toLocaleString()}</td>
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

export default SPremiumTable;

