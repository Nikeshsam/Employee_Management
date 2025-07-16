import React, { useState } from 'react';
import Combobox from "react-widgets/Combobox";
import "react-widgets/styles.css";
import Images from '../../pages/Images.jsx';
import { CardForm, PrimaryGird, InputField, SelectInput, OffCanvas } from '../../pages/Props.jsx';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, Tabs, Button, Pagination, Table } from 'react-bootstrap';

// Bootstrap imports

const AddEmployee = () => {

    const [showAddEmployeeCanvas, setShowAddEmployeeCanvas] = useState(false);
    const handleShowAddEmployeeCanvas = () => setShowAddEmployeeCanvas(true);
    const handleCloseAddEmployeeCanvas = () => setShowAddEmployeeCanvas(false);

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

    const [employmentType, setemploymentType] = useState([
        { key: '1', label: 'Full Time' },
        { key: '2', label: 'Part Time' },
        { key: '3', label: 'Contracted Employee' },
    ])

    const [worklocation, setworklocation] = useState([
        { key: '1', label: 'Chennai' },
        { key: '2', label: 'Bangalore' },
        { key: '3', label: 'Hyderabad' },
    ])

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
                        <div className="form_elements">
                            <Combobox
                                defaultValue="Total Onboarding"
                                data={["Total onboarding", "New Onboarding", "Pending Onboarding"]}
                            />
                            <Button type='button' onClick={handleShowAddEmployeeCanvas} className='blue_gradient btn_h_40 pe-4 ps-4'>Add Employee</Button>
                        </div>
                    </Col>
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
                </Row>
            </Container>
            <OffCanvas
                show={showAddEmployeeCanvas}
                placement="end"
                //onSubmit={handleSubmit}
                onHide={handleCloseAddEmployeeCanvas}
                title="Add Family Member"
                subtitle="Start your 7-day free trial."
                name="Add Family"
                footerButtonSubmit="Add Member"
                footerButtonCancel="Cancel"
                footerButtonSubmitClass="modal_primary_btn w-100"
                footerButtonCancelClass="modal_primary_border_btn w-100"
            >
                <Col md={12} lg={12} xl={12} xxl={12}>
                    <InputField
                        label="Emp ID"
                        type="text"
                        placeholder="Employee ID"
                        controlId="EmpID"
                        name="EmpID"
                        // error={errors.EmpID}
                        value="EMP012547"
                        // handleChange={handleChange}
                        required
                    />
                </Col>
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <InputField
                        label="First Name"
                        type="text"
                        placeholder="Employee First Name"
                        controlId="fname"
                        name="fname"
                        // error={errors.fname}
                        // value={formData.fname}
                        // handleChange={handleChange}
                        required
                    />
                </Col>
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <InputField
                        label="Last Name"
                        type="text"
                        placeholder="Employee Last Name"
                        controlId="lname"
                        name="lname"
                        // error={errors.lname}
                        // value={formData.lname}
                        // handleChange={handleChange}
                        required
                    />
                </Col>
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <InputField
                        label="Designation"
                        type="text"
                        placeholder="Enter Designation"
                        controlId="designation"
                        name="designation"
                        // error={errors.designation}
                        // value={formData.designation}
                        // handleChange={handleChange}
                        required
                    />
                </Col>
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <InputField
                        label="Department"
                        type="text"
                        placeholder="Enter Department"
                        controlId="relationship"
                        name="relationship"
                        // error={errors.relationship}
                        // value={formData.relationship}
                        // handleChange={handleChange}
                        required
                    />
                </Col>
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <InputField
                        label="Joining Date"
                        type="date"
                        placeholder="Enter Joining Date"
                        controlId="dob"
                        name="dob"
                        // error={errors.dob}
                        // value={formData.dob}
                        // handleChange={handleChange}
                        required
                    />
                </Col>
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <SelectInput
                        label="Employment Type"
                        name="employmentType"
                        options={employmentType}
                        placeholder="Employment Type"
                        // error={errors.employmentType}
                        // value={formData.employmentType}
                        // handleChange={handleChange}
                        required
                    />
                </Col>
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <SelectInput
                        label="Work Location"
                        name="worklocation"
                        options={worklocation}
                        placeholder="Work Location"
                        // error={errors.worklocation}
                        // value={formData.worklocation}
                        // handleChange={handleChange}
                        required
                    />
                </Col>
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <InputField
                        label="Offer Letter"
                        type="file"
                        placeholder="Upload Offter Letter"
                        controlId="offerletter"
                        name="offerletter"
                        // error={errors.offerletter}
                        // value={formData.offerletter}
                        // handleChange={handleChange}
                        required
                    />
                </Col>
            </OffCanvas>
        </>
    )
};

export default AddEmployee
