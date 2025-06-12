import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Refresh from '../../assets/Images/refresh.svg';
import TaskReminder from '../Common/Task_Reminder.jsx';
import EmployeeStatistics from '../Common/EmployeeStatistics.jsx';
import Calendar from '../../assets/Images/calendar.svg';
import UpcomingEvents from '../Common/UpcomingEvents.jsx';


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
            <Card.Body className='pt-1'>
              <TaskReminder/>
            </Card.Body>
          </Card>
        </Col>
        <Col md={12} lg={5} xl={5} xxl={5}>
          <Card className='primary_card'>
            <Card.Header>
              <div className='heading_group'>
                <h3>Employee Statistics</h3>
                <p>Sep 04, 2024 - Oct 04, 2024</p>
              </div>
              <div className="heading_elements">
                <ul className='day_filter'>
                  <li><a className='day_filter_item active' href="">7d</a></li>
                  <li><a className='day_filter_item' href="">30d</a></li>
                  <li><a className='day_filter_item' href="">All</a></li>
                </ul>
              </div>
            </Card.Header>
            <Card.Body className='pt-0'>
              <EmployeeStatistics/>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className='mt-4'>
        <Col md={12} lg={8} xl={8} xxl={8}>
          <Card className='primary_card'>
            <Card.Header>
              <div className='heading_group'>
                <h3>Key Metrics</h3>
                <p>Sep 04, 2024 - Oct 04, 2024</p>
              </div>
              <div className="heading_elements">
                <ul className='day_filter'>
                  <li><a className='day_filter_item active' href="">7d</a></li>
                  <li><a className='day_filter_item' href="">30d</a></li>
                  <li><a className='day_filter_item' href="">All</a></li>
                </ul>
              </div>
            </Card.Header>
            <Card.Body className='pt-1'>
            </Card.Body>
          </Card>
        </Col>
        <Col md={12} lg={4} xl={4} xxl={4}>
          <Card className='primary_card'>
            <Card.Header>
              <h3>Upcoming Events</h3>
              <div className="heading_elements">
                <button className='my_calendar' type='button'> <i><img src={Calendar} alt="" /></i> View Calendar</button>
              </div>
            </Card.Header>
            <Card.Body className='pt-0'>
              <UpcomingEvents/>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Dashboard
