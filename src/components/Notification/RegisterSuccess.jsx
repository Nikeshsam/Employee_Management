import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Images from '../../pages/Images.jsx';

const RegisterSuccess = () => {
    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        navigate('/Authentication');
    };

    return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-center registerContainer">
            <img className='img-fluid' src={Images.RegisterImg} alt="" />
            <h2 className="">Registration Successful!</h2>
            <p className="mb-1">
                Thank you for registering. Your account has been created successfully.
            </p>
            <p className="mb-4">
                You can now log in to access your dashboard and begin using our services.
            </p>
            <Button variant="primary" className='Register_btn' onClick={handleLoginRedirect}>
                Proceed to Login
            </Button>
        </div>
    );
};

export default RegisterSuccess;
