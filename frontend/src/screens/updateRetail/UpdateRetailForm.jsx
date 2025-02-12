// src/components/QuotationForm.js
import React, { useContext, useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Table, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import CheckOutRetailSteps from '../../component/CheckOutRetailSteps';


const defaultValues = {
  'Bronze': {
    inpatientLimit: 25000,
    outpatientLimit: 25000,
    DentalLimit: 150000,
    opticalLimit: 150000,
    maternityLimit: 300000,
    principleAge: 25000,
    totalInpatientPremium: 0,
    totalOutpatientPremium: 0,
  },
  'Silver': {
    inpatientLimit: 45000,
    outpatientLimit: 45000,
    DentalLimit: 150000,
    opticalLimit: 150000,
    maternityLimit: 300000,
    principleAge: 45000,
    totalInpatientPremium: 0,
    totalOutpatientPremium: 0,
  },
  'Gold': {
    inpatientLimit: 60000,
    outpatientLimit: 60000,
    DentalLimit: 150000,
    opticalLimit: 150000,
    maternityLimit: 300000,
    principleAge: 60000,
    totalInpatientPremium: 0,
    totalOutpatientPremium: 0,
  },
  'Platinum': {
    inpatientLimit: 80000,
    outpatientLimit: 80000,
    DentalLimit: 150000,
    opticalLimit: 150000,
    maternityLimit: 300000,
    principleAge: 80000,
    totalInpatientPremium: 0,
    totalOutpatientPremium: 0,
  },
  'Platinum Plus': {
    inpatientLimit: 100000,
    outpatientLimit: 100000,
    DentalLimit: 150000,
    opticalLimit: 150000,
    maternityLimit: 300000,
    principleAge: 100000,
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
  const totalPrincipleAge = optionData.principleAge;

  const basicPremium =
    totalInpatientPremium +
    totalOutpatientPremium +
    dentalPremium +
    opticalPremium +
    maternityPremium;
  const mituelleDeSante = basicPremium * 0.05;
  const administrationFees = 18000 * members;
  const totalPremium = basicPremium + mituelleDeSante + administrationFees;

  return { basicPremium, mituelleDeSante, administrationFees, totalPremium, totalInpatientLimit, totalOutPatientLimit, totalPrincipleAge };
};

function UpdateRetailForm() {
    const params = useParams()
        const {id:retailId}=params
  const { state, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const { cart } = state;

  const members = cart.principalCount + cart.spouseCount + cart.childCount;
  const [quotationData, setQuotationData] = useState({
    benefits:cart.retailBenefitOptions,
    beneficiaryInfo:cart.retailInfo,
    plan: 'Retail Quotation',
    options: {
      'Bronze': {
        inpatientLimit: defaultValues['Bronze'].inpatientLimit,
        outpatientLimit: defaultValues['Bronze'].outpatientLimit,
        principleAge: defaultValues['Bronze'].principleAge,
        DentalLimit: defaultValues['Bronze'].DentalLimit,
        opticalLimit: defaultValues['Bronze'].opticalLimit,
        maternityLimit: defaultValues['Bronze'].maternityLimit,
        totalInpatientPremium: cart.totalPremium[0],
        totalOutpatientPremium: cart.outOption.limit*members,
        dentalPremium: cart.dentalOption.limit*members,
        opticalPremium: cart.opticalOption.limit*members,
        maternityPremium: cart.maternityOption.limit,
        basicPremium: 0,
        mituelleDeSante: 0,
        administrationFees: 0,
        totalPremium: 0,
      },
      'Silver': {
        inpatientLimit: defaultValues['Silver'].inpatientLimit,
        outpatientLimit: defaultValues['Silver'].outpatientLimit,
        principleAge: defaultValues['Silver'].principleAge,
        totalInpatientPremium: cart.totalPremium[1],
        DentalLimit: defaultValues['Silver'].DentalLimit,
        opticalLimit: defaultValues['Silver'].opticalLimit,
        maternityLimit: defaultValues['Silver'].maternityLimit,
        totalOutpatientPremium: cart.outOption.limit*members,
        dentalPremium: cart.dentalOption.limit*members,
        opticalPremium: cart.opticalOption.limit*members,
        maternityPremium: cart.maternityOption.limit,
        basicPremium: 0,
        mituelleDeSante: 0,
        administrationFees: 0,
        totalPremium: 0,
      },
      'Gold': {
        inpatientLimit: defaultValues['Gold'].inpatientLimit,
        outpatientLimit: defaultValues['Gold'].outpatientLimit,
        principleAge: defaultValues['Gold'].principleAge,
        totalInpatientPremium: cart.totalPremium[2],
        totalOutpatientPremium: cart.outOption.limit,
        DentalLimit: defaultValues['Gold'].DentalLimit,
        opticalLimit: defaultValues['Gold'].opticalLimit,
        maternityLimit: defaultValues['Gold'].maternityLimit,
        dentalPremium: cart.dentalOption.limit*members,
        opticalPremium: cart.opticalOption.limit*members,
        maternityPremium: cart.maternityOption.limit,
        basicPremium: 0,
        mituelleDeSante: 0,
        administrationFees: 0,
        totalPremium: 0,
      },
      'Platinum': {
        inpatientLimit: defaultValues['Platinum'].inpatientLimit,
        outpatientLimit: defaultValues['Platinum'].outpatientLimit,
        principleAge: defaultValues['Platinum'].principleAge,
        totalInpatientPremium: cart.totalPremium[3],
        DentalLimit: defaultValues['Platinum'].DentalLimit,
        opticalLimit: defaultValues['Platinum'].opticalLimit,
        maternityLimit: defaultValues['Platinum'].maternityLimit,
        totalOutpatientPremium: cart.outOption.limit*members,
        dentalPremium: cart.dentalOption.limit*members,
        opticalPremium: cart.opticalOption.limit*members,
        maternityPremium: cart.maternityOption.limit,
        basicPremium: 0,
        mituelleDeSante: 0,
        administrationFees: 0,
        totalPremium: 0,
      },
      'Platinum Plus': {
        inpatientLimit: defaultValues['Platinum Plus'].inpatientLimit,
        outpatientLimit: defaultValues['Platinum Plus'].outpatientLimit,
        principleAge: defaultValues['Platinum Plus'].principleAge,
        totalInpatientPremium: cart.totalPremium[4],
        DentalLimit: defaultValues['Platinum Plus'].DentalLimit,
        opticalLimit: defaultValues['Platinum Plus'].opticalLimit,
        maternityLimit: defaultValues['Platinum Plus'].maternityLimit,
        totalOutpatientPremium: cart.outOption.limit*members,
        dentalPremium: cart.dentalOption.limit*members,
        opticalPremium: cart.opticalOption.limit*members,
        maternityPremium: cart.maternityOption.limit,
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
      const updatedPremiums = calculatePremiums(updatedOptions[option], members);
      updatedOptions[option] = { ...updatedOptions[option], ...updatedPremiums };
    });

    setQuotationData((prevData) => ({
      ...prevData,
      options: updatedOptions,
    }));
  }, [
    quotationData,
    members,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`/api/retail/retailQuotation/${retailId}`, quotationData, {
        headers: { Authorization: `Bearer ${state.userInfo.token}` },
      });
      navigate(`/retail/${retailId}`);
    } catch (error) {
      console.error('Error saving quotation:', error);
    }
  };

  const handleClearStorage = () => {
    dispatch({ type: "CLEAR_LOCAL_STORAGE" });
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
                <strong>Client Names:</strong> {cart.retailInfo.CUSTOMER_NAME
                }
                <br />
                <br />
                <strong>Client Surname:</strong> {cart.retailInfo.SURNAME}
                <br />
                <strong>Client Id:</strong> {cart.retailInfo.CUSTOMER_ID
                }
               
               
              </Card.Text>
             
            </Card.Body>
          </Card>
        </Row>

        <Row>
        <Card className="mb-3">
            <Card.Body>
              <Card.Title>Benefits</Card.Title>
              <Card.Text>
                {cart.retailBenefitOptions
.length === 0 ? (
                  <p>No benefits selected.</p>
                ) : (
                  <ul>
                    {cart.retailBenefitOptions
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
          </Col>
        </Row>
      </Container>
      <button onClick={handleClearStorage}>Clear Local Storage</button>
    </div>
  );
}

export default UpdateRetailForm;
