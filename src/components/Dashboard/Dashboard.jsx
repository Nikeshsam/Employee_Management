import React, { useState } from 'react';
import { useLoginUser } from '../../context/LoginUserContext.jsx';
import Images from "../../pages/Images.jsx";

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Nav, Col, Tab, Tabs, Button, Table } from 'react-bootstrap';

// Bootstrap imports

import Refresh from '../../assets/Images/refresh.svg';
import Calendar from '../../assets/Images/calendar.svg';

import TaskReminder from '../Common/Task_Reminder.jsx';
import EmployeeStatistics from '../Common/EmployeeStatistics.jsx';
import UpcomingEvents from '../Common/UpcomingEvents.jsx';
import AttendanceSummary from '../Common/AttendanceSummary.jsx';
import EmployeeList from '../Common/EmployeeList.jsx';
import Attendance from '../Common/Attendance.jsx';
import LeaveReport from '../Common/LeaveReport.jsx';
import HolidayList from '../Common/HolidayList.jsx';
import Birthday from '../Common/Birthday.jsx';
import RequestApproval from '../Common/RequestApproval.jsx';
import KeyMetrics from '../Common/KeyMetrics.jsx';


const Dashboard = () => {
  const { loginUser } = useLoginUser();

  // console.log("👉 Logged user object:", loginUser.user);
  // console.log("👉 Role is:", loginUser?.user.role);

  return (
    <Container fluid>
      
      {loginUser?.user.role === "admin" && (
        <>
          <Row className='mt-0 gx-3'>
            <Col md={12} lg={12} xl={12} xxl={12}>
              <Card className='primary_card'>
                <Card.Header style={{height: 'auto'}}>
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
                <Card.Body className=''>
                  <EmployeeStatistics />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className='mt-3 gx-3'>
            <Col md={12} lg={7} xl={7} xxl={7}>
                <KeyMetrics />
            </Col>
            <Col md={12} lg={5} xl={5} xxl={5}>
              <Card className='primary_card mb-3'>
                <Card.Header>
                  <h3>Upcoming Events</h3>
                  <div className="heading_elements">
                    <button className='my_calendar' type='button'> <i><img src={Calendar} alt="" /></i> View Calendar</button>
                  </div>
                </Card.Header>
                <Card.Body className=''>
                  <UpcomingEvents />
                </Card.Body>
              </Card>
              <Card className='primary_card'>
                <Card.Header>
                  <h3>Attendance Summary</h3>
                  <div className="heading_elements">
                    <i className='square'>
                      <img src={Refresh} alt="" />
                    </i>
                  </div>
                </Card.Header>
                <Card.Body className=''>
                  <AttendanceSummary />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className='mt-3 gx-3'>
            <Col md={12} lg={12} xl={12} xxl={12}>
              <Card className='primary_card'>
                <Card.Header style={{borderBottom: 'none'}}>
                  <h3>Recent Employee</h3>
                </Card.Header>
                <Card.Body className='pt-0'>
                  <EmployeeList />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
      
      {loginUser?.user.role === "user" && (
        <>
          <Row>
            <Col md={12} lg={12} xl={12} xxl={12}>
              <Card className='Gradient_Card'>
                <Card.Body>
                  <div className='Employee_Main_Card'>
                    <div className='Employee_Title'>
                      <h5>Hi Nikesh Balu</h5>
                      <p>Thursday, 20th February</p>
                    </div>
                    <div className='Employee_checkIn'>
                      <button type='button'>Check Out <i><img src={Images.TimeLoader} alt="" /></i></button>
                      <span>01:18:04 Hrs</span>
                    </div>
                    <div className='Employee_ActionBtn'>
                      <button type='button'>Apply Leave</button>
                      <button type='button'>Log Time</button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className='mt-3 gx-3'>
            <Col md={12} lg={4} xl={4} xxl={4}>
              <Card className='primary_card'>
                <Card.Header style={{borderBottom: '1px solid #FF6B6B'}}>
                  <h3>Attendance</h3>
                  <div className="heading_elements">
                    {/* <i className='square'>
                      <img src={Refresh} alt="" />
                    </i> */}
                  </div>
                </Card.Header>
                <Card.Body className=''>
                  <Attendance/>
                </Card.Body>
              </Card>
            </Col>
            <Col md={12} lg={4} xl={4} xxl={4}>
              <Card className='primary_card'>
                <Card.Header style={{borderBottom: '1px solid #38D9A9'}}>
                  <h3>Leave Report</h3>
                  <div className="heading_elements">
                    {/* <i className='square'>
                      <img src={Refresh} alt="" />
                    </i> */}
                  </div>
                </Card.Header>
                <Card.Body className=''>
                  <LeaveReport/>
                </Card.Body>
              </Card>
            </Col>
            <Col md={12} lg={4} xl={4} xxl={4}>
              <Card className='primary_card'>
                <Card.Header style={{borderBottom: '1px solid #FFA94D'}}>
                  <h3>Holiday List</h3>
                  <div className="heading_elements">
                    {/* <i className='square'>
                      <img src={Refresh} alt="" />
                    </i> */}
                  </div>
                </Card.Header>
                <Card.Body className=''>
                  <HolidayList/>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className='mt-3 gx-3'>
            <Col md={12} lg={4} xl={4} xxl={4}>
              <Card className='primary_card'>
                <Card.Header style={{borderBottom: '1px solid #4DABF7'}}>
                  <h3>Task & Reminders</h3>
                  <div className="heading_elements">
                    <i className='square'>
                      <img src={Refresh} alt="" />
                    </i>
                  </div>
                </Card.Header>
                <Card.Body className=''>
                  <TaskReminder />
                </Card.Body>
              </Card>
            </Col>
            <Col md={12} lg={4} xl={4} xxl={4}>
              <Card className='primary_card'>
                <Card.Header style={{borderBottom: '1px solid #9775FA'}}>
                  <h3>Birthday</h3>
                  <div className="heading_elements">
                    {/* <i className='square'>
                      <img src={Refresh} alt="" />
                    </i> */}
                  </div>
                </Card.Header>
                <Card.Body className=''>
                  <Birthday />
                </Card.Body>
              </Card>
            </Col>
            <Col md={12} lg={4} xl={4} xxl={4}>
              <Card className='primary_card'>
                <Card.Header style={{borderBottom: '1px solid #F783AC'}}>
                  <h3>Request For Approval</h3>
                  <div className="heading_elements">
                      <div className='notifi'>
                        <span>Pending</span>
                        <i>8</i>
                      </div>
                  </div>
                </Card.Header>
                <Card.Body className=''>
                  <RequestApproval />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Container>
  )
}

export default Dashboard
