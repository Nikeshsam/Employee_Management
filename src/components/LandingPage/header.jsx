import React from 'react';
import { Link } from 'react-scroll';
import BrandLogo from '../../assets/Images/Logo.svg';
import { useNavigate } from 'react-router-dom';
// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, Tabs, Button, Table, Image } from 'react-bootstrap';

// Bootstrap imports

const header = ({ setModalShow }) => {
  const navigate= useNavigate();
  return (
    <div className='MainHeader'>
      <div className='HR_Brand'>
        <a href="#">
          <Image src={BrandLogo} alt="Brand Logo" />
        </a>
      </div>
      <div className='HR_Menu'>
        <Link
          className="menu_parallax"
          to="home"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        >
          Home
        </Link>
        <Link
          className="menu_parallax"
          to="product"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        >
          Product
        </Link>
        <Link
          className="menu_parallax"
          to="features"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        >
          Features
        </Link>
        <Link
          className="menu_parallax"
          to="pricing"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        >
          Pricing
        </Link>
        <Link
          className="menu_parallax"
          to="about"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        >
          About
        </Link>
      </div>
      <div className='HR_Action'>
        <Button className="HR_Action_btn_noBg" onClick={() => navigate('/Authentication')}>
          Login
        </Button>
        <Button onClick={() => setModalShow(true)} className="HR_Action_btn">
          Sign up
        </Button>
      </div>
    </div>
  )
}

export default header
