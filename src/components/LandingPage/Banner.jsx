import React from 'react';
import Images from '../../pages/Images.jsx';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, Tabs, Button, Table, Stack } from 'react-bootstrap';

// Bootstrap imports

function Banner() {
  return (
    <>
      <Col md={6} lg={6} xl={6} xxl={6}>
        <div className='Banner_container me-2 pe-5'>
          <span>Recruit - Onboard - Manage</span>
          <h2>Revolutionize Your HR Management with Cloud-Based Solutions</h2>
          <p>The best HR software for SMB companies and startup to manage employee, payroll assistance, time off, attendance tracking with single software</p>
          <Stack direction="horizontal" gap={3}>
            <Button className='primary_btn_rounded'>Get started</Button>
            <Button className='secondary_btn_rounded'>How it works</Button>
          </Stack>
        </div>
      </Col>
      <Col md={6} lg={6} xl={6} xxl={6}>
      <img src={Images.BannerImage} alt="" />
      </Col>
    </>
  )
}

export default Banner