import React, { useState } from 'react';
import { CardForm, PrimaryGird, InputField } from '../../pages/Props.jsx';
import Images from '../../pages/Images.jsx';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, Tabs, Button, Table } from 'react-bootstrap';

// Bootstrap imports

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
    profilePic: Images.UserName // Replace with actual image URL if needed
  };
    return (
        <div className="employee_profile_container">
            <div className='employee_profile_pic_content'>
                <div className='employee_profile_pic'>
                    <img src={employee.profilePic} alt="Profile" className="rounded-circle" style={{ width: '90px', height: '90px' }} />
                </div>
                <div className='employee_profile_content'>
                    <h5 className="mb-0">
                        <label>{employee.name}{' '}</label>
                        <span className="badge">{employee.status}</span>
                    </h5>
                    <p className="">{employee.designation}</p>
                    <a href="#" className="">
                        {employee.id}
                    </a>
                </div>
            </div>
            <div className="employee_profile_details">
                <label>Department</label>
                <span>{employee.department}</span>
            </div>
            <div className="employee_profile_details">
                <label>Joining Date</label>
                <span>{employee.joiningDate}</span>
            </div>
            <div className="employee_profile_details">
                <label>Employment Type</label>
                <span>{employee.employmentType}</span>
            </div>
            <div className="employee_profile_details">
                <label>Manager</label>
                <span>{employee.manager}</span>
            </div>
            <div className="employee_profile_details">
                <label>Work Location</label>
                <span>{employee.workLocation}</span>
            </div>
            <div className="employee_offer_letter">
                <a href={employee.offerLetter} className="">
                    <img src={Images.OfferLetter} alt="Offer Letter" className="offer_letter_icon" />
                    {' '}
                    Offer Letter
                </a>
            </div>
        </div>
    )
}

export default EmployeeProfileCard
