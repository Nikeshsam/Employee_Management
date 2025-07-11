import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import BrandLogo from '../../assets/Images/Logo.svg';

const Login = ({handleOnClick}) => {
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
                    <Form.Group className="mb-2">
                        <Form.Label>Passowrd</Form.Label>
                        <Form.Control type="password" />
                    </Form.Group>
                    <div className='align-items-center d-flex justify-content-between pt-2 pb-4'>
                        {['checkbox'].map((type) => (
                            <div key={`default-${type}`} className='customCheckbox'>
                                <Form.Check // prettier-ignore
                                    type={type}
                                    id={`default-${type}`}
                                    label={`Remember me`}
                                />
                            </div>
                        ))}
                        {/* <a href="" onClick={()=> handleOnClick (3)} className='forgot-password'>Forgot password?</a> */}
                        <button onClick={()=> handleOnClick (2)} type='button'className='forgot-password'>Forgot password?</button>
                    </div>
                    <Button variant='primary' className='primary_btn w-100 mb-3'>SIGN IN</Button>
                </Form>
            </div>

        </>
    )
}

export default Login;

