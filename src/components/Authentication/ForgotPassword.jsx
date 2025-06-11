import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import BrandLogo from '../../assets/Images/Logo.svg';

const FogotPassword = ({handleOnClick}) => {
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
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" />
                    </Form.Group>
                    <Button variant='primary' onClick={()=> handleOnClick (3)} className='primary_btn w-100'>UPDATE PASSWORD</Button>
                </Form>
            </div>

        </>
    )
}

export default FogotPassword;

