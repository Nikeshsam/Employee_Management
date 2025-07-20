import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardForm, PrimaryGird, InputField, OffCanvas } from '../../pages/Props.jsx';
import Images from '../../pages/Images.jsx';
import {educationValidateField} from '../Validations/Validate.jsx';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, Tabs, Button, Table } from 'react-bootstrap';

// Bootstrap imports

const Educations = () => {

    // Canvas useState

    const [showEducationCanvas, setShowEducationCanvas] = useState(false);
    const [showCertificationCanvas, setShowCertificationCanvas] = useState(false);

    const handleShowEducationCanvas = () => setShowEducationCanvas(true);
    const handleCloseEducationCanvas = () => setShowEducationCanvas(false);

    const handleShowCertificationCanvas = () => setShowCertificationCanvas(true);
    const handleCloseCertificationCanvas = () => setShowCertificationCanvas(false);

    const [educations, setEducation] = useState([
        {
            key: '1',
            Degree: 'B.Tech',
            Major: 'IT',
            University: 'Anna University',
            Year: '2024',
            CGPA: '7.6',
        },
    ])

    const [certifications, setCertifications] = useState([
        {
            key: '2',
            Name: 'Scrum Master',
            IssuedBy: 'Project Management Institute',
            IssuedDate: 'Mar 25, 2024',
            ExpiryDate: 'Mar 25, 2027',
            AdditionalInformation: '2024',
        },
    ])

    // FormData Validations

    const [formData, setFormData] = useState({
        degree: '',
        major: '',
        university: '',
        year: '',
        CGPA: '',
        cname: '',
        issuedby: '',
        issuedate: '',
        expirydate: '',
        additionalinformation: '',
    });

    // Error useState

    const [errors, setErrors] = useState({});


    //  Validate Form with Error

    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach((field) => {
            const error = educationValidateField(field, formData[field]);
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
        const error = educationValidateField(name, value);
        setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
    };

    const navigate = useNavigate();

    return (
        <>
            <CardForm
                footerButtonSubmit="Save"
                footerButtonSubmitClass="primary_form_btn btn_h_35"
            >
                <Col md={12} lg={12} xl={12} xxl={12}>
                    <PrimaryGird
                        cardTitle="Educations"
                        buttonText="Add Education"
                        showAddButton={true}
                        showFilterButton={false}
                        showDeleteButton={false}
                        showFooter={false}
                        onButtonClick={handleShowEducationCanvas}
                        tableHeaders={['Degree', 'Major', 'University', 'Year', 'CGPA', 'Actions']}
                    >
                        {educations.map((education) => (
                            <tr key={education.key}>
                                <td>{education.Degree}</td>
                                <td>{education.Major}</td>
                                <td>{education.University}</td>
                                <td>{education.Year}</td>
                                <td>{education.CGPA}</td>
                                <td className='table_action'>
                                    <Button className="btn_action"><img src={Images.Edit} alt="" /></Button>
                                    <Button className="btn_action"><img src={Images.Delete} alt="" /></Button>
                                </td>
                            </tr>
                        ))}
                    </PrimaryGird>
                </Col>

                <Col md={12} lg={12} xl={12} xxl={12}>
                    <PrimaryGird
                        cardTitle="Certifications"
                        buttonText="Add Certifications"
                        showAddButton={true}
                        showFilterButton={false}
                        showDeleteButton={false}
                        showFooter={false}
                        onButtonClick={handleShowCertificationCanvas}
                        tableHeaders={['Name', 'Issued by', 'Issued Date', 'Expiry Date', 'Additional Information', 'Actions']}
                    >
                        {certifications.map((certification) => (
                            <tr key={certification.key}>
                                <td>{certification.Name}</td>
                                <td>{certification.IssuedBy}</td>
                                <td>{certification.IssuedDate}</td>
                                <td>{certification.ExpiryDate}</td>
                                <td>{certification.AdditionalInformation}</td>
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
                show={showEducationCanvas}
                placement="end"
                onSubmit={handleSubmit}
                onHide={handleCloseEducationCanvas}
                title="Add Education"
                subtitle="Start your 7-day free trial."
                name="Add Education"
                footerButtonSubmit="Add Education"
                footerButtonCancel="Cancel"
                footerButtonSubmitClass="modal_primary_btn w-100"
                footerButtonCancelClass="modal_primary_border_btn w-100"
            >
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <InputField
                        label="Degree"
                        type="text"
                        placeholder="Enter your First Name"
                        controlId="degree"
                        name="degree"
                        error={errors.degree}
                        value={formData.degree}
                        handleChange={handleChange}
                        required
                    />
                </Col>
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <InputField
                        label="Major"
                        type="text"
                        placeholder="Enter your Last Name"
                        controlId="major"
                        name="major"
                        error={errors.major}
                        value={formData.major}
                        handleChange={handleChange}
                        required
                    />
                </Col>
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <InputField
                        label="University"
                        type="text"
                        placeholder="Enter your Last Name"
                        controlId="university"
                        name="university"
                        error={errors.university}
                        value={formData.university}
                        handleChange={handleChange}
                        required
                    />
                </Col>
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <InputField
                        label="Year"
                        type="date"
                        placeholder="Enter your Last Name"
                        controlId="year"
                        name="year"
                        error={errors.year}
                        value={formData.year}
                        handleChange={handleChange}
                        required
                    />
                </Col>
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <InputField
                        label="CGPA"
                        type="text"
                        placeholder="Enter your Last Name"
                        controlId="CGPA"
                        name="CGPA"
                        error={errors.CGPA}
                        value={formData.CGPA}
                        handleChange={handleChange}
                        required
                    />
                </Col>
            </OffCanvas>

            <OffCanvas
                show={showCertificationCanvas}
                placement="end"
                onSubmit={handleSubmit}
                onHide={handleCloseCertificationCanvas}
                title="Add Certification"
                subtitle="Start your 7-day free trial."
                name="Add Certification"
                footerButtonSubmit="Add Certification"
                footerButtonCancel="Cancel"
                footerButtonSubmitClass="modal_primary_btn w-100"
                footerButtonCancelClass="modal_primary_border_btn w-100"
            >
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <InputField
                        label="Name"
                        type="text"
                        placeholder="Enter your First Name"
                        controlId="cname"
                        name="cname"
                        error={errors.cname}
                        value={formData.cname}
                        handleChange={handleChange}
                        required
                    />
                </Col>
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <InputField
                        label="Issued By"
                        type="text"
                        placeholder="Enter your Last Name"
                        controlId="issuedby"
                        name="issuedby"
                        error={errors.issuedby}
                        value={formData.issuedby}
                        handleChange={handleChange}
                        required
                    />
                </Col>
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <InputField
                        label="Issued Date"
                        type="text"
                        placeholder="Enter your Last Name"
                        controlId="issuedate"
                        name="issuedate"
                        error={errors.issuedate}
                        value={formData.issuedate}
                        handleChange={handleChange}
                        required
                    />
                </Col>
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <InputField
                        label="Expiry Date"
                        type="date"
                        placeholder="Enter your Last Name"
                        controlId="expirydate"
                        name="expirydate"
                        error={errors.expirydate}
                        value={formData.expirydate}
                        handleChange={handleChange}
                        required
                    />
                </Col>
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <InputField
                        label="Additional Information"
                        type="text"
                        placeholder="Enter your Last Name"
                        controlId="additionalinformation"
                        name="additionalinformation"
                        error={errors.additionalinformation}
                        value={formData.additionalinformation}
                        handleChange={handleChange}
                        required
                    />
                </Col>
            </OffCanvas>
        </>

    )
}

export default Educations
