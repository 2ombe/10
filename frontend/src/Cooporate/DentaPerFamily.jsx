import React, { useContext, useEffect, useState } from 'react'
import { Form,Button, Col, Container, Row, Table } from 'react-bootstrap';
import {  useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import CheckOutCooporateSteps from '../component/CheckOutCooporateSteps';
const PremiumValuePerFamily = {
  "56,250": {
    Dental: 56250,
    M: 6824,
    "M+1": 8530,
    "M+2": 10663,
    "M+3": 13329,
    "M+4": 16661,
    "M+5": 20826,
    "M+6": 26032,
    "M+7": 32540,
    "M+8": 40676,
    "M+9": 50844,
    "M+10": 63556,
  },
  "75,000": {
    Dental: 75000,
    M: 10229,
    "M+1": 12786,
    "M+2": 15983,
    "M+3": 19978,
    "M+4": 24973,
    "M+5": 31216,
    "M+6": 39020,
    "M+7": 48775,
    "M+8": 60969,
    "M+9": 76211,
    "M+10": 95264,
  },
  "112,500": {
    Dental: 112500,
    M: 13634,
    "M+1": 17042,
    "M+2": 21302,
    "M+3": 26628,
    "M+4": 33285,
    "M+5": 41606,
    "M+6": 52008,
    "M+7": 65010,
    "M+8": 81263,
    "M+9": 101578,
    "M+10": 126973,
  },
  "150,000": {
    Dental: 150000,
    M: 17031,
    "M+1": 21289,
    "M+2": 26611,
    "M+3": 33263,
    "M+4": 41579,
    "M+5": 51974,
    "M+6": 64967,
    "M+7": 81209,
    "M+8": 101512,
    "M+9": 126890,
    "M+10": 158612,
  },
  "187,500": {
    Dental: 187500,
    M: 20436,
    "M+1": 25544,
    "M+2": 31930,
    "M+3": 39913,
    "M+4": 49891,
    "M+5": 62364,
    "M+6": 77955,
    "M+7": 97444,
    "M+8": 121805,
    "M+9": 152256,
    "M+10": 190321,
  },
  "225,000": {
    Dental: 225000,
    M: 30687,
    "M+1": 38358,
    "M+2": 47948,
    "M+3": 59935,
    "M+4": 74919,
    "M+5": 93648,
    "M+6": 117061,
    "M+7": 146326,
    "M+8": 182907,
    "M+9": 228634,
    "M+10": 285792,
  },
  "300,000": {
    Dental: 300000,
    M: 32694,
    "M+1": 40867,
    "M+2": 51084,
    "M+3": 63855,
    "M+4": 79819,
    "M+5": 99774,
    "M+6": 124717,
    "M+7": 155896,
    "M+8": 194871,
    "M+9": 243588,
    "M+10": 304485,
  },
  "375,000": {
    Dental: 375000,
    M: 42581,
    "M+1": 53226,
    "M+2": 66533,
    "M+3": 83166,
    "M+4": 103957,
    "M+5": 129946,
    "M+6": 162433,
    "M+7": 203041,
    "M+8": 253801,
    "M+9": 317252,
    "M+10": 396565,
  },
  "562,500": {
    Dental: 562500,
    M: 76716.816,
    "M+1": 95896,
    "M+2": 119870,
    "M+3": 149838,
    "M+4": 187297,
    "M+5": 234121,
    "M+6": 292651,
    "M+7": 365814,
    "M+8": 457268,
    "M+9": 571585,
    "M+10": 714481,
  },
};


const PremiumValuePerPerson = {
  "56,250": {
    Dental: 56250,
    M: 6824,
    "M+1": 6824*2,
    "M+2": 6824*3,
    "M+3": 6824*4,
    "M+4": 6824*5,
    "M+5": 6824*6,
    "M+6": 6824*7,
    "M+7": 6824*8,
    "M+8": 6824*9,
    "M+9": 6824*10,
    "M+10": 6824*11,
  },
  "75,000": {
    Dental: 75000,
    M: 10229,
    "M+1": 10229*2,
    "M+2": 10229*3,
    "M+3": 10229*4,
    "M+4": 10229*5,
    "M+5": 10229*6,
    "M+6": 10229*7,
    "M+7": 10229*8,
    "M+8": 10229*9,
    "M+9": 10229*10,
    "M+10": 10229*11,
  },
  "112,500": {
    Dental: 112500,
    M: 13634,
    "M+1": 13634*2,
    "M+2": 13634*3,
    "M+3": 13634*4,
    "M+4": 13634*5,
    "M+5": 13634*6,
    "M+6": 13634*7,
    "M+7": 13634*8,
    "M+8": 13634*9,
    "M+9": 13634*10,
    "M+10": 13634*11,
  },
  "150,000": {
    Dental: 150000,
    M: 17031,
    "M+1": 17031*2,
    "M+2": 17031*3,
    "M+3": 17031*4,
    "M+4": 17031*5,
    "M+5": 17031*6,
    "M+6": 17031*7,
    "M+7": 17031*8,
    "M+8": 17031*9,
    "M+9": 17031*10,
    "M+10":17031*11,
  },
  "187,500": {
    Dental: 187500,
    M: 20436,
    "M+1": 20436*2,
    "M+2": 20436*3,
    "M+3": 20436*4,
    "M+4": 20436*5,
    "M+5": 20436*6,
    "M+6": 20436*7,
    "M+7": 20436*8,
    "M+8": 20436*9,
    "M+9": 20436*10,
    "M+10":20436*11,
  },
  "225,000": {
    Dental: 225000,
    M: 30687,
    "M+1": 30687*2,
    "M+2":30687*3,
    "M+3": 30687*4,
    "M+4": 30687*5,
    "M+5": 30687*6,
    "M+6": 30687*7,
    "M+7": 30687*8,
    "M+8": 30687*9,
    "M+9": 30687*10,
    "M+10":30687*11,
  },
  "300,000": {
    Dental: 300000,
    M: 32694,
    "M+1": 32694*2,
    "M+2": 32694*3,
    "M+3": 32694*4,
    "M+4": 32694*5,
    "M+5": 32694*6,
    "M+6": 32694*7,
    "M+7": 32694*8,
    "M+8": 32694*9,
    "M+9": 32694*10,
    "M+10":32694*11,
  },
  "375,000": {
    Dental: 375000,
    M: 42581,
    "M+1": 42581*2,
    "M+2": 42581*3,
    "M+3": 42581*4,
    "M+4": 42581*5,
    "M+5": 42581*6,
    "M+6": 42581*7,
    "M+7": 42581*8,
    "M+8": 42581*9,
    "M+9": 42581*10,
    "M+10":42581*11,
  },
  "562,500": {
    Dental: 562500,
    M: 76717,
    "M+1": 76717*2,
    "M+2": 76717*3,
    "M+3": 76717*4,
    "M+4": 76717*5,
    "M+5": 76717*6,
    "M+6": 76717*7,
    "M+7": 76717*8,
    "M+8": 76717*9,
    "M+9": 76717*10,
    "M+10":76717*11,
  },
};
  
function DentaPerFamily() {
  const { state, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const savedDentalData = JSON.parse(localStorage.getItem('cooporateCart'))
  const savedDental = savedDentalData?.categories?.map(category => ({
    dentalId: category.id,
    dentalLimit: category.limit,
    dentalMembers: category.members,
    dentalDependencies: category.dependencies,
    dentalTotalDependencies: category.totalDependencies,
    dentalTotalPremium: category.totalPremium,
    dentalTotalPremiumM: category.totalPremiumM,
    selectedCategory: category.selectedCategory,
  })) || [
    { dentalId: 1, dentalLimit: '', dentalMembers: 0, dentalDependencies: {}, dentalTotalDependencies: {}, dentalTotalPremium: 0, dentalTotalPremiumM: 0, selectedCategory: "" }
  ]
  const [dentalCategories, setdentalCategories] = useState(savedDental);

  const calculateOverallDependenciesTotal = (dentalTotalDependencies) => {
    let overallTotal = 0;
    const labels = Object.keys(dentalTotalDependencies);

    for (let i = 0; i < labels.length; i++) {
      overallTotal += dentalTotalDependencies[labels[i]] || 0;
    }

    return overallTotal;
  };

  // Function to get premium data based on selected category
  const getPremiumData = (selectedCategory) => {
    return selectedCategory === "Per family" ? PremiumValuePerFamily : PremiumValuePerPerson;
  };

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('optCorp'));
    if (savedData) {
      setdentalCategories(savedData.dentalCategories);
    }
  }, []);

  const handleAddCategory = () => {
    const newCategory = { dentalId: dentalCategories.length + 1, dentalLimit: '', dentalMembers: 0, dentalDependencies: {}, dentalTotalDependencies: {}, dentalTotalPremiumValues: {}, premiumValues: {}, dentalTotalPremium: 0, dentalTotalPremiumM: 0, selectedCategory: "" };
    setdentalCategories([...dentalCategories, newCategory]);
  };

  const handledentalLimitChange = (dentalId, e) => {
    const newdentalCategories = dentalCategories.map(dentalCategory =>
      dentalCategory.dentalId === dentalId ? { ...dentalCategory, dentalLimit: e.target.value } : dentalCategory
    );
    setdentalCategories(newdentalCategories);
  };

  const handleAddMember = (dentalId) => {
    const newdentalCategories = dentalCategories.map(dentalCategory =>
      dentalCategory.dentalId === dentalId ? { ...dentalCategory, dentalMembers: dentalCategory.dentalMembers + 1 } : dentalCategory
    );
    setdentalCategories(newdentalCategories);
  };

  const handleselectedCategoryChange = (id, e) => {
    const newCategories = dentalCategories.map(dentalCategory =>
      dentalCategory.dentalId === id ? { ...dentalCategory, selectedCategory: e.target.value } : dentalCategory
    );
    setdentalCategories(newCategories);
  };

  const handleRemoveMember = (dentalId) => {
    const newdentalCategories = dentalCategories.map(dentalCategory =>
      dentalCategory.dentalId === dentalId && dentalCategory.dentalMembers > 0 ? {
        ...dentalCategory,
        dentalMembers: dentalCategory.dentalMembers - 1,
        dentalDependencies: { ...dentalCategory.dentalDependencies, [`M+${dentalCategory.dentalMembers}`]: undefined }
      } : dentalCategory
    );
    setdentalCategories(newdentalCategories);
  };

  const handleDependencyChange = (dentalId, label, e) => {
    const value = parseInt(e.target.value) || 0;
    const newdentalCategories = dentalCategories.map(dentalCategory =>
      dentalCategory.dentalId === dentalId ? { ...dentalCategory, dentalDependencies: { ...dentalCategory.dentalDependencies, [label]: value } } : dentalCategory
    );
    setdentalCategories(newdentalCategories);
  };

  const calculatedentalTotalPremiumValue = (dentalCategory) => {
    let dentalTotalPremiumValue = 0;
    const memberLabels = Array.from({ length: dentalCategory.dentalMembers + 1 }, (_, i) => (i === 0 ? 'M' : `M+${i}`));
    const premiumData = getPremiumData(dentalCategory.selectedCategory); // Get premium data based on selected category
    for (let i = 0; i < memberLabels.length; i++) {
      const label = memberLabels[i];
      const premiumValuePerMember = (premiumData[dentalCategory.dentalLimit]?.[label] || 0) * (dentalCategory.dentalDependencies[label] || 0);
      dentalTotalPremiumValue += premiumValuePerMember;
    }
    return dentalTotalPremiumValue;
  };

  useEffect(() => {
    const updateddentalCategories = dentalCategories.map(dentalCategory => {
      let updateddentalTotalDependencies = { ...dentalCategory.dentalTotalDependencies };
      const labels = Object.keys(dentalCategory.dentalDependencies);

      for (let i = 0; i < labels.length; i++) {
        const label = labels[i];
        const value = dentalCategory.dentalDependencies[label] || 0;
        let calculatedTotal = value;

        if (label !== 'M') {
          const numDependents = parseInt(label.slice(2));
          calculatedTotal += numDependents * value;
        }

        updateddentalTotalDependencies[label] = calculatedTotal;
      }

      let dentalTotalPremiumValue = calculatedentalTotalPremiumValue(dentalCategory);
      let dentalTotalPremiumMValue = dentalTotalPremiumValue;

      const premiumData = getPremiumData(dentalCategory.selectedCategory); // Get premium data based on selected category

      const dentalPremiumValues = Object.keys(dentalCategory.dentalDependencies).reduce((acc, key) => {
        acc[key] = premiumData[dentalCategory.dentalLimit]?.[key] || 0;
        return acc;
      }, {});

      const dentalTotalPremiumValues = Object.keys(dentalCategory.dentalDependencies).reduce((acc, key) => {
        acc[key] = (premiumData[dentalCategory.dentalLimit]?.[key] || 0) * (dentalCategory.dentalDependencies[key] || 0);
        return acc;
      }, {});

      return {
        ...dentalCategory,
        dentalTotalDependencies: updateddentalTotalDependencies,
        dentalTotalPremium: dentalTotalPremiumValue,
        dentalTotalPremiumM: dentalTotalPremiumMValue,
        dentalPremiumValues,
        dentalTotalPremiumValues,
      };
    });
    setdentalCategories(updateddentalCategories);
  }, [dentalCategories.map(dentalCategory => dentalCategory.dentalDependencies)]);

  const calculateOverallTotals = () => {
    let dentalOverallTotalPremium = 0;
    let dentalOverallDependenciesTotal = 0;

    dentalCategories.forEach(dentalCategory => {
      dentalOverallTotalPremium += dentalCategory.dentalTotalPremium;
      dentalOverallDependenciesTotal += calculateOverallDependenciesTotal(dentalCategory.dentalTotalDependencies);
    });

    return { dentalOverallTotalPremium, dentalOverallDependenciesTotal };
  };

  const handleSave = () => {
    const dentalCorp = { dentalCategories, dentalOverallTotals };
    console.log(dentalOverallTotals.dentalOverallDependenciesTotal);

    dispatch({ type: 'SET_CORP_DENTAL', payload: dentalCorp });
    localStorage.setItem('dentalCorp', JSON.stringify(dentalCorp));
    console.log('Cooporate dental:', dentalCorp);
    navigate('/cooporateOptical');
  };

  const renderCategoryTables = () => {
    return dentalCategories.map(dentalCategory => {
      const premiumData = getPremiumData(dentalCategory.selectedCategory); // Get premium data based on selected category

      return (
        <div key={dentalCategory.dentalId}>
          <Row className="my-4">
            <Col>
              <h5>Category {dentalCategory.dentalId}</h5>
              <Form>
                <Form.Group controldentalId={`dentalLimitSelect-${dentalCategory.dentalId}`}>
                  <Form.Label>Select Dental dentalLimit</Form.Label>
                  <Form.Control as="select" value={dentalCategory.dentalLimit} onChange={(e) => handledentalLimitChange(dentalCategory.dentalId, e)}>
                    <option value="">Select...</option>
                    {Object.keys(premiumData).map((dentalLimitValue) => (
                      <option key={dentalLimitValue} value={dentalLimitValue}>
                        {dentalLimitValue}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId={`selectedCategorySelect-${dentalCategory.dentalId}`} className="mt-3">
                  <Form.Label>Select Premium Category</Form.Label>
                  <Form.Control as="select" value={dentalCategory.selectedCategory} onChange={(e) => handleselectedCategoryChange(dentalCategory.dentalId, e)}>
                    <option value="">Select...</option>
                    <option value="Per family">Premium per family</option>
                    <option value="Per person">Premium per person</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <Row className="my-4">
            <Col>
              <Button style={{ marginRight: "1.2rem", background: "green" }} onClick={() => handleAddMember(dentalCategory.dentalId)}>
                Add Member
              </Button>
              <Button variant="danger" onClick={() => handleRemoveMember(dentalCategory.dentalId)}>
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
                  {Array.from({ length: dentalCategory.dentalMembers + 1 }, (_, i) => (i === 0 ? 'M' : `M+${i}`)).map((label) => (
                    <tr key={label}>
                      <td>{label}</td>
                      <td>{premiumData[dentalCategory.dentalLimit]?.[label]}</td>
                      <td>
                        <Form.Control type="number" value={dentalCategory.dentalDependencies[label] || ''} onChange={(e) => handleDependencyChange(dentalCategory.dentalId, label, e)} />
                      </td>
                      <td>{dentalCategory.dentalTotalDependencies[label]}</td>
                      <td>{(premiumData[dentalCategory.dentalLimit]?.[label] || 0) * (dentalCategory.dentalDependencies[label] || 0)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row className="my-4">
            <Col>
              <h4>Total Premium: {calculatedentalTotalPremiumValue(dentalCategory)}</h4>
              <h4>Total Beneficiaries: {calculateOverallDependenciesTotal(dentalCategory.dentalTotalDependencies)}</h4>
            </Col>
          </Row>
        </div>
      );
    });
  };

  const dentalOverallTotals = calculateOverallTotals();

  return (
    <div>
      <CheckOutCooporateSteps step1 step2 step3 step4 />
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

export default DentaPerFamily;

