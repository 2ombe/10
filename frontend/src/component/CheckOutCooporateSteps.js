import React from "react";
import { Col, Row } from "react-bootstrap";
import "./CheckoutRetailSteps.css";
function CheckOutCooporateSteps(props) {
  return (
    <Row className="checkout-steps">
      <Col className={props.step1 ? "active" : ""}>Company Details</Col>
      <Col className={props.step2 ? "active" : ""}>Inpatient Premium</Col>
      <Col className={props.step3 ? "active" : ""}>Outpatient Premium</Col>
      <Col className={props.step4 ? "active" : ""}>Dental Premium</Col>
      <Col className={props.step5 ? "active" : ""}>Optical Premium</Col>
      <Col className={props.step6 ? "active" : ""}>Maternity Premium</Col>
      <Col className={props.step7 ? "active" : ""}>Add benefits</Col>
      <Col className={props.step8 ? "active" : ""}>Dental benefits</Col>
      <Col className={props.step9 ? "active" : ""}>Optical benefits</Col>
      <Col className={props.step10 ? "active" : ""}>Extended values</Col>
      <Col className={props.step11 ? "active" : ""}>Premium Calculator</Col>
    </Row>
  );
}

export default CheckOutCooporateSteps;
