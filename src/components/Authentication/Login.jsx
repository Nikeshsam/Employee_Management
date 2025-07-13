import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputField } from '../../pages/Props.jsx';
import BrandLogo from '../../assets/Images/Logo.svg';
import {userLogin} from '../../api/index.js';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, Tabs, Button, Table, Stack, Image } from 'react-bootstrap';
import { Import } from 'lucide-react';

// Bootstrap imports

const Login = ({ handleOnClick }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        emailaddress: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        emailaddress: '',
        password: '',
    });

    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'emailaddress':
                if (!value.trim()) {
                    error = 'Enter Your Email Address';
                } else if (!/^\S+@\S+\.\S+$/.test(value)) {
                    error = 'Enter a valid email address';
                }
                break;
            case 'password':
                if (!value.trim()) error = 'Enter Your Password';
                break;
            default:
                break;
        }
        return error;
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach((field) => {
            const error = validateField(field, formData[field]);
            if (error) newErrors[field] = error;
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // API Call

        if (validateForm()) {
            try {
                const response = await userLogin(formData);
                console.log(response);
            } catch (error) {
                console.log(error); 
            }

        // API Call

            navigate('/Home');
            console.log('Form submitted:', formData);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        const error = validateField(name, value);
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    return (
        <div className='Brand-container'>
            <div className='Brandlogo'>
                <img src={BrandLogo} alt="" />
            </div>
            <div className='Brandtitle'>
                <h4>Welcome To <span>HR Management</span></h4>
                <p>Your Gateway to Efficient Workforce Solutions.</p>
            </div>
            <Form onSubmit={handleSubmit}>
                <InputField
                    label="Email address"
                    name="emailaddress"
                    type="text"
                    placeholder="Enter Your Email Address"
                    error={errors.emailaddress}
                    value={formData.emailaddress}
                    handleChange={handleChange}
                    required
                />
                <InputField
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Enter Your Password"
                    error={errors.password}
                    value={formData.password}
                    handleChange={handleChange}
                    required
                />
                <div className='align-items-center d-flex justify-content-between pt-2 pb-4'>
                    <div className='customCheckbox'>
                        <Form.Check type='checkbox' id='remember' label='Remember me' />
                    </div>
                    <button onClick={() => handleOnClick(2)} type='button' className='forgot-password'>Forgot password?</button>
                </div>
                <Button variant='primary' type="submit" className='primary_btn w-100 mb-3'>SIGN IN</Button>
            </Form>
        </div>
    );
};

export default Login;
