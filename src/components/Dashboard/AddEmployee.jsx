import React, { useState } from 'react';
import Images from '../../pages/Images.jsx';
import { CardForm, PrimaryGird, InputField } from '../../pages/Props.jsx';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, Tabs, Button, Pagination, Table } from 'react-bootstrap';

// Bootstrap imports

const AddEmployee = () => {

    const employeeData = [
        {
            id: 'EMP012547',
            name: 'John Mathew',
            department: 'UI&UX',
            status: 'Full time',
            email: 'johnmathew@.hrmnexuscom',
            onboarding: 'Completed',
            avatar: '',
        },
        {
            id: 'EMP012547',
            name: 'Bob Grey',
            department: 'React',
            status: 'Full time',
            email: 'bobgrey@hrmnexus.com',
            onboarding: 'Inprogress',
            avatar: '',
        },
        {
            id: 'EMP012547',
            name: 'Jhon Mathew',
            department: '.Net Developement',
            status: 'Full time',
            email: 'johnmathew@hrmnexus.com',
            onboarding: 'Inprogress',
            avatar: '',
        },
        {
            id: 'EMP012547',
            name: 'Robert',
            department: 'Testing',
            status: 'Part time',
            email: 'robert@hrmnexus.com',
            onboarding: 'Completed',
            avatar: '',
        },
    ];

    const OnboardingBadge = ({ status }) => {
        const isCompleted = status === 'Completed';
        return (
            <span className={`text-${isCompleted ? 'success' : 'danger'}`}>
                ● {status}
            </span>
        );
    };

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md={12} lg={12} xl={12} xxl={12}>
                        <Tabs defaultActiveKey="total_onboarding" transition={false} id="noanim-tab-example" className="mb-3 Secondary_tab">
                            <Tab eventKey="total_onboarding" title="Total Onboarding">
                                <Col md={12} lg={12} xl={12} xxl={12}>
                                    <PrimaryGird
                                        cardTitle="Employee"
                                        buttonText="Export"

                                        buttonFilter={Images.GirdFilter}
                                        buttonDelete={Images.GirdDelete}

                                        onButtonClick={() => console.log('Add clicked')}
                                        onFilterClick={() => console.log('Filter clicked')}
                                        onDeleteClick={() => console.log('Delete clicked')}

                                        showAddButton={true}
                                        showFilterButton={true}
                                        showDeleteButton={true}
                                        showFooter={true}

                                        buttonClassName='secondary_btn btn_h_35 fs_13 fw_500'
                                        buttonClassIcon='icon_btn'
                                        tableHeaders={[<Form.Check />, 'Employee ID', 'Employee ID', 'Department', 'Status', 'Email', 'Onboarding Status', 'Actions']}
                                    >
                                        {employeeData.map((emp, idx) => (
                                            <tr key={idx}>
                                                <td><Form.Check /></td>
                                                <td><a href="#">{emp.id}</a></td>
                                                <td>{emp.avatar} {emp.name}</td>
                                                <td>{emp.department}</td>
                                                <td>
                                                    <span className="badge">
                                                        <i></i> {emp.status}
                                                    </span>
                                                </td>
                                                <td>{emp.email}</td>
                                                <td><OnboardingBadge status={emp.onboarding} /></td>
                                                <td className='table_action'>
                                                    <Button className="btn_action"><img src={Images.Edit} alt="" /></Button>
                                                    <Button className="btn_action"><img src={Images.Delete} alt="" /></Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </PrimaryGird>
                                </Col>
                            </Tab>
                            <Tab eventKey="new_onboarding" title="New Onboarding">
                                2
                            </Tab>
                            <Tab eventKey="pending_onboarding" title="Pending Onboarding">
                                3
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Container>
        </>
    )
};

export default AddEmployee
