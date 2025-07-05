import React, { useState } from 'react';
import Images from '../../pages/Images.jsx';
import { CardForm, PrimaryGird, InputField, CustomModal } from '../../pages/Props.jsx';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, Tabs, Button, Table, Stack, Image } from 'react-bootstrap';


// Bootstrap imports

const Banner = () => {

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

  const [modalShow, setModalShow] = React.useState(false);
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
        onHide={() => setModalShow(false)}
        title="Register"
        subtitle='Start your 7-day free trial.'
        bodyContent={
          <>
            <Col md={12} lg={12} xl={12} xxl={12}>
              <InputField
                label="Name"
                type="text"
                placeholder="Enter your name"
                controlId="Name"
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                required
              />
            </Col>
            <Col md={12} lg={12} xl={12} xxl={12}>
              <InputField
                label="Email"
                type="text"
                placeholder="Enter your Email"
                controlId="Email"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                required
              />
            </Col>
            <Col md={12} lg={12} xl={12} xxl={12}>
              <InputField
                label="Organization Name"
                type="text"
                placeholder="Enter Your Organization Name"
                controlId="OrganizationName"
                name="OrganizationName"
                value={formData.OrganizationName}
                onChange={handleChange}
                required
              />
            </Col>
            <Col md={12} lg={12} xl={12} xxl={12}>
              <InputField
                label="Password"
                type="Password"
                placeholder="Create a password"
                controlId="Password"
                name="Password"
                value={formData.Password}
                onChange={handleChange}
                required
              />
            </Col>
            <Col md={12} lg={12} xl={12} xxl={12}>
              <InputField
                label="Confirm Password"
                type="Password"
                placeholder="Re-enter your password"
                controlId="Confirm Password"
                name="Confirm Password"
                value={formData.ConfirmPassword}
                onChange={handleChange}
                required
              />
            </Col>
          </>
        }
        footerButtonSubmit="Confirm"
        footerButtonCancel="Cancel"
        footerButtonSubmitClass="modal_primary_btn w-100"
        footerButtonCancelClass="modal_primary_border_btn w-100 mt-3"
      />
    </>
  )
}

export default Banner