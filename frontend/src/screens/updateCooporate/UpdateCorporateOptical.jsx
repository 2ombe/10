import React, { useContext, useEffect, useState } from 'react'
import { Form, Button, Col, Container, Row, Table } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import CheckOutCooporateSteps from '../../component/CheckOutCooporateSteps';
const PremiumValuePerPerson = {
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

const PremiumValuePerFamily = {
  "56,250": {
    OPTICAL: 56250,
    M: 9638,
    "M+1": 12048,
    "M+2": 15060,
    "M+3": 18825,
    "M+4": 23531,
    "M+5": 29414,
    "M+6": 36768,
    "M+7": 45959,
    "M+8": 57449,
    "M+9": 71812,
    "M+10":89764
  },
  "75,000": {
    OPTICAL: 75000,
    M: 12851,
    "M+1": 16064,
    "M+2": 20080,
    "M+3": 25100,
    "M+4": 31375,
    "M+5": 39219,
    "M+6": 49023,
    "M+7": 61279,
    "M+8": 76599,
    "M+9": 95749,
    "M+10":119686
  },
  "112,500": {
    OPTICAL: 112500,
    M: 19421,
    "M+1": 24276,
    "M+2": 30345,
    "M+3": 37931,
    "M+4": 47414,
    "M+5": 59268,
    "M+6": 74084,
    "M+7": 92606,
    "M+8": 115757,
    "M+9": 144696,
    "M+10":180870
  },
  "150,000": {
    OPTICAL: 150000,
    M: 26000,
    "M+1": 32500,
    "M+2": 40625,
    "M+3": 50781,
    "M+4": 63476,
    "M+5": 79345,
    "M+6": 99181,
    "M+7": 123976,
    "M+8": 154970,
    "M+9": 193713,
    "M+10":242141
  },
  "187,500": {
    OPTICAL: 187500,
    M: 32569,
    "M+1": 40712,
    "M+2": 50890,
    "M+3": 63612,
    "M+4": 79515,
    "M+5": 99394,
    "M+6": 124242,
    "M+7": 155303,
    "M+8": 194128,
    "M+9": 242660,
    "M+10":303326
  },
  "225,000": {
    OPTICAL: 225000,
    M: 39139,
    "M+1": 48924,
    "M+2": 61155,
    "M+3": 76443,
    "M+4": 95554,
    "M+5": 119443,
    "M+6": 149303,
    "M+7": 186629,
    "M+8": 233286,
    "M+9": 291608,
    "M+10":364510
  },
  "300,000": {
    OPTICAL: 300000,
    M: 52185,
    "M+1": 65232,
    "M+2": 81539,
    "M+3": 101924,
    "M+4": 127405,
    "M+5": 159257,
    "M+6": 199071,
    "M+7": 248839,
    "M+8": 311048,
    "M+9": 388811,
    "M+10": 486013
  },
  "375,000": {
    OPTICAL: 375000,
    M: 64999,
    "M+1": 81249,
    "M+2": 101561,
    "M+3": 126952,
    "M+4": 158690,
    "M+5": 198362,
    "M+6": 247953,
    "M+7": 309941,
    "M+8": 387426,
    "M+9": 484282,
    "M+10":605353
  },
  "562,500": {
    OPTICAL: 562500,
    M: 97569,
    "M+1": 121961,
    "M+2": 152451,
    "M+3": 190564,
    "M+4": 238205,
    "M+5": 297756,
    "M+6": 372195,
    "M+7": 465243,
    "M+8": 581554,
    "M+9": 726943,
    "M+10":908679
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
    let opticalOverallTotal = 0;
    const labels = Object.keys(opticalTotalDependencies);

    for (let i = 0; i < labels.length; i++) {
      opticalOverallTotal += opticalTotalDependencies[labels[i]] || 0;
    }

    return opticalOverallTotal;
  };

// Function to get premium data based on selected category
const getPremiumData = (selectedCategory) => {
  return selectedCategory === "Per family" ? PremiumValuePerFamily : PremiumValuePerPerson;
};

  

   
    

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
  
  const handleselectedCategoryChange = (id, e) => {
    const newCategories = opticalCategories.map(opticalCategory =>
      opticalCategory.id === id ? { ...opticalCategory, selectedCategory: e.target.value } : opticalCategory
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
    const premiumData = getPremiumData(opticalCategory.selectedCategory)
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
  
        const premiumData = getPremiumData(opticalCategory.selectedCategory)
  
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
    }, [opticalCategories.map(opticalCategory => opticalCategory.opticalDependencies)]);
  
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
    return opticalCategories.map(opticalCategory => {
      const premiumData=getPremiumData(opticalCategory.selectedCategory)
      return(
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
      )
      
    });
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