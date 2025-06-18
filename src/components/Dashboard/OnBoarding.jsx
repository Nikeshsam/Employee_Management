import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import EmployeeProfileDetails from '../EmployeeOnBoarding/EmployeeProfileDetails.jsx';

import Card from 'react-bootstrap/Card';


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

          <Tabs defaultActiveKey="home" transition={false} id="noanim-tab-example" className="mb-3 Secondary_tab">
            <Tab eventKey="basic_info" title="Basic Info">
              {/* <BasicInfo/> */}
            </Tab>
            <Tab eventKey="contact" title="Contact">
              {/* <Contact/> */}
            </Tab>
            <Tab eventKey="family" title="Family">
              {/* <Family/> */}
            </Tab>
            <Tab eventKey="education" title="Education">
              {/* <Education/> */}
            </Tab>
            <Tab eventKey="work_experience" title="Work Experience">
              {/* <WorkExperience/> */}
            </Tab>
            <Tab eventKey="documents" title="Documents">
              {/* <Documents/> */}
            </Tab>
            <Tab eventKey="benefits" title="Benefits">
              {/* <Benefits/> */}
            </Tab>
            <Tab eventKey="health_record" title="Health Record">
              {/* <HealthRecord/> */}
            </Tab>
            <Tab eventKey="travel" title="Travel">
              {/* <Travel/> */}
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default EmployeeProfileCard;
