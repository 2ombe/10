import React from 'react'
import { Col, Row } from 'react-bootstrap';
import "./CheckoutRetailSteps.css"
function CheckOutIshemaSteps(props) {
  return (
    <Row className='checkout-steps'>
        <Col className={props.step1?"active":""}>In Patient Premium</Col>
        <Col className={props.step2?"active":""}>Out Patient Premium</Col>
        <Col className={props.step3?"active":""}>Ishema calculator</Col>
    </Row>
  )
}

export default CheckOutIshemaSteps
