import React, { useState } from 'react';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

// Bootstrap imports

import Edit from '../../assets/Images/table_edit.svg';
import Delete from '../../assets/Images/table_delete.svg';

const Family = () => {
    const [Familymembers, setFamilyMembers] = useState([
        {
            key: '1',
            FirstName: 'John',
            LastName: 'Doe',
            Relationship: 'Father',
            Education: 'Bachelor\'s Degree',
            Occupation: 'Software Engineer',
            dependentInBenefits: true,
            dob: 'May 01, 1975',
        },
        {
            key: '2',
            FirstName: 'Ganesh',
            LastName: 'Kumar',
            Relationship: 'Mother',
            Education: 'Master\'s Degree',
            Occupation: 'Doctor',
            dependentInBenefits: true,
            dob: 'June 21, 1979',
        },
        {
            key: '3',
            FirstName: 'Alice',
            LastName: 'Doe',
            Relationship: 'Sister',
            Education: 'High School',
            Occupation: 'Student',
            dependentInBenefits: false,
            dob: 'Sep 15, 2005',
        }

    ])
    return (
        <Card className='secondary_card'>
            <Card.Body>
                <Form>
                    <Row>
                        <Col md={12} lg={12} xl={12} xxl={12}>
                            <div className="primary_table">
                                <div className="table_header">
                                    <h5>Family</h5>
                                    <div className="heading_elements">
                                        <ul>
                                            <li><input className='grid_search' type="text" placeholder="Search" /></li>
                                            <li><Button className='primary_form_btn btn_h_35'>Add Family Member</Button></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="table_body">
                                    <Table striped bordered hover responsive>
                                        <thead>
                                            <tr>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                                <th>Relationship</th>
                                                <th>Date of Birth</th>
                                                <th>Education</th>
                                                <th>occupation</th>
                                                <th>Dependent in benefits</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Familymembers.map((member) => (
                                                <tr key={member.key}>
                                                    <td>{member.FirstName}</td>
                                                    <td>{member.LastName}</td>
                                                    <td>{member.Relationship}</td>
                                                    <td>{member.dob}</td>
                                                    <td>{member.Education}</td>
                                                    <td>{member.Occupation}</td>
                                                    <td>{member.dependentInBenefits ? 'Yes' : 'No'}</td>
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

export default Family
