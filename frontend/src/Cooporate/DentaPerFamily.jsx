import React, { useContext, useEffect, useState } from 'react'
import { Form,Button, Col, Container, Row, Table } from 'react-bootstrap';
import {  useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import CheckOutCooporateSteps from '../component/CheckOutCooporateSteps';
const optionOne = {
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
    M: 71863,
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



const optionTwo = {
  "56,250": { Dental: 56250, M: 11151, "M+1": 13938, "M+2": 17425, "M+3": 21781, "M+4": 27223, "M+5": 34032, "M+6": 42536, "M+7": 53174, "M+8": 1107736, "M+9": 1384681 },
  "75,000": { Dental: 75000, M: 14868, "M+1": 18585, "M+2": 23231, "M+3": 29038, "M+4": 36298, "M+5": 45372, "M+6": 56715, "M+7": 70894, "M+8": 1107736, "M+9": 1384681 },
  "150,000": { Dental: 150000, M: 29735, "M+1": 37169, "M+2": 46461, "M+3": 58077, "M+4": 72596, "M+5": 90745, "M+6": 113431, "M+7": 141788, "M+8": 177236, "M+9": 221545 },
  "225,000": { Dental: 225000, M: 44603, "M+1": 55754, "M+2": 69692, "M+3": 87115, "M+4": 108894, "M+5": 136117, "M+6": 170146, "M+7": 212683, "M+8": 692327, "M+9": 567151 },
  "300,000": { Dental: 300000, M: 59470, "M+1": 74438, "M+2": 92923, "M+3": 116153, "M+4": 145191, "M+5": 181489, "M+6": 226862, "M+7": 283577, "M+8": 1038540, "M+9": 567151 },
  "375,000": { Dental: 375000, M: 74338, "M+1": 92923, "M+2": 116153, "M+3": 145191, "M+4": 181489, "M+5": 226862, "M+6": 283577, "M+7": 354471, "M+8": 443089, "M+9": 553861 },
  "562,500": { Dental: 562500, M: 111507, "M+1": 139384, "M+2": 174233, "M+3": 217788, "M+4": 272233, "M+5": 340290, "M+6": 425362, "M+7": 531710, "M+8": 664647, "M+9": 830820 }
};


  
function DentaPerFamily(selectedCategory) {
      const { state, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

 const savedDentalData=JSON.parse(localStorage.getItem('cooporateCart'))
 const savedDental = savedDentalData?.categories?.map(category=>({
    dentalId: category.id,
       dentalLimit: category.limit,
       dentalMembers: category.members,
       dentalDependencies: category.dependencies,
       dentalTotalDependencies: category.totalDependencies,
       dentalTotalPremium: category.totalPremium,
       dentalTotalPremiumM: category.totalPremiumM,
       operationalArea: category.operationalArea,
       selectedCategory:selectedCategory
 }))||[
     { dentalId: 1, dentalLimit: '', dentalMembers: 0, dentalDependencies: {}, dentalTotalDependencies: {}, dentalTotalPremium: 0, dentalTotalPremiumM: 0,operationalArea:"",selectedCategory:selectedCategory }
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

  const premiumData = calculateOverallDependenciesTotal(dentalCategories[0].dentalTotalDependencies) < 15 ? optionOne : optionTwo;

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('optCorp'));
    if (savedData) {
      setdentalCategories(savedData.dentalCategories);
    }
  }, []);

  const handleAddCategory = () => {
    const newCategory = { dentalId: dentalCategories.length + 1, dentalLimit: '', dentalMembers: 0, dentalDependencies: {}, dentalTotalDependencies: {}, dentalTotalPremiumValues: {}, premiumValues: {}, dentalTotalPremium: 0, dentalTotalPremiumM: 0 };
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
   const handleOperationalAreaChange = (id, e) => {
    const newCategories = dentalCategories.map(dentalCategory =>
      dentalCategory.id === id ? { ...dentalCategory, operationalArea: e.target.value } : dentalCategory
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
        selectedCategory:selectedCategory
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
      const dentalCorp = {dentalCategories,dentalOverallTotals};
      console.log(dentalOverallTotals.dentalOverallDependenciesTotal);

    dispatch({ type: 'SET_CORP_DENTAL', payload: dentalCorp });
    localStorage.setItem('dentalCorp', JSON.stringify(dentalCorp));
    console.log('Cooporate dental:', dentalCorp);
    navigate('/cooporateOptical');
  };

  const renderCategoryTables = () => {
    return dentalCategories.map(dentalCategory => (
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
             <Form.Group controlId={`operationalAreaSelect-${dentalCategories.id}`} className="mt-3">
                                           <Form.Label>Select Operational Area</Form.Label>
                                           <Form.Control as="select" value={dentalCategories.operationalArea} onChange={(e) => handleOperationalAreaChange(dentalCategories.id, e)}>
                                             <option value="">Select...</option>
                                             <option value="Rwanda">Rwanda</option>
                                             <option value="East Africa">East Africa</option>
                                             <option value="India">India</option>
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
    ));
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

