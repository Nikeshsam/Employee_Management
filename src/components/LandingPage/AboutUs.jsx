import React, { useState } from 'react';
import Images from '../../pages/Images.jsx';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, Tabs, Button, Table, Stack, Image } from 'react-bootstrap';
import { Key } from 'lucide-react';

// Bootstrap imports

function AboutUs() {
    return (
        <Col md={12} lg={12} xl={12} xxl={12}>
            <div className='About_container pe-5 ps-5'>
                <h2 style={{ lineHeight: '42px' }}>Unlock The Power Of Cloud HR Solutions Today!</h2>
                <p>Sign up now for a free trial and discover how our cloud HR solutions can revolutionize the way you manage your workforce. Say goodbye to manual processes and hello to seamless efficiency!</p>
                <Stack direction="horizontal" className='justify-content-center mt-3' gap={3}>
                    <Button className='primary_btn_rounded'>Get started</Button>
                </Stack>
            </div>
        </Col>
    )
}

export default AboutUs