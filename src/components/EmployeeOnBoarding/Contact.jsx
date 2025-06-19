import React from 'react'

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

function BasicInfo() {
    return (
        <Card className='secondary_card'>
            <Card.Body>
                <Form>
                    <Row>
                        <Col md={12} lg={12} xl={12} xxl={12}>
                            <h5 className='MainTitle'>Current Address</h5>
                        </Col>
                        <Col md={6} lg={6} xl={6} xxl={6}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Address Line 1</Form.Label>
                                <Form.Control type="name" placeholder="" />
                            </Form.Group>
                        </Col>
                        <Col md={6} lg={6} xl={6} xxl={6}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Address Line 2</Form.Label>
                                <Form.Control type="name" placeholder="" />
                            </Form.Group>
                        </Col>
                        <Col md={3} lg={3} xl={3} xxl={3}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Country</Form.Label>
                                <Form.Select aria-label="Default select example">
                                    <option>Open this select menu</option>
                                    <option value="1">Indian</option>
                                    <option value="2">Austraila</option>
                                    <option value="3">China</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={3} lg={3} xl={3} xxl={3}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>State</Form.Label>
                                <Form.Select aria-label="Default select example">
                                    <option>Open this select menu</option>
                                    <option value="1">Indian</option>
                                    <option value="2">Austraila</option>
                                    <option value="3">China</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={3} lg={3} xl={3} xxl={3}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>City</Form.Label>
                                <Form.Select aria-label="Default select example">
                                    <option>Open this select menu</option>
                                    <option value="1">Indian</option>
                                    <option value="2">Austraila</option>
                                    <option value="3">China</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={3} lg={3} xl={3} xxl={3}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Zip Code</Form.Label>
                                <Form.Control type="name" placeholder="" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} lg={12} xl={12} xxl={12}>
                            <h5 className='MainTitle'>Permanent Address</h5>
                        </Col>
                        <Col md={6} lg={6} xl={6} xxl={6}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Address Line 1</Form.Label>
                                <Form.Control type="name" placeholder="" />
                            </Form.Group>
                        </Col>
                        <Col md={6} lg={6} xl={6} xxl={6}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Address Line 2</Form.Label>
                                <Form.Control type="name" placeholder="" />
                            </Form.Group>
                        </Col>
                        <Col md={3} lg={3} xl={3} xxl={3}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Country</Form.Label>
                                <Form.Select aria-label="Default select example">
                                    <option>Open this select menu</option>
                                    <option value="1">Indian</option>
                                    <option value="2">Austraila</option>
                                    <option value="3">China</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={3} lg={3} xl={3} xxl={3}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>State</Form.Label>
                                <Form.Select aria-label="Default select example">
                                    <option>Open this select menu</option>
                                    <option value="1">Indian</option>
                                    <option value="2">Austraila</option>
                                    <option value="3">China</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={3} lg={3} xl={3} xxl={3}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>City</Form.Label>
                                <Form.Select aria-label="Default select example">
                                    <option>Open this select menu</option>
                                    <option value="1">Indian</option>
                                    <option value="2">Austraila</option>
                                    <option value="3">China</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={3} lg={3} xl={3} xxl={3}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Zip Code</Form.Label>
                                <Form.Control type="name" placeholder="" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} lg={12} xl={12} xxl={12}>
                            <h5 className='MainTitle'>Contact Details</h5>
                        </Col>
                        <Col md={3} lg={3} xl={3} xxl={3}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Primary Phone Number</Form.Label>
                                <Form.Control type="name" placeholder="" />
                            </Form.Group>
                        </Col>
                        <Col md={3} lg={3} xl={3} xxl={3}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Alternate Phone Number</Form.Label>
                                <Form.Control type="name" placeholder="" />
                            </Form.Group>
                        </Col>
                        <Col md={3} lg={3} xl={3} xxl={3}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control type="name" placeholder="" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} lg={12} xl={12} xxl={12}>
                            <h5 className='MainTitle'>Contact Details</h5>
                        </Col>
                        <Col md={3} lg={3} xl={3} xxl={3}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control type="name" placeholder="" />
                            </Form.Group>
                        </Col>
                        <Col md={3} lg={3} xl={3} xxl={3}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Relationship</Form.Label>
                                <Form.Control type="name" placeholder="" />
                            </Form.Group>
                        </Col>
                        <Col md={3} lg={3} xl={3} xxl={3}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control type="name" placeholder="" />
                            </Form.Group>
                        </Col>
                        <Col md={3} lg={3} xl={3} xxl={3}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Email Address (optional)</Form.Label>
                                <Form.Control type="name" placeholder="" />
                            </Form.Group>
                        </Col>
                        <Col md={3} lg={3} xl={3} xxl={3}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Address (optional but helpful)</Form.Label>
                                <Form.Control type="name" placeholder="" />
                            </Form.Group>
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

export default BasicInfo

// const BootstrapStyles = () => null