import React, { useState } from 'react';
import { CardForm, PrimaryGird, InputField } from '../../pages/Props.jsx';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, Tabs, Button, Table } from 'react-bootstrap';

// Bootstrap imports

const Contact = () => {
    const [Country, setCountry] = useState ([
        { key: '1', label: 'Indian' },
        { key: '2', label: 'Australian' },      
        { key: '3', label: 'Chinese' },
        { key: '4', label: 'Japan' },
        { key: '5', label: 'England' },
        { key: '6', label: 'Pakistan' },
        { key: '7', label: 'Dubai' }
    ])
    const [State, setState] = useState ([
        { key: '1', label: 'Tamil Nadu' },
        { key: '2', label: 'Andhra Pradesh' },
        { key: '3', label: 'Maharashtra' },
        { key: '4', label: 'Gujarat' },
        { key: '5', label: 'Uttar Pradesh' },
        { key: '6', label: 'Rajasthan' },
        { key: '7', label: 'Delhi' },
        { key: '8', label: 'Goa' },
        { key: '9', label: 'Karnataka' },
        { key: '10', label: 'Kerala' },
    ])
    const [City, setCity] = useState ([
        { key: '1', label: 'Chennai' },
        { key: '2', label: 'Kanchipuram' },
        { key: '3', label: 'Vellore' },
        { key: '4', label: 'Tiruvannamalai' },
        { key: '5', label: 'Chengalpattu' },
        { key: '6', label: 'Madurai' },
        { key: '7', label: 'Coimbatore' },
        { key: '8', label: 'Tirupur' },
        { key: '9', label: 'Thanjavur' },
        { key: '10', label: 'Thoothukudi'},
        { key: '11', label: 'Salem' },
        { key: '12', label: 'Tiruchirappalli' },
        { key: '13', label: 'Erode' },
        { key: '14', label: 'Dindigul' },
        { key: '15', label: 'Kanyakumari'},
        { key: '16', label: 'Tirunelveli' },
        { key: '17', label: 'Virudhunagar' },
        { key: '18', label: 'Namakkal' },
        { key: '19', label: 'Karur' },
        { key: '20', label: 'Pudukkottai'},
        { key: '21', label: 'Sivaganga' },
        { key: '22', label: 'Ramanathapuram' },
        { key: '23', label: 'Thiruvarur' },
        { key: '24', label: 'Nagapattinam' },
        { key: '25', label: 'Kallakurichi' },
        { key: '26', label: 'Ariyalur' },
        { key: '27', label: 'Perambalur' },
        { key: '28', label: 'Tenkasi' },
        { key: '29', label: 'Theni' },
    ])

    // FORM INPUT
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <CardForm>
            <Col md={12} lg={12} xl={12} xxl={12}>
                <h5 className='MainTitle'>Current Address</h5>
            </Col>
            <Col md={6} lg={6} xl={6} xxl={6}>
                <InputField
                    label="Address Line 1"
                    type="text"
                    placeholder="Enter your Address"
                    controlId="Address1"
                    name="Address1"
                    value={formData.Address1}
                    onChange={handleChange}
                    required
                />
            </Col>
            <Col md={6} lg={6} xl={6} xxl={6}>
                <InputField
                    label="Address Line 2"
                    type="text"
                    placeholder="Enter your Address"
                    controlId="Address2"
                    name="Address2"
                    value={formData.Address2}
                    onChange={handleChange}
                    required
                />
            </Col>
            <Col md={3} lg={3} xl={3} xxl={3}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Country</Form.Label>
                    <Form.Select aria-label="Default select example">
                        <option>Select Country</option>
                        {Country.map(Countrys => (
                            <option key={Countrys.key} value={Countrys.label}>{Countrys.label}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Col>
            <Col md={3} lg={3} xl={3} xxl={3}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>State</Form.Label>
                    <Form.Select aria-label="Default select example">
                        <option>Select State</option>
                        {State.map(States => (
                            <option key={States.key} value={States.label}>{States.label}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Col>
            <Col md={3} lg={3} xl={3} xxl={3}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>City</Form.Label>
                    <Form.Select aria-label="Default select example">
                        <option>Select City</option>
                        {City.map(Citys => (
                            <option key={Citys.key} value={Citys.label}>{Citys.label}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Col>
            <Col md={3} lg={3} xl={3} xxl={3}>
                <InputField
                    label="Zip Code"
                    type="text"
                    placeholder="Enter your Zip Code"
                    controlId="ZipCode"
                    name="ZipCode"
                    value={formData.ZipCode}
                    onChange={handleChange}
                    required
                />
            </Col>
            <Col md={12} lg={12} xl={12} xxl={12}>
                <h5 className='MainTitle'>Permanent Address</h5>
            </Col>
            <Col md={6} lg={6} xl={6} xxl={6}>
                <InputField
                    label="Address Line 1"
                    type="text"
                    placeholder="Enter your Address"
                    controlId="pAddress1"
                    name="pAddress1"
                    value={formData.pAddress1}
                    onChange={handleChange}
                    required
                />
            </Col>
            <Col md={6} lg={6} xl={6} xxl={6}>
                <InputField
                    label="Address Line 2"
                    type="text"
                    placeholder="Enter your Address"
                    controlId="pAddress2"
                    name="pAddress2"
                    value={formData.pAddress2}
                    onChange={handleChange}
                    required
                />
            </Col>
            <Col md={3} lg={3} xl={3} xxl={3}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Country</Form.Label>
                    <Form.Select aria-label="Default select example">
                        <option>Select Country</option>
                        {Country.map(Countrys => (
                            <option key={Countrys.key} value={Countrys.label}>{Countrys.label}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Col>
            <Col md={3} lg={3} xl={3} xxl={3}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>State</Form.Label>
                    <Form.Select aria-label="Default select example">
                        <option>Select State</option>
                        {State.map(States => (
                            <option key={States.key} value={States.label}>{States.label}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Col>
            <Col md={3} lg={3} xl={3} xxl={3}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>City</Form.Label>
                    <Form.Select aria-label="Default select example">
                        <option>Select City</option>
                        {City.map(Citys => (
                            <option key={Citys.key} value={Citys.label}>{Citys.label}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Col>
            <Col md={3} lg={3} xl={3} xxl={3}>
                <InputField
                    label="Zip Code"
                    type="text"
                    placeholder="Enter your Zip Code"
                    controlId="pZipCode"
                    name="pZipCode"
                    value={formData.pZipCode}
                    onChange={handleChange}
                    required
                />
            </Col>
            <Col md={12} lg={12} xl={12} xxl={12}>
                <h5 className='MainTitle'>Contact Details</h5>
            </Col>
            <Col md={3} lg={3} xl={3} xxl={3}>
                <InputField
                    label="Primary Phone Number"
                    type="number"
                    placeholder="Enter your Phone Number"
                    controlId="PhoneNumber"
                    name="PhoneNumber"
                    value={formData.PhoneNumber}
                    onChange={handleChange}
                    required
                />
            </Col>
            <Col md={3} lg={3} xl={3} xxl={3}>
                <InputField
                    label="Alternate Phone Number"
                    type="number"
                    placeholder="Enter your Phone Number"
                    controlId="aPhoneNumber"
                    name="aPhoneNumber"
                    value={formData.aPhoneNumber}
                    onChange={handleChange}
                    required
                />
            </Col>
            <Col md={3} lg={3} xl={3} xxl={3}>
                <InputField
                    label="Email Address"
                    type="text"
                    placeholder="Enter your Email Address"
                    controlId="EmailAddress"
                    name="EmailAddress"
                    value={formData.EmailAddress}
                    onChange={handleChange}
                    required
                />
            </Col>
            <Col md={12} lg={12} xl={12} xxl={12}>
                <h5 className='MainTitle'>Contact Details</h5>
            </Col>
            <Col md={3} lg={3} xl={3} xxl={3}>
                <InputField
                    label="Full Name"
                    type="text"
                    placeholder="Enter your Full Name"
                    controlId="FullName"
                    name="FullName"
                    value={formData.FullName}
                    onChange={handleChange}
                    required
                />
            </Col>
            <Col md={3} lg={3} xl={3} xxl={3}>
                <InputField
                    label="Relationship"
                    type="text"
                    placeholder="Enter your Relationship"
                    controlId="Relationship"
                    name="Relationship"
                    value={formData.Relationship}
                    onChange={handleChange}
                    required
                />
            </Col>
            <Col md={3} lg={3} xl={3} xxl={3}>
                <InputField
                    label="Phone Number"
                    type="text"
                    placeholder="Enter your Phone Number"
                    controlId="cdPhoneNumber"
                    name="cdPhoneNumber"
                    value={formData.cdPhoneNumber}
                    onChange={handleChange}
                    required
                />
            </Col>
            <Col md={3} lg={3} xl={3} xxl={3}>
                <InputField
                    label="Email Number"
                    type="text"
                    placeholder="Enter your Email Number"
                    controlId="EmailNumber"
                    name="EmailNumber"
                    value={formData.EmailNumber}
                    onChange={handleChange}
                    required
                />
            </Col>
            <Col md={3} lg={3} xl={3} xxl={3}>
                <InputField
                    label="Address (optional but helpful)"
                    type="text"
                    placeholder="Enter your Address"
                    controlId="cdAddress"
                    name="cdAddress"
                    value={formData.cdAddress}
                    onChange={handleChange}
                    required
                />
            </Col>
        </CardForm>
    )
}

export default Contact

// const BootstrapStyles = () => null