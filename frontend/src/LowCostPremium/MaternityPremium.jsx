import React, { useContext, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import CheckOutRetailSteps from '../component/CheckOutRetailSteps';

const maternityOptions = [
  { limit: 500000, premium: 90784 },
  { limit: 300000, premium: 54470 },
  { limit: 200000, premium: 36314 },
  { limit: 0, premium: 0 }
];

const LMaternityPremium = () => {
  const [selectedOption, setSelectedOption] = useState(maternityOptions[0]);
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleOptionChange = (event) => {
    const selected = maternityOptions.find(option => option.limit === parseInt(event.target.value));
    setSelectedOption(selected);
  };

  const saveMaternityAndNavigate = () => {
    dispatch({ type: "SET_MATERNITY", payload: selectedOption });
    localStorage.setItem('maternityOption', JSON.stringify(selectedOption));
    navigate('/lowcost');
  };

  return (
    <div>
        <CheckOutRetailSteps step1 step2 step3 step4 step5 step6/>
    <Container>
      <h2>Select Maternity Premium</h2>
      <Form.Group>
        <Form.Label>Maternity Option:</Form.Label>
        <Form.Control as="select" value={selectedOption.limit} onChange={handleOptionChange}>
          {maternityOptions.map((option, index) => (
            <option key={index} value={option.limit}>
              Option {index + 1} - Limit: {option.limit.toLocaleString()} - Premium: {option.premium.toLocaleString()}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Button variant="primary" onClick={saveMaternityAndNavigate}>
        Save and Continue to Optical
      </Button>
    </Container>
    </div>
  );
};

export default LMaternityPremium;
