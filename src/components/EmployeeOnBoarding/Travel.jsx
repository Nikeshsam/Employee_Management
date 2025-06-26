import React, { useState } from 'react';
import CardForm from '../../pages/Props.jsx';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, Tabs, Button, Table } from 'react-bootstrap';

// Bootstrap imports

import Edit from '../../assets/Images/table_edit.svg';
import Delete from '../../assets/Images/table_delete.svg';
import { Key } from 'lucide-react';

const Travel = () => {
  const [Visa, setVisas] = useState([
    {
      key: '1',
      VisaNumber: 'VISA10024578',
      IssuedDate: '2022-04-10',
      PlaceofIssue: 'New Delhi',
      ExpiryDate: '2025-04-09',
      Notes: 'Business Visa, Multiple Entry',
    },
    {
      key: '2',
      VisaNumber: 'VISA20317891',
      IssuedDate: '2023-07-01',
      PlaceofIssue: 'Mumbai',
      ExpiryDate: '2026-06-30',
      Notes: 'Tourist Visa, Single Entry',
    }
  ])
  return (
    <CardForm>
      <Col md={12} lg={12} xl={12} xxl={12}>
        <h5 className='MainTitle'>Passport Details</h5>
      </Col>
      <Col md={3} lg={3} xl={3} xxl={3}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Passport No</Form.Label>
          <Form.Control type="name" placeholder="" />
        </Form.Group>
      </Col>
      <Col md={3} lg={3} xl={3} xxl={3}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Issued By</Form.Label>
          <Form.Control type="name" placeholder="" />
        </Form.Group>
      </Col>
      <Col md={3} lg={3} xl={3} xxl={3}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Date of Issue</Form.Label>
          <Form.Control type="name" placeholder="" />
        </Form.Group>
      </Col>
      <Col md={3} lg={3} xl={3} xxl={3}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Date of Expiry</Form.Label>
          <Form.Control type="name" placeholder="" />
        </Form.Group>
      </Col>
      <Col md={12} lg={12} xl={12} xxl={12}>
        <div className="primary_table mb-3">
          <div className="table_header">
            <h5>Visa</h5>
            <div className="heading_elements">
              <ul>
                <li><input className='grid_search' type="text" placeholder="Search" /></li>
                <li><Button className='primary_form_btn btn_h_35'>Add Visa</Button></li>
              </ul>
            </div>
          </div>
          <div className="table_body">
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Visa Number</th>
                  <th>Issued Date</th>
                  <th>Place of Issue</th>
                  <th>Expiry Date</th>
                  <th>Notes</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Visa.map((Visas) => (
                  <tr key={Visas.key}>
                  {/* <tr key={Visas.key}> */}
                    <td>{Visas.VisaNumber}</td>
                    <td>{Visas.IssuedDate}</td>
                    <td>{Visas.PlaceofIssue}</td>
                    <td>{Visas.ExpiryDate}</td>
                    <td>{Visas.Notes}</td>
                    <td className='table_action'>
                      <Button className="btn_action"><img src={Edit} alt="" /></Button>
                      <Button className="btn_action"><img src={Delete} alt="" /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </Col>

    </CardForm>
  )
}

export default Travel