import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardForm, PrimaryGird, InputField, SelectInput } from '../../pages/Props.jsx';


// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, Tabs, Button, Table } from 'react-bootstrap';

// Bootstrap imports

const Contact = () => {
    const [country, setCountry] = useState([
        { key: '1', label: 'Indian' },
        { key: '2', label: 'Australian' },
        { key: '3', label: 'Chinese' },
        { key: '4', label: 'Japan' },
        { key: '5', label: 'England' },
        { key: '6', label: 'Pakistan' },
        { key: '7', label: 'Dubai' }
    ])

    const [state, setState] = useState([
        { key: '1', label: 'Tamil Nadu' },
        { key: '2', label: 'Andhra Pradesh' },
        { key: '3', label: 'Maharashtra' },
        { key: '4', label: 'Gujarat' },
        { key: '5', label: 'Uttar Pradesh' },
        { key: '6', label: 'Rajasthan' },
        { key: '7', label: 'Delhi' },
        { key: '8', label: 'Goa' },
        { key: '9', label: 'Karnataka' },
        { key: '10', label: 'Kerala' },
    ])

    const [city, setCity] = useState([
        { key: '1', label: 'Chennai' },
        { key: '2', label: 'Kanchipuram' },
        { key: '3', label: 'Vellore' },
        { key: '4', label: 'Tiruvannamalai' },
        { key: '5', label: 'Chengalpattu' },
        { key: '6', label: 'Madurai' },
        { key: '7', label: 'Coimbatore' },
        { key: '8', label: 'Tirupur' },
        { key: '9', label: 'Thanjavur' },
        { key: '10', label: 'Thoothukudi' },
        { key: '11', label: 'Salem' },
        { key: '12', label: 'Tiruchirappalli' },
        { key: '13', label: 'Erode' },
        { key: '14', label: 'Dindigul' },
        { key: '15', label: 'Kanyakumari' },
        { key: '16', label: 'Tirunelveli' },
        { key: '17', label: 'Virudhunagar' },
        { key: '18', label: 'Namakkal' },
        { key: '19', label: 'Karur' },
        { key: '20', label: 'Pudukkottai' },
        { key: '21', label: 'Sivaganga' },
        { key: '22', label: 'Ramanathapuram' },
        { key: '23', label: 'Thiruvarur' },
        { key: '24', label: 'Nagapattinam' },
        { key: '25', label: 'Kallakurichi' },
        { key: '26', label: 'Ariyalur' },
        { key: '27', label: 'Perambalur' },
        { key: '28', label: 'Tenkasi' },
        { key: '29', label: 'Theni' },
    ])

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
        phonenumber: '',
        cdphonenumber: '',
        cdemailaddress: '',
        ecdrelationname: '',
        ecdrelationship: '',
        ecdphonenumber: '',
        ecdemailaddress: '',
        ecdAddress: '',
    });

    // Error useState

    const [errors, setErrors] = useState({
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
        phonenumber: '',
        cdphonenumber: '',
        cdemailaddress: '',
        ecdrelationname: '',
        ecdrelationship: '',
        ecdphonenumber: '',
        ecdemailaddress: '',
        ecdAddress: '',
    });


    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'address1':
            case 'paddress1':
                if (!value.trim()) error = 'Address is required';
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
        <CardForm
            onSubmit={handleSubmit}
            footerButtonSubmit="Submit"
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
                    options={country}
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
                    options={state}
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
                    options={city}
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
                    options={country}
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
                    options={state}
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
                    options={city}
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
                    name="cdphonenumber"
                    type="number"
                    placeholder="Enter your Phone Number"
                    error={errors.cdphonenumber}
                    value={formData.cdphonenumber}
                    handleChange={handleChange}
                    required
                />
            </Col>
            <Col md={3} lg={3} xl={3} xxl={3}>
                <InputField
                    label="Alternate Phone Number"
                    name="cdphonenumber"
                    type="number"
                    placeholder="Enter your Phone Number"
                    error={errors.cdphonenumber}
                    value={formData.cdphonenumber}
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