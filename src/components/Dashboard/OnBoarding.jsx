import React, { useState } from 'react';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, Tabs, Button, Table } from 'react-bootstrap';

// Bootstrap imports

import EmployeeProfileDetails from '../EmployeeOnBoarding/EmployeeProfileDetails.jsx';
import BasicInfo from '../EmployeeOnBoarding/BasicInfo.jsx';
import Contact from '../EmployeeOnBoarding/Contact.jsx';
import Family from '../EmployeeOnBoarding/Family.jsx';
import Education from '../EmployeeOnBoarding/Education.jsx';
import WorkExperience from '../EmployeeOnBoarding/WorkExperience.jsx';
import Documents from '../EmployeeOnBoarding/Documents.jsx';
import Benefits from '../EmployeeOnBoarding/Benefits.jsx';
import HealthRecord from '../EmployeeOnBoarding/HealthRecord.jsx';
import Travel from '../EmployeeOnBoarding/Travel.jsx';


function EmployeeProfileCard() {
  return (

    <Container fluid>
      <Row>
        <Col md={12} lg={12} xl={12} xxl={12}>
          <Card className='card_purple mb-4'>
            <Card.Body>
              <EmployeeProfileDetails />
            </Card.Body>
          </Card>
        </Col>
        <Col md={12} lg={12} xl={12} xxl={12}>

          <Tabs defaultActiveKey="basic_info" transition={false} id="noanim-tab-example" className="mb-3 Secondary_tab">
            <Tab eventKey="basic_info" title="Basic Info">
              <BasicInfo/>
            </Tab>
            <Tab eventKey="contact" title="Contact">
              <Contact/>
            </Tab>
            <Tab eventKey="family" title="Family">
              <Family/>
            </Tab>
            <Tab eventKey="education" title="Education">
              <Education/>
            </Tab>
            <Tab eventKey="work_experience" title="Work Experience">
              <WorkExperience/>
            </Tab>
            <Tab eventKey="documents" title="Documents">
              <Documents/>
            </Tab>
            <Tab eventKey="benefits" title="Benefits">
              <Benefits/>
            </Tab>
            <Tab eventKey="health_record" title="Health Record">
              <HealthRecord/>
            </Tab>
            <Tab eventKey="travel" title="Travel">
              <Travel/>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default EmployeeProfileCard;
