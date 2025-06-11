import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import TaskReminder from '../Common/Task_Reminder.jsx';
import Refresh from '../../assets/Images/refresh.svg';

const Dashboard = () => {

  return (
    <Container fluid>
      <Row>
        <Col md={12} lg={7} xl={7} xxl={7}>
          <Card className='primary_card'>
            <Card.Header>
              <h3>Task & Reminders</h3>
              <div className="heading_elements">
                <i className='square'>
                  <img src={Refresh} alt="" />
                </i>
              </div>
            </Card.Header>
            <Card.Body>
              <TaskReminder/>
            </Card.Body>
          </Card>
        </Col>
        <Col md={12} lg={5} xl={5} xxl={5}></Col>
      </Row>
    </Container>
  )
}

export default Dashboard
