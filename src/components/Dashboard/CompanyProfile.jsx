import React, { useState } from 'react';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, Tabs, Button, Table } from 'react-bootstrap';
import { CardForm } from '../../pages/Props';

// Bootstrap imports

const CompanyProfile = () => {
  return (
    <Container fluid>
      <Row>
        <Col md={12} lg={12} xl={12} xxl={12}>
            <CardForm></CardForm>
        </Col>
      </Row>
    </Container>
  )
}

export default CompanyProfile
