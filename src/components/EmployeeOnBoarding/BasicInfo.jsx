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

// Bootstrap imports

const BasicInfo = () => {
    const [nationality, setNationality] = useState( [
        { key: '1', label: 'Indian'},
        { key: '2', label: 'Australian'},            
        { key: '3', label: 'Chinese'},
        { key: '4', label: 'Japan'},
        { key: '5', label: 'England'},
        { key: '6', label: 'Pakistan'},
        { key: '7', label: 'Dubai'}
    ]);

    const [gender, setGender] = useState( [
        { key: '1', label: 'Male'},
        { key: '2', label: 'Female'},            
        { key: '3', label: 'Transgender'},
        { key: '4', label: 'Prefer not to say'},
    ]);

    const [maritalstatus, setMaritalStatus] = useState([
        { key: '1', label: 'Single' },
        { key: '2', label: 'Married' }
    ]);

    return (
        <Card className='secondary_card'>
            <Card.Body>
                <Form>
                    <Row>
                        <Col md={9} lg={9} xl={9} xxl={9}>
                            <Row>
                                <Col md={4} lg={4} xl={4} xxl={4}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control type="name" placeholder="" />
                                    </Form.Group>
                                </Col>
                                <Col md={4} lg={4} xl={4} xxl={4}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control type="name" placeholder="" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4} lg={4} xl={4} xxl={4}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Date of Birth</Form.Label>
                                        <Form.Control type="date" placeholder="" />
                                    </Form.Group>
                                </Col>
                                <Col md={4} lg={4} xl={4} xxl={4}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Age</Form.Label>
                                        <Form.Control type="number" placeholder="" />
                                    </Form.Group>
                                </Col>
                                <Col md={4} lg={4} xl={4} xxl={4}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Nationality</Form.Label>
                                        <Form.Select aria-label="Default select example">
                                            <option>Select Nationality</option>
                                            {nationality.map(national => (
                                                <option key={national.key} value={national.label}>{national.label}</option>     
                                            ))};                                       
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4} lg={4} xl={4} xxl={4}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Gender</Form.Label>
                                        <Form.Select aria-label="Default select example">
                                            <option>Select Gender</option>
                                            {gender.map(genderList => (
                                                <option key={genderList.key} value={genderList.label}>{genderList.label}</option> 
                                            ))};
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md={4} lg={4} xl={4} xxl={4}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Marital Status</Form.Label>
                                        <Form.Select aria-label="Default select example">
                                            <option>Select Status</option>
                                            {maritalstatus.map(status => (
                                                <option key={status.key} value={status.label}>{status.label}</option>
                                            ))};
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md={4} lg={4} xl={4} xxl={4}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Date of Marriage</Form.Label>
                                        <Form.Control type="date" placeholder="" />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={3} lg={3} xl={3} xxl={3}></Col>
                    </Row>
                </Form>
            </Card.Body>
            <Card.Footer>
                <Button className='primary_form_btn btn_h_35'>Save</Button>
            </Card.Footer>
        </Card>
    )
}

export default BasicInfo

// const BootstrapStyles = () => null