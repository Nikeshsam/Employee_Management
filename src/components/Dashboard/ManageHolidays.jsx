import React, { useState, useEffect } from 'react';
import { CardForm, CustomToast, CustomModalConfirmDialog, PrimaryGird, InputField, OffCanvas } from '../../pages/Props.jsx';
import { useLoginUser } from '../../context/LoginUserContext.jsx';
import Images from '../../pages/Images.jsx';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Form, Row, Col, ToastContainer, Button } from 'react-bootstrap';
import { use } from 'react';

// Bootstrap imports

const ManageHolidays = () => {

    //const [manageHolidays, setManageHolidays] = useState([]);
    const [showWorkBenefitsCanvas, setShowBenefitsCanvas] = useState(false);
    const handleShowBenefitsCanvas = () => setShowBenefitsCanvas(true);
    const handleCloseBenefitsCanvas = () => setShowBenefitsCanvas(false);

    const [submitting, setSubmitting] = useState(false);

    const { loginUser } = useLoginUser();
    const [toastList, setToastList] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [holidayToDelete, setHolidayToDelete] = useState(null);
    const [indexToDelete, setIndexToDelete] = useState(null);

    const handleToastClose = (index) => {
        const updatedList = toastList.filter((_, i) => i !== index);
        setToastList(updatedList);
    };

    const handleClearClick = () => {
        setModalShow(false);
        setHolidayToDelete(null); // If you’re using employeeToDelete state
    };

    // FormData Validations

    const [educationFormData, setEducationFormData] = useState({
        holidayname: '',
        holidaydate: '',
        holidayday: '',
        description: '',
    });

    // Error useState

    const [errors, setErrors] = useState({});

    //  Validate Form with Error

    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach((field) => {
            const error = benefitsValidateField(field, formData[field]);
            if (error) newErrors[field] = error;
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    //  Handle Submit

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const addBenefits = {
                _id: formData._id || '',   // keep id if exists
                holidayname: formData.holidayname,
                holidaydate: formData.holidaydate,
                holidayday: formData.holidayday,
                description: formData.description,
            };

            if (editingIndex !== null) {
                // Update the item at editingIndex
                setEmpBenefits((prev) =>
                    prev.map((member, idx) => (idx === editingIndex ? addBenefits : member))
                );
            } else {
                // Add new benefit
                setEmpBenefits((prev) => [...prev, addBenefits]);
            }

            setToastList((prev) => [
                ...prev,
                {
                    title: "Success",
                    message: editingIndex !== null
                        ? "Benefits updated successfully!"
                        : "Benefits added successfully!",
                    type: "success"
                },
            ]);

            // Reset formData completely
            setFormData({
                _id: '', // reset _id also
                holidayname: '',
                holidaydate: '',
                holidayday: '',
                description: '',
            });

            setEditingIndex(null);
            setShowBenefitsCanvas(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        const error = benefitsValidateField(name, value);
        setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
    };

    const handleDeleteHoliday = async () => {
        const member = empBenefits[indexToDelete];
        setEmpBenefits((prev) => prev.filter((_, i) => i !== indexToDelete));

        if (member._id) {
            try {
                const response = await deleteEmployeeBenefit(member._id, loginUser.token);
                setToastList(prev => [
                    ...prev,
                    {
                        title: "Success",
                        message: 'Benefit deleted successfully',
                        type: "success",
                    }
                ]);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        } else {
            // Toast for local-only delete
            setToastList(prev => [
                ...prev,
                {
                    title: "Success",
                    message: 'Benefit deleted locally',
                    type: "success",
                }
            ]);
        }

        // ✅ Always close modal and reset states after delete
        setModalShow(false);
        setBenefitToDelete(null);
        setIndexToDelete(null);
    };

    const manageHolidays = [
        {
            id: 1,
            holidayname: "New Year",
            holidaydate: "01 Jan",
            holidayday: "Wednesday",
            description: "Celebration of the start of the new year.",
        },
        {
            id: 1,
            holidayname: "Pongal",
            holidaydate: "14 Jan",
            holidayday: "Tuesday",
            description: "Harvest festival of Tamil Nadu.",
        },
        {
            id: 1,
            holidayname: "Republic Day",
            holidaydate: "26 Jan",
            holidayday: "Sunday",
            description: "India’s Constitution Day.",
        },
        {
            id: 1,
            holidayname: "Independence Day",
            holidaydate: "15 Aug",
            holidayday: "Friday",
            description: "Celebrates India’s freedom.",
        },
        {
            id: 1,
            holidayname: "Christmas",
            holidaydate: "25 Dec",
            holidayday: "Thursday",
            description: "Festival marking the birth of Jesus Christ.",
        }
    ]

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md={12} lg={12} xl={12} xxl={12}>
                        <PrimaryGird
                            cardTitle="Holiday List"
                            buttonText="Add Holiday"
                            showAddButton={true}
                            showFilterButton={false}
                            showDeleteButton={false}
                            showFooter={false}
                            onButtonClick={handleShowBenefitsCanvas}
                            tableHeaders={['Holiday Name', 'Holiday Date', 'Holiday day', 'description', 'Actions']}
                        >
                            {submitting ? (
                                <Loader />
                            ) : (
                                manageHolidays.length > 0 ? (
                                    manageHolidays.map((manageHoliday, index) => {
                                        return (
                                            <tr key={manageHoliday._id || index}>
                                                <td>{manageHoliday.holidayname}</td>
                                                <td>{manageHoliday.holidaydate}</td>
                                                <td>{manageHoliday.holidayday}</td>
                                                <td>{manageHoliday.description}</td>
                                                <td className='table_action'>
                                                    <Button
                                                        className="btn_action"
                                                        onClick={() => handleEdit(index)}
                                                    >
                                                        <img src={Images.Edit} alt="" />
                                                    </Button>
                                                    <Button className="btn_action"
                                                        onClick={() => {
                                                            setHolidayToDelete(manageHoliday);
                                                            setIndexToDelete(index);
                                                            setModalShow(true);
                                                        }}
                                                    >
                                                        <img src={Images.Delete} alt="" />
                                                    </Button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="8" style={{ textAlign: "center" }}>
                                            No Holiday List Added
                                        </td>
                                    </tr>
                                )
                            )}
                        </PrimaryGird>
                    </Col>
                </Row>
            </Container>

            <OffCanvas
                show={showWorkBenefitsCanvas}
                placement="end"
                //onSubmit={handleEducationSubmit}
                onHide={handleCloseBenefitsCanvas}
                //title={educationEditingIndex !== null ? "Update Education Details" : "Add Education Details"}
                title="Add Holidays List"
                //subtitle={educationEditingIndex !== null ? "Update the details of your Education." : "Start your 7-day free trial."}
                subtitle="Start your 7-day free trial."
                className='PrimaryCanvasModal'
                //name={educationEditingIndex !== null ? "Update Education Details" : "Add Education Details"}
                name="Add Education Details"
                //footerButtonSubmit={educationEditingIndex !== null ? "Update Education Details" : "Add Education Details"}
                footerButtonSubmit="Add Holidays List"
                footerButtonCancel="Cancel"
                footerButtonSubmitClass="modal_primary_btn w-100"
                footerButtonCancelClass="modal_primary_border_btn w-100"
            >
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <InputField
                        label="Holiday Name"
                        type="text"
                        placeholder="Enter your Degree"
                        controlId="degree"
                        name="degree"
                        //error={educationErrors.degree}
                        value={educationFormData.holidayname}
                        handleChange={handleChange}
                        required
                    />
                </Col>
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <InputField
                        label="Holiday Date"
                        type="date"
                        placeholder="Enter your Major"
                        controlId="major"
                        name="major"
                        //error={educationErrors.major}
                        value={educationFormData.holidaydate}
                        handleChange={handleChange}
                        required
                    />
                </Col>
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <InputField
                        label="Holiday Day"
                        type="text"
                        placeholder="Enter your University"
                        controlId="university"
                        name="university"
                        //error={educationErrors.university}
                        value={educationFormData.holidayday}
                        handleChange={handleChange}
                        required
                    />
                </Col>
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <InputField
                        label="description"
                        type="type"
                        placeholder="Enter your Year"
                        controlId="year"
                        name="year"
                        //error={educationErrors.year}
                        value={educationFormData.description}
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
                        type={toast.type}
                        onClose={() => handleToastClose(index)} // If your component supports this
                    />
                ))}
            </ToastContainer>
            <CustomModalConfirmDialog
                show={modalShow}
                onHide={handleClearClick}
                title="Delete Experience"
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
                            {holidayToDelete && (
                                <div className='ConfirmContent'>
                                    <h5>Delete Holiday</h5>
                                    <p>Are you sure you want to delete this Holiday <span>{`${holidayToDelete.name}`}</span>? This action cannot be undo.</p>
                                </div>
                            )}
                        </div>
                    </>
                }
                onSubmit={handleDeleteHoliday}
                footerButtonSubmit="Delete"
                footerButtonCancel="Cancel"
                footerButtonSubmitClass="modal_danger_btn"
                footerButtonCancelClass="modal_primary_border_btn"
            />
        </>
    )
}

export default ManageHolidays
