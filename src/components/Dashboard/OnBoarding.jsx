import React from 'react';

import UserName from '../../assets/Images/user_img.svg';

import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Card from 'react-bootstrap/Card';


function EmployeeProfileCard() {
  const employee = {
    id: 'EMP012547',
    name: 'Nikesh Balu',
    designation: 'UI UX Developer',
    department: 'UI UX Team',
    joiningDate: '25/07/2023',
    employmentType: 'Full-Time',
    manager: 'Muthu Karthikeyan',
    workLocation: 'Work From Home',
    status: 'Active',
    offerLetter: '#', // Link to offer letter (PDF)
    profilePic: UserName // Replace with actual image URL if needed
  };
  return (

    <Container fluid>
      <Row>
        <Col md={12} lg={12} xl={12} xxl={12}>
          <Card className='card_purple'>
            <Card.Body>
              <div className="">
                <img src={employee.profilePic} alt="Profile" className="rounded-circle me-3" style={{ width: '70px', height: '70px' }} />
                <div>
                  <h5 className="mb-0">
                    {employee.name}{' '}
                    <span className="badge bg-success ms-2">{employee.status}</span>
                  </h5>
                  <p className="mb-0 text-muted">{employee.designation}</p>
                  <a href="#" className="text-primary fw-bold">
                    {employee.id}
                  </a>
                </div>
                <div className="">
                  <small className="">Department</small>
                  <small>{employee.department}</small>
                </div>
                <div className="">
                  <small className="">Joining Date</small>
                  <small>{employee.joiningDate}</small>
                </div>
                <div className="">
                  <small className="">Employment Type</small>
                  <small>{employee.employmentType}</small>
                </div>
                <div className="">
                  <small className="">Manager</small>
                  <small>{employee.manager}</small>
                </div>
                <div className="">
                  <small className="">Work Location</small>
                  <small>{employee.workLocation}</small>
                </div>
                <div className=''>
                  <a href={employee.offerLetter} className="text-danger d-flex align-items-center">
                    Offer Letter
                  </a>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EmployeeProfileCard;
