import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Combobox from "react-widgets/Combobox";
import "react-widgets/styles.css";
import Images from '../../pages/Images.jsx';
import { CustomToast, EmployeeGird, InputField, SelectInput, CustomModalConfirmDialog, OffCanvas, UploadInputField } from '../../pages/Props.jsx';
import { useLoginUser } from '../../context/LoginUserContext.jsx';
import { addEmployeeValidateField } from '../Validations/Validate.jsx';
import { getEmployees, addEmployee, editEmployee } from '../../api/index.js';
import { deleteEmployee } from '../../api/index.js';
import { exportEmployeesExcel } from '../../api/index.js';
import Loader from '../Common/Loader.jsx';
import ComboDate from '../../data/Combo.json';


// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Form, Row, Col, ToastContainer, Button } from 'react-bootstrap';

// Bootstrap imports

const AddEmployee = () => {

    const [modalShow, setModalShow] = useState(false);

    const [submitting, setSubmitting] = useState(false);

    const [isEditMode, setIsEditMode] = useState(false);
    const [editingEmployeeId, setEditingEmployeeId] = useState(null);

    const { loginUser } = useLoginUser();

    const [employeeData, setEmployeeData] = useState([]);

    const [searchTerm, setSearchTerm] = useState(''); // ✅ string

    const [employeeToDelete, setEmployeeToDelete] = useState(null);

    const [showAddEmployeeCanvas, setShowAddEmployeeCanvas] = useState(false);
    const handleShowAddEmployeeCanvas = () => setShowAddEmployeeCanvas(true);
    //const handleCloseAddEmployeeCanvas = () => setShowAddEmployeeCanvas(false);

    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 0,
        rowsPerPage: 5,
        totalRecords: 0
    });

    const [filters, setFilters] = useState({
        search: '',
        position: '',
        department: '',
        status: '',
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

        console.log("Submitting form");
        console.log("Edit Mode:", isEditMode);
        console.log("Editing ID:", editingEmployeeId);

        if (validateForm()) {
            setSubmitting(true); // Start loader

            try {
                let response;
                if (isEditMode) {
                    console.log(formData)
                    try {
                        await editEmployee(formData, loginUser.token, editingEmployeeId);
                        handleCloseAddEmployeeCanvas(); // Close the canvas
                        setIsEditMode(false);           // Reset edit mode
                        setEditingEmployeeId(null);     // Clear selected ID
                    } catch (error) {
                        toast.error("Failed to update employee");
                    }
                } else {
                    try {
                        await addEmployee(formData, loginUser.token);
                        handleCloseAddEmployeeCanvas(); // Close the canvas after add
                    } catch (error) {
                        toast.error("Failed to add employee");
                    }
                }

                setToastList(prev => [
                    ...prev,
                    {
                        title: `${formData.firstName} ${formData.lastName}`,
                        message: isEditMode ? 'Employee Updated Successfully' : 'Employee Added Successfully',
                        img: Images.SuccessCheck,
                        type: "success",
                    }
                ]);

                // Refresh employee list
                const updatedEmployees = await getEmployees('', pagination.currentPage, pagination.rowsPerPage, loginUser.token);
                setEmployeeData(updatedEmployees.data.data);

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
                setIsEditMode(false);
                setEditingEmployeeId(null);
            } catch (error) {
                console.log(error);
                setSubmitMessage(error?.response?.data?.message || 'Submission failed');
            } finally {
                setSubmitting(false); // Start loader
            }
        }
    };

    const handleEditEmployee = (emp) => {
        setIsEditMode(true);
        setEditingEmployeeId(emp._id);
        setFormData({
            employeeType: emp.employeeType || '',
            employeeId: emp.employeeId || '',
            firstName: emp.firstName || '',
            lastName: emp.lastName || '',
            email: emp.email || '',
            phoneNumber: emp.phoneNumber || '',
            designation: emp.designation || '',
            department: emp.department || '',
            joiningDate: emp.joiningDate ? emp.joiningDate.split('T')[0] : '',
            employmentType: emp.employmentType || '',
            workLocation: emp.workLocation || '',
            offerletter: '', // File cannot be pre-filled
        });
        handleShowAddEmployeeCanvas();
    };

    const handleCloseAddEmployeeCanvas = () => {
        setShowAddEmployeeCanvas(false);
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
        setIsEditMode(false);
        setEditingEmployeeId(null);
    };

    //  Handle Change

    const handleChange = (e) => {
        const { name, type, files, value } = e.target;
        if (type === 'file') {
            const fileData = files?.[0];
            if (fileData) {
                setFormData(prev => ({ ...prev, [name]: fileData }));
                setErrors(prevErrors => ({ ...prevErrors, [name]: '' })); // Clear error for file input
                return;
            } else {
                setErrors(prevErrors => ({ ...prevErrors, [name]: 'Offer Letter is required' })); // Set error for file input
                return;
            }
        }
        else {
            setFormData(prev => ({ ...prev, [name]: value }));
            const error = addEmployeeValidateField(name, value);
            setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
        }
    };

    const handlePaginationChange = (e) => {
        let { name, value } = e.target;
        if (name === 'currentPage' && value > pagination.totalPages) {
            value = pagination.totalPages;
        }
        if (name === 'rowsPerPage') {
            setPagination(prev => ({ ...prev, currentPage: 1 }));
        }
        setPagination(prev => ({ ...prev, [name]: value }));
    }

    // Insert Employee Data in Grid API Integration

    useEffect(() => {
        if (!loginUser?.token) return;

        const delayDebounce = setTimeout(() => {
            const fetchEmployees = async () => {
                try {
                    setSubmitting(true); // Start loader
                    const response = await getEmployees(
                        searchTerm,
                        pagination.currentPage,
                        pagination.rowsPerPage,
                        loginUser.token,
                        filters
                    );

                    setEmployeeData(response.data?.data || []);
                    setPagination(prev => ({
                        ...prev,
                        totalPages: response.data.totalPages || 0,
                        totalRecords: response.data.totalRecords || 0
                    }));
                } catch (error) {
                    console.error('Failed to fetch employees:', error);
                    setEmployeeData([]);
                } finally {
                    setSubmitting(false); // End loader
                }
            };

            fetchEmployees();
        }, 200); // ⏱️ Wait 500ms after typing

        return () => clearTimeout(delayDebounce); // ✅ cancel previous timer
    }, [searchTerm, pagination.currentPage, pagination.rowsPerPage, loginUser, filters]);

    // Delete Employee Function

    const handleClearClick = () => {
        setModalShow(false);
        setEmployeeToDelete(null); // If you’re using employeeToDelete state
    };

    const handleDeleteEmployee = async () => {
        try {
            setSubmitting(true); // Start loader
            await deleteEmployee(employeeToDelete._id, loginUser.token); // or emp.id depending on your DB
            setToastList(prev => [
                ...prev,
                {
                    title: `${employeeToDelete.firstName} ${employeeToDelete.lastName}`,
                    message: 'Employee deleted successfully',
                    type: "error", // success type
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
                    type: "error", // success type
                }
            ]);
        } finally {
            setSubmitting(false); // Start loader
        }
    };

    const handleDownloadExcel = async () => {
        try {
            const token = loginUser.token; // or from auth context
            console.log("Token:", token);
            const response = await exportEmployeesExcel(token);

            const blob = new Blob([response.data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Employees.xlsx');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Excel download failed:', error);
            alert('Failed to download Excel file');
        }
    };

    const navigate = useNavigate();

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
                                <Button type='button' onClick={handleDownloadExcel} className='blue_gradient_border btn_h_50'>
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
                            searchTerm={searchTerm}
                            filters={filters}
                            setFilters={setFilters}
                            setSearchTerm={setSearchTerm}
                            onButtonClick={() => console.log('Add clicked')}
                            onFilterClick={() => console.log('Filter clicked')}
                            onDeleteClick={() => console.log('Delete clicked')}
                            showAddButton={true}
                            showFilterButton={true}
                            showDeleteButton={true}
                            showFooter={true}
                            buttonClassName='secondary_btn btn_h_35 fs_13 fw_500'
                            buttonClassIcon='icon_btn'
                            tableHeaders={[<Form.Check className='CustomCheck' />, 'Employee Name', 'Job Title', 'Department', 'JoiningDate', 'Employment Type', 'Status', 'Work Location', 'Actions']}
                        >
                        {submitting ? <Loader /> : (
                            (
                                employeeData.map((emp, idx) => (
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
                                            <Button className="btn_action" onClick={() => handleEditEmployee(emp)}><img src={Images.Edit} alt="" /></Button>
                                            <Button className="btn_action" onClick={() => { setEmployeeToDelete(emp); setModalShow(true); }}><img src={Images.Delete} alt="" /></Button>
                                        </td>
                                    </tr>
                                ))
                            )
                        )}
                        </EmployeeGird>
                    </Col>
                </Row>
            </Container>

            <OffCanvas
                show={showAddEmployeeCanvas}
                placement="end"
                onSubmit={handleSubmit}
                onHide={handleCloseAddEmployeeCanvas}
                title={isEditMode ? "Edit Employee" : "Add Employee"}
                subtitle={isEditMode ? "Update employee details" : "Start your 7-day free trial."}
                name={isEditMode ? "Edit Employee" : "Add Employee"}
                footerButtonSubmit={isEditMode ? "Update Employee" : "Add Member"}
                className='PrimaryCanvasModal'
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
                        type={toast.type}
                        // img={toast.img}
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
