import React, { useState } from 'react';
import CardForm from '../../pages/Props.jsx';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, Tabs, Button, Table } from 'react-bootstrap';

// Bootstrap imports

import Edit from '../../assets/Images/table_edit.svg';
import Delete from '../../assets/Images/table_delete.svg';

const Benefits = () => {
  const [Dependents, setDependents] = useState([
      {
        key:'1',
        Name: 'Lonard',
        Relationship: 'Children',
        Gender: 'Male',
        IDNumber: '1009-0992-2902',
        DateBirth: 'Feb 04, 1990',
      },
      {
        key:'1',
        Name: 'Mathew',
        Relationship: 'Spouse',
        Gender: 'Male',
        IDNumber: '1009-0992-2902',
        DateBirth: 'Nov 24, 1963',
      }
  ])

  return (
    <CardForm>
      <Col md={12} lg={12} xl={12} xxl={12}>
        <div className="primary_table mb-3">
          <div className="table_header">
            <h5>Dependents</h5>
            <div className="heading_elements">
              <ul>
                <li><input className='grid_search' type="text" placeholder="Search" /></li>
                <li><Button className='primary_form_btn btn_h_35'>Add Benefits</Button></li>
              </ul>
            </div>
          </div>
          <div className="table_body">
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Relationship</th>
                  <th>Gender</th>
                  <th>ID Number</th>
                  <th>Date of Birth</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Dependents.map((Dependent) => (
                  <tr key={Dependent.key}>
                    <td>{Dependent.Name}</td>
                    <td>{Dependent.Relationship}</td>
                    <td>{Dependent.Gender}</td>
                    <td>{Dependent.IDNumber}</td>
                    <td>{Dependent.DateBirth}</td>
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

export default Benefits