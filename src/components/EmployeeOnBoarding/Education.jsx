import React, { useState } from 'react';
import { CardForm, PrimaryGird, InputField } from '../../pages/Props.jsx';
import Images from '../../pages/Images.jsx';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, Tabs, Button, Table } from 'react-bootstrap';

// Bootstrap imports

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
            key: '2',
            Name: 'Scrum Master',
            IssuedBy: 'Project Management Institute',
            IssuedDate: 'Mar 25, 2024',
            ExpiryDate: 'Mar 25, 2027',
            AdditionalInformation: '2024',
        },
    ])
    return (
        <CardForm>
            <Col md={12} lg={12} xl={12} xxl={12}>
                <PrimaryGird
                    cardTitle="Educations"
                    buttonText="Add Education"
                    onButtonClick={() => console.log('Add Visa Clicked')}
                    tableHeaders={['Degree', 'Major', 'University', 'Year', 'CGPA', 'Actions']}
                >
                    {Education.map((Educations) => (
                        <tr key={Educations.key}>
                            <td>{Educations.Degree}</td>
                            <td>{Educations.Major}</td>
                            <td>{Educations.University}</td>
                            <td>{Educations.Year}</td>
                            <td>{Educations.CGPA}</td>
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
                    onButtonClick={() => console.log('Add Visa Clicked')}
                    tableHeaders={['Name', 'Issued by', 'Issued Date', 'Expiry Date', 'Additional Information', 'Actions']}
                >
                    {Certification.map((Certifications) => (
                        <tr key={Certifications.key}>
                            <td>{Certifications.Name}</td>
                            <td>{Certifications.IssuedBy}</td>
                            <td>{Certifications.IssuedDate}</td>
                            <td>{Certifications.ExpiryDate}</td>
                            <td>{Certifications.AdditionalInformation}</td>
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
