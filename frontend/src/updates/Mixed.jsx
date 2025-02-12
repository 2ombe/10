import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Row, Spinner, Table, ListGroup, Alert} from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import LoadingBox from '../component/LoadingBox';
import {  useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Mixed() {
const [message, setMessage] = useState('');
  const { state } = useContext(AuthContext);
  const navigate = useNavigate()
  const params = useParams();
  const { id: cooporateId } = params;
  const { userInfo } = state;
  const [cooporate, setCooporate] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [invoice, setInvoice] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [cooperateId, setCooperateId] = useState("");
  const [regMembers, setRegMembers] = useState(null);
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

  const categoryId = cooporateId;
 const handleCreateInvoice = async () => {
    setLoading(true);
    try {
      await axios.post(
        "/api/invoices/create",
        { cooperateId: categoryId },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      setShowModal(false);
      setCooperateId("");
      navigate("/invoice");
    } catch (error) {
      console.error("Error creating invoice:", error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadInvoice = async () => {
    try {
      const response = await axios.get(
        `/api/invoices/${invoice._id}/download`,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
          responseType: "blob", // This ensures that the response is treated as a binary large object.
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice_${cooporateId}.pdf`);
      document.body.appendChild(link);
      link.click();
      navigate("/invoice");
    } catch (error) {
      console.error("Error downloading invoice:", error);
    }
  };
 useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/members/${categoryId}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setRegMembers(response.data);
      } catch (error) {
        setError("Error fetching members");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [categoryId, userInfo]);
  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(
          `/api/invoices/${cooporateId}/invoice`,
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        setInvoice(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching invoice");
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [cooporateId, userInfo]);
  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : (
      <Row>
        <Col md={8}>     
        </Col>
        <Col md={4}>
          <Card.Body>        
           <ListGroup>
             {cooporate.status==="Accepted"&&(
    <>
   {regMembers===null?(
    <></>
      // <Button onClick={() => navigate(`/upload/members/${cooporateId}`)}>
      //         Add member
      //       </Button>
    ):(
      <>
              {/* {invoice === null ? (
                <Button onClick={() => handleCreateInvoice()}>
                  Create Invoice
                </Button>
              ) : (
                <Button onClick={() => handleDownloadInvoice()}>
                  Download Invoice
                </Button>
              )}
              <Button
                onClick={() => navigate(`/members/${cooporateId}`)}
              >
                View member
              </Button> */}
      </>
    )}
            </>
   )} 
           </ListGroup>
          </Card.Body>
        
        </Col>
    {cooporate?.status === "Accepted"  && (
  <Col>
    <Button variant="info" onClick={downloadPDF}>Download PDF</Button>
  </Col>
)}
      </Row>
      )}
    </div>
  );
}

export default Mixed;
