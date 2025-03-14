import React, { useState, useEffect, useContext } from 'react';
import { Container, Table, Button, Spinner, Alert, Form, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import { IoIosSearch } from "react-icons/io";
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminRetailList= () => {
    const navigate = useNavigate()
    const {state}=useContext(AuthContext)
    const {userInfo}=state
    const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuotations = async () => {
      try {
        const {data} = await axios.get("/api/retail/zose",{
            headers:{Authorization: `Bearer ${userInfo.token}`}
        })
        console.log(data);
        setQuotations(data);
      } catch (error) {
        setError('Failed to fetch quotations');
      } finally {
        setLoading(false);
      }
    };

    fetchQuotations();
  }, [userInfo]);

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setResults([]);
      return;
    }

    try {
      const { data } = await axios.get(
        `/api/retail/search?CUSTOMER_NAME=${query}`,
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

  return (
    <Container>
      <h2>SME Quotations</h2>
         <Form onSubmit={submitHandler} className="mb-3">
        <InputGroup>
          <FormControl
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by Customer Name"
            aria-label="Search by Customer Name"
          />
          <Button variant="outline-primary" type="submit">
            <IoIosSearch />
          </Button>
        </InputGroup>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Plan</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {quotations.map((quotation, index) => (
            <tr key={quotation._id}>
              <td>{index + 1}</td>
              <td>{quotation.plan}</td>
              <td>{quotation.status}</td>
              <td>{new Date(quotation.createdAt).toLocaleDateString()}</td>
              <td>
                <Button variant="info" onClick={() => navigate(`/retail/${quotation._id}`)}>
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="success" onClick={() => navigate("/welcome")}>
        Back
      </Button>
    </Container>
  );
};

export default AdminRetailList;
