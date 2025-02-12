import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Table, Button, Container, Spinner, Alert, Form, Row, Col } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const PendingIshemaQuotations = () => {
    const {state}=useContext(AuthContext)
    const {userInfo}=state
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    day: "",
    month: "",
    year: "",
  });

  const fetchQuotations = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/ishama/pending", {
        headers: { Authorization: `Bearer ${userInfo.token}` },
        params: filters, 
      });
      setQuotations(data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching quotations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotations();
  }, [filters]);

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  return (
    <Container>
      <h2>Pending Quotations</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      {loading && <Spinner animation="border" />}

      <Form className="mb-4">
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Day</Form.Label>
              <Form.Control
                type="number"
                name="day"
                value={filters.day}
                onChange={handleFilterChange}
                placeholder="Day (1-31)"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Month</Form.Label>
              <Form.Control
                type="number"
                name="month"
                value={filters.month}
                onChange={handleFilterChange}
                placeholder="Month (1-12)"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="number"
                name="year"
                value={filters.year}
                onChange={handleFilterChange}
                placeholder="Year (e.g., 2024)"
              />
            </Form.Group>
          </Col>
        </Row>
        <Button className="mt-3" onClick={fetchQuotations}>
          Apply Filters
        </Button>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Customer Name</th>
            <th>Plan</th>
            <th>Created At</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {quotations.map((quotation, index) => (
            <tr key={quotation._id}>
              <td>{index + 1}</td>
              <td>{quotation.beneficiaryInfo.CUSTOMER_NAME}</td>
              <td>{quotation.plan}</td>
              <td>{new Date(quotation.createdAt).toLocaleDateString()}</td>
              <td>{quotation.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default  PendingIshemaQuotations;
