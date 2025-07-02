import React from 'react'
import BrandLogo from '../../assets/Images/Logo.svg';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, Tabs, Button, Table } from 'react-bootstrap';

// Bootstrap imports

function header() {
  return (
    <div className='MainHeader'>
      <div className='HR_Brand'>
        <a href="#"><img src={BrandLogo} alt="" /></a>
      </div>
      <div className='HR_Menu'>
        <a className='menu_parallax' href="#home">Home</a>
        <a className='menu_parallax' href="#about">About</a>
        <a className='menu_parallax' href="#features">Features</a>
        <a className='menu_parallax' href="#testimonial">Testimonial</a>
        <a className='menu_parallax' href="#pricing">Pricing</a>
      </div>
      <div className='HR_Action'>
        <button className="HR_Action_btn">
          Register
        </button>
      </div>
    </div>
  )
}

export default header
