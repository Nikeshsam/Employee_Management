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
            <PrimaryGird
                cardTitle="Employee"
                buttonText="Export"
                buttonFilter='Images.GirdFilter'
                buttonDelete="Images.GirdDelete"
                onButtonClick={() => console.log('Add clicked')}
                onFilterClick={() => console.log('Filter clicked')}
                onDeleteClick={() => console.log('Delete clicked')}
                showAddButton={true}
                showFilterButton={false}
                showDeleteButton={true}
                buttonClassName = 'secondary_btn btn_h_35 fs_13 fw_500' 
                tableHeaders={[<Form.Check />,'Employee ID', 'Employee ID', 'Department', 'Status', 'Email', 'Onboarding Status', 'Actions']}
            >
                {employeeData.map((emp, idx) => (
                    <tr key={idx}>
                        <td><Form.Check /></td>
                        <td><a href="#">{emp.id}</a></td>
                        <td>{emp.avatar} {emp.name}</td>
                        <td>{emp.department}</td>
                        <td>
                            <span className="badge bg-light text-dark">
                                ● {emp.status}
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
            <div className="p-3">


                {/* Pagination Controls */}
                <div className="d-flex justify-content-between align-items-center mt-3">
                    <div>
                        <Form.Select size="sm" style={{ width: '150px' }}>
                            <option>30 Results</option>
                            <option>10 Results</option>
                        </Form.Select>
                    </div>
                    <Pagination size="sm" className="mb-0">
                        <Pagination.First />
                        <Pagination.Prev />
                        <Pagination.Item active>{1}</Pagination.Item>
                        <Pagination.Item>{2}</Pagination.Item>
                        <Pagination.Ellipsis />
                        <Pagination.Item>{18}</Pagination.Item>
                        <Pagination.Next />
                        <Pagination.Last />
                    </Pagination>
                    <div className="d-flex align-items-center">
                        Jump to:
                        <Form.Control type="number" size="sm" className="ms-2" style={{ width: '60px' }} />
                    </div>
                </div>
            </div>
        </>
    )
};

export default AddEmployee
