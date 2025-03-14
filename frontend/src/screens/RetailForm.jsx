// src/components/QuotationForm.js
import React, { useContext, useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Table, Card } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CheckOutRetailSteps from '../component/CheckOutRetailSteps';

const defaultValues = {
  'Bronze': {
    inpatientLimit: 3750000,
    outpatientLimit: 1125000,
    DentalLimit: 150000,
    opticalLimit: 150000,
    maternityLimit: 300000,
    totalInpatientPremium: 0,
    totalOutpatientPremium: 0,
  },
  'Silver': {
    inpatientLimit: 7500000,
    outpatientLimit: 1125000,
    DentalLimit: 150000,
    opticalLimit: 150000,
    maternityLimit: 300000,
    totalInpatientPremium: 0,
    totalOutpatientPremium: 0,
  },
  'Gold': {
    inpatientLimit: 15000000,
    outpatientLimit: 1125000,
    DentalLimit: 150000,
    opticalLimit: 150000,
    maternityLimit: 300000,
    totalInpatientPremium: 0,
    totalOutpatientPremium: 0,
  },
  'Platinum': {
    inpatientLimit: 22500000,
    outpatientLimit: 1125000,
    DentalLimit: 150000,
    opticalLimit: 150000,
    maternityLimit: 300000,
    totalInpatientPremium: 0,
    totalOutpatientPremium: 0,
  },
  'Platinum Plus': {
    inpatientLimit: 37500000,
    outpatientLimit: 1125000,
    DentalLimit: 150000,
    opticalLimit: 150000,
    maternityLimit: 750000, 
    totalInpatientPremium: 0,
    totalOutpatientPremium: 0,
  },
};

const calculatePremiums = (optionData, members) => {
  const totalInpatientPremium = optionData.totalInpatientPremium;
  const totalOutpatientPremium = optionData.totalOutpatientPremium;
  const dentalPremium = optionData.dentalPremium;
  const opticalPremium = optionData.opticalPremium;
  const maternityPremium = optionData.maternityPremium;
  const totalInpatientLimit = optionData.inpatientLimit;
  const totalOutPatientLimit = optionData.outpatientLimit;


  const basicPremium =
    totalInpatientPremium +
    totalOutpatientPremium +
    dentalPremium +
    opticalPremium +
    maternityPremium;
  const mituelleDeSante = basicPremium * 0.05;
  const administrationFees = 18000 * members;
  const totalPremium = basicPremium + mituelleDeSante + administrationFees;

  return { basicPremium, mituelleDeSante, administrationFees, totalPremium, totalInpatientLimit, totalOutPatientLimit };
};

function RetailForm() {
  const { state, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const { cart,blockerInfo } = state;
  const totalMembers=JSON.parse(localStorage.getItem('totalMembers'))
const realTotal =totalMembers-1
console.log(realTotal);

  const [quotationData, setQuotationData] = useState({
    totalMembers:realTotal,
    agentData:blockerInfo,
    beneficiaryInfo:cart.retailInfo,
    children:cart.children,
    principalAgeGroup:cart.principalAgeGroup,
    spouseAgeGroup:cart.spouseAgeGroup,
    plan: 'Retail Quotation',
    options: {
      'Bronze': {
        inpatientLimit: defaultValues['Bronze'].inpatientLimit,
        outpatientLimit: defaultValues['Bronze'].outpatientLimit,
        DentalLimit: defaultValues['Bronze'].DentalLimit,
        opticalLimit: defaultValues['Bronze'].opticalLimit,
        maternityLimit: defaultValues['Bronze'].maternityLimit,
        totalInpatientPremium: cart.totalPremium[0],
        totalOutpatientPremium: cart.outOption.premium*realTotal,
        dentalPremium: cart.dentalOption.premium*realTotal,
        opticalPremium: cart.opticalOption.premium*realTotal,
        maternityPremium: cart.maternityOption.premium,
        basicPremium: 0,
        mituelleDeSante: 0,
        administrationFees: 0,
        totalPremium: 0,
      },
      'Silver': {
        inpatientLimit: defaultValues['Silver'].inpatientLimit,
        outpatientLimit: defaultValues['Silver'].outpatientLimit,
        totalInpatientPremium: cart.totalPremium[1],
        DentalLimit: defaultValues['Silver'].DentalLimit,
        opticalLimit: defaultValues['Silver'].opticalLimit,
        maternityLimit: defaultValues['Silver'].maternityLimit,
        totalOutpatientPremium: cart.outOption.premium*realTotal,
        dentalPremium: cart.dentalOption.premium*realTotal,
        opticalPremium: cart.opticalOption.premium*realTotal,
        maternityPremium: cart.maternityOption.premium,
        basicPremium: 0,
        mituelleDeSante: 0,
        administrationFees: 0,
        totalPremium: 0,
      },
      'Gold': {
        inpatientLimit: defaultValues['Gold'].inpatientLimit,
        outpatientLimit: defaultValues['Gold'].outpatientLimit,
        totalInpatientPremium: cart.totalPremium[2],
        DentalLimit: defaultValues['Gold'].DentalLimit,
        opticalLimit: defaultValues['Gold'].opticalLimit,
        maternityLimit: defaultValues['Gold'].maternityLimit,
        totalOutpatientPremium: cart.outOption.premium*realTotal,
        dentalPremium: cart.dentalOption.premium*realTotal,
        opticalPremium: cart.opticalOption.premium*realTotal,
        maternityPremium: cart.maternityOption.premium,
        basicPremium: 0,
        mituelleDeSante: 0,
        administrationFees: 0,
        totalPremium: 0,
      },
      'Platinum': {
        inpatientLimit: defaultValues['Platinum'].inpatientLimit,
        outpatientLimit: defaultValues['Platinum'].outpatientLimit,
        totalInpatientPremium: cart.totalPremium[3],
        DentalLimit: defaultValues['Platinum'].DentalLimit,
        opticalLimit: defaultValues['Platinum'].opticalLimit,
        maternityLimit: defaultValues['Platinum'].maternityLimit,
        totalOutpatientPremium: cart.outOption.premium*realTotal,
        dentalPremium: cart.dentalOption.premium*realTotal,
        opticalPremium: cart.opticalOption.premium*realTotal,
        maternityPremium: cart.maternityOption.premium,
        basicPremium: 0,
        mituelleDeSante: 0,
        administrationFees: 0,
        totalPremium: 0,
      },
      'Platinum Plus': {
        inpatientLimit: defaultValues['Platinum Plus'].inpatientLimit,
        outpatientLimit: defaultValues['Platinum Plus'].outpatientLimit,
        totalInpatientPremium: cart.totalPremium[4],
        DentalLimit: defaultValues['Platinum Plus'].DentalLimit,
        opticalLimit: defaultValues['Platinum Plus'].opticalLimit,
        maternityLimit: defaultValues['Platinum Plus'].maternityLimit,
        totalOutpatientPremium: cart.outOption.premium*realTotal,
        dentalPremium: cart.dentalOption.premium*realTotal,
        opticalPremium: cart.opticalOption.premium*realTotal,
        maternityPremium: cart.maternityOption.premium,
        basicPremium: 0,
        mituelleDeSante: 0,
        administrationFees: 0,
        totalPremium: 0,
      },
    },
  });

  useEffect(() => {
    const updatedOptions = { ...quotationData.options };

    Object.keys(defaultValues).forEach((option) => {
      const updatedPremiums = calculatePremiums(updatedOptions[option], realTotal);
      updatedOptions[option] = { ...updatedOptions[option], ...updatedPremiums };
    });

    setQuotationData((prevData) => ({
      ...prevData,
      options: updatedOptions,
    }));
  }, [
    quotationData,
    realTotal,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/retail', quotationData, {
        headers: { Authorization: `Bearer ${state.userInfo.token}` },
      });
      dispatch({ type: 'CART_CLEAR' });
      navigate(`/retail/${res.data._id}`);
    } catch (error) {
      console.error('Error saving quotation:', error);
    }
  };

  

  return (
    <div>
      <CheckOutRetailSteps step1 step2 step3 step4 step5 step6 step7 step8 />
      <Container>
        <h2>Create Retail Quotation</h2>
        <Row>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Client Info</Card.Title>
              <Card.Text>
                <strong>Client Names:</strong> {cart.retailInfo.CUSTOMER_NAME||""
                }
                <br />
                <br />
                <strong>Client Surname:</strong> {cart.retailInfo.SURNAME||""}
                <br />
                <strong>Client Id:</strong> {cart.retailInfo.CUSTOMER_ID||""
                }
                             
              </Card.Text>
             
            </Card.Body>
          </Card>
        </Row>

        
           <Row>
            <Form onSubmit={handleSubmit}>
              <Table bordered>
                <thead>
                  <tr>
                    <th></th>
                    <th>Bronze</th>
                    <th>Silver</th>
                    <th>Gold</th>
                    <th>Platinum</th>
                    <th>Platinum Plus</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(defaultValues['Bronze']).map((attribute, index) => (
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
                    <td>DENTAL PREMIUM</td>
                    {Object.keys(defaultValues).map((option) => (
                      <td key={option}>
                        <Form.Control
                          type="number"
                          name="dentalPremium"
                          value={quotationData.options[option].dentalPremium}
                          onChange={(e) => {
                            const updatedOptions = { ...quotationData.options };
                            updatedOptions[option].dentalPremium = parseInt(e.target.value, 10);
                            setQuotationData({ ...quotationData, options: updatedOptions });
                          }}
                        />
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td>OPTICAL PREMIUM</td>
                    {Object.keys(defaultValues).map((option) => (
                      <td key={option}>
                        <Form.Control
                          type="number"
                          name="opticalPremium"
                          value={quotationData.options[option].opticalPremium}
                          onChange={(e) => {
                            const updatedOptions = { ...quotationData.options };
                            updatedOptions[option].opticalPremium = parseInt(e.target.value, 10);
                            setQuotationData({ ...quotationData, options: updatedOptions });
                          }}
                        />
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td>MATERNITY PREMIUM</td>
                    {Object.keys(defaultValues).map((option) => (
                      <td key={option}>
                        <Form.Control
                          type="number"
                          name="maternityPremium"
                          value={quotationData.options[option].maternityPremium}
                          onChange={(e) => {
                            const updatedOptions = { ...quotationData.options };
                            updatedOptions[option].maternityPremium = parseInt(e.target.value, 10);
                            setQuotationData({ ...quotationData, options: updatedOptions });
                          }}
                        />
                      </td>
                    ))}
                  </tr>
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
            </Row> 
          
      </Container>
    
    </div>
  );
}

export default RetailForm;
