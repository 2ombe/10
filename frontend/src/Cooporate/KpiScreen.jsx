import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function KpiScreen() {
  const navigate = useNavigate();
  const [kpis, setKpis] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newKPI, setNewKPI] = useState({ keyPerformanceIndicator: '', turnaroundTime: '' });

  // Load KPIs from localStorage on component mount
  useEffect(() => {
    const savedKPIs = JSON.parse(localStorage.getItem('kpis')) || [];
    setKpis(savedKPIs);
  }, []);

  // Save KPIs to localStorage whenever the `kpis` state changes
  useEffect(() => {
    localStorage.setItem('kpis', JSON.stringify(kpis));
  }, [kpis]);

  const handleAddKPI = () => {
    const updatedKPIs = [...kpis, { ...newKPI, id: Date.now() }]; // Add a unique ID
    setKpis(updatedKPIs);
    setNewKPI({ keyPerformanceIndicator: '', turnaroundTime: '' });
  
    
  };

  const handleDeleteKPI = (id) => {
    const updatedKPIs = kpis.filter((kpi) => kpi.id !== id);
    setKpis(updatedKPIs);
  };

  return (
    <div className="container mt-5">
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add New KPI
      </Button>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Key Performance Indicator</th>
            <th>Turnaround Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {kpis.map((kpi, index) => (
            <tr key={kpi.id}>
              <td>{index + 1}</td>
              <td>{kpi.keyPerformanceIndicator}</td>
              <td>{kpi.turnaroundTime}</td>
              <td>
                <Button variant="danger" onClick={() => handleDeleteKPI(kpi.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary" onClick={navigate('/cooporate')}>
            Save and continue
          </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New KPI</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Key Performance Indicator</Form.Label>
              <Form.Control
                type="text"
                value={newKPI.keyPerformanceIndicator}
                onChange={(e) => setNewKPI({ ...newKPI, keyPerformanceIndicator: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Turnaround Time</Form.Label>
              <Form.Control
                type="text"
                value={newKPI.turnaroundTime}
                onChange={(e) => setNewKPI({ ...newKPI, turnaroundTime: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddKPI}>
            Add Kpi
          </Button>
         
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default KpiScreen;