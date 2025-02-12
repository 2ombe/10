import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Invoice = () => {
    const {state}=useContext(AuthContext)
    const {userInfo}=state
  const [invoices, setInvoices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [cooperateId, setCooperateId] = useState('');
  const [loading, setLoading] = useState(false);
const navigate=useNavigate()
  useEffect(() => {
    fetchInvoices();
  }, [userInfo]);

  const fetchInvoices = async () => {
    try {
      const { data } = await axios.get('/api/invoices//get/invoices',{
        headers:{Authorization:`Bearer ${userInfo.token}`}
      });
      setInvoices(data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  const handleCreateInvoice = async () => {
    setLoading(true);
    try {
      await axios.post('/api/invoices/create', { cooperateId },{
        headers:{Authorization:`Bearer ${userInfo.token}`}
      });
      fetchInvoices();
      setShowModal(false);
      setCooperateId('');
    } catch (error) {
      console.error('Error creating invoice:', error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadInvoice = async (id) => {
    try {
      const response = await axios.get(`/api/invoices/${id}`,{
        headers:{Authorization:`Bearer ${userInfo.token}`}
      }, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `invoice_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading invoice:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Invoices</h1>

      <Button variant="primary" onClick={() => setShowModal(true)}>
        Create Invoice
      </Button>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Invoice Number</th>
            <th>Company Name</th>
            <th>Total Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice._id}>
              <td>{invoice.invoiceNumber}</td>
              <td>{invoice.companyInfo.name}</td>
              <td>{invoice.finalAmount.toFixed(2)}</td>
            
              <td>
                <Button
                  variant="success"
                  onClick={navigate('/cooporateList')}
                >
                  Back
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Invoice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Cooperate ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Cooperate ID"
              value={cooperateId}
              onChange={(e) => setCooperateId(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleCreateInvoice}
            disabled={loading || !cooperateId}
          >
            {loading ? 'Creating...' : 'Create Invoice'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Invoice;
