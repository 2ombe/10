import React from "react";
import { Col, Row } from "react-bootstrap";
import "./CheckoutRetailSteps.css";
function CheckOutRetailSteps(props) {
  return (
    <Row className="checkout-steps">
      <Col className={props.step1 ? "active" : ""}>Client Info</Col>
      <Col className={props.step2 ? "active" : ""}>In Patient Premium</Col>
      <Col className={props.step3 ? "active" : ""}>Out Patient Premium</Col>
      <Col className={props.step4 ? "active" : ""}>Dental Premium</Col>
      <Col className={props.step5 ? "active" : ""}>Optical Premium</Col>
      <Col className={props.step6 ? "active" : ""}>Maternity Premium</Col>
      <Col className={props.step7 ? "active" : ""}>Benefits</Col>
      <Col className={props.step8 ? "active" : ""}>Premium Calculator</Col>
    </Row>
  );
}

export default CheckOutRetailSteps;
