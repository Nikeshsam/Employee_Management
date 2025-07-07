import React, { useState } from 'react';
import { CardForm, PrimaryGird, InputField } from '../../pages/Props.jsx';
import Images from '../../pages/Images.jsx';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, Tabs, Button, Table } from 'react-bootstrap';

// Bootstrap imports


const Family = () => {
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
    return (
        <CardForm>
            <Col md={12} lg={12} xl={12} xxl={12}>
                <PrimaryGird
                    cardTitle="Family"
                    buttonText="Add Family"
                    showAddButton={true}
                    showFilterButton={false}
                    showDeleteButton={false}
                    showFooter={false}
                    onButtonClick={() => console.log('Add Visa Clicked')}
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
    )
}

export default Family
