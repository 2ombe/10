import React, { useContext, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import CheckOutRetailSteps from '../../component/CheckOutRetailSteps';


const dentalOptions = [
  { limit: 100000, premium: 38323 },
  { limit: 80000, premium: 30658 },
  { limit: 50000, premium: 19161 },
  { limit: 0, premium: 0 }
];

const UpdateLDentalPremium = () => {
  const [selectedOption, setSelectedOption] = useState(dentalOptions[0]);
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
const params =useParams()
const {id:lowcostId}=params
  const handleOptionChange = (event) => {
    const selected = dentalOptions.find(option => option.limit === parseInt(event.target.value));
    setSelectedOption(selected);
  };

  const saveOpticalAndNavigate = () => {
    dispatch({ type: "SET_DENTAL", payload: selectedOption });
    localStorage.setItem('dentalOption', JSON.stringify(selectedOption));
    navigate(`/lowcostOptical/${lowcostId}`);
  };

  return (
    <div>
        <CheckOutRetailSteps step1 step2 step3 step4/>
    <Container>
      <h2>Select Dental Premium</h2>
      <Form.Group>
        <Form.Label>Dental Option:</Form.Label>
        <Form.Control as="select" value={selectedOption.limit} onChange={handleOptionChange}>
          {dentalOptions.map((option, index) => (
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

export default UpdateLDentalPremium;
