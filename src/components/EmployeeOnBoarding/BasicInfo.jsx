import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

    // FormData Validations

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        age: '',
        nationality: '',
        gender: '',
        maritalstatus: '',
        dateofmarriage: '',
    });

    // Error useState

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        age: '',
        nationality: '',
        gender: '',
        maritalstatus: '',
        dateofmarriage: '',
    });


    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'firstName':
                if (!value.trim()) error = 'First Name is required';
                break;
            case 'lastName':
                if (!value.trim()) error = 'Last Name is required';
                break;
            case 'dob':
                if (!value.trim()) error = 'Date of Birth is required';
                break;
            case 'age':
                if (!value.trim()) error = 'Age is required';
                break;
            case 'nationality':
                if (!value.trim()) error = 'Nationality is required';
                break;
            case 'gender':
                if (!value.trim()) error = 'Gender is required';
                break;
            case 'maritalstatus':
                if (!value.trim()) error = 'Marital Status is required';
                break;
            case 'dateofmarriage':
                if (!value.trim()) error = 'Date of Marriage is required';
                break;
            default:
                break;
        }

        return error;
    };

    //  Validate Form with Error

    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach((field) => {
            const error = validateField(field, formData[field]);
            if (error) newErrors[field] = error;
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    //  Handle Submit

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            navigate('/Home'); // 
            console.log('Form submitted:', formData);
        }
    };

    //  Handle Change

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        const error = validateField(name, value);
        setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
    };

    const navigate  = useNavigate();

    return (
        <>
            <CardForm
                onSubmit={handleSubmit}
                footerButtonSubmit="Save"
                footerButtonSubmitClass="primary_form_btn btn_h_35"
            >
                <Col md={9} lg={9} xl={9} xxl={9}>
                    <Row className='gx-3'>
                        <Col md={4} lg={4} xl={4} xxl={4}>
                            <InputField
                                label="First Name"
                                name="firstName"
                                type="text"
                                placeholder="Enter your first name"
                                error={errors.firstName}
                                value={formData.firstName}
                                handleChange={handleChange}
                                required
                            />
                        </Col>
                        <Col md={4} lg={4} xl={4} xxl={4}>
                            <InputField
                                label="Last Name"
                                name="lastName"
                                type="text"
                                placeholder="Enter your last name"
                                error={errors.lastName}
                                value={formData.lastName}
                                handleChange={handleChange}
                                required
                            />
                        </Col>
                    </Row>
                    <Row className='gx-3'>
                        <Col md={4} lg={4} xl={4} xxl={4}>
                            <InputField
                                label="Date of Birth"
                                name="dob"
                                type="date"
                                placeholder="Enter your Date of Birth"
                                error={errors.dob}
                                value={formData.dob}
                                handleChange={handleChange}
                                required
                            />
                        </Col>
                        <Col md={4} lg={4} xl={4} xxl={4}>
                            <InputField
                                label="Age"
                                name="age"
                                type="number"
                                placeholder="Enter your Age"
                                error={errors.age}
                                value={formData.age}
                                handleChange={handleChange}
                                required
                            />
                        </Col>
                        <Col md={4} lg={4} xl={4} xxl={4}>
                            <SelectInput
                                label="Nationality"
                                name="nationality"
                                options={nationality}
                                placeholder="Select Nationality"
                                error={errors.nationality}
                                value={formData.nationality}
                                handleChange={handleChange}
                                required
                            />
                        </Col>
                    </Row>
                    <Row className='gx-3'>
                        <Col md={4} lg={4} xl={4} xxl={4}>
                            <SelectInput
                                label="Gender"
                                name="gender"
                                options={gender}
                                placeholder="Select Gender"
                                error={errors.gender}
                                value={formData.gender}
                                handleChange={handleChange}
                                required
                            />
                        </Col>
                        <Col md={4} lg={4} xl={4} xxl={4}>
                            <SelectInput
                                label="Marital Status"
                                name="maritalstatus"
                                options={maritalstatus}
                                placeholder="Marital Status"
                                error={errors.maritalstatus}
                                value={formData.maritalstatus}
                                handleChange={handleChange}
                                required
                            />
                        </Col>
                        <Col md={4} lg={4} xl={4} xxl={4}>
                            <InputField
                                label="Date of Marriage"
                                type="date"
                                name="dateofmarriage"
                                placeholder="Enter your Date of Marriage"
                                error={errors.dateofmarriage}
                                value={formData.dateofmarriage}
                                handleChange={handleChange}
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