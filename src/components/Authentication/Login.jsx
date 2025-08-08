import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputField } from '../../pages/Props.jsx';
import BrandLogo from '../../assets/Images/Logo.svg';
import { userLogin } from '../../api/index.js';
import { useLoginUser } from '../../context/LoginUserContext.jsx';
import useValidateUser from '../../hooks/useValidateUser.jsx';
import Loader from '../Common/Loader.jsx';
// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, Tabs, Button, Table, Stack, Image } from 'react-bootstrap';
import { Import } from 'lucide-react';

// Bootstrap imports

const Login = ({ handleOnClick }) => {
    const navigate = useNavigate();
    const { saveLoginUser } = useLoginUser();

    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });
    const { isValid, loading } = useValidateUser();
    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'email':
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
            setSubmitting(true); // Start loader
            try {
                const response = await userLogin(formData);
                console.log(false);
                saveLoginUser(response.data.data);
                navigate('/Home');
            } catch (error) {
                let errorMsg = "Oops! Looks like you’re not registered.";
                if (error?.response?.data?.message) {
                    errorMsg = error.response.data.message;
                }
                setErrors(prev => ({ ...prev, email: errorMsg }));
                setLoginError(errorMsg); // Set a separate login error state
                console.log(error);
            }finally{
                setSubmitting(false);
            }

            // API Call

            //console.log('Form submitted:', formData);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        const error = validateField(name, value);
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const [errorMsg, setLoginError] = useState('');

    return (
        <>
            {submitting ? <Loader /> : (
                <div className='Brand-container'>
                    <div className='Brandlogo'>
                        <img src={BrandLogo} alt="" />
                    </div>
                    <div className='Brandtitle'>
                        <h4>Welcome To <span>HR Management</span></h4>
                        <p>Your Gateway to Efficient Workforce Solutions.</p>
                    </div>
                    <Form>
                        <InputField
                            label="Email address"
                            name="email"
                            type="text"
                            placeholder="Enter Your Email Address"
                            error={errors.email && !errorMsg ? errors.email : ''}
                            value={formData.email}
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
                        <Button variant='primary' type="submit" className='primary_btn w-100 mb-3' onClick={handleSubmit}>SIGN IN</Button>
                        {errorMsg && <div className="text-danger mb-2">{errorMsg}</div>}
                    </Form>
                </div>
            )}
        </>
    );
};

export default Login;
