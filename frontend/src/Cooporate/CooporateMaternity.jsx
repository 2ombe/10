import React, { useContext, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import CheckOutCooporateSteps from '../component/CheckOutCooporateSteps';

const options = [
  {
    MaternityCoverLimit: 225000,
    RatePerFamily: 21617,
    GroupMinimumPremium: 799847,
  },
  {
    MaternityCoverLimit: 300000,
    RatePerFamily: 28821,
    GroupMinimumPremium: 1066371,
  },
  {
    MaternityCoverLimit: 337500,
    RatePerFamily: 32426,
    GroupMinimumPremium: 1199771,
  },
  {
    MaternityCoverLimit: 375000,
    RatePerFamily: 36024,
    GroupMinimumPremium: 1332895,
  },
  {
    MaternityCoverLimit: 412500,
    RatePerFamily: 39630,
    GroupMinimumPremium: 1466295,
  },
  {
    MaternityCoverLimit: 450000,
    RatePerFamily: 43228,
    GroupMinimumPremium: 1599419,
  },
  {
    MaternityCoverLimit: 487500,
    RatePerFamily: 46833,
    GroupMinimumPremium: 1732819,
  },
  {
    MaternityCoverLimit: 525000,
    RatePerFamily: 50438,
    GroupMinimumPremium: 1866218,
  },
  {
    MaternityCoverLimit: 562500,
    RatePerFamily: 54036,
    GroupMinimumPremium: 1999343,
  },
  {
    MaternityCoverLimit: 600000,
    RatePerFamily: 57642,
    GroupMinimumPremium: 2132742,
  },
  {
    MaternityCoverLimit: 637500,
    RatePerFamily: 61247,
    GroupMinimumPremium: 2266142,
  },
  {
    MaternityCoverLimit: 675000,
    RatePerFamily: 64845,
    GroupMinimumPremium: 2399266,
  },
  {
    MaternityCoverLimit: 712500,
    RatePerFamily: 68450,
    GroupMinimumPremium: 2532666,
  },
  {
    MaternityCoverLimit: 750000,
    RatePerFamily: 72048,
    GroupMinimumPremium: 2665790,
  },
  {
    MaternityCoverLimit: 825000,
    RatePerFamily: 79259,
    GroupMinimumPremium: 2932589,
  },
  {
    MaternityCoverLimit: 900000,
    RatePerFamily: 86463,
    GroupMinimumPremium: 3199114,
  },
  {
    MaternityCoverLimit: 975000,
    RatePerFamily: 93666,
    GroupMinimumPremium: 3465638,
  },
  {
    MaternityCoverLimit: 1050000,
    RatePerFamily: 100869,
    GroupMinimumPremium: 3732162,
  },
  {
    MaternityCoverLimit: 1125000,
    RatePerFamily: 108080,
    GroupMinimumPremium: 3998961,
  },
  {
    MaternityCoverLimit: 1312500,
    RatePerFamily: 126092,
    GroupMinimumPremium: 4665408,
  },
  {
    MaternityCoverLimit: 1500000,
    RatePerFamily: 144104,
    GroupMinimumPremium: 5331856,
  },
  {
    MaternityCoverLimit: 1875000,
    RatePerFamily: 180128,
    GroupMinimumPremium: 6664751,
  },
  {
    MaternityCoverLimit: 2250000,
    RatePerFamily: 216153,
    GroupMinimumPremium: 7997646,
  },
  {
    MaternityCoverLimit: 2625000,
    RatePerFamily: 252177,
    GroupMinimumPremium: 9330542,
  },
  {
    MaternityCoverLimit: 3000000,
    RatePerFamily: 288201,
    GroupMinimumPremium: 10663437,
  },
  {
    MaternityCoverLimit: 3375000,
    RatePerFamily: 324233,
    GroupMinimumPremium: 11996607,
  },
  {
    MaternityCoverLimit: 3750000,
    RatePerFamily: 360257,
    GroupMinimumPremium: 13329502,
  },
];


const CooporateMaternity = () => {
  const { state, dispatch } = useContext(AuthContext);
  const [categories, setCategories] = useState([{ id: 1, selectedTripletIndex: 0 }]);
  const navigate = useNavigate();

  const handleCategoryChange = (id, e) => {
    const newCategories = categories.map(category =>
      category.id === id ? { ...category, selectedTripletIndex: parseInt(e.target.value, 10) } : category
    );
    setCategories(newCategories);
  };

  const handleAddCategory = () => {
    const newCategory = { id: categories.length + 1, selectedTripletIndex: 0 };
    setCategories([...categories, newCategory]);
  };

  const handleSaveAndContinue = () => {
    const selectedTriplets = categories.map(category => options[category.selectedTripletIndex]);
    const totalRatePerFamily = calculateTotalRatePerFamily();
    localStorage.setItem('totalRatePerFamily', totalRatePerFamily);
    dispatch({ type: "SET_SELECTED_TRIPLET", payload: selectedTriplets });
    dispatch({type:"SET_RATE_PER_FAMILY",payload: totalRatePerFamily});
    console.log("Saved Triplets:", selectedTriplets);
    navigate("/corpBenefits");
  };

  const calculateTotalRatePerFamily = () => {
    let total = 0;
    categories.forEach(category => {
      total += options[category.selectedTripletIndex].RatePerFamily;
    });
    return total;
  };

  const renderCategoryForms = () => {
    return categories.map(category => (
      <div key={category.id}>
        <h5>Category {category.id}</h5>
        <Form.Group controlId={`formTriplet-${category.id}`}>
          <Form.Label>Select Maternity plan:</Form.Label>
          <Form.Select value={category.selectedTripletIndex} onChange={(e) => handleCategoryChange(category.id, e)}>
            <option value="">Select Maternity plan</option>
            {options.map((option, index) => (
              <option key={index} value={index}>
                {`MaternityCoverLimit: ${option.MaternityCoverLimit.toLocaleString()}, RatePerFamily: ${option.RatePerFamily.toLocaleString()}, GroupMinimumPremium: ${option.GroupMinimumPremium.toLocaleString()}`}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </div>
    ));
  };

  return (
    <div>
      <CheckOutCooporateSteps step1 step2 step3 step4 step5 step6 />
      <Container>
        {renderCategoryForms()}
        <Row className="mt-3">
          <Col>
            <Button variant="primary" onClick={handleAddCategory}>
              Add Category
            </Button>
          </Col>
        </Row>
        <Row className='mt-3'>
          <Col>
            <Button variant="success" onClick={handleSaveAndContinue}>
              Save And Continue
            </Button>
          </Col>
          <Col>
            <Button variant='success' onClick={() => navigate('/cooporateOptical')}>Back</Button>
          </Col>
        </Row>
        <Row className='mt-3'>
          <Col>
            <p>Total Rate Per Family: {calculateTotalRatePerFamily().toLocaleString()}</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CooporateMaternity;
