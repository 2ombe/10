// src/components/QuotationResult.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const QuotationResult = () => {
  const { id } = useParams();
  const [quotation, setQuotation] = useState(null);

  useEffect(() => {
    const fetchQuotation = async () => {
      const res = await axios.get(`/api/ishema/${id}`);
      setQuotation(res.data);
    };
    fetchQuotation();
  }, [id]);

  if (!quotation) return <p>Loading...</p>;

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h2>Quotation Result</h2>
          <p><strong>Plan:</strong> {quotation.plan.name}</p>
          <p><strong>Total Inpatient Premium:</strong> {quotation.totalInpatientPremium}</p>
          <p><strong>Total Outpatient Premium:</strong> {quotation.totalOutpatientPremium}</p>
          <p><strong>Dental Premium:</strong> {quotation.dentalPremium}</p>
          <p><strong>Optical Premium:</strong> {quotation.opticalPremium}</p>
          <p><strong>Maternity Premium:</strong> {quotation.maternityPremium}</p>
          <p><strong>Basic Premium:</strong> {quotation.basicPremium}</p>
          <p><strong>Mituelle de Sante:</strong> {quotation.mituelleDeSante}</p>
          <p><strong>Administration Fees:</strong> {quotation.administrationFees}</p>
          <p><strong>Total Premium:</strong> {quotation.totalPremium}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default QuotationResult;
