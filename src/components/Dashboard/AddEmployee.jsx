import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Combobox from "react-widgets/Combobox";
import "react-widgets/styles.css";
import Images from '../../pages/Images.jsx';
import { CardForm, PrimaryGird, CustomToast, InputField, SelectInput, CustomModal, OffCanvas } from '../../pages/Props.jsx';
import { useLoginUser } from '../../context/LoginUserContext.jsx';
import { addEmployeeValidateField } from '../Validations/Validate.jsx';
import { getEmployees, addEmployee } from '../../api/index.js';


// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, ToastContainer, Tabs, Button, Pagination, Table } from 'react-bootstrap';

// Bootstrap imports

const AddEmployee = () => {

    const { loginUser } = useLoginUser();

    const [employeeData, setEmployeeData] = useState([]);

    const [showAddEmployeeCanvas, setShowAddEmployeeCanvas] = useState(false);
    const handleShowAddEmployeeCanvas = () => setShowAddEmployeeCanvas(true);
    const handleCloseAddEmployeeCanvas = () => setShowAddEmployeeCanvas(false);

    const handleToastClose = (index) => {
        const updatedList = toastList.filter((_, i) => i !== index);
        setToastList(updatedList);
    };

    // const employeeData = [
    //     {
    //         id: 'EMP012547',
    //         name: 'John Mathew',
    //         department: 'UI&UX',
    //         status: 'Full time',
    //         email: 'johnmathew@.hrmnexuscom',
    //         onboarding: 'Completed',
    //         avatar: '',
    //     },
    //     {
    //         id: 'EMP012547',
    //         name: 'Bob Grey',
    //         department: 'React',
    //         status: 'Full time',
    //         email: 'bobgrey@hrmnexus.com',
    //         onboarding: 'Inprogress',
    //         avatar: '',
    //     },
    //     {
    //         id: 'EMP012547',
    //         name: 'Jhon Mathew',
    //         department: '.Net Developement',
    //         status: 'Full time',
    //         email: 'johnmathew@hrmnexus.com',
    //         onboarding: 'Inprogress',
    //         avatar: '',
    //     },
    //     {
    //         id: 'EMP012547',
    //         name: 'Robert',
    //         department: 'Testing',
    //         status: 'Part time',
    //         email: 'robert@hrmnexus.com',
    //         onboarding: 'Completed',
    //         avatar: '',
    //     },
    // ];

    const [employmentType, setemploymentType] = useState([
        { key: '1', label: 'Full Time' },
        { key: '2', label: 'Part Time' },
        { key: '3', label: 'Contracted Employee' },
        { key: '4', label: 'Internship' },
    ])

    const [employeeType, setemployeeType] = useState([
        { key: 'admin', label: 'admin' },
        { key: 'user', label: 'user' },
    ])

    const [workLocation, setworkLocation] = useState([
        { key: '1', label: 'Chennai' },
        { key: '2', label: 'Bangalore' },
        { key: '3', label: 'Hyderabad' },
    ])

    // FormData Validations

    const [formData, setFormData] = useState({

        employeeType: '',
        employeeId: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        designation: '',
        department: '',
        joiningDate: '',
        employmentType: '',
        workLocation: '',
        offerletter: '',

    });

    // Error useState

    const [showToast, setShowToast] = useState(true);
    const [toastList, setToastList] = useState([]);

    const [errors, setErrors] = useState({});

    const [submitMessage, setSubmitMessage] = useState('');

    //  Validate Form with Error

    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach((field) => {
            const error = addEmployeeValidateField(field, formData[field]);
            if (error) newErrors[field] = error;
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    //  Handle Submit

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {

            try {
                const response = await addEmployee(formData, loginUser.token);
                console.log(response.data.message);
                setSubmitMessage(response.data.message);
                // Add toast
                setToastList(prev => [
                    ...prev,
                    {
                        title: `${formData.firstName} ${formData.lastName}`,
                        message: 'Employee Added Successfully',
                        img: Images.SuccessCheck
                    }
                ]);

                // Refresh employee list
                const updatedEmployees = await getEmployees('', 1, 10, loginUser.token);
                setEmployeeData(updatedEmployees.data.data);

                // Optionally close the canvas
                handleCloseAddEmployeeCanvas();

                // Reset form
                setFormData({
                    employeeType: '',
                    employeeId: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: '',
                    designation: '',
                    department: '',
                    joiningDate: '',
                    employmentType: '',
                    workLocation: '',
                    offerletter: '',
                });

                setErrors({});
            } catch (error) {
                console.log(error);
                setSubmitMessage(error?.response?.data?.message || 'Submission failed');
            }
        }
    };

    //  Handle Change

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        const error = addEmployeeValidateField(name, value);
        setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
    };

    // Insert Employee Data in Grid API Integration

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await getEmployees('', 1, 10, loginUser.token);
                console.log(response);
                setEmployeeData(response.data.data); // adjust based on your actual response
            } catch (error) {
                console.error('Failed to fetch employees:', error);
            }
        };

        if (loginUser?.token) {
            fetchEmployees();
        }
    }, [loginUser]);

    const navigate = useNavigate();

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
                            tableHeaders={[<Form.Check />, 'Employee ID', 'Employee Name', 'Position', 'Department', 'JoiningDate', 'Email', 'Status', 'Actions']}
                        >
                            {employeeData.map((emp, idx) => (   
                                <tr key={idx}>
                                    <td><Form.Check /></td>
                                    <td><a href="#">{emp.employeeId}</a></td>
                                    <td>{emp.avatar} {`${emp.firstName} ${emp.lastName}`}</td>
                                    <td>{emp.designation}</td>
                                    <td>{emp.department}</td>
                                    <td>{emp.joiningDate}</td>
                                    <td>{emp.email}</td>
                                    <td>
                                        <span className="badge">
                                            <i></i> {emp.status}
                                        </span>
                                    </td>
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
                onSubmit={handleSubmit}
                onHide={handleCloseAddEmployeeCanvas}
                title="Add Family Member"
                subtitle="Start your 7-day free trial."
                name="Add Family"
                footerButtonSubmit="Add Member"
                footerButtonCancel="Cancel"
                footerButtonSubmitClass="modal_primary_btn w-100"
                footerButtonCancelClass="modal_primary_border_btn w-100"
            >
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <SelectInput
                        label="Employee Type"
                        name="employeeType"
                        options={employeeType}
                        placeholder="Employee Type"
                        error={errors.employeeType}
                        value={formData.employeeType}
                        handleChange={handleChange}
                        required
                    />
                </Col>
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <InputField
                        label="Emp ID"
                        type="text"
                        placeholder="Employee ID"
                        controlId="employeeId"
                        name="employeeId"
                        error={errors.employeeId}
                        value={formData.employeeId}
                        handleChange={handleChange}
                        required
                    />
                </Col>
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <InputField
                        label="First Name"
                        type="text"
                        placeholder="Employee First Name"
                        controlId="firstName"
                        name="firstName"
                        error={errors.firstName}
                        value={formData.firstName}
                        handleChange={handleChange}
                        required
                    />
                </Col>
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <InputField
                        label="Last Name"
                        type="text"
                        placeholder="Employee Last Name"
                        controlId="lastName"
                        name="lastName"
                        error={errors.lastName}
                        value={formData.lastName}
                        handleChange={handleChange}
                        required
                    />
                </Col>
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <InputField
                        label="Email Address"
                        type="text"
                        placeholder="Employee Email Address"
                        controlId="email"
                        name="email"
                        error={errors.email}
                        value={formData.email}
                        handleChange={handleChange}
                        required
                    />
                </Col>
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <InputField
                        label="Phone Number"
                        type="text"
                        placeholder="Employee Phone Number"
                        controlId="phoneNumber"
                        name="phoneNumber"
                        error={errors.phoneNumber}
                        value={formData.phoneNumber}
                        handleChange={handleChange}
                        required
                    />
                </Col>
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <InputField
                        label="Designation"
                        type="text"
                        placeholder="Employee Designation"
                        controlId="designation"
                        name="designation"
                        error={errors.designation}
                        value={formData.designation}
                        handleChange={handleChange}
                        required
                    />
                </Col>
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <InputField
                        label="Department"
                        type="text"
                        placeholder="Employee Department"
                        controlId="department"
                        name="department"
                        error={errors.department}
                        value={formData.department}
                        handleChange={handleChange}
                        required
                    />
                </Col>
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <InputField
                        label="Joining Date"
                        type="date"
                        placeholder="Enter Joining Date"
                        controlId="joiningDate"
                        name="joiningDate"
                        error={errors.joiningDate}
                        value={formData.joiningDate}
                        handleChange={handleChange}
                        required
                    />
                </Col>
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <SelectInput
                        label="Employment Type"
                        name="employmentType"
                        options={employmentType}
                        placeholder="Employment Type"
                        error={errors.employmentType}
                        value={formData.employmentType}
                        handleChange={handleChange}
                        required
                    />
                </Col>
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <SelectInput
                        label="Work Location"
                        name="workLocation"
                        options={workLocation}
                        placeholder="Work Location"
                        error={errors.workLocation}
                        value={formData.workLocation}
                        handleChange={handleChange}
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
                        error={errors.offerletter}
                        value={formData.offerletter}
                        handleChange={handleChange}
                        required
                    />
                </Col>
            </OffCanvas>
            <ToastContainer position="top-end" className="p-3">
                {toastList.map((toast, index) => (
                    <CustomToast
                        key={index}
                        title={toast.title}
                        message={toast.message}
                        img={toast.img}
                        onClose={() => handleToastClose(index)} // If your component supports this
                    />
                ))}
            </ToastContainer>
        </>
    )
};

export default AddEmployee
