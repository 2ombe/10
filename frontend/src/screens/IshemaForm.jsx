import React, { useContext, useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Table, Card } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const defaultValues = {
  'Option 1': {
    inpatientLimit: 25000,
    outpatientLimit: 25000,
    totalInpatientPremium: 0,
    totalOutpatientPremium: 0,
  },
  'Option 2': {
    inpatientLimit: 45000,
    outpatientLimit: 45000,
    totalInpatientPremium: 0,
    totalOutpatientPremium: 0,
  },
  'Option 3': {
    inpatientLimit: 60000,
    outpatientLimit: 60000,
    totalInpatientPremium: 0,
    totalOutpatientPremium: 0,
  },
  'Option 4': {
    inpatientLimit: 80000,
    outpatientLimit: 80000,
    totalInpatientPremium: 0,
    totalOutpatientPremium: 0,
  }
};

const calculatePremiums = (optionData, members) => {
  const totalInpatientPremium = optionData.totalInpatientPremium;
  const totalOutpatientPremium = optionData.totalOutpatientPremium;
  const totalInpatientLimit = optionData.inpatientLimit;
  const totalOutPatientLimit = optionData.outpatientLimit;
  const basicPremium = (totalInpatientPremium + totalOutpatientPremium) * members;
  const mituelleDeSante = basicPremium * 0.05;
  const administrationFees = 18000 * members;
  const totalPremium = basicPremium + mituelleDeSante + administrationFees;

  return { basicPremium, mituelleDeSante, administrationFees, totalPremium, totalInpatientLimit, totalOutPatientLimit };
};

function IshemaForm() {
  const { state, dispatch } = useContext(AuthContext);
  const { ishemaCart } = state;
  const members = (ishemaCart.principalCount || 0) + (ishemaCart.spouseCount || 0);
console.log(ishemaCart);

  const navigate = useNavigate();
  const [quotationData, setQuotationData] = useState({
    benefits:ishemaCart.ishemaBenefitOptions,
    beneficiaryInfo:ishemaCart.ishemaInfo,
    plan: 'Ishema Plan',
    options: {
      'Option 1': {
        inpatientLimit: defaultValues['Option 1'].inpatientLimit,
        outpatientLimit: defaultValues['Option 1'].outpatientLimit,
        totalInpatientPremium: ishemaCart.totalPremium[0] ,
        totalOutpatientPremium: (ishemaCart.outOption.limit || 0) * members,
        basicPremium: 0,
        mituelleDeSante: 0,
        administrationFees: 0,
        totalPremium: 0,
      },
      'Option 2': {
        inpatientLimit: defaultValues['Option 2'].inpatientLimit,
        outpatientLimit: defaultValues['Option 2'].outpatientLimit,
        totalInpatientPremium: ishemaCart.totalPremium[0],
        totalOutpatientPremium: (ishemaCart.outOption.limit || 0) * members,
        basicPremium: 0,
        mituelleDeSante: 0,
        administrationFees: 0,
        totalPremium: 0,
      },
      'Option 3': {
        inpatientLimit: defaultValues['Option 3'].inpatientLimit,
        outpatientLimit: defaultValues['Option 3'].outpatientLimit,
        totalInpatientPremium: ishemaCart.totalPremium[0],
        totalOutpatientPremium: (ishemaCart.outOption.limit || 0) * members,
        basicPremium: 0,
        mituelleDeSante: 0,
        administrationFees: 0,
        totalPremium: 0,
      },
      'Option 4': {
        inpatientLimit: defaultValues['Option 4'].inpatientLimit,
        outpatientLimit: defaultValues['Option 4'].outpatientLimit,
        totalInpatientPremium: ishemaCart.totalPremium[0],
        totalOutpatientPremium: (ishemaCart.outOption.limit || 0) * members,
        basicPremium: 0,
        mituelleDeSante: 0,
        administrationFees: 0,
        totalPremium: 0,
      }
    },
  });

  useEffect(() => {
    const updatedOptions = { ...quotationData.options };

    Object.keys(defaultValues).forEach((option) => {
      const updatedPremiums = calculatePremiums(updatedOptions[option], members);
      updatedOptions[option] = { ...updatedOptions[option], ...updatedPremiums };
    });

    setQuotationData((prevData) => ({
      ...prevData,
      options: updatedOptions,
    }));
  }, [members, quotationData.options]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/ishema', quotationData, {
        headers: { Authorization: `Bearer ${state.userInfo.token}` },
      });
      navigate(`/ishema/${res.data._id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
          <h2>Ishema</h2>
          <Row>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Client Info</Card.Title>
              <Card.Text>
                <strong>Client Names:</strong> {ishemaCart.ishemaInfo.CUSTOMER_NAME}
                <br />
                <strong>Client ID:</strong> {ishemaCart.ishemaInfo.CUSTOMER_ID}
                <br />
               
              </Card.Text>
             
            </Card.Body>
          </Card>
        </Row>

        <Row>
        <Card className="mb-3">
            <Card.Body>
              <Card.Title>Benefits</Card.Title>
              <Card.Text>
                {ishemaCart.ishemaBenefitOptions
.length === 0 ? (
                  <p>No benefits selected.</p>
                ) : (
                  <ul>
                    {ishemaCart.ishemaBenefitOptions
.map((benefit, index) => (
                      <li key={index}>{benefit.label}</li>
                    ))}
                  </ul>
                )}
              </Card.Text>
            </Card.Body>
          </Card>
      </Row>
      <Row className="justify-content-md-center">
        <Col md={12}>
          <Form onSubmit={handleSubmit}>
            <Table bordered>
              <thead>
                <tr>
                  <th></th>
                  <th>Option 1</th>
                  <th>Option 2</th>
                  <th>Option 3</th>
                  <th>Option 4</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(defaultValues['Option 1']).map((attribute, index) => (
                  <tr key={index}>
                    <td>{attribute.replace(/([A-Z])/g, ' $1').toUpperCase()}</td>
                    {Object.keys(defaultValues).map((option) => (
                      <td key={option}>
                        <Form.Control
                          type="number"
                          name={attribute}
                          value={quotationData.options[option][attribute]}
                          onChange={(e) => {
                            const updatedOptions = { ...quotationData.options };
                            updatedOptions[option][attribute] = parseInt(e.target.value, 10);
                            setQuotationData({ ...quotationData, options: updatedOptions });
                          }}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td>BASIC PREMIUM</td>
                  {Object.keys(defaultValues).map((option) => (
                    <td key={option}>
                      <Form.Control
                        type="number"
                        value={quotationData.options[option].basicPremium}
                        readOnly
                      />
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>MITUELLE DE SANTE</td>
                  {Object.keys(defaultValues).map((option) => (
                    <td key={option}>
                      <Form.Control
                        type="number"
                        value={quotationData.options[option].mituelleDeSante}
                        readOnly
                      />
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>ADMINISTRATION FEES</td>
                  {Object.keys(defaultValues).map((option) => (
                    <td key={option}>
                      <Form.Control
                        type="number"
                        value={quotationData.options[option].administrationFees}
                        readOnly
                      />
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>TOTAL PREMIUM</td>
                  {Object.keys(defaultValues).map((option) => (
                    <td key={option}>
                      <Form.Control
                        type="number"
                        value={quotationData.options[option].totalPremium}
                        readOnly
                      />
                    </td>
                  ))}
                </tr>
              </tbody>
            </Table>
            <Button variant="primary" type="submit" className="mt-3">
              Save Quotation
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default IshemaForm;
