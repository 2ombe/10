import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Table,
  Button,
  Spinner,
  Alert,
  InputGroup,
  FormControl,
  Form
} from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const CooperateList = () => {
  const navigate = useNavigate();
  const { state } = useContext(AuthContext);
  const { userInfo } = state;

  const [cooperates, setCooperates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Fetch all cooperates on mount
  useEffect(() => {
    const fetchCooperates = async () => {
      try {
        const { data } = await axios.get("/api/cooporate", {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setCooperates(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch cooperates");
      } finally {
        setLoading(false);
      }
    };

    fetchCooperates();
  }, [userInfo]);

  // Search handler
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setResults([]);
      return;
    }

    try {
      const { data } = await axios.get(
        `/api/cooporate/search?institutionName=${query}`,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      setResults(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred while searching");
      setResults([]);
    }
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  // Data to display: results if a search was made, else all cooperates
  const displayData = results.length > 0 ? results : cooperates;

  return (
    <Container>
      <h2>Corporate Quotations</h2>

      {/* Search Form */}
      <Form onSubmit={submitHandler} className="mb-3">
        <InputGroup>
          <FormControl
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by Company Name"
            aria-label="Search by Company Name"
          />
          <Button variant="outline-primary" type="submit">
            <IoIosSearch />
          </Button>
        </InputGroup>
      </Form>

      {/* Data Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Company Name</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayData.map((cooperate, index) => (
            <tr key={cooperate._id}>
              <td>{index + 1}</td>
              <td>{cooperate.companyInfo.institutionName}</td>
              <td>{cooperate.status}</td>
              <td>{new Date(cooperate.createdAt).toLocaleDateString()}</td>
              <td>
                <Button
                  variant="info"
                  onClick={() => navigate(`/cooporate/${cooperate._id}`)}
                >
                  View details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Back Button */}
      <Button variant="success" onClick={() => navigate("/welcome")}>
        Back
      </Button>
    </Container>
  );
};

export default CooperateList;
