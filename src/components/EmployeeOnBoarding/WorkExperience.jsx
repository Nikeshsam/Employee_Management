import React, { useState } from 'react';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, Tabs, Button, Table } from 'react-bootstrap';

// Bootstrap imports

import Edit from '../../assets/Images/table_edit.svg';
import Delete from '../../assets/Images/table_delete.svg';

const WorkExperience = () => {
    const [WorkExperience, setWorkExperience] = useState([
        {
            key: '1',
            Organization: 'Accenture',
            Location: 'Chennai',
            JobTitle: 'UI UX Designer',
            StartDate: '25-06-2023',
            EndDate: '25-06-2025',
        }
    ])
  return (
    <Card>
      <Card.Body>
        <Form>
          <Row>
            <Col md={12} lg={12} xl={12} xxl={12}>
              <div className='primary_table'>
                <div className="table_header">
                  <h5>Work Experience</h5>
                  <div className="heading_elements">
                    <ul>
                      <li><input className='grid_search' type="text" placeholder="Search" /></li>
                      <li><Button className='primary_form_btn btn_h_35'>Add Work Experience</Button></li>
                    </ul>
                  </div>
                </div>
                <div className='table_body'>
                  <Table>
                    <thead>
                      <tr>
                        <th>Organization</th>
                        <th>Location</th>
                        <th>Job Title</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                        {WorkExperience.map((WorkExperiences) => (
                            <tr key={WorkExperiences.key}>
                                <td>{WorkExperiences.Organization}</td>
                                <td>{WorkExperiences.Location}</td>
                                <td>{WorkExperiences.JobTitle}</td>
                                <td>{WorkExperiences.StartDate}</td>
                                <td>{WorkExperiences.EndDate}</td>
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
          </Row>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default WorkExperience