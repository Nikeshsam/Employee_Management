import React from 'react';
import Login from '../components/Authentication/Login.jsx';
import ForgotPassword from '../components/Authentication/ForgotPassword.jsx';
import AuthBG from '../assets/Images/Auth_bg.svg'
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';

const Authentication =() => {
  const [IsAuthenticate, setIsAuthenticate] = useState(true);

  const handleOnClick =(register) => {
    setIsAuthenticate(register);
  }
  return (
    <>
      <Container fluid>
        <Row>
          <Col md={8} lg={8} xl={8} xxl={8} className="p-0">
            <div className='auth_vector'>
              <div className='auth_vector_bg'>
                <img src={AuthBG} alt="" />
              </div>
              <div className='auth_vector_content'>
                <h1>Your Journey to <span>Better Workforce</span><br />
                <span>Management</span> Starts Here.</h1>
              </div>
            </div>
          </Col>
          <Col md={4} lg={4} xl={4} xxl={4} className="p-0">
            {IsAuthenticate == 1 &&  (
              <Login handleOnClick={handleOnClick} />
            )}

            {IsAuthenticate == 2 && (
              <ForgotPassword handleOnClick={handleOnClick} />
            )}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Authentication;
