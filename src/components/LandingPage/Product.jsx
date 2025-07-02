import React from 'react';
import Images from '../../pages/Images.jsx';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, Tabs, Button, Table, Stack } from 'react-bootstrap';

// Bootstrap imports

function Product() {
    return (
        <>
            <Col md={12} lg={12} xl={12} xxl={12}>
                <div className='Banner_container align-items-center pe-5 ps-5'>
                    <span style={{lineHeight:'20px'}}>Product</span>
                    <h2 style={{lineHeight:'42px'}}>See Our Cloud HR Solutions In Action</h2>
                    <p style={{lineHeight:'24px', textAlign:'center'}}>The best HR software for SMB companies and startup to manage employee,<br/> payroll assistance, time off, attendance tracking with single software</p>
                </div>
            </Col>
        </>
    )
}

export default Product
