import React from 'react';
import Images from '../../pages/Images.jsx';
import { CardForm, PrimaryGird, InputField, CustomModal } from '../../pages/Props.jsx';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, Tabs, Button, Table, Stack, Image } from 'react-bootstrap';

// Bootstrap imports

function Banner() {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
      <Col md={6} lg={6} xl={6} xxl={6}>
        <div className='Banner_container me-2 pe-5'>
          <span>Recruit - Onboard - Manage</span>
          <h2>Revolutionize Your HR Management with Cloud-Based Solutions</h2>
          <p>The best HR software for SMB companies and startup to manage employee, payroll assistance, time off, attendance tracking with single software</p>
          <Stack direction="horizontal" gap={3}>
            <Button className='primary_btn_rounded' onClick={() => setModalShow(true)}>Get started</Button>
            <Button className='secondary_btn_rounded'>How it works</Button>
          </Stack>
        </div>
      </Col>
      <Col md={6} lg={6} xl={6} xxl={6}>
        <Image src={Images.BannerImage} alt="Banner Image" />
      </Col>

      <CustomModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        title="Register"
        subtitle='Start your 7-day free trial.'
        bodyContent={
          <>
            
          </>
        }
        footerButtonSubmit="Confirm"
        footerButtonCancel="Cancel"
        footerButtonSubmitClass="modal_primary_btn w-100"
        footerButtonCancelClass="modal_primary_border_btn w-100 mt-2"
      />

    </>
  )
}

export default Banner