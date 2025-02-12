import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Row, Spinner, Table, ListGroup, Alert} from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import LoadingBox from '../component/LoadingBox';
import {  useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function CooporateDetails() {
const [message, setMessage] = useState('');
  const { state } = useContext(AuthContext);
  const navigate = useNavigate()
  const params = useParams();
  const { id: cooporateId } = params;
  const { userInfo } = state;
  const [cooporate, setCooporate] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const [discount,setDiscount]=useState(0)
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/cooporate/single/${cooporateId}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setCooporate(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [cooporateId, userInfo]);


    const updateStatus = async (status) => {
    setLoading(true);
    try {
      const { data } = await axios.put(
        `/api/cooporate/${cooporateId}`,
        { status, discount },
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      setMessage(data.message);
      setError(null);
    } catch (error) {
      setError('Failed to update status');
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    try {
      const response = await axios.get(`/api/cooporate/${cooporateId}/download`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${cooporateId} Quotation.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      setError('Failed to download PDF');
    }
  };

  const renderSavedOut = () => {
    return cooporate.outCart.outCategories.map(outCategory => (
      <div key={outCategory.outId}>
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Category {outCategory.outId}</Card.Title>
            <Card.Text>
              <strong>out Patient Limit:</strong> {outCategory.outLimit}
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
                  {Array.from({ length: outCategory.outMembers + 1 }, (_, i) => (i === 0 ? 'M' : `M+${i}`)).map((outLabel) => (
                    <tr key={outLabel}>
                      <td>{outLabel}</td>
                     <td>{outCategory.outPremiumValues[outLabel] || 0}</td>
                      <td>{outCategory.outDependencies[outLabel] || ''}</td>
                      <td>{outCategory.outTotalDependencies[outLabel]}</td>
                      <td>{outCategory.outTotalPremiumValues[outLabel] || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div>Total Premium Value: {outCategory.outTotalPremium}</div>
              <div>Overall Dependencies Total: {Object.values(outCategory.outTotalDependencies).reduce((a, b) => a + b, 0)}</div>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    ));
  };

  const renderSavedDental = () => {
   return cooporate.dentalCorp.dentalCategories.map(dentalCategory => (
      <div key={dentalCategory.dentalId}>
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Category {dentalCategory.dentalId}</Card.Title>
            <Card.Text>
              <strong>Dental Limit:</strong> {dentalCategory.dentalLimit}
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
                  {Array.from({ length: dentalCategory.dentalMembers + 1 }, (_, i) => (i === 0 ? 'M' : `M+${i}`)).map((dentalLabel) => (
                    <tr key={dentalLabel}>
                      <td>{dentalLabel}</td>
                      <td>{dentalCategory.dentalPremiumValues[dentalLabel] || 0}</td>
                      <td>{dentalCategory.dentalDependencies[dentalLabel] || ''}</td>
                      <td>{dentalCategory.dentalTotalDependencies[dentalLabel]}</td>
                      <td>{dentalCategory.dentalTotalPremiumValues[dentalLabel] || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div>Total Premium Value: {dentalCategory.dentalTotalPremium}</div>
              <div>Overall Dependencies Total: {Object.values(dentalCategory.dentalTotalDependencies).reduce((a, b) => a + b, 0)}</div>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    ));
  };

  const renderSavedOptical = () => {
   return cooporate.optCorp.opticalCategories.map(opticalCategory => (
      <div key={opticalCategory.opticalId}>
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Category {opticalCategory.opticalId}</Card.Title>
            <Card.Text>
              <strong>Optical Limit:</strong> {opticalCategory.opticalLimit}
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
                  {Array.from({ length: opticalCategory.opticalMembers + 1 }, (_, i) => (i === 0 ? 'M' : `M+${i}`)).map((opticalLabel) => (
                    <tr key={opticalLabel}>
                      <td>{opticalLabel}</td>
                      <td>{opticalCategory.opticalPremiumValues[opticalLabel] || 0}</td>
                      <td>{opticalCategory.opticalDependencies[opticalLabel] || ''}</td>
                      <td>{opticalCategory.opticalTotalDependencies[opticalLabel]}</td>
                      <td>{opticalCategory.opticalTotalPremiumValues[opticalLabel] || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div>Total Premium Value: {opticalCategory.opticalTotalPremium}</div>
              <div>Overall Dependencies Total: {Object.values(opticalCategory.opticalTotalDependencies).reduce((a, b) => a + b, 0)}</div>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    ));
  };

 const renderSavedMaternity=()=>{
  return cooporate.selectedTriplet.map((triplet,index)=>(
    <div key={index}>
      <Card className='mb-3'>
        <Card.Body>
          <Card.Title>Maternity Category {index+1}</Card.Title>
          <strong>Maternity Cover Limit:</strong> {triplet.MaternityCoverLimit.toLocaleString()}<br />
              <strong>Rate Per Family:</strong> {triplet.RatePerFamily.toLocaleString()}<br />
              <strong>Group Minimum Premium:</strong> {triplet.GroupMinimumPremium.toLocaleString()}
        </Card.Body>
      </Card>
    </div>
  ))
 }
    const renderCategoryTables = () => {
    return cooporate.cooporateCart.categories.map(category => (
      <div key={category.id}>
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Category {category.id}</Card.Title>
            <Card.Text>
              <strong>In Patient Limit:</strong> {category.limit}
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
                  {Array.from({ length: category.members + 1 }, (_, i) => (i === 0 ? 'M' : `M+${i}`)).map((label) => (
                    <tr key={label}>
                      <td>{label}</td>
                      <td>{category.premiumValues[label] || 0}</td>
                      <td>{category.dependencies[label] || ''}</td>
                      <td>{category.totalDependencies[label]}</td>
                      <td>{category.totalPremiumValues[label] || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div>Total Premium Value: {category.totalPremium}</div>
              <div>Overall Dependencies Total: {Object.values(category.totalDependencies).reduce((a, b) => a + b, 0)}</div>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    ));
  };

  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : (
      <Row>
        <Col md={8}>
          {/* Existing components */}

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Selected Benefits</Card.Title>
              <Card.Text>
                {cooporate.selectedBenefits.length === 0 ? (
                  <p>No benefits selected.</p>
                ) : (
                  <ul>
                    {cooporate.selectedBenefits.map((benefit, index) => (
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
                <strong>Cooporate Name:</strong> {cooporate.companyInfo.name}
                <br />
                <strong>Cooporate Address:</strong> {cooporate.companyInfo.address}
                <br />
                <strong>All Insured Members:</strong> {cooporate.cooporateCart.overallTotals.overallDependenciesTotal}
              </Card.Text>
             
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Text>
               
                <br />
                <h3>Saved Data</h3>
                {renderCategoryTables()}
                {/* <div>Total Dependencies: {calculateTotalDependencies(savedData.dependencies)}</div> */}
              </Card.Text>
             
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Text>
           
                <br />
                {renderSavedOut()}
              </Card.Text>
 
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Text>
 
                <br />
                {renderSavedDental()}
              </Card.Text>

            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Text>

                <br />
                {renderSavedOptical()}
              </Card.Text>
    
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Maternity</Card.Title>
              <Card.Text>
             {renderSavedMaternity()}
              </Card.Text>
     
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
                  <Col>{cooporate.cooporateCart.overallTotals.overallTotalPremium.toFixed(2)} RWF</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total OutPatient Premium</Col>
                  <Col>{cooporate.outCart.outOverallTotals.outOverallTotalPremium.toFixed(2)} RWF</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Dental Premium</Col>
                  <Col>{cooporate.dentalCorp.dentalOverallTotals.dentalOverallTotalPremium.toFixed(2)} RWF</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Optical</Col>
                  <Col>{cooporate.optCorp.opticalOverallTotals.opticalOverallTotalPremium.toFixed(2)} RWF</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Maternity</Col>
                  <Col>{cooporate.totalMaternity.toFixed(2)} RWF</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Basic Premium</Col>
                  <Col>{cooporate.totalBasic.toFixed(2)} RWF</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Mutuel De Sante</Col>
                  <Col>{cooporate.MutuelDeSante.toFixed(2)} RWF</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Admin Fee</Col>
                  <Col>{cooporate.AdminFee.toFixed(2)} RWF</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Overall Premium</strong>
                  </Col>
                  <Col>
                    <strong>{cooporate.overAllPremiumTotal.toFixed(2)} RWF</strong>
                  </Col>
       

                </Row>
              </ListGroup.Item>
            </ListGroup>
          
           
          </Card.Body>
        
        </Col>
          {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}

{/* approval processes */}

      {userInfo&&(userInfo._id!==cooporate.createdBy._id)&&(cooporate.status!==("Rejected"||"Accepted"||"Approved"))&&(
        <>
        {(userInfo.role===("senior_underwriter")||userInfo.role===("medical_manager")||userInfo.role===("operational_manager"))&&cooporate.overAllPremiumTotal<=100000000&&(

      <Col>
      <ListGroup.Item>
              <strong>Discount:</strong> {discount}%
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="ms-2"
              />
            </ListGroup.Item>
      <Button variant="success" onClick={() => updateStatus('Approved')}>
        Approve
      </Button>
      </Col>
        )}
        {(userInfo.role===("senior_underwriter")||userInfo.role===("medical_manager")||userInfo.role===("operational_manager"))&&(cooporate.overAllPremiumTotal>100000000&&cooporate.overAllPremiumTotal<=300000000)&&(

      <Col>
      <ListGroup.Item>
              <strong>Discount:</strong> {discount}%
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="ms-2"
              />
            </ListGroup.Item>
      <Button variant="success" onClick={() => updateStatus('Approved')}>
        Approve
      </Button>
      </Col>
        )}
        {(userInfo.role===("senior_underwriter")||userInfo.role===("medical_manager")||userInfo.role===("operational_manager"))&&(cooporate.overAllPremiumTotal>300000000&&cooporate.overAllPremiumTotal<=500000000)&&(

      <Col>
      <ListGroup.Item>
              <strong>Discount:</strong> {discount}%
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="ms-2"
              />
            </ListGroup.Item>
      <Button variant="success" onClick={() => updateStatus('Approved')}>
        Approve
      </Button>
      </Col>
        )}
        {(userInfo.role===("medical_manager")||userInfo.role===("operational_manager"))&&(cooporate.overAllPremiumTotal>500000000&&cooporate.overAllPremiumTotal<=800000000)&&(

      <Col>
      <ListGroup.Item>
              <strong>Discount:</strong> {discount}%
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="ms-2"
              />
            </ListGroup.Item>
      <Button variant="success" onClick={() => updateStatus('Approved')}>
        Approve
      </Button>
      </Col>
        )}
        {userInfo.role===("operational_manager")&&(cooporate.overAllPremiumTotal>800000000)&&(

      <Col>
      <ListGroup.Item>
              <strong>Discount:</strong> {discount}%
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="ms-2"
              />
            </ListGroup.Item>
      <Button variant="success" onClick={() => updateStatus('Approved')}>
        Approve
      </Button>
      </Col>
        )}
</>
      )}
      {userInfo&&(userInfo._id!==cooporate.createdBy._id)&&(cooporate.status!==("Rejected"||"Accepted"||"Block"))&&(
         <>
        {(userInfo.role===("senior_underwriter")||userInfo.role===("medical_manager")||userInfo.role===("operational_manager"))&&cooporate.overAllPremiumTotal<=100000000&&(

      <Col>
      <Button variant="success" onClick={() => updateStatus('Block')}>
        Block
      </Button>
      </Col>
        )}
        {(userInfo.role===("senior_underwriter")||userInfo.role===("medical_manager")||userInfo.role===("operational_manager"))&&(cooporate.overAllPremiumTotal>100000000&&cooporate.overAllPremiumTotal<=300000000)&&(

      <Col>
      <Button variant="success" onClick={() => updateStatus('Block')}>
        Block
      </Button>
      </Col>
        )}
        {(userInfo.role===("senior_underwriter")||userInfo.role===("medical_manager")||userInfo.role===("operational_manager"))&&(cooporate.overAllPremiumTotal>300000000&&cooporate.overAllPremiumTotal<=500000000)&&(

      <Col>
      <Button variant="success" onClick={() => updateStatus('Block')}>
        Block
      </Button>
      </Col>
        )}
        {(userInfo.role===("medical_manager")||userInfo.role===("operational_manager"))&&(cooporate.overAllPremiumTotal>500000000&&cooporate.overAllPremiumTotal<=800000000)&&(

      <Col>
      <Button variant="success" onClick={() => updateStatus('Block')}>
        Block
      </Button>
      </Col>
        )}
        {userInfo.role===("operational_manager")&&(cooporate.overAllPremiumTotal>800000000)&&(

      <Col>
      <Button variant="success" onClick={() => updateStatus('Block')}>
        Block
      </Button>
      </Col>
        )}
</>
      )}
      <Col>
      <Row>

    <Col>
      <Button variant='success' onClick={()=>navigate(`/welcome`)}>
                  Back
                </Button>
    </Col>
    <Col>
      <Button variant='success' onClick={()=>navigate(`/updatecooporate/${cooporateId}`)}>
                  Revise
                </Button>
    </Col>
      </Row>
    
      {userInfo&&(userInfo._id===cooporate.createdBy._id)&&(cooporate.status!=="Block")&&(
        <Row>
     
    {cooporate.status==="Approved"&&(
<>
    <Col>
    <Button variant="success" onClick={() => updateStatus('Accepted')}>
        Closed
      </Button>
    </Col>
    
    <Col>
    <Button variant="success" onClick={() => updateStatus('Rejected')}>
        Reject by client
      </Button>
    </Col>
</>
    )}
  
     
</Row>
      )}
                </Col>
    {cooporate?.status === "Approved" &&(userInfo._id!==cooporate.updatedBy) && (
  <Col>
    <Button variant="info" onClick={downloadPDF}>Download PDF</Button>
  </Col>
)}
      </Row>
      )}
    </div>
  );
}

export default CooporateDetails;
