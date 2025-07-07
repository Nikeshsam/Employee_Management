import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Images from '../../pages/Images.jsx';
import { CardForm, PrimaryGird, InputField, CustomModal } from '../../pages/Props.jsx';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, Tabs, Button, Table, Stack, Image } from 'react-bootstrap';


// Bootstrap imports

const Banner = ({modalShow,setModalShow}) => {

  // FORM INPUT

    const [formData, setFormData] = useState({
      name: '',
      email: '',
      organizationName: '',
      password: '',
      confirmPassword: ''
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
      const newErrors = {};

      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      }

      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        newErrors.email = 'Invalid email format';
      }

      if (!formData.organizationName.trim()) {
        newErrors.organizationName = 'Enter Your Organization Name';
      }

      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Confirm password is required';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      return newErrors;
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const validationErrors = validate();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
      } else {
        setErrors({});
        Navigate('/Home')
        console.log('Form submitted:', formData);
        // Perform API call or other actions
      }
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    const Navigate = useNavigate();


    // const [modalShow, setModalShow] = React.useState(false); 

    const handleClearClick = () => {
      setFormData ({
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
                errors={errors.name}
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
                errors={errors.email}
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
                errors={errors.organizationName}
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
                errors={errors.password}
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
                errors={errors.confirmPassword}
                value={formData.confirmPassword}
                handleChange={handleChange}
                required
              />
            </Col>
          </>
        }
        onSubmit={handleSubmit}
        footerButtonSubmit ="Register"
        footerButtonCancel="Cancel"
        footerButtonSubmitClass="modal_primary_btn w-100"
        footerButtonCancelClass="modal_primary_border_btn w-100"
      />
    </>
  )
}

export default Banner