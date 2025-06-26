import React, { useState } from 'react';
import CardForm from '../../pages/Props.jsx';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, Tabs, Button, Table } from 'react-bootstrap';

// Bootstrap imports

import Edit from '../../assets/Images/table_edit.svg';
import Delete from '../../assets/Images/table_delete.svg';

const HealthRecord = () => {
  const [Vaccination, setVaccination] = useState([
    {
      key : '1',
      VaccinationName : 'Covid',
      DateofDose : 'Nov 24, 1999'
    }
  ])
  const [BloodGroup, setBloodGroup] = useState([
    { key: '1', label: 'O positive' },
    { key: '2', label: 'O negative' },
    { key: '3', label: 'A positive' },
    { key: '4', label: 'B positive' },
    { key: '5', label: 'B negative' },
    { key: '6', label: 'AB positive' },
    { key: '7', label: 'AB negative' },
  ])
  return (
    <CardForm>
      <Col md={12} lg={12} xl={12} xxl={12}>
          <h5 className='MainTitle'>Health Details</h5>
      </Col>
      <Col md={3} lg={3} xl={3} xxl={3}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Blood Group</Form.Label>
          <Form.Select aria-label="Default select example">
            <option>Select Blood Group</option>
            {BloodGroup.map(BloodGroups => (
              <option key={BloodGroups.key} value={BloodGroups.label}>{BloodGroups.label}</option>
            ))}
          </Form.Select>
        </Form.Group>
      </Col>
      <Col md={3} lg={3} xl={3} xxl={3}>
        <Form>
          <Form.Label>Blood Donor</Form.Label>
          <Form.Check // prettier-ignore
            type="switch"
            id="custom-switch"
          />
        </Form>
      </Col>
      <Col md={3} lg={3} xl={3} xxl={3}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Allergy Intolerance</Form.Label>
          <Form.Control type="name" placeholder="" />
        </Form.Group>
      </Col>
      <Col md={3} lg={3} xl={3} xxl={3}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Pre-Existing Illness</Form.Label>
          <Form.Control type="name" placeholder="" />
        </Form.Group>
      </Col>
      <Col md={12} lg={12} xl={12} xxl={12}>
        <div className="primary_table mb-3">
          <div className="table_header">
            <h5>Vaccination</h5>
            <div className="heading_elements">
              <ul>
                <li><input className='grid_search' type="text" placeholder="Search" /></li>
                <li><Button className='primary_form_btn btn_h_35'>Add Vaccination</Button></li>
              </ul>
            </div>
          </div>
          <div className="table_body">
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Vaccination Name</th>
                  <th>Date of Dose</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Vaccination.map((Vaccinations) => (
                  <tr key={Vaccinations.key}>
                    <td>{Vaccinations.VaccinationName}</td>
                    <td>{Vaccinations.DateofDose}</td>
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

export default HealthRecord