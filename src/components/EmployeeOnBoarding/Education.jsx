import React, { useState } from 'react';
import { CardForm, PrimaryGird, InputField } from '../../pages/Props.jsx';
import Images from '../../pages/Images.jsx';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, Tabs, Button, Table } from 'react-bootstrap';

// Bootstrap imports

const Educations = () => {
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
    return (
        <CardForm
            //onSubmit={handleSubmit}
            footerButtonSubmit="Submit"
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

                    onButtonClick={() => console.log('Add Visa Clicked')}
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

                    onButtonClick={() => console.log('Add Visa Clicked')}
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
    )
}

export default Educations
