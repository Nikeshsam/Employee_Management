import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Images from '../../pages/Images.jsx';
import { CardForm, PrimaryGird, InputField, CustomModal } from '../../pages/Props.jsx';
import {registerCompany} from '../../api/index.js';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, Tabs, Button, Table, Stack, Image } from 'react-bootstrap';
import { Import } from 'lucide-react';

// Bootstrap imports

const Banner = ({ modalShow, setModalShow }) => {

  // FormData useState

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organizationName: '',
    password: '',
    confirmPassword: ''
  });

  // Error useState

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    organizationName: '',
    password: '',
    confirmPassword: ''
  });


    const [submitMessage,setSubmitMessage]=useState('');
  // Field Validations

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!value.trim()) error = 'Name is required';
        break;

      case 'email':
        if (!value) error = 'Email is required';
        else if (!/^\S+@\S+\.\S+$/.test(value)) error = 'Invalid email format';
        break;

      case 'organizationName':
        if (!value.trim()) error = 'Organization Name is required';
        break;

      case 'password':
        if (!value) error = 'Password is required';
        else if (value.length < 6) error = 'At least 6 characters';
        break;

      case 'confirmPassword':
        if (!value) error = 'Confirm password is required';
        else if (value !== formData.password) error = 'Passwords do not match';
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

  const handleSubmit = async(e) => {
    e.preventDefault();

    // API Call

    if (validateForm()) {
      try {
        const response = await registerCompany(formData);
        console.log(response.data.message);
        setSubmitMessage(response.data.message);
        navigate('/Authentication')
        console.log('Form submitted:', formData);
      } catch (error) {
        console.log(error);
        setSubmitMessage(error.response.data.message);
      }

    // API Call
    }
  };

  //  Handle Change

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
  };

  const navigate = useNavigate();

  const handleClearClick = () => {
    setFormData({
      name: '',
      email: '',
      organizationName: '',
      password: '',
      confirmPassword: ''
    })
    setModalShow(false);
    setErrors({});
  }

  return (
    <>
      <Col md={6} lg={6} xl={6} xxl={6}>
        <div className='Banner_container me-2 pe-5'>
          <span>Recruit - Onboard - Manage</span>
          <h2>Revolutionize Your HR Management with Cloud-Based Solutions</h2>
          <p>The best HR software for SMB companies and startup to manage employee, payroll assistance, time off, attendance tracking with single software</p>
          <Stack direction="horizontal" gap={3}>
            <Button className='primary_btn_rounded' onClick={() => setModalShow(true)}>Get started</Button>
            <Button className='secondary_btn_rounded'>How it works</Button>
          </Stack>
        </div>
      </Col>
      <Col md={6} lg={6} xl={6} xxl={6}>
        <Image src={Images.BannerImage} alt="Banner Image" />
      </Col>

      <CustomModal
        show={modalShow}
        onHide={handleClearClick}
        title="Register"
        subtitle='Start your 7-day free trial.'
        bodyContent={
          <>
            <Col md={6} lg={6} xl={6} xxl={6}>
              <InputField
                label="Name"
                type="text"
                placeholder="Enter your name"
                controlId="name"
                name="name"
                error={errors.name}
                value={formData.name}
                handleChange={handleChange}
                required
              />
            </Col>
            <Col md={6} lg={6} xl={6} xxl={6}>
              <InputField
                label="Email"
                type="text"
                placeholder="Enter your Email"
                controlId="email"
                name="email"
                error={errors.email}
                value={formData.email}
                handleChange={handleChange}
                required
              />
            </Col>
            <Col md={12} lg={12} xl={12} xxl={12}>
              <InputField
                label="Organization Name"
                type="text"
                placeholder="Enter Your Organization Name"
                controlId="organizationName"
                name="organizationName"
                error={errors.organizationName}
                value={formData.organizationName}
                handleChange={handleChange}
                required
              />
            </Col>
            <Col md={6} lg={6} xl={6} xxl={6}>
              <InputField
                label="Password"
                type="Password"
                placeholder="Create a password"
                controlId="password"
                name="password"
                error={errors.password}
                value={formData.password}
                handleChange={handleChange}
                required
              />
            </Col>
            <Col md={6} lg={6} xl={6} xxl={6}>
              <InputField
                label="Confirm Password"
                type="Password"
                placeholder="Re-enter your password"
                controlId="confirmPassword"
                name="confirmPassword"
                error={errors.confirmPassword}
                value={formData.confirmPassword}
                handleChange={handleChange}
                required
              />
              {submitMessage&& <p>{submitMessage}</p>}
            </Col>
          </>
        }
        onSubmit={handleSubmit}
        footerButtonSubmit="Register"
        footerButtonCancel="Cancel"
        footerButtonSubmitClass="modal_primary_btn w-100"
        footerButtonCancelClass="modal_primary_border_btn w-100"
      />
    </>
  )
}

export default Banner