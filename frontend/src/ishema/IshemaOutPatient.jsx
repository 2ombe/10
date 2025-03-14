import React, { useContext, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import CheckOutIshemaSteps from '../component/CheckOutIshemaSteps';

const outPatientOptions = [
  { limit: 850000 , premium: 307659  },
  { limit: 1275000 , premium: 395420 },
  { limit:1700000, premium: 418649   },
  { limit: 0, premium: 0 }
];

const IshemaOutPatient = () => {
  const [selectedOption, setSelectedOption] = useState(outPatientOptions[0]);
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleOptionChange = (event) => {
    const selected = outPatientOptions.find(option => option.limit === parseInt(event.target.value));
    setSelectedOption(selected);
  };

  const saveOutPatientAndNavigate= () => {
    dispatch({ type: "SET_ISHEMA_OUT", payload: selectedOption });
    localStorage.setItem('outIshemaOption', JSON.stringify(selectedOption));
    console.log(selectedOption);
   navigate('/ishema');
  };

  return (
    <div>
        <CheckOutIshemaSteps step1 step2/>
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

export default IshemaOutPatient
