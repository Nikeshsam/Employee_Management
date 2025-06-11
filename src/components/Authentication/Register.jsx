import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import BrandLogo from '../../assets/Images/Logo.svg';

const Register = ({handleOnClick}) => {
    return (
        <>
            <div className='Brand-container'>
                <div className='Brandlogo'>
                    <img src={BrandLogo} alt="" />
                </div>
                <div className='Brandtitle'>
                    <h4>Welcome To <span>HR Management</span></h4>
                    <p>Your Gateway to Efficient Workforce Solutions.</p>
                </div>
                <Form>
                    <Form.Group className="mb-2">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="email" />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="password" />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Mobile Number</Form.Label>
                        <Form.Control type="password" />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="password" />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" />
                    </Form.Group>
                    <Button variant='primary' onClick={()=> handleOnClick (1)}className='primary_btn w-100'>SIGN UP</Button>
                </Form>
            </div>
        </>
    )
}

export default Register

