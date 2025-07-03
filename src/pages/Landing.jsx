import React from 'react';
import { useState } from 'react';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, Tabs, Button, Table } from 'react-bootstrap';

// Bootstrap imports

import LandingHeader from '../components/LandingPage/header.jsx';
import LandingBanner from '../components/LandingPage/Banner.jsx';
import LandingProduct from '../components/LandingPage/Product.jsx';
import LandingFeatures from '../components/LandingPage/Features.jsx';
import LandingPricing from '../components/LandingPage/Pricing.jsx';

const Landing = () => {
    return (
        <>
            <Container className='bg-white' style={{ borderBottom: '1px solid #D3D2D2', position: 'fixed', zIndex: '99' }} fluid>
                <Container>
                    <Row>
                        <LandingHeader></LandingHeader>
                    </Row>
                </Container>
            </Container>
            <Container className='pb-5' style={{ paddingTop: '75px' }}>
                <Row className='pt-5 pb-5 align-items-center'>
                    <LandingBanner></LandingBanner>
                </Row>
            </Container>
            <Container className='pt-5 mb-5' style={{ backgroundColor: '#F6F9FF' }} fluid>
                <Container className='pt-5'>
                    <Row className="justify-content-center">
                        <LandingProduct></LandingProduct>
                    </Row>
                </Container>
            </Container>
            <Container className='pt-5 pb-5 mb-5'>
                <Row className="align-items-center">
                    <LandingFeatures></LandingFeatures>
                </Row>
            </Container>
            <Container className='pt-5 pb-5' style={{ backgroundColor: '#F6F9FF' }} fluid>
                <Container className='pt-5 pb-5'>
                    <Row className="align-items-center">
                        <LandingPricing></LandingPricing>
                    </Row>
                </Container>
            </Container>
        </>
    )
}

export default Landing
