import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Row,
  Spinner,
  Table,
  ListGroup,
  Alert,
} from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import LoadingBox from "../component/LoadingBox";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function CooporateDetails() {
  const [message, setMessage] = useState("");
  const { state } = useContext(AuthContext);
  const navigate = useNavigate();
  const params = useParams();
  const { id: cooporateId } = params;
  const { userInfo } = state;
  const [cooporate, setCooporate] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/cooporate/single/${cooporateId}`,
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
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
      setError("Failed to update status");
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    try {
      const response = await axios.get(
        `/api/cooporate/${cooporateId}/download`,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${cooporateId} Quotation.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      setError("Failed to download PDF");
    }
  };

  const renderSavedOut = () => {
    return cooporate.outCart.outCategories.map((outCategory) => (
      <div key={outCategory.outId}>
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Category {outCategory.outId}</Card.Title>
            <Card.Text>
              <strong>out Patient Limit:</strong>{" "}
              {outCategory.outLimit.toLocaleString()}
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
                  {Array.from({ length: outCategory.outMembers + 1 }, (_, i) =>
                    i === 0 ? "M" : `M+${i}`
                  ).map((outLabel) => (
                    <tr key={outLabel}>
                      <td>{outLabel}</td>
                      <td>
                        {(
                          outCategory.outPremiumValues[outLabel] || 0
                        ).toLocaleString()}
                      </td>
                      <td>{outCategory.outDependencies[outLabel] || ""}</td>
                      <td>{outCategory.outTotalDependencies[outLabel]}</td>
                      <td>
                        {(
                          outCategory.outTotalPremiumValues[outLabel] || 0
                        ).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div>
                Total Premium Value:{" "}
                {(outCategory.outTotalPremium || 0).toLocaleString()}
              </div>
              <div>
                Overall Dependencies Total:{" "}
                {Object.values(outCategory.outTotalDependencies)
                  .reduce((a, b) => a + b, 0)
                  .toLocaleString()}
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    ));
  };

  const renderSavedDental = () => {
    return cooporate.dentalCorp.dentalCategories.map((dentalCategory) => (
      <div key={dentalCategory.dentalId}>
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Category {dentalCategory.dentalId}</Card.Title>
            <Card.Text>
              <strong>Dental Limit:</strong>{" "}
              {dentalCategory.dentalLimit.toLocaleString()}
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
                  {Array.from(
                    { length: dentalCategory.dentalMembers + 1 },
                    (_, i) => (i === 0 ? "M" : `M+${i}`)
                  ).map((dentalLabel) => (
                    <tr key={dentalLabel}>
                      <td>{dentalLabel}</td>
                      <td>
                        {(
                          dentalCategory.dentalPremiumValues[dentalLabel] || 0
                        ).toLocaleString()}
                      </td>
                      <td>
                        {dentalCategory.dentalDependencies[dentalLabel] || ""}
                      </td>
                      <td>
                        {dentalCategory.dentalTotalDependencies[
                          dentalLabel
                        ].toLocaleString()}
                      </td>
                      <td>
                        {(
                          dentalCategory.dentalTotalPremiumValues[
                            dentalLabel
                          ] || 0
                        ).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div>
                Total Premium Value:{" "}
                {(dentalCategory.dentalTotalPremium || 0).toLocaleString()}
              </div>
              <div>
                Overall Dependencies Total:{" "}
                {Object.values(dentalCategory.dentalTotalDependencies)
                  .reduce((a, b) => a + b, 0)
                  .toLocaleString()}
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    ));
  };

  const renderSavedOptical = () => {
    return cooporate.optCorp.opticalCategories.map((opticalCategory) => (
      <div key={opticalCategory.opticalId}>
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Category {opticalCategory.opticalId}</Card.Title>
            <Card.Text>
              <strong>Optical Limit:</strong>{" "}
              {opticalCategory.opticalLimit.toLocaleString()}
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
                  {Array.from(
                    { length: opticalCategory.opticalMembers + 1 },
                    (_, i) => (i === 0 ? "M" : `M+${i}`)
                  ).map((opticalLabel) => (
                    <tr key={opticalLabel}>
                      <td>{opticalLabel}</td>
                      <td>
                        {(
                          opticalCategory.opticalPremiumValues[opticalLabel] ||
                          0
                        ).toLocaleString()}
                      </td>
                      <td>
                        {opticalCategory.opticalDependencies[opticalLabel] ||
                          ""}
                      </td>
                      <td>
                        {opticalCategory.opticalTotalDependencies[
                          opticalLabel
                        ].toLocaleString()}
                      </td>
                      <td>
                        {(
                          opticalCategory.opticalTotalPremiumValues[
                            opticalLabel
                          ] || 0
                        ).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div>
                Total Premium Value:{" "}
                {(opticalCategory.opticalTotalPremium || 0).toLocaleString()}
              </div>
              <div>
                Overall Dependencies Total:{" "}
                {Object.values(opticalCategory.opticalTotalDependencies)
                  .reduce((a, b) => a + b, 0)
                  .toLocaleString()}
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    ));
  };

  const renderSavedMaternity = () => {
    return cooporate.selectedTriplet.map((triplet, index) => (
      <div key={index}>
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Maternity Category {index + 1}</Card.Title>
            <strong>Maternity Cover Limit:</strong>{" "}
            {triplet.MaternityCoverLimit.toLocaleString()}
            <br />
            <strong>Rate Per Family:</strong>{" "}
            {triplet.RatePerFamily.toLocaleString()}
            <br />
            <strong>Group Minimum Premium:</strong>{" "}
            {triplet.GroupMinimumPremium.toLocaleString()}
          </Card.Body>
        </Card>
      </div>
    ));
  };

  return (
    <>
      <h2>Cooperate Details</h2>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Row>
          <Col>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>{cooporate.companyInfo.companyName}</Card.Title>
                <ListGroup>
                  <ListGroup.Item>
                    <strong>Company Email:</strong>{" "}
                    {cooporate.companyInfo.companyEmail}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Contact Person:</strong>{" "}
                    {cooporate.companyInfo.contactPerson}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Contact Email:</strong>{" "}
                    {cooporate.companyInfo.contactEmail}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Contact Phone:</strong>{" "}
                    {cooporate.companyInfo.contactPhone}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Selected Benefits</Card.Title>
                <ListGroup>
                  {cooporate.selectedBenefits.map((benefit, index) => (
                    <ListGroup.Item key={index}>{benefit}</ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
      {renderSavedOut()}
      {renderSavedDental()}
      {renderSavedOptical()}
      {renderSavedMaternity()}

      <Card className="mt-3">
        <Card.Body>
          <Table striped bordered hover>
            <tbody>
              <tr>
                <td>Total Maternity</td>
                <td>{cooporate.totalMaternity.toLocaleString()}</td>
              </tr>
              <tr>
                <td>Mutuel De Sante</td>
                <td>{cooporate.MutuelDeSante.toLocaleString()}</td>
              </tr>
              <tr>
                <td>Admin Fee</td>
                <td>{cooporate.AdminFee.toLocaleString()}</td>
              </tr>
              <tr>
                <td>Total Premium</td>
                <td>{cooporate.overAllPremiumTotal.toLocaleString()}</td>
              </tr>
            </tbody>
          </Table>
          <Button variant="primary" onClick={downloadPDF}>
            Download PDF
          </Button>
        </Card.Body>
      </Card>

      {message && <Alert variant="success">{message}</Alert>}
      {loading && <Spinner animation="border" />}
    </>
  );
}

export default CooporateDetails;
