import React, { useContext, useReducer, useEffect, useState } from 'react';
import { Button, Card, Col, ListGroup, Row, Table } from 'react-bootstrap';
import CheckOutCooporateSteps from '../component/CheckOutCooporateSteps';
import { AuthContext } from '../context/AuthContext';
import LoadingBox from '../component/LoadingBox';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loading: true };
    case 'CREATE_SUCCESS':
      return { ...state, loading: false };
    case 'CREATE_FAIL':
      return { ...state, loading: false };
    default:
      return state;
  }
};

function Cooporate() {
  const { state, dispatch: ctxDispatch } = useContext(AuthContext);
  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });
  const navigate = useNavigate();
  const { cooporateCart, outCart, dentalCorp, optCorp, totalRatePerFamily, selectedTriplet, userInfo, companyInfo, selectedBenefits, selectedOpticalBenefits, selectedDentalBenefits, blockerInfo, lastExpenseCart, generalInclusionBenefits, limitInfo } = state;
  const [categories, setCategories] = useState(state.cooporateCart?.categories || []);
  const [outCategories, setOutCategories] = useState(state.outCart?.outCategories || []);
  const [dentalCategories, setDentalCategories] = useState(state.dentalCorp?.dentalCategories || []);
  const [opticalCategories, setOpticalCategories] = useState(state.optCorp?.opticalCategories || []);
  const [extendedCategories, setExtendedCategories] = useState(state.extendedCategories || []);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('cooporateCart'));
    if (savedData) {
      setCategories(savedData.categories || []);
    }
  }, []);

  useEffect(() => {
    const savedExtended = JSON.parse(localStorage.getItem('extendedCategories'));
    if (savedExtended) {
      setExtendedCategories(savedExtended || []);
    }
  }, []);

  useEffect(() => {
    const saveOut = JSON.parse(localStorage.getItem('outCart'));
    if (saveOut) {
      setOutCategories(saveOut.outCategories || []);
    }
  }, []);

  useEffect(() => {
    const savedDental = JSON.parse(localStorage.getItem('dentalCorp'));
    if (savedDental) {
      setDentalCategories(savedDental.dentalCategories || []);
    }
  }, []);

  useEffect(() => {
    const savedOptical = JSON.parse(localStorage.getItem('optCorp'));
    if (savedOptical) {
      setOpticalCategories(savedOptical.opticalCategories || []);
    }
  }, []);

  const totalMaternity = (totalRatePerFamily || 0) * (cooporateCart?.overallTotals?.totalStaffFamily || 0);

  const totalBasic =
    (cooporateCart?.overallTotals?.overallTotalPremium || 0) +
    (outCart?.outOverallTotals?.outOverallTotalPremium || 0) +
    (dentalCorp?.dentalOverallTotals?.dentalOverallTotalPremium || 0) +
    (optCorp?.opticalOverallTotals?.opticalOverallTotalPremium || 0) +
    totalMaternity;

  const MutuelDeSante = (totalBasic || 0) * 0.05;
  const AdminFee = 10000 * (cooporateCart?.overallTotals?.overallDependenciesTotal || 0);
  const overAllPremiumTotal = (totalBasic || 0) + (MutuelDeSante || 0) + (AdminFee || 0);

  const saveQuotationHandler = async () => {
    try {
      dispatch({ type: 'CREATE_REQUEST' });

      const data = {
        totalMaternity: totalMaternity || 0,
        totalBasic: totalBasic || 0,
        MutuelDeSante: MutuelDeSante || 0,
        AdminFee: AdminFee || 0,
        overAllPremiumTotal: overAllPremiumTotal || 0,
        selectedTriplet: selectedTriplet || [],
        companyInfo: companyInfo || {},
        agentData: blockerInfo || {},
        requestedLimit: limitInfo || {},
        selectedBenefits: selectedBenefits || [],
        generalInclusionBenefits: generalInclusionBenefits || [],
        selectedDentalBenefits: selectedDentalBenefits || [],
        selectedOpticalBenefits: selectedOpticalBenefits || [],
        extendedCategoriesCart: {
          extendedCategories: extendedCategories || [],
        },
        lastExpenseCart: lastExpenseCart || {},
        cooporateCart: {
          categories: categories || [],
          overallTotals: cooporateCart?.overallTotals || {},
        },
        outCart: {
          outCategories: outCategories || [],
          outOverallTotals: outCart?.outOverallTotals || {},
        },
        dentalCorp: {
          dentalCategories: dentalCategories || [],
          dentalOverallTotals: dentalCorp?.dentalOverallTotals || {},
        },
        optCorp: {
          opticalCategories: opticalCategories || [],
          opticalOverallTotals: optCorp?.opticalOverallTotals || {},
        },
      };

      const response = await axios.post('/api/cooporate', data, {
        headers: { Authorization: `Bearer ${userInfo?.token}` },
      });

      dispatch({ type: 'CREATE_SUCCESS' });
      ctxDispatch({ type: 'CART_CLEAR' });
      navigate('/cooporateList');
    } catch (err) {
      dispatch({ type: 'CREATE_FAIL' });
      console.log('Failed request:', err);
    }
  };

  const renderSavedOut = () => {
    return outCategories.map((outCategory) => (
      <div key={outCategory.outId}>
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Category {outCategory.outId}</Card.Title>
            <Card.Text>
              <strong>Out Patient Limit:</strong> {outCategory.outLimit || 0}
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Member</th>
                    <th>Premium/family</th>
                    <th>Number of staff/family</th>
                    <th>Total lives</th>
                    <th>Total Premium</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: (outCategory.outMembers || 0) + 1 }, (_, i) => (i === 0 ? 'M' : `M+${i}`)).map((label) => (
                    <tr key={label}>
                      <td>{label}</td>
                      <td>{(outCategory.outPremiumValues?.[label] || 0).toLocaleString()}</td>
                      <td>{outCategory.outDependencies?.[label] || 0}</td>
                      <td>{outCategory.outTotalDependencies?.[label] || 0}</td>
                      <td>{(outCategory.outTotalPremiumValues?.[label] || 0).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div>Total Premium Value: {(outCategory.outTotalPremium || 0).toLocaleString()}</div>
              <div>Overall Dependencies Total: {Object.values(outCategory.outTotalDependencies || {}).reduce((a, b) => a + b, 0).toLocaleString()}</div>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    ));
  };

  const renderSavedDental = () => {
    return dentalCategories.map((dentalCategory) => (
      <div key={dentalCategory.dentalId}>
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Category {dentalCategory.dentalId}</Card.Title>
            <Card.Text>
              <strong>Dental Limit:</strong> {dentalCategory.dentalLimit || 0}
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Member</th>
                    <th>Premium/family</th>
                    <th>Number of staff/family</th>
                    <th>Total lives</th>
                    <th>Total Premium</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: (dentalCategory.dentalMembers || 0) + 1 }, (_, i) => (i === 0 ? 'M' : `M+${i}`)).map((label) => (
                    <tr key={label}>
                      <td>{label}</td>
                      <td>{(dentalCategory.dentalPremiumValues?.[label] || 0).toLocaleString()}</td>
                      <td>{dentalCategory.dentalDependencies?.[label] || 0}</td>
                      <td>{dentalCategory.dentalTotalDependencies?.[label] || 0}</td>
                      <td>{(dentalCategory.dentalTotalPremiumValues?.[label] || 0).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div>Total Premium Value: {(dentalCategory.dentalTotalPremium || 0).toLocaleString()}</div>
              <div>Overall Dependencies Total: {Object.values(dentalCategory.dentalTotalDependencies || {}).reduce((a, b) => a + b, 0).toLocaleString()}</div>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    ));
  };

  const renderSavedOptical = () => {
    return opticalCategories.map((opticalCategory) => (
      <div key={opticalCategory.opticalId}>
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Category {opticalCategory.opticalId || ''}</Card.Title>
            <Card.Text>
              <strong>Optical Limit:</strong> {opticalCategory.opticalLimit || 0}
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Member</th>
                    <th>Premium/family</th>
                    <th>Number of staff/family</th>
                    <th>Total lives</th>
                    <th>Total Premium</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: (opticalCategory.opticalMembers || 0) + 1 }, (_, i) => (i === 0 ? 'M' : `M+${i}`)).map((label) => (
                    <tr key={label}>
                      <td>{label}</td>
                      <td>{(opticalCategory.opticalPremiumValues?.[label] || 0).toLocaleString()}</td>
                      <td>{opticalCategory.opticalDependencies?.[label] || 0}</td>
                      <td>{opticalCategory.opticalTotalDependencies?.[label] || 0}</td>
                      <td>{(opticalCategory.opticalTotalPremiumValues?.[label] || 0).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div>Total Premium Value: {(opticalCategory.opticalTotalPremium || 0).toLocaleString()}</div>
              <div>Overall Dependencies Total: {Object.values(opticalCategory.opticalTotalDependencies || {}).reduce((a, b) => a + b, 0).toLocaleString()}</div>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    ));
  };

  const renderSavedMaternity = () => {
    return selectedTriplet?.map((triplet, index) => (
      <div key={index}>
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Maternity Category {index + 1}</Card.Title>
            <strong>Maternity Cover Limit:</strong> {(triplet.MaternityCoverLimit || 0).toLocaleString()}<br />
            <strong>Rate Per Family:</strong> {(triplet.RatePerFamily || 0).toLocaleString()}<br />
            <strong>Group Minimum Premium:</strong> {(triplet.GroupMinimumPremium || 0).toLocaleString()}
          </Card.Body>
        </Card>
      </div>
    ));
  };

  const renderCategoryTables = () => {
    return categories?.map((category) => (
      <div key={category.id}>
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Category {category.id}</Card.Title>
            <Card.Text>
              <strong>In Patient Limit:</strong> {category.limit || 0}
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Member</th>
                    <th>Premium/family</th>
                    <th>Number of staff/family</th>
                    <th>Total lives</th>
                    <th>Total Premium</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: (category.members || 0) + 1 }, (_, i) => (i === 0 ? 'M' : `M+${i}`)).map((label) => (
                    <tr key={label}>
                      <td>{label}</td>
                      <td>{(category.premiumValues?.[label] || 0).toLocaleString()}</td>
                      <td>{category.dependencies?.[label] || 0}</td>
                      <td>{category.totalDependencies?.[label] || 0}</td>
                      <td>{(category.totalPremiumValues?.[label] || 0).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div>Total Premium Value: {(category.totalPremium || 0).toLocaleString()}</div>
              <div>Overall Dependencies Total: {Object.values(category.totalDependencies || {}).reduce((a, b) => a + b, 0).toLocaleString()}</div>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    ));
  };

  return (
    <div>
      <CheckOutCooporateSteps step1 step2 step3 step4 step5 step6 step7 step8 step9 step10 step11 />
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Selected Benefits</Card.Title>
              <Card.Text>
                {selectedBenefits?.length === 0 ? (
                  <p>No benefits selected.</p>
                ) : (
                  <ul>
                    {selectedBenefits?.map((benefit, index) => (
                      <li key={index}>{benefit.label}</li>
                    ))}
                  </ul>
                )}
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Selected Optical Benefits</Card.Title>
              <Card.Text>
                {selectedOpticalBenefits?.length === 0 ? (
                  <p>No benefits selected.</p>
                ) : (
                  <ul>
                    {selectedOpticalBenefits?.map((benefit, index) => (
                      <li key={index}>{benefit.label}</li>
                    ))}
                  </ul>
                )}
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Selected Dental Benefits</Card.Title>
              <Card.Text>
                {selectedDentalBenefits?.length === 0 ? (
                  <p>No dental benefits selected.</p>
                ) : (
                  <ul>
                    {selectedDentalBenefits?.map((benefit, index) => (
                      <li key={index}>{benefit.label}</li>
                    ))}
                  </ul>
                )}
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Cooporate Info</Card.Title>
              <Card.Text>
                <strong>Corporate Name:</strong> {companyInfo?.institutionName || ''}
                <br />
                <strong>Corporate Tin:</strong> {companyInfo?.tin || ''}
                <br />
                <strong>All Insured Members:</strong> {cooporateCart?.overallTotals?.overallDependenciesTotal || 0}
              </Card.Text>
              <Link to="/company">edit</Link>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Text>
                <strong>Inpatient Limits:</strong> {cooporateCart?.limit || 0}
                <br />
                <h3>Saved Data</h3>
                {renderCategoryTables()}
              </Card.Text>
              <Link to="/incooporate">edit</Link>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Text>
                <strong>Out Patient Limit:</strong> {outCart?.limit || 0}
                <br />
                {renderSavedOut()}
              </Card.Text>
              <Link to="/outcooporate">Edit</Link>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Text>
                <strong>Dental Limit:</strong> {dentalCorp?.limit || 0}
                <br />
                {renderSavedDental()}
              </Card.Text>
              <Link to="/denta">Edit</Link>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Text>
                <strong>Optical Limit:</strong> {optCorp?.limit || 0}
                <br />
                {renderSavedOptical()}
              </Card.Text>
              <Link to="/cooporateOptical">Edit</Link>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Maternity</Card.Title>
              <Card.Text>
                {renderSavedMaternity()}
              </Card.Text>
              <Link to="/cooporateMaternity">Edit</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card.Body>
            <Card.Title>Quotation Calculator</Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Total Inpatient Premium</Col>
                  <Col>{(cooporateCart?.overallTotals?.overallTotalPremium || 0).toFixed(2).toLocaleString()} RWF</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total OutPatient Premium</Col>
                  <Col>{(outCart?.outOverallTotals?.outOverallTotalPremium || 0).toFixed(2).toLocaleString()} RWF</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Dental Premium</Col>
                  <Col>{(dentalCorp?.dentalOverallTotals?.dentalOverallTotalPremium || 0).toFixed(2).toLocaleString()} RWF</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Optical</Col>
                  <Col>{(optCorp?.opticalOverallTotals?.opticalOverallTotalPremium || 0).toFixed(2).toLocaleString()} RWF</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Maternity</Col>
                  <Col>{(totalMaternity || 0).toFixed(2).toLocaleString()} RWF</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Basic Premium</Col>
                  <Col>{(totalBasic || 0).toFixed(2).toLocaleString()} RWF</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Mutuel De Sante</Col>
                  <Col>{(MutuelDeSante || 0).toFixed(2).toLocaleString()} RWF</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Admin Fee</Col>
                  <Col>{(AdminFee || 0).toFixed(2).toLocaleString()} RWF</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Overall Premium</strong>
                  </Col>
                  <Col>
                    <strong>{(overAllPremiumTotal || 0).toFixed(2).toLocaleString()} RWF</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Button type="button" onClick={saveQuotationHandler} className="w-100" disabled={selectedBenefits?.length === 0}>
                  Generate Quotation
                </Button>
                {loading && <LoadingBox />}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Cooporate;