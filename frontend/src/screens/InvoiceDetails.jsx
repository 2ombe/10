import React, { useState, useEffect, useContext } from 'react';
import { Container, Table, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const InvoiceDetails = () => {
  const [invoice, setInvoice] = useState(null);
  const {state}=useContext(AuthContext)
  const {userInfo}=state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const params = useParams();
  const { id:  quotationId  } = params;
 
  
  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(`/api/invoices/${quotationId}/invoice`,{
            headers:{Authorization:`Bearer ${userInfo.token}`}
        });
        setInvoice(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching invoice');
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [quotationId,userInfo]);

  if (loading) {
    return (
      <Container className="mt-5">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!invoice) {
    return (
      <Container className="mt-5">
        <Alert variant="warning">No Invoice Found</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h3>Invoice Details</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Invoice Number</th>
            <th>Company Name</th>
            <th>Address</th>
            <th>TIN Number</th>
            <th>Total Amount</th>
            <th>Discount</th>
            <th>Final Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{invoice.invoiceNumber}</td>
            <td>{invoice.companyInfo.name}</td>
            <td>{invoice.companyInfo.address}</td>
            <td>{invoice.companyInfo.tinNumber || 'N/A'}</td>
            <td>{invoice.totalAmount.toFixed(2)}</td>
            <td>{invoice.discount.toFixed(2)}</td>
            <td>{invoice.finalAmount.toFixed(2)}</td>
            <td>{invoice.status}</td>
          </tr>
        </tbody>
      </Table>

      <h4 className="mt-4">Items</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, index) => (
            <tr key={index}>
              <td>{item.description}</td>
              <td>{item.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="mt-4">
        <strong>Created By: </strong>
        {invoice.createdBy.name || 'N/A'}
      </div>
      <div>
        <strong>Created At: </strong>
        {new Date(invoice.createdAt).toLocaleString()}
      </div>
    </Container>
  );
};

export default InvoiceDetails;
