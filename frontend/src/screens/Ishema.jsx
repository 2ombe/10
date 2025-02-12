// src/components/QuotationForm.js
import React, { useContext, useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Table } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const defaultValues = {
  'Option 1': {
    inpatientLimit: 0,
    outpatientLimit: 0,
    principlelimit: 0,
    totalInpatientPremium: 0,
    totalOutpatientPremium: 0,
  },
  'Option 2': {
    inpatientLimit: 0,
    outpatientLimit: 0,
    principlelimit: 0,
    totalInpatientPremium: 0,
    totalOutpatientPremium: 0,
  },
  'Option 3': {
    inpatientLimit: 0,
    outpatientLimit: 0,
    principlelimit: 0,
    totalInpatientPremium: 0,
    totalOutpatientPremium: 0,
  },
  'Option 4': {
    inpatientLimit: 0,
    outpatientLimit: 0,
    principlelimit: 0,
    totalInpatientPremium: 0,
    totalOutpatientPremium: 0,
  },
};

const calculatePremiums = (optionData, members) => {
  const totalInpatientPremium = optionData.totalInpatientPremium * members.length;
  const totalOutpatientPremium = optionData.totalOutpatientPremium * members.length;
  const dentalPremium = optionData.dentalPremium;
  const opticalPremium = optionData.opticalPremium;
  const maternityPremium = optionData.maternityPremium;

  const basicPremium =
    totalInpatientPremium +
    totalOutpatientPremium +
    dentalPremium +
    opticalPremium +
    maternityPremium;
  const mituelleDeSante = basicPremium * 0.05;
  const administrationFees = 18000 * members.length;
  const totalPremium = basicPremium + mituelleDeSante + administrationFees;

  return { basicPremium, mituelleDeSante, administrationFees, totalPremium };
};

const QuotationForm = () => {
  const [quotationData, setQuotationData] = useState({
    plan: 'Option 1',
    members: [{ type: 'Principal', limit: 30 }],
    options: {
      'Option 1': {
        totalInpatientPremium: defaultValues['Option 1'].totalInpatientPremium,
        totalOutpatientPremium: defaultValues['Option 1'].totalOutpatientPremium,
        dentalPremium: 0,
        opticalPremium: 0,
        maternityPremium: 0,
        basicPremium: 0,
        mituelleDeSante: 0,
        administrationFees: 0,
        totalPremium: 0,
      },
      'Option 2': {
        totalInpatientPremium: defaultValues['Option 2'].totalInpatientPremium,
        totalOutpatientPremium: defaultValues['Option 2'].totalOutpatientPremium,
        dentalPremium: 0,
        opticalPremium: 0,
        maternityPremium: 0,
        basicPremium: 0,
        mituelleDeSante: 0,
        administrationFees: 0,
        totalPremium: 0,
      },
      'Option 3': {
        totalInpatientPremium: defaultValues['Option 3'].totalInpatientPremium,
        totalOutpatientPremium: defaultValues['Option 3'].totalOutpatientPremium,
        dentalPremium: 0,
        opticalPremium: 0,
        maternityPremium: 0,
        basicPremium: 0,
        mituelleDeSante: 0,
        administrationFees: 0,
        totalPremium: 0,
      },
      'Option 4': {
        totalInpatientPremium: defaultValues['Option 4'].totalInpatientPremium,
        totalOutpatientPremium: defaultValues['Option 4'].totalOutpatientPremium,
        dentalPremium: 0,
        opticalPremium: 0,
        maternityPremium: 0,
        basicPremium: 0,
        mituelleDeSante: 0,
        administrationFees: 0,
        totalPremium: 0,
      },
    },
  });

  const { state } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedOptions = { ...quotationData.options };
    updatedOptions[quotationData.plan][name] = parseInt(value, 10);
    setQuotationData({ ...quotationData, options: updatedOptions });
  };

  const handleMemberChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMembers = [...quotationData.members];
    updatedMembers[index][name] = value;
    setQuotationData({ ...quotationData, members: updatedMembers });
  };

  const addMember = () => {
    setQuotationData((prevData) => ({
      ...prevData,
      members: [...prevData.members, { type: '', limit: 0 }],
    }));
  };

  const removeMember = (index) => {
    const updatedMembers = [...quotationData.members];
    updatedMembers.splice(index, 1);
    setQuotationData({ ...quotationData, members: updatedMembers });
  };

  useEffect(() => {
    const updatedOptions = { ...quotationData.options };

    Object.keys(defaultValues).forEach((option) => {
      const updatedPremiums = calculatePremiums(updatedOptions[option], quotationData.members);
      updatedOptions[option] = { ...updatedOptions[option], ...updatedPremiums };
    });

    setQuotationData((prevData) => ({
      ...prevData,
      options: updatedOptions,
    }));
  }, [
    quotationData.options,
    quotationData.members,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('/api/ishema', quotationData, {
      headers: { Authorization: `Bearer ${state.userInfo.token}` },
    });
    navigate(`/quotation-result/${res.data._id}`);
  };

  return (
    <Container>
      {/* <Row className="justify-content-md-center">
        <Col md={12}>
          <h2>Create Quotation</h2>
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

            {quotationData.members.map((member, index) => (
              <Row key={index}>
                <Col>
                  <Form.Group controlId={`memberType${index}`}>
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                      as="select"
                      name="type"
                      value={member.type}
                      onChange={(e) => handleMemberChange(index, e)}
                    >
                      <option value="Principal">Principal</option>
                      <option value="Spouse">Spouse</option>
                      <option value="Child">Child</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId={`memberlimit${index}`}>
                    <Form.Label>limit</Form.Label>
                    <Form.Control
                      type="number"
                      name="limit"
                      value={member.limit}
                      onChange={(e) => handleMemberChange(index, e)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Button variant="danger" onClick={() => removeMember(index)}>
                    Remove
                  </Button>
                </Col>
              </Row>
            ))}
            <Button variant="primary" onClick={addMember}>
              Add Member
            </Button>

            <Button variant="primary" type="submit" className="mt-3">
              Submit
            </Button>
          </Form>
        </Col>
      </Row> */}
    </Container>
  );
};

export default QuotationForm;
