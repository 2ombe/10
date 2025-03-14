import React, { useContext, useEffect, useState } from 'react'
import { Form, Button, Col, Container, Row, Table } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import CheckOutCooporateSteps from '../../component/CheckOutCooporateSteps';
const optionThree = {
  "56,250": {
    OPTICAL: 56250,
    M: 9638,
    "M+1": 9638*2,
    "M+2": 9638*3,
    "M+3": 9638*4,
    "M+4": 9638*5,
    "M+5": 9638*6,
    "M+6": 9638*7,
    "M+7": 9638*8,
    "M+8": 9638*9,
    "M+9": 9638*10,
    "M+10":9638*11
  },
  "75,000": {
    OPTICAL: 75000,
    M: 12851,
    "M+1": 12851*2,
    "M+2": 12851*3,
    "M+3": 12851*4,
    "M+4": 12851*5,
    "M+5": 12851*6,
    "M+6": 12851*7,
    "M+7": 12851*8,
    "M+8": 12851*9,
    "M+9": 12851*10,
    "M+10":12851*11
  },
  "112,500": {
    OPTICAL: 112500,
    M: 19421,
    "M+1": 19421*2,
    "M+2": 19421*3,
    "M+3": 19421*4,
    "M+4": 19421*5,
    "M+5": 19421*6,
    "M+6": 19421*7,
    "M+7": 19421*8,
    "M+8": 19421*9,
    "M+9": 19421*10,
    "M+10":19421*11
  },
  "150,000": {
    OPTICAL: 150000,
    M: 26000,
    "M+1": 26000*2,
    "M+2": 26000*3,
    "M+3": 26000*4,
    "M+4": 26000*5,
    "M+5": 26000*6,
    "M+6": 26000*7,
    "M+7": 26000*8,
    "M+8": 26000*9,
    "M+9": 26000*10,
    "M+10":26000*11
  },
  "187,500": {
    OPTICAL: 187500,
    M: 32569,
    "M+1": 32569*2,
    "M+2": 32569*3,
    "M+3": 32569*4,
    "M+4": 32569*5,
    "M+5": 32569*6,
    "M+6": 32569*7,
    "M+7": 32569*8,
    "M+8": 32569*9,
    "M+9": 32569*10,
    "M+10":32569*11
  },
  "225,000": {
    OPTICAL: 225000,
    M: 39139,
    "M+1": 39139*2,
    "M+2": 39139*3,
    "M+3": 39139*4,
    "M+4": 39139*5,
    "M+5": 39139*6,
    "M+6": 39139*7,
    "M+7": 39139*8,
    "M+8": 39139*9,
    "M+9": 39139*10,
    "M+10":39139*11
  },
  "300,000": {
    OPTICAL: 300000,
    M: 52185,
    "M+1": 52185*2,
    "M+2": 52185*3,
    "M+3": 52185*4,
    "M+4": 52185*5,
    "M+5": 52185*6,
    "M+6": 52185*7,
    "M+7": 52185*8,
    "M+8": 52185*9,
    "M+9": 52185*10,
    "M+10": 52185*11
  },
  "375,000": {
    OPTICAL: 375000,
    M: 64999,
    "M+1": 64999*2,
    "M+2": 64999*3,
    "M+3": 64999*4,
    "M+4": 64999*5,
    "M+5": 64999*6,
    "M+6": 64999*7,
    "M+7": 64999*8,
    "M+8": 64999*9,
    "M+9": 64999*10,
    "M+10":64999*11
  },
  "562,500": {
    OPTICAL: 562500,
    M: 97569,
    "M+1": 97569*2,
    "M+2": 97569*3,
    "M+3": 97569*4,
    "M+4": 97569*5,
    "M+5": 97569*6,
    "M+6": 97569*7,
    "M+7": 97569*8,
    "M+8": 97569*9,
    "M+9": 97569*10,
    "M+10":97569*11
  },
};


const optionFour = {
  "56,250": {
    OPTICAL: 56250,
    M: 17423,
    "M+1": 17423*2,
    "M+2": 17423*3,
    "M+3": 17423*4,
    "M+4": 17423*5,
    "M+5": 17423*6,
    "M+6": 17423*7,
    "M+7": 17423*8,
    "M+8": 17423*9,
    "M+9": 17423*10,
    "M+10": 17423*11,
  },
  "75,000": {
    OPTICAL: 75000,
    M: 23231,
    "M+1": 23231*2,
    "M+2": 23231*3,
    "M+3": 23231*4,
    "M+4": 23231*5,
    "M+5": 23231*6,
    "M+6": 23231*7,
    "M+7": 23231*8,
    "M+8": 23231*9,
    "M+9": 23231*10,
    "M+10": 23231*11,
  },
  "150,000": {
    OPTICAL: 150000,
    M: 46461,
    "M+1": 46461*2,
    "M+2": 46461*3,
    "M+3": 46461*4,
    "M+4": 46461*5,
    "M+5": 46461*6,
    "M+6": 46461*7,
    "M+7": 46461*8,
    "M+8": 46461*9,
    "M+9": 46461*10,
    "M+10": 46461*11
  },
  "225,000": {
    OPTICAL: 225000,
    M: 69692,
    "M+1": 69692*2,
    "M+2": 69692*3,
    "M+3": 69692*4,
    "M+4": 69692*5,
    "M+5": 69692*6,
    "M+6": 69692*7,
    "M+7": 69692*8,
    "M+8": 69692*9,
    "M+9": 69692*10,
    "M+10": 69692*11,
  },
  "300,000": {
    OPTICAL: 300000,
    M: 92923,
    "M+1": 92923*2,
    "M+2": 92923*3,
    "M+3": 92923*4,
    "M+4": 92923*5,
    "M+5": 92923*6,
    "M+6": 92923*7,
    "M+7": 92923*8,
    "M+8": 92923*9,
    "M+9": 92923*10,
    "M+10": 92923*11,
  },
  "375,000": {
    OPTICAL: 375000,
    M: 116153,
    "M+1": 116153*2,
    "M+2": 116153*3,
    "M+3": 116153*4,
    "M+4": 116153*5,
    "M+5": 116153*6,
    "M+6": 116153*7,
    "M+7": 116153*8,
    "M+8": 116153*9,
    "M+9": 116153*10,
    "M+10": 116153*11,
  },
  "562,500": {
    OPTICAL: 562500,
    M: 174230,
    "M+1": 174230*2,
    "M+2": 174230*3,
    "M+3": 174230*4,
    "M+4": 174230*5,
    "M+5": 174230*6,
    "M+6": 174230*7,
    "M+7": 174230*8,
    "M+8": 174230*8,
    "M+9": 174230*10,
    "M+10": 174230*11,
  },
};

function UpdateCooporateOptical() {
      const { state, dispatch } = useContext(AuthContext);
      const { userInfo } = state;
            const params = useParams()
            const [loading, setLoading] = useState(true);
            const {id:corpotateId}=params
  const navigate = useNavigate();

  const [opticalCategories, setOpticalCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/cooporate/single/${corpotateId}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
      
       setOpticalCategories(data.optCorp.opticalCategories)
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [corpotateId,userInfo]);


  const calculateOverallDependenciesTotal = (opticalTotalDependencies) => {
    if (!opticalTotalDependencies) return 0;
  
    let opticalOverallTotal = 0;
    const labels = Object.keys(opticalTotalDependencies);
  
    for (let i = 0; i < labels.length; i++) {
      opticalOverallTotal += opticalTotalDependencies[labels[i]] || 0;
    }
  
    return opticalOverallTotal;
  };

  const premiumData = 
  opticalCategories.length > 0 && opticalCategories[0].opticalTotalDependencies
    ? calculateOverallDependenciesTotal(opticalCategories[0].opticalTotalDependencies) < 15 
      ?optionFour 
      : optionThree
    : null;
   
    

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('optCorp'));
    if (savedData) {
      setOpticalCategories(savedData.opticalCategories);
    }
  }, []);

  const handleAddCategory = () => {
    const newCategory = { opticalId: opticalCategories.length + 1, opticalLimit: '', opticalMembers: 0, opticalDependencies: {}, opticalTotalDependencies: {}, opticalTotalPremiumValues: {}, opticalPremiumValues: {}, opticalTotalPremium: 0, opticalTotalPremiumM: 0 };
    setOpticalCategories([...opticalCategories, newCategory]);
  };

  const handleLimitChange = (opticalId, e) => {
    const newCategories = opticalCategories.map(opticalCategory =>
      opticalCategory.opticalId === opticalId ? { ...opticalCategory, opticalLimit: e.target.value } : opticalCategory
    );
    setOpticalCategories(newCategories);
  };

  const handleAddMember = (opticalId) => {
    const newCategories = opticalCategories.map(opticalCategory =>
      opticalCategory.opticalId === opticalId ? { ...opticalCategory, opticalMembers: opticalCategory.opticalMembers + 1 } : opticalCategory
    );
    setOpticalCategories(newCategories);
  };

  const handleRemoveMember = (opticalId) => {
    const newCategories = opticalCategories.map(opticalCategory =>
      opticalCategory.opticalId === opticalId && opticalCategory.opticalMembers > 0 ? {
        ...opticalCategory,
        opticalMembers: opticalCategory.opticalMembers - 1,
        opticalDependencies: { ...opticalCategory.opticalDependencies, [`M+${opticalCategory.opticalMembers}`]: undefined }
      } : opticalCategory
    );
    setOpticalCategories(newCategories);
  };
  

  const handleDependencyChange = (opticalId, label, e) => {
    const value = parseInt(e.target.value) || 0;
    const newCategories = opticalCategories.map(opticalCategory =>
      opticalCategory.opticalId === opticalId ? { ...opticalCategory, opticalDependencies: { ...opticalCategory.opticalDependencies, [label]: value } } : opticalCategory
    );
    setOpticalCategories(newCategories);
  };

  const calculateTotalPremiumValue = (opticalCategory) => {
    let opticalTotalPremiumValue = 0;
    const memberLabels = Array.from({ length: opticalCategory.opticalMembers + 1 }, (_, i) => (i === 0 ? 'M' : `M+${i}`));
    for (let i = 0; i < memberLabels.length; i++) {
      const label = memberLabels[i];
      const premiumValuePerMember = (premiumData[opticalCategory.opticalLimit]?.[label] || 0) * (opticalCategory.opticalDependencies[label] || 0);
      opticalTotalPremiumValue += premiumValuePerMember;
    }
    return opticalTotalPremiumValue;
  };

  useEffect(() => {
    const updatedCategories = opticalCategories.map(opticalCategory => {
      let updatedTotalDependencies = { ...opticalCategory.opticalTotalDependencies };
      const labels = Object.keys(opticalCategory.opticalDependencies);

      for (let i = 0; i < labels.length; i++) {
        const label = labels[i];
        const value = opticalCategory.opticalDependencies[label] || 0;
        let calculatedTotal = value;

        if (label !== 'M') {
          const numDependents = parseInt(label.slice(2));
          calculatedTotal += numDependents * value;
        }

        updatedTotalDependencies[label] = calculatedTotal;
      }

      let opticalTotalPremiumValue = calculateTotalPremiumValue(opticalCategory);
      let opticalTotalPremiumMValue = opticalTotalPremiumValue;

      const opticalPremiumValues = Object.keys(opticalCategory.opticalDependencies).reduce((acc, key) => {
        acc[key] = premiumData[opticalCategory.opticalLimit]?.[key] || 0;
        return acc;
      }, {});

      const opticalTotalPremiumValues = Object.keys(opticalCategory.opticalDependencies).reduce((acc, key) => {
        acc[key] = (premiumData[opticalCategory.opticalLimit]?.[key] || 0) * (opticalCategory.opticalDependencies[key] || 0);
        return acc;
      }, {});

      return {
        ...opticalCategory,
        opticalTotalDependencies: updatedTotalDependencies,
        opticalTotalPremium: opticalTotalPremiumValue,
        opticalTotalPremiumM: opticalTotalPremiumMValue,
        opticalPremiumValues,
        opticalTotalPremiumValues,
      };
    });
    setOpticalCategories(updatedCategories);
  }, [JSON.stringify (opticalCategories.map(opticalCategory => opticalCategory.opticalDependencies))]);

  const calculateOverallTotals = () => {
    let opticalOverallTotalPremium = 0;
    let opticalOverallDependenciesTotal
 = 0;

    opticalCategories.forEach(opticalCategory => {
      opticalOverallTotalPremium += opticalCategory.opticalTotalPremium;
      opticalOverallDependenciesTotal
 += calculateOverallDependenciesTotal(opticalCategory.opticalTotalDependencies);
    });

    return { opticalOverallTotalPremium, opticalOverallDependenciesTotal
 };
  };

  const handleSave = () => {
    const opticalOverallTotals = calculateOverallTotals();
    const optCorp = { opticalCategories, opticalOverallTotals };
    console.log(opticalOverallTotals.opticalOverallDependenciesTotal
);
    dispatch({ type: 'SET_CORP_OPTICAL', payload: optCorp });
    localStorage.setItem("optCorp", JSON.stringify(optCorp));
    console.log('Cooporate optical:', optCorp);
    navigate(`/UpdateCooporateMaternity/${corpotateId}`);
  };

  
   const renderCategoryTables = () => {
    return opticalCategories.map(opticalCategory => (
      <div key={opticalCategory.opticalId}>
        <Row className="my-4">
          <Col>
            <h5>Category {opticalCategory.opticalId}</h5>
            <Form>
              <Form.Group controlId={`opticalLimitSelect-${opticalCategory.opticalId}`}>
                <Form.Label>Select Optical Limit</Form.Label>
                <Form.Control as="select" value={opticalCategory.opticalLimit} onChange={(e) => handleLimitChange(opticalCategory.opticalId, e)}>
                  <option value="">Select...</option>
                  {Object.keys(premiumData).map((opticalLimitValue) => (
                    <option key={opticalLimitValue} value={opticalLimitValue}>
                      {opticalLimitValue}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row className="my-4">
          <Col>
            <Button style={{ marginRight: "1.2rem", background: "green" }} onClick={() => handleAddMember(opticalCategory.opticalId)}>
              Add Member
            </Button>
            <Button variant="danger" onClick={() => handleRemoveMember(opticalCategory.opticalId)}>
              Remove Member
            </Button>
          </Col>
        </Row>
        <Row className="my-4">
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Member</th>
                  <th>Premium/family</th>
                  <th>Number of staffls/family</th>
                  <th>Total lives</th>
                  <th>Total Premium</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: opticalCategory.opticalMembers + 1 }, (_, i) => (i === 0 ? 'M' : `M+${i}`)).map((label) => (
                  <tr key={label}>
                    <td>{label}</td>
                    <td>{premiumData[opticalCategory.opticalLimit]?.[label]}</td>
                    <td>
                      <Form.Control type="number" value={opticalCategory.opticalDependencies[label] || ''} onChange={(e) => handleDependencyChange(opticalCategory.opticalId, label, e)} />
                    </td>
                    <td>{opticalCategory.opticalTotalDependencies[label]}</td>
                    <td>{(premiumData[opticalCategory.opticalLimit]?.[label] || 0) * (opticalCategory.opticalDependencies[label] || 0)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row className="my-4">
          <Col>
            <h4>Total Premium Value: {calculateTotalPremiumValue(opticalCategory)}</h4>
            <h4>Overall Dependencies Total: {calculateOverallDependenciesTotal(opticalCategory.opticalTotalDependencies)}</h4>
          </Col>
        </Row>
      </div>
    ));
  };
  
  const opticalOverallTotals = calculateOverallTotals();

  return (
    <div>
      <CheckOutCooporateSteps step1 step2 step3 step4 step5 />
      <Container>
        {renderCategoryTables()}
        <Row className="my-4">
          <Col>
            <Button variant="primary" onClick={handleAddCategory}>
              Add Category
            </Button>
          </Col>
        </Row>
        <Row className="my-4">
          <Col>
            <Button variant="success" onClick={handleSave}>
              Save And Continue
            </Button>
          </Col>
          <Col>
            <Button variant="success" onClick={() => navigate('/company')}>Back</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
  
}

export default UpdateCooporateOptical