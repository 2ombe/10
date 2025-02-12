import React, { useContext, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import CheckOutRetailSteps from '../component/CheckOutRetailSteps';

const opticalOptions = [
  { limit: 100000, premium: 39406 },
  { limit: 80000, premium: 31525 },
  { limit: 50000, premium: 19703 },
  { limit: 0, premium: 0 }
];

const LOpticalPremium = () => {
  const [selectedOption, setSelectedOption] = useState(opticalOptions[0]);
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleOptionChange = (event) => {
    const selected = opticalOptions.find(option => option.limit === parseInt(event.target.value));
    setSelectedOption(selected);
  };

  const saveOpticalAndNavigate = () => {
    dispatch({ type: "SET_OPTICAL", payload: selectedOption });
    localStorage.setItem('opticalOption', JSON.stringify(selectedOption));
    navigate('/lowcostMaternity');
  };

  return (
    <div>
        <CheckOutRetailSteps step1 step2 step3 step4 step5/>
    <Container>
      <h2>Select Optical Premium</h2>
      <Form.Group>
        <Form.Label>Optical Option:</Form.Label>
        <Form.Control as="select" value={selectedOption.limit} onChange={handleOptionChange}>
          {opticalOptions.map((option, index) => (
            <option key={index} value={option.limit}>
              Option {index + 1} - Limit: {option.limit.toLocaleString()} - Premium: {option.premium.toLocaleString()}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Button variant="primary" onClick={saveOpticalAndNavigate}>
        Save and Continue
      </Button>
    </Container>
    </div>
  );
};

export default LOpticalPremium;
