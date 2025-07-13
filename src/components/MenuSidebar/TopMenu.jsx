import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SunSet from '../../assets/Images/sunset.svg';
import { useLoginUser } from '../../context/LoginUserContext';


const TopMenu = ({ title, username, activeTab }) => {
  const { loginUser } = useLoginUser();
  return (
    <div className='topmenu'>
      <div className='topmenu_content'>
        <h1>{activeTab}</h1>
        <span>
          <i><img src={SunSet} alt="sunset" /></i>
          Good Morning,
          <label>{loginUser.user.name}</label>
        </span>
      </div>
      <div className='topmenu_search'>
        <input type="text" placeholder='Quick Search' />
      </div>
    </div>
  )
}

export default TopMenu;
