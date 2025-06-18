import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Card from 'react-bootstrap/Card';


function EmployeeProfileCard () {
  const employee = [
    {
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
      profilePic: 'https://via.placeholder.com/70' // Replace with actual image URL if needed
    }
  ];
  return (
    <Card>
      <Card.Body>
      <div className="d-flex align-items-center">
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
      </div>

      <div className="d-flex flex-wrap text-muted">
        <div className="me-4">
          <small className="d-block fw-bold text-dark">Department</small>
          <small>{employee.department}</small>
        </div>
        <div className="me-4">
          <small className="d-block fw-bold text-dark">Joining Date</small>
          <small>{employee.joiningDate}</small>
        </div>
        <div className="me-4">
          <small className="d-block fw-bold text-dark">Employment Type</small>
          <small>{employee.employmentType}</small>
        </div>
        <div className="me-4">
          <small className="d-block fw-bold text-dark">Manager</small>
          <small>{employee.manager}</small>
        </div>
        <div className="me-4">
          <small className="d-block fw-bold text-dark">Work Location</small>
          <small>{employee.workLocation}</small>
        </div>
      </div>

      <div className="text-end">
        <a href={employee.offerLetter} className="text-danger d-flex align-items-center">
          Offer Letter
        </a>
      </div>
      </Card.Body>
    </Card>
  );
};

export default EmployeeProfileCard;
