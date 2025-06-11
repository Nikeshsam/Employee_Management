import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InnerLogo from '../../assets/Images/Logo.svg';
import Dashboard from '../../assets/Images/dashboard.svg';
import OnBoarding from '../../assets/Images/on-boarding.svg';

const Sidebar = () => {
  return (

    <div className='sidebar_content'>
      <div className='Innerlogo'>
        <img src={InnerLogo} alt="Logo" />
      </div>
      <ul className='sidebar_menu'>
        <li className='active'>
          <i><img src={Dashboard} alt="" /></i>
          <span>Dashboard</span>
        </li>
        <li>
        <i><img src={OnBoarding} alt="" /></i>
          <span>On Boarding</span>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
