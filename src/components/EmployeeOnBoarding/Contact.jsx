import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardForm, PrimaryGird, InputField, SelectInput } from '../../pages/Props.jsx';
import {contactValidateField} from '../Validations/Validate.jsx';
import Images from '../../pages/Images.jsx';
import { createOrUpdateEmployeeBasicDetails, getEmployeeBasicDetails } from '../../api/index.js';
import { useLoginUser } from '../../context/LoginUserContext.jsx';
import ComboDate from '../../data/Combo.json';
import Loader from '../Common/Loader.jsx';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, Tabs, Button, Table } from 'react-bootstrap';

// Bootstrap imports

const Contact = () => {

    const [Country, setCountry] = useState(ComboDate.Country);
    const [State, setState] = useState(ComboDate.State);
    const [City, setCity] = useState(ComboDate.City);

    // FORM INPUT

// FormData Validations

    const [formData, setFormData] = useState({
        address1: '',
        address2: '',
        country: '',
        state: '',
        city: '',
        zipCode: '',
        paddress1: '',
        paddress2: '',
        pcountry: '',
        pstate: '',
        pcity: '',
        pzipCode: '',
        cdpphonenumber: '',
        cdaphonenumber: '',
        cdemailaddress: '',
        ecdrelationname: '',
        ecdrelationship: '',
        ecdphonenumber: '',
        ecdemailaddress: '',
        ecdAddress: '',
    });

    // Error useState

    const [errors, setErrors] = useState({});


    //  Validate Form with Error

    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach((field) => {
            const error = contactValidateField(field, formData[field]);
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
        const error = contactValidateField(name, value);
        setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
    };

    const navigate  = useNavigate();

    return (
        <CardForm
            onSubmit={handleSubmit}
            footerButtonSubmit="Save"
            footerButtonSubmitClass="primary_form_btn btn_h_35"
        >
            <Col md={12} lg={12} xl={12} xxl={12}>
                <h5 className='MainTitle'>Current Address</h5>
            </Col>
            <Col md={6} lg={6} xl={6} xxl={6}>
                <InputField
                    label="Address Line 1"
                    name="address1"
                    type="text"
                    placeholder="Enter your Address"
                    error={errors.address1}
                    value={formData.address1}
                    handleChange={handleChange}
                    required
                />
            </Col>
            <Col md={6} lg={6} xl={6} xxl={6}>
                <InputField
                    label="Address Line 2"
                    name="address2"
                    type="text"
                    placeholder="Enter your Address"
                    error={errors.address2}
                    value={formData.address2}
                    handleChange={handleChange}
                    required
                />
            </Col>
            <Col md={3} lg={3} xl={3} xxl={3}>
                <SelectInput
                    label="Country"
                    name="country"
                    options={Country}
                    placeholder="Select Country"
                    error={errors.country}
                    value={formData.country}
                    handleChange={handleChange}
                    required
                />
            </Col>
            <Col md={3} lg={3} xl={3} xxl={3}>
                <SelectInput
                    label="State"
                    name="state"
                    options={State}
                    placeholder="Select State"
                    error={errors.state}
                    value={formData.state}
                    handleChange={handleChange}
                    required
                />
            </Col>
            <Col md={3} lg={3} xl={3} xxl={3}>
                <SelectInput
                    label="City"
                    name="city"
                    options={City}
                    placeholder="Select City"
                    error={errors.city}
                    value={formData.city}
                    handleChange={handleChange}
                    required
                />
            </Col>
            <Col md={3} lg={3} xl={3} xxl={3}>
                <InputField
                    label="Zip Code"
                    name="zipCode"
                    type="text"
                    placeholder="Enter your Zip Code"
                    error={errors.zipCode}
                    value={formData.zipCode}
                    handleChange={handleChange}
                    required
                />
            </Col>
            <Col md={12} lg={12} xl={12} xxl={12}>
                <h5 className='MainTitle'>Permanent Address</h5>
            </Col>
            <Col md={6} lg={6} xl={6} xxl={6}>
                <InputField
                    label="Address Line 1"
                    name="paddress1"
                    type="text"
                    placeholder="Enter your Address"
                    error={errors.paddress1}
                    value={formData.paddress1}
                    handleChange={handleChange}
                    required
                />
            </Col>
            <Col md={6} lg={6} xl={6} xxl={6}>
                <InputField
                    label="Address Line 2"
                    name="paddress2"
                    type="text"
                    placeholder="Enter your Address"
                    error={errors.paddress2}
                    value={formData.paddress2}
                    handleChange={handleChange}
                    required
                />
            </Col>
            <Col md={3} lg={3} xl={3} xxl={3}>
                <SelectInput
                    label="Country"
                    name="pcountry"
                    options={Country}
                    placeholder="Select Country"
                    error={errors.pcountry}
                    value={formData.pcountry}
                    handleChange={handleChange}
                    required
                />
            </Col>
            <Col md={3} lg={3} xl={3} xxl={3}>
                <SelectInput
                    label="State"
                    name="pstate"
                    options={State}
                    placeholder="Select State"
                    error={errors.pstate}
                    value={formData.pstate}
                    handleChange={handleChange}
                    required
                />
            </Col>
            <Col md={3} lg={3} xl={3} xxl={3}>
                <SelectInput
                    label="City"
                    name="pcity"
                    options={City}
                    placeholder="Select City"
                    error={errors.pcity}
                    value={formData.pcity}
                    handleChange={handleChange}
                    required
                />
            </Col>
            <Col md={3} lg={3} xl={3} xxl={3}>
                <InputField
                    label="Zip Code"
                    name="pzipCode"
                    type="text"
                    placeholder="Enter your Zip Code"
                    error={errors.pzipCode}
                    value={formData.pzipCode}
                    handleChange={handleChange}
                    required
                />
            </Col>
            <Col md={12} lg={12} xl={12} xxl={12}>
                <h5 className='MainTitle'>Contact Details</h5>
            </Col>
            <Col md={3} lg={3} xl={3} xxl={3}>
                <InputField
                    label="Primary Phone Number"
                    name="cdpphonenumber"
                    type="number"
                    placeholder="Enter your Phone Number"
                    error={errors.cdpphonenumber}
                    value={formData.cdpphonenumber}
                    handleChange={handleChange}
                    required
                />
            </Col>
            <Col md={3} lg={3} xl={3} xxl={3}>
                <InputField
                    label="Alternate Phone Number"
                    name="cdaphonenumber"
                    type="number"
                    placeholder="Enter your Phone Number"
                    error={errors.cdaphonenumber}
                    value={formData.cdaphonenumber}
                    handleChange={handleChange}
                    required
                />
            </Col>
            <Col md={3} lg={3} xl={3} xxl={3}>
                <InputField
                    label="Email Address"
                    name="cdemailaddress"
                    type="text"
                    placeholder="Enter your Email Address"
                    error={errors.cdemailaddress}
                    value={formData.cdemailaddress}
                    handleChange={handleChange}
                    required
                />
            </Col>
            <Col md={12} lg={12} xl={12} xxl={12}>
                <h5 className='MainTitle'>Emergency Contact Details</h5>
            </Col>
            <Col md={3} lg={3} xl={3} xxl={3}>
                <InputField
                    label="Relation Name"
                    name="ecdrelationname"
                    type="text"
                    placeholder="Enter your Relation Name"
                    error={errors.ecdrelationname}
                    value={formData.ecdrelationname}
                    handleChange={handleChange}
                    required
                />
            </Col>
            <Col md={3} lg={3} xl={3} xxl={3}>
                <InputField
                    label="Relationship"
                    name="ecdrelationship"
                    type="text"
                    placeholder="Enter your Relationship"
                    error={errors.ecdrelationship}
                    value={formData.ecdrelationship}
                    handleChange={handleChange}
                    required
                />
            </Col>
            <Col md={3} lg={3} xl={3} xxl={3}>
                <InputField
                    label="Phone Number"
                    name="ecdphonenumber"
                    type="text"
                    placeholder="Enter your Phone Number"
                    error={errors.ecdphonenumber}
                    value={formData.ecdphonenumber}
                    handleChange={handleChange}
                    required
                />
            </Col>
            <Col md={3} lg={3} xl={3} xxl={3}>
                <InputField
                    label="Email Address"
                    name="ecdemailaddress"
                    type="text"
                    placeholder="Enter your Email Address"
                    error={errors.ecdemailaddress}
                    value={formData.ecdemailaddress}
                    handleChange={handleChange}
                    required
                />
            </Col>
            <Col md={3} lg={3} xl={3} xxl={3}>
                <InputField
                    label="Address (optional but helpful)"
                    name="ecdAddress"
                    type="text"
                    placeholder="Enter your Address"
                    error={errors.ecdAddress}
                    value={formData.ecdAddress}
                    handleChange={handleChange}
                    required
                />
            </Col>
        </CardForm>
    )
}

export default Contact

// const BootstrapStyles = () => null