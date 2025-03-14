import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Card, CardHeader, Col, Container, Form, Modal, Row, Spinner, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function AdminCount() {
    const navigate = useNavigate()
    const { state } = useContext(AuthContext);
    const { userInfo } = state;
    const [count, setCount] = useState(null);
    const [retailCount,setRetailCount]=useState(null)
    const [ishema,setIshema]=useState(null)
    const [smeCount,setSmeCount]=useState(null)
 
    const [lowCostCount,setLowCostCount]=useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchCount = async () => {
        try {
          const { data } = await axios.get('api/cooporate/all/admin', {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          });
        
          setCount(data);
        } catch (error) {
          setError('Failed to fetch the count of Cooperate documents');
        } finally {
          setLoading(false);
        }
      };
  
      fetchCount();
    }, [userInfo]);
  
    useEffect(() => {
      const fetchCount = async () => {
        try {
          const { data } = await axios.get('api/retail/all/admin', {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          });
        
          setRetailCount(data);
        } catch (error) {
          setError('Failed to fetch the count of Retail documents');
        } finally {
          setLoading(false);
        }
      };
  
      fetchCount();
    }, [userInfo]);
    useEffect(() => {
      const fetchCount = async () => {
        try {
          const { data } = await axios.get('api/sme/all/admin', {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          });
        
          setSmeCount(data);
        } catch (error) {
          setError('Failed to fetch the count of SMEs documents');
        } finally {
          setLoading(false);
        }
      };
  
      fetchCount();
    }, [userInfo]);
    useEffect(() => {
      const fetchCount = async () => {
        try {
          const { data } = await axios.get('api/lowcost/all/admin', {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          });
        
          setLowCostCount(data);
        } catch (error) {
          setError('Failed to fetch the count of lowcost documents');
        } finally {
          setLoading(false);
        }
      };
  
      fetchCount();
    }, [userInfo]);
  
    useEffect(() => {
      const fetchCount = async () => {
        try {
          const { data } = await axios.get('api/ishema/all/admin', {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          });
        
          setIshema(data);
        } catch (error) {
          setError('Failed to fetch the count of ishema documents');
        } finally {
          setLoading(false);
        }
      };
  
      fetchCount();
    }, [userInfo]);
  
    if (loading) {
      return <Spinner animation="border" />;
    }
  
    if (error) {
      return <Alert variant="danger">{error}</Alert>;
    }

   return (
     
     <Container style={{justifyContent:"center",alignItems:"center",alignContent:"center",marginTop:"2rem"}}>
       <Row style={{marginTop:"50px",marginBottom:"50px"}}>
<Col>
       <Card>
       <CardHeader className='mb-3' variant="info">
         We have <strong>{count}</strong> Corporate quotations
       </CardHeader>
<Button variant='success' className='mb-3' onClick={()=>navigate('/cooporateList')}>View List</Button>
       </Card>
</Col>
     <Col>
       <Card>
       <CardHeader className='mb-3' variant="info">
         We have <strong>{retailCount}</strong> Retail quotations
       </CardHeader>
<Button variant='success' className='mb-3' onClick={()=>navigate('/retailList')}>View List</Button>
       </Card>
     </Col>
     <Col>
      <Card>
       <CardHeader className='mb-3' variant="info">
         We have <strong>{smeCount}</strong> sme quotations
       </CardHeader>
<Button variant='success' className='mb-3' onClick={()=>navigate('/smeList')}>View List</Button>
       </Card>
     </Col>
       </Row>
       <Row style={{marginTop:"50px"}}>
         <Col>
       <Card>
       <CardHeader className='mb-3' variant="info">
         We have <strong>{lowCostCount}</strong> low cost quotations
       </CardHeader>
<Button variant='success' className='mb-3' onClick={()=>navigate('/lowcostList')}>View List</Button>
       </Card>
         </Col>
         <Col>
       <Card>
       <CardHeader className='mb-3' variant="info">
         We have <strong>{ishema}</strong> ishema quotations
       </CardHeader>
<Button
 variant='success' className='mb-3' onClick={()=>navigate('/ishemaList')}>View List</Button>
       </Card> 
         </Col>
       </Row>
      
     </Container>
   );

}

export default AdminCount
