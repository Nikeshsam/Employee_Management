import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Combobox from "react-widgets/Combobox";
import "react-widgets/styles.css";
import Images from '../../pages/Images.jsx';
import { CustomToast, EmployeeGird, InputField, SelectInput, CustomModalConfirmDialog, OffCanvas,UploadInputField } from '../../pages/Props.jsx';
import { useLoginUser } from '../../context/LoginUserContext.jsx';
import { addEmployeeValidateField } from '../Validations/Validate.jsx';
import { getEmployees, addEmployee } from '../../api/index.js';
import { deleteEmployee } from '../../api/index.js';
import ComboDate from '../../data/Combo.json';


// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Form, Row, Col, ToastContainer, Button } from 'react-bootstrap';

// Bootstrap imports

const AddEmployee = () => {

    const [modalShow, setModalShow] = useState(false);

    const { loginUser } = useLoginUser();

    const [employeeData, setEmployeeData] = useState([]);

    const [employeeToDelete, setEmployeeToDelete] = useState(null);

    const [showAddEmployeeCanvas, setShowAddEmployeeCanvas] = useState(false);
    const handleShowAddEmployeeCanvas = () => setShowAddEmployeeCanvas(true);
    const handleCloseAddEmployeeCanvas = () => setShowAddEmployeeCanvas(false);

    const [pagination,setPagination]=useState({
        currentPage:1,
        totalPages:0,
        rowsPerPage:5,
        totalRecords:0
    });

    const handleToastClose = (index) => {
        const updatedList = toastList.filter((_, i) => i !== index);
        setToastList(updatedList);
    };

    const [EmploymentType, setEmploymentType] = useState(ComboDate.EmploymentType)
    const [EmployeeType, setEmployeeType] = useState(ComboDate.EmployeeType)
    const [WorkLocation, setWorkLocation] = useState(ComboDate.WorkLocation)
    const [Designation, setDesignation] = useState(ComboDate.Designation)
    const [Department, setDepartment] = useState(ComboDate.Department)

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

    const getStatusClass = (status) => {
        switch (status?.toLowerCase()) {
            case 'Pending':
                return 'badge-pending';
            case 'inprogress':
                return 'badge-inprogress';
            case 'completed':
                return 'badge-completed';
            default:
                return 'badge-default';
        }
    };

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
                const updatedEmployees = await getEmployees('', pagination.currentPage, pagination.rowsPerPage, loginUser.token);
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
        const { name, type, files, value } = e.target;
        if(type==='file'){
            const fileData = files?.[0];
            if(fileData){
                setFormData(prev => ({ ...prev, [name]: fileData }));
                setErrors(prevErrors => ({ ...prevErrors, [name]: '' })); // Clear error for file input
                return;
            }else{
                setErrors(prevErrors => ({ ...prevErrors, [name]: 'Offer Letter is required' })); // Set error for file input
                return;
            }
        }
        else{
            setFormData(prev => ({ ...prev, [name]: value }));
            const error = addEmployeeValidateField(name, value);
            setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
        }
    };

    const handlePaginationChange = (e)=>{
        let {name,value} = e.target;
        if(name==='currentPage' && value>pagination.totalPages){
            value=pagination.totalPages;
        }
        if(name==='rowsPerPage'){
            setPagination(prev=>({...prev,currentPage:1}));
        }
        setPagination(prev=>({...prev,[name]:value}));
    }

    // Insert Employee Data in Grid API Integration

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await getEmployees('', pagination.currentPage, pagination.rowsPerPage, loginUser.token);
                console.log(response);
                setEmployeeData(response.data.data); // adjust based on your actual response
                setPagination(prev => ({ 
                    ...prev,
                    totalPages: response.data.totalPages || 0,
                    totalRecords:response.data.totalRecords ||0
                }))
            } catch (error) {
                console.error('Failed to fetch employees:', error);
            }
        };

        if (loginUser?.token) {
            fetchEmployees();
        }
    }, [loginUser,pagination.rowsPerPage,pagination.currentPage]);

    const navigate = useNavigate();
    
    // Delete Employee Function

    const handleClearClick = () => {
        setModalShow(false);
        setEmployeeToDelete(null); // If you’re using employeeToDelete state
    };

    const handleDeleteEmployee = async () => {
        try {
            await deleteEmployee(employeeToDelete._id, loginUser.token); // or emp.id depending on your DB
            setToastList(prev => [
                ...prev,
                {
                    title: `${employeeToDelete.firstName} ${employeeToDelete.lastName}`,
                    message: 'Employee deleted successfully',
                    img: Images.SuccessCheck
                }
            ]);
            setModalShow(false);
            setEmployeeToDelete(null);

            // Optionally refresh the employee list
            const updatedEmployees = await getEmployees('', pagination.currentPage, pagination.rowsPerPage, loginUser.token);
            setEmployeeData(updatedEmployees.data.data);

        } catch (error) {
            console.error("Delete failed", error);
            setToastList(prev => [
                ...prev,
                {
                    title: 'Error',
                    message: 'Failed to delete employee',
                    img: Images.SuccessCheck
                }
            ]);
        }
    };

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md={12} lg={12} xl={12} xxl={12}>
                        <div className="form_elements">
                            <div className="cardHeading">
                                <h5>Employee</h5>
                                <p>Manage Your Employee</p>
                            </div>
                            <div className='align-items-center d-flex gap-3'>
                                <Button type='button' className='blue_gradient_border btn_h_50'>
                                    Download
                                </Button>
                                <Button type='button' onClick={handleShowAddEmployeeCanvas} className='blue_gradient btn_h_50'>
                                    Add New
                                </Button>
                            </div>
                        </div>
                    </Col>
                    <Col md={12} lg={12} xl={12} xxl={12}>
                        <EmployeeGird
                            buttonText="Export"
                            buttonFilter={Images.GirdFilter}
                            buttonDelete={Images.GirdDelete}
                            pagination={pagination}
                            handlePaginationChange={handlePaginationChange}
                            setPagination={setPagination}
                            onButtonClick={() => console.log('Add clicked')}
                            onFilterClick={() => console.log('Filter clicked')}
                            onDeleteClick={() => console.log('Delete clicked')}
                            showAddButton={true}
                            showFilterButton={true}
                            showDeleteButton={true}
                            showFooter={true}
                            buttonClassName='secondary_btn btn_h_35 fs_13 fw_500'
                            buttonClassIcon='icon_btn'
                            tableHeaders={[<Form.Check  className='CustomCheck' />, 'Employee Name', 'Job Title', 'Department', 'JoiningDate', 'Employment Type', 'Status', 'Work Location', 'Actions']}
                        >
                            {employeeData.map((emp, idx) => (
                                <tr key={idx}>
                                    <td><Form.Check className='CustomCheck' /></td>
                                    <td>
                                        <div className='employeeGroup'>
                                            <div className="employeeGroupImg">
                                                <img src={Images.UserAvatar} alt="" />
                                            </div>
                                            <div className='employeeGroupContent'>
                                                <h5>{`${emp.firstName} ${emp.lastName}`}</h5>
                                                <p>{emp.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    {/* <td><a href="#">{emp.employeeId}</a></td> */}
                                    <td>{emp.designation}</td>
                                    <td>{emp.department}</td>
                                    <td>{new Date(emp.joiningDate).toLocaleDateString()}</td>
                                    <td>{emp.employmentType}</td>
                                    <td>
                                        <span className={`badge ${getStatusClass(emp.status)}`}>
                                            <i></i> {emp.status}
                                        </span>
                                    </td>                                    
                                    <td>{emp.workLocation}</td>
                                    <td className='table_action'>
                                        <Button className="btn_action"><img src={Images.View} alt="" /></Button>
                                        <Button className="btn_action"><img src={Images.Edit} alt="" /></Button>
                                        <Button className="btn_action" onClick={() => {setEmployeeToDelete(emp); setModalShow(true);}}><img src={Images.Delete} alt="" /></Button>
                                    </td>
                                </tr>
                            ))}
                        </EmployeeGird>
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
                className='PrimaryCanvasModal'
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
                        options={EmployeeType}
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
                    <SelectInput
                        label="Department"
                        name="department"
                        options={Department}
                        placeholder="Choose Department"
                        error={errors.department}
                        value={formData.department}
                        handleChange={handleChange}
                        required
                    />
                </Col>
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <SelectInput
                        label="Designation"
                        name="designation"
                        options={Designation}
                        placeholder="Choose Designation"
                        error={errors.designation}
                        value={formData.designation}
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
                        options={EmploymentType}
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
                        options={WorkLocation}
                        placeholder="Work Location"
                        error={errors.workLocation}
                        value={formData.workLocation}
                        handleChange={handleChange}
                        required
                    />
                </Col>
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <UploadInputField
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
            <CustomModalConfirmDialog
                show={modalShow}
                onHide={handleClearClick}
                title="Delete Employee"
                size="md"
                subtitle='This action cannot be undone.'
                className='ConfirmDialogModal delete'
                showSubmitButton={true}
                showCancelButton={true}
                bodyContent={
                    <>
                        <div className='ConfirmContainer'>
                            <div className='ConfirmIcon'>
                                <img src={Images.ConfirmDelete} alt="Delete" />
                            </div>
                            {employeeToDelete && (
                                <div className='ConfirmContent'>
                                    <h5>Delete Employee</h5>
                                    <p>Are you sure you want to delete this employee <span>{`${employeeToDelete.firstName} ${employeeToDelete.lastName}`}</span>? This action cannot be undo.</p>
                                </div>
                            )}
                        </div>
                    </>
                }
                onSubmit={handleDeleteEmployee}
                footerButtonSubmit="Delete"
                footerButtonCancel="Cancel"
                footerButtonSubmitClass="modal_danger_btn"
                footerButtonCancelClass="modal_primary_border_btn"
            />
        </>
    )
};

export default AddEmployee
