import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';

const SingleCooporate = () => {
  const { id } = useParams();
  const [quotation, setQuotation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuotation = async () => {
      try {
        const response = await axios.get(`/api/cooporate/${id}`);
        setQuotation(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching the quotation');
        setLoading(false);
      }
    };

    fetchQuotation();
  }, [id]);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="text-center mt-5">
              <Card.Body>
                <Card.Text>{error}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="mt-5">
            <Card.Header as="h5">Quotation Details</Card.Header>
            <Card.Body>
              <Card.Title>{quotation.company}</Card.Title>
              <Card.Text><strong>Details:</strong> {quotation.details}</Card.Text>
              <Card.Text><strong>Overall Limit:</strong> {quotation.overalllimit}</Card.Text>
              <Card.Text><strong>Overall Premium:</strong> {quotation.overallPremium}</Card.Text>
              <Card.Text><strong>Mutuelle De Santé:</strong> {quotation.MutuelleDeSanté}</Card.Text>
              <Card.Text><strong>Status:</strong> {quotation.status}</Card.Text>
              <h5 className="mt-4">Members</h5>
              {quotation.members.map((member, index) => (
                <div key={index}>
                  <Card.Text><strong>Type:</strong> {member.type}</Card.Text>
                  <Card.Text><strong>No Of Staff:</strong> {member.NoOfStaff}</Card.Text>
                  <Card.Text><strong>Premium Per Staff:</strong> {member.PremiumPerStaff}</Card.Text>
                  <Card.Text><strong>Total Premium:</strong> {member.TotalPremium}</Card.Text>
                  <hr />
                </div>
              ))}
              <h5 className="mt-4">Benefits</h5>
              {quotation.benefits.map((benefit, index) => (
                <div key={index}>
                  <Card.Text><strong>Name:</strong> {benefit.name}</Card.Text>
                  <Card.Text><strong>Limit:</strong> {benefit.limit}</Card.Text>
                  <Card.Text><strong>Total Limit:</strong> {benefit.totalLimit}</Card.Text>
                  <hr />
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SingleCooporate;
