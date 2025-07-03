import React from 'react';
import Images from '../../pages/Images.jsx';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, Tabs, Button, Table, Stack, Image } from 'react-bootstrap';

// Bootstrap imports

function Features() {
    return (
        <>
            <Col md={6} lg={6} xl={6} xxl={6}>
                <div className='Banner_container me-2 pe-5'>
                    <span>Our Core Features</span>
                    <h2>We Make It <br /> Effortessly To Track <br /> All Employee <br /> Perfromance</h2>
                    <p>Self service data analytic software that lets you create visually appealing data visualizations and insightful dashboard in minutes</p>
                </div>
                <Row className='pt-5'>
                    <Col md={6} lg={6} xl={6} xxl={6}>
                        <div className="FeaturesCol">
                            <i><Image src={Images.FeatureDashboard} /></i>
                            <h5>Powerful dashboard</h5>
                            <p>Combine multiple report into a single beautiful dashboard</p>
                        </div>
                    </Col>
                    <Col md={6} lg={6} xl={6} xxl={6}>
                        <div className="FeaturesCol">
                            <i><Image src={Images.FeatureOrganize} /></i>
                            <h5>Always in Best Organize</h5>
                            <p>Combine multiple report into a single beautiful dashboard</p>
                        </div>
                    </Col>
                </Row>
            </Col>
            <Col md={6} lg={6} xl={6} xxl={6}>
                <div className="FeaturesImages">
                    <Image src={Images.FeatureImage} alt="Product Image" fluid />
                </div>
            </Col>
        </>
    )
}

export default Features