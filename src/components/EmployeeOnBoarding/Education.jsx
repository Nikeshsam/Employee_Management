import React, { useState } from 'react';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, Tabs, Button, Table } from 'react-bootstrap';

// Bootstrap imports

import Edit from '../../assets/Images/table_edit.svg';
import Delete from '../../assets/Images/table_delete.svg';

const Educations = () => {
    const [Education, setEducation] = useState([
        {
            key: '1',
            Degree: 'B.Tech',
            Major: 'IT',
            University: 'Anna University',
            Year: '2024',
            CGPA: '7.6',
        },
    ])

    const [Certification, setCertifications] = useState([
        {
            key: '1',
            Name: 'Scrum Master',
            IssuedBy: 'Project Management Institute',
            IssuedDate: 'Mar 25, 2024',
            ExpiryDate: 'Mar 25, 2027',
            AdditionalInformation: '2024',
        },
    ])
    return (
        <Card className='secondary_card'>
            <Card.Body>
                <Form>
                    <Row>
                        <Col md={12} lg={12} xl={12} xxl={12}>
                            <div className="primary_table mb-3">
                                <div className="table_header">
                                    <h5>Educations</h5>
                                    <div className="heading_elements">
                                        <ul>
                                            <li><input className='grid_search' type="text" placeholder="Search" /></li>
                                            <li><Button className='primary_form_btn btn_h_35'>Add Education</Button></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="table_body">
                                    <Table striped bordered hover responsive>
                                        <thead>
                                            <tr>
                                                <th>Degree</th>
                                                <th>Major</th>
                                                <th>University</th>
                                                <th>Year</th>
                                                <th>CGPA</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Education.map((Educations) => (
                                                <tr key={Educations.key}>
                                                    <td>{Educations.Degree}</td>
                                                    <td>{Educations.Major}</td>
                                                    <td>{Educations.University}</td>
                                                    <td>{Educations.Year}</td>
                                                    <td>{Educations.CGPA}</td>
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

                        <Col md={12} lg={12} xl={12} xxl={12}>
                            <div className="primary_table">
                                <div className="table_header">
                                    <h5>Certifications</h5>
                                    <div className="heading_elements">
                                        <ul>
                                            <li><input className='grid_search' type="text" placeholder="Search" /></li>
                                            <li><Button className='primary_form_btn btn_h_35'>Add Certifications</Button></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="table_body">
                                    <Table striped bordered hover responsive>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Issued by</th>
                                                <th>Issued Date</th>
                                                <th>Expiry Date</th>
                                                <th>Additional Information</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Certification.map((Certifications) => (
                                                <tr key={Certifications.key}>
                                                    <td>{Certifications.Name}</td>
                                                    <td>{Certifications.IssuedBy}</td>
                                                    <td>{Certifications.IssuedDate}</td>
                                                    <td>{Certifications.ExpiryDate}</td>
                                                    <td>{Certifications.AdditionalInformation}</td>
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
            <Card.Footer>
                <Button className='primary_form_btn btn_h_35'>Save</Button>
            </Card.Footer>
        </Card>
    )
}

export default Educations
