import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SunSet from '../../assets/Images/sunset.svg';

const TopMenu = () => {
  return (
    <div className='topmenu'>
      <div className='topmenu_content'>
        <h1>Dashboard</h1>
        <span>
          <i><img src={SunSet} alt="" /></i>
          Good Morning,
          <label htmlFor="">John Mathew</label>
        </span>
      </div>
      <div className='topmenu_search'>
        <input type="text" placeholder='Quick Search'/>
      </div>
    </div>
  )
}

export default TopMenu;
