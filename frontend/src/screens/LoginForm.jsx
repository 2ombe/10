import React, { useContext, useEffect, useState } from 'react'
import {useLocation, useNavigate} from "react-router-dom"
import { Form, Button, Container, Card, CardHeader, CardBody, CardFooter} from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext'
import axios from 'axios';
import { toast } from 'react-toastify';
function LoginForm() {
    const { state, dispatch: ctxDispatch } = useContext(AuthContext);
  const { userInfo } = state;
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
const navigate=useNavigate()
    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/auth/signin", {
        email,
        password,
      });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/welcome");
    } catch (err) {
      toast.error("Invalid credentials");
    }
  };

   return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",alignContent:"center"}}>

    <Container className="small-container">
     <Card>
<CardHeader>

          <h2>Login</h2>
</CardHeader>
          <Form onSubmit={handleSubmit}>
<CardBody>
  
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <CardFooter>
            <Button variant="success" type="submit">
              Login
            </Button>

            </CardFooter>
</CardBody>
          </Form>
     </Card>
   
    </Container>
    </div>
  );
}

export default LoginForm
