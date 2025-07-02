import React from 'react';
import { useState } from 'react';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, Tabs, Button, Table } from 'react-bootstrap';

// Bootstrap imports

import LandingHeader from '../components/LandingPage/Header.jsx';
import LandingBanner from '../components/LandingPage/Banner.jsx';

const Landing = () => {
    return (
        <>
            <Container style={{ borderBottom: '1px solid #D3D2D2' }} fluid>
                <Container>
                    <Row>
                        <LandingHeader></LandingHeader>
                    </Row>
                </Container>
            </Container>
            <Container className='pt-5 pb-5'>
                <Row className='pt-5 pb-5 align-items-center'>
                    <LandingBanner></LandingBanner>
                </Row>
            </Container>
        </>
    )
}

export default Landing
