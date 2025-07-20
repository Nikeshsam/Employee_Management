import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardForm, PrimaryGird, InputField, OffCanvas } from '../../pages/Props.jsx';
import Images from '../../pages/Images.jsx';
import {familyValidateField} from '../Validations/Validate.jsx';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, Tabs, Button, Table } from 'react-bootstrap';

// Bootstrap imports


const Family = () => {

    // Canvas useState

    const [showFamilyCanvas, setShowFamilyCanvas] = useState(false);
    const handleShowFamilyCanvas = () => setShowFamilyCanvas(true);
    const handleCloseFamilyCanvas = () => setShowFamilyCanvas(false);

    const [familymembers, setFamilyMembers] = useState([
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

    // FormData Validations

    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        relationship: '',
        dob: '',
        education: '',
        occupation: '',
    });

    // Error useState

    const [errors, setErrors] = useState({
        fname: '',
        lname: '',
        relationship: '',
        dob: '',
        education: '',
        occupation: '',
    });




    //  Validate Form with Error

    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach((field) => {
            const error = familyValidateField(field, formData[field]);
            if (error) newErrors[field] = error;
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    //  Handle Submit

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            navigate('/Home'); // 
            console.log('Form submitted:', formData);
        }
    };

    //  Handle Change

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        const error = familyValidateField(name, value);
        setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
    };

    const navigate  = useNavigate();

    return (
        <>
            <CardForm
                footerButtonSubmit="Save"
                footerButtonSubmitClass="primary_form_btn btn_h_35"
            >
                <Col md={12} lg={12} xl={12} xxl={12}>
                    <PrimaryGird
                        cardTitle="Family"
                        buttonText="Add Family"
                        showAddButton={true}
                        showFilterButton={false}
                        showDeleteButton={false}
                        showFooter={false}
                        onButtonClick={handleShowFamilyCanvas}
                        tableHeaders={['First Name', 'Last Name', 'Relationship', 'Date of Birth', 'Education', 'occupation', 'Dependent in benefits', 'Actions']}
                    >
                        {familymembers.map((familymember) => (
                            <tr key={familymember.key}>
                                <td>{familymember.FirstName}</td>
                                <td>{familymember.LastName}</td>
                                <td>{familymember.Relationship}</td>
                                <td>{familymember.dob}</td>
                                <td>{familymember.Education}</td>
                                <td>{familymember.Occupation}</td>
                                <td>{familymember.dependentInBenefits ? 'Yes' : 'No'}</td>
                                <td className='table_action'>
                                    <Button className="btn_action"><img src={Images.Edit} alt="" /></Button>
                                    <Button className="btn_action"><img src={Images.Delete} alt="" /></Button>
                                </td>
                            </tr>
                        ))}
                    </PrimaryGird>
                </Col>
            </CardForm>

            <OffCanvas
                show={showFamilyCanvas}
                placement="end"
                onSubmit={handleSubmit}
                onHide={handleCloseFamilyCanvas}
                title="Add Family Member"
                subtitle="Start your 7-day free trial."
                name="Add Family"
                footerButtonSubmit="Add Member"
                footerButtonCancel="Cancel"
                footerButtonSubmitClass="modal_primary_btn w-100"
                footerButtonCancelClass="modal_primary_border_btn w-100"
            >
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <InputField
                        label="First Name"
                        type="text"
                        placeholder="Enter your First Name"
                        controlId="fname"
                        name="fname"
                        error={errors.fname}
                        value={formData.fname}
                        handleChange={handleChange}
                        required
                    />
                </Col>
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <InputField
                        label="Last Name"
                        type="text"
                        placeholder="Enter your Last Name"
                        controlId="lname"
                        name="lname"
                        error={errors.lname}
                        value={formData.lname}
                        handleChange={handleChange}
                        required
                    />
                </Col>
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <InputField
                        label="Relationship"
                        type="text"
                        placeholder="Enter your Last Name"
                        controlId="relationship"
                        name="relationship"
                        error={errors.relationship}
                        value={formData.relationship}
                        handleChange={handleChange}
                        required
                    />
                </Col>
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <InputField
                        label="Date of Birth"
                        type="date"
                        placeholder="Enter your Last Name"
                        controlId="dob"
                        name="dob"
                        error={errors.dob}
                        value={formData.dob}
                        handleChange={handleChange}
                        required
                    />
                </Col>
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <InputField
                        label="Education"
                        type="text"
                        placeholder="Enter your Last Name"
                        controlId="education"
                        name="education"
                        error={errors.education}
                        value={formData.education}
                        handleChange={handleChange}
                        required
                    />
                </Col>
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <InputField
                        label="Occupation"
                        type="text"
                        placeholder="Enter your Last Name"
                        controlId="occupation"
                        name="occupation"
                        error={errors.occupation}
                        value={formData.occupation}
                        handleChange={handleChange}
                        required
                    />
                </Col>
            </OffCanvas>
        </>
    )
}

export default Family
