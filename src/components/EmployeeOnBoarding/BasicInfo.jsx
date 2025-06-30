import React, { useState } from 'react';
import { CardForm, PrimaryGird, InputField, SelectInput } from '../../pages/Props.jsx';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, Tabs, Button, Table } from 'react-bootstrap';

// Bootstrap imports

// import Props from 'Props.jsx';

const BasicInfo = () => {

    const [nationality, setNationality] = useState([
        { key: '1', label: 'Indian' },
        { key: '2', label: 'Australian' },
        { key: '3', label: 'Chinese' },
        { key: '4', label: 'Japan' },
        { key: '5', label: 'England' },
        { key: '6', label: 'Pakistan' },
        { key: '7', label: 'Dubai' }
    ]);

    const [gender, setGender] = useState([
        { key: '1', label: 'Male' },
        { key: '2', label: 'Female' },
        { key: '3', label: 'Transgender' },
        { key: '4', label: 'Prefer not to say' },
    ]);

    const [maritalstatus, setMaritalStatus] = useState([
        { key: '1', label: 'Single' },
        { key: '2', label: 'Married' }
    ]);

    // FORM INPUT

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <>
            <CardForm>
                <Col md={9} lg={9} xl={9} xxl={9}>
                    <Row className='gx-3'>
                        <Col md={4} lg={4} xl={4} xxl={4}>
                            <InputField
                                label="First Name"
                                type="text"
                                placeholder="Enter your first name"
                                controlId="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </Col>
                        <Col md={4} lg={4} xl={4} xxl={4}>
                            <InputField
                                label="Last Name"
                                type="text"
                                placeholder="Enter your last name"
                                controlId="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </Col>
                    </Row>
                    <Row className='gx-3'>
                        <Col md={4} lg={4} xl={4} xxl={4}>
                            <InputField
                                label="Date of Birth"
                                type="text"
                                placeholder="Enter your Date of Birth"
                                controlId="DOB"
                                name="DOB"
                                value={formData.DOB}
                                onChange={handleChange}
                                required
                            />
                        </Col>
                        <Col md={4} lg={4} xl={4} xxl={4}>                            
                            <InputField
                                label="Age"
                                type="number"
                                placeholder="Enter your Age"
                                controlId="Age"
                                name="Age"
                                value={formData.Age}
                                onChange={handleChange}
                                required
                            />
                        </Col>
                        <Col md={4} lg={4} xl={4} xxl={4}>
                            <SelectInput
                                controlId="nationalitySelect"
                                label="Nationality"
                                name="nationality"
                                options={nationality}
                                placeholder="Select Nationality"
                            />
                        </Col>
                    </Row>
                    <Row className='gx-3'>
                        <Col md={4} lg={4} xl={4} xxl={4}>
                            <SelectInput
                                controlId="genderSelect"
                                label="Gender"
                                name="Gender"
                                options={gender}
                                placeholder="Select Gender"
                            />
                        </Col>
                        <Col md={4} lg={4} xl={4} xxl={4}>
                            <SelectInput
                                controlId="genderSelect"
                                label="Marital Status"
                                name="Marital Status"
                                options={maritalstatus}
                                placeholder="Marital Status"
                            />
                        </Col>
                        <Col md={4} lg={4} xl={4} xxl={4}>
                            <InputField
                                label="Date of Marriage"
                                type="date"
                                placeholder="Enter your Date of Marriage"
                                controlId="DateofMarriage"
                                name="DateofMarriage"
                                value={formData.DateofMarriage}
                                onChange={handleChange}
                                required
                            />
                        </Col>
                    </Row>
                </Col>
                <Col md={3} lg={3} xl={3} xxl={3}></Col>
            </CardForm>
        </>
    )
}

export default BasicInfo;

// const BootstrapStyles = () => null