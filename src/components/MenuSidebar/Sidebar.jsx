import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Link, useLocation } from 'react-router-dom';

import InnerLogo from '../../assets/Images/Logo.svg';
import Dashboard from '../../assets/Images/dashboard.svg';
import OnBoarding from '../../assets/Images/on-boarding.svg';

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className='sidebar_content'>
      <div className='Innerlogo'>
        <img src={InnerLogo} alt="Logo" />
      </div>
      <ul className='sidebar_menu'>
        <li className={location.pathname === '/' ? 'active' : 'active'}>
          <Link to="/">
            <i><img src={Dashboard} alt="Dashboard" /></i>
            <span>Dashboard</span>
          </Link>
        </li>
        <li className={location.pathname === '/onboarding' ? 'active' : ''}>
          <Link to="/onboarding">
            <i><img src={OnBoarding} alt="OnBoarding" /></i>
            <span>On Boarding</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
