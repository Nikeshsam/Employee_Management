import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SunSet from '../../assets/Images/sunset.svg';
import { useLoginUser } from '../../context/LoginUserContext';


const TopMenu = ({ title, username, activeTab }) => {
  const { loginUser } = useLoginUser();

  // Get current hour
  const hour = new Date().getHours();
  let greeting = "Good Morning,";
  if (hour >= 12 && hour < 16) {
    greeting = "Good Afternoon,";
  } else if (hour >= 16 || hour < 5) {
    greeting = "Good Evening,";
  }




  return (
    <div className='topmenu'>
      <div className='topmenu_content'>
        <h1>{activeTab}</h1>
        <div className='greeting'>
          <i><img src={SunSet} alt="sunset" /></i>
          <span>{greeting}</span>
          <label>{loginUser.user.name}</label>
        </div>
      </div>
      <div className='topmenu_search'>
        <input type="text" placeholder='Quick Search' />
      </div>
    </div>
  )
}

export default TopMenu;
