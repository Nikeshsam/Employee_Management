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
import LandingAboutUs from '../components/LandingPage/AboutUs.jsx';
import LandingFooter from '../components/LandingPage/Footer.jsx';

const Landing = () => {

    const [modalShow, setModalShow] = React.useState(false);

    return (
        <>
            <Container className='bg-white' style={{ borderBottom: '1px solid #D3D2D2', position: 'fixed', zIndex: '99' }} fluid>
                <Container>
                    <Row>
                        <LandingHeader setModalShow={setModalShow}></LandingHeader>
                    </Row>
                </Container>
            </Container>
            <Container id='home' className='pb-5' style={{ paddingTop: '75px' }}>
                <Row className='pt-5 pb-5 align-items-center'>
                    <LandingBanner modalShow={modalShow} setModalShow={setModalShow}></LandingBanner>
                </Row>
            </Container>
            <Container id='product' className='pt-5 mb-5' style={{ backgroundColor: '#F6F9FF' }} fluid>
                <Container className='pt-5'>
                    <Row className="justify-content-center">
                        <LandingProduct></LandingProduct>
                    </Row>
                </Container>
            </Container>
            <Container id='features' className='pt-5 pb-5 mb-5'>
                <Row className="align-items-center">
                    <LandingFeatures></LandingFeatures>
                </Row>
            </Container>
            <Container id='pricing' className='pt-5 pb-5' style={{ backgroundColor: '#F6F9FF' }} fluid>
                <Container className='pt-5 pb-5'>
                    <Row>
                        <LandingPricing></LandingPricing>
                    </Row>
                </Container>
            </Container>
            <Container id='about' className='pt-5 pb-5' style={{ backgroundColor: '#1A202C' }} fluid>
                <Container className='pt-5 pb-5'>
                    <Row>
                        <LandingAboutUs></LandingAboutUs>
                    </Row>
                </Container>
            </Container>
            <Container id='Product' className='pt-4 pb-4' fluid>
                <Container>
                    <Row>
                        <LandingFooter></LandingFooter>
                    </Row>
                </Container>
            </Container>
        </>
    )
}

export default Landing
