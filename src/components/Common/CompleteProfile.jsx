import { CustomModal } from "../../pages/Props";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Images from '../../pages/Images.jsx';


// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Image, Tab, Tabs, Button, Table } from 'react-bootstrap';

// Bootstrap imports

const CompleteProfile = ({ setActiveTab }) => {

  const navigate = useNavigate();

  const [modalShow, setModalShow] = useState(true); // Modal shows on initial render

  const handleClearClick = () => {
    setModalShow(false);
  };

  const handleModalSubmit = () => {

    console.log('Register clicked');

    // Close modal
    setModalShow(false);

    // Navigate to target page and pass a flag
    navigate('/home', { state: { tab: 'Company Profile', openCanvas: true } });
  };


  useEffect(() => {
    const timer = setTimeout(() => {
      setModalShow(true);
    }, 1000); // 1000ms = 1 second

    return () => clearTimeout(timer); // cleanup
  }, []);


  return (<CustomModal
    show={modalShow}
    onHide={handleClearClick}
    className='DialogueModal'
    bodyContent={
      <>
        <div className='diaImg'>
          <Image src={Images.ORGprofile}></Image>
        </div>
        <div className='daiContent'>
          <h5>Complete Your Profile</h5>
          <p>First, complete the <span>Organization Profile,</span> then proceed to the other details.</p>
        </div>
      </>
    }
    onSubmit={handleModalSubmit}
    footerButtonSubmit="Let's Complete"
    footerButtonCancel="Back"
    footerButtonSubmitClass="modal_primary_btn w-100"
    footerButtonCancelClass="modal_primary_border_btn w-100"
  />);
}

export default CompleteProfile;