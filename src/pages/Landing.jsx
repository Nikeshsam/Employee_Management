import React from 'react';
import { useState } from 'react';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, Tabs, Button, Table } from 'react-bootstrap';

// Bootstrap imports

import LandingHeader from '../components/LandingPage/header.jsx';

const Landing = () => {
    return (
        <Container fluid>
            <Row>
                <Col>
                    <LandingHeader></LandingHeader>
                </Col>
            </Row>
        </Container>
    )
}

export default Landing
