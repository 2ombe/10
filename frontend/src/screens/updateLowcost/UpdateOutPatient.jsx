import React, { useContext, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import CheckOutRetailSteps from '../../component/CheckOutRetailSteps';


const outPatientOptions = [
  { limit: 1125000, premium: 195000 },
  { limit: 750000, premium: 177300 },
  { limit: 450000, premium: 151425 },
  { limit: 0, premium: 0 }
];

const UpdateOutPatientRetal = () => {
    const params = useParams()
    const {id:retailId}=params
  const [selectedOption, setSelectedOption] = useState(outPatientOptions[0]);
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleOptionChange = (event) => {
    const selected = outPatientOptions.find(option => option.limit === parseInt(event.target.value));
    setSelectedOption(selected);
  };

  const saveOutPatientAndNavigate = () => {
    dispatch({ type: "SET_OUT", payload: selectedOption });
    localStorage.setItem('outOption', JSON.stringify(selectedOption));
    navigate(`/updateLowcostDental/${retailId}`);
  };

  return (
    <div>
      <CheckOutRetailSteps step1 step2 step3 />
      <Container>
        <h2>Select Out Patient Premium</h2>
        <Form.Group>
          <Form.Label>Out Patient Option:</Form.Label>
          <Form.Control as="select" value={selectedOption.limit} onChange={handleOptionChange}>
            {outPatientOptions.map((option, index) => (
              <option key={index} value={option.limit}>
                Option {index + 1} - Limit: {option.limit.toLocaleString()} - Premium: {option.premium.toLocaleString()}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button variant="primary" onClick={saveOutPatientAndNavigate}>
          Save and Continue
        </Button>
      </Container>
    </div>
  );
};

export default UpdateOutPatientRetal;
