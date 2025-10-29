import React, { useEffect, useState } from "react";
import {
    CardForm,
    PrimaryGird,
    OffCanvas,
    InputField,
    SelectInput,
    CustomToast,
    CustomModalConfirmDialog,
} from "../../pages/Props.jsx";
import { useLoginUser } from "../../context/LoginUserContext.jsx";
import Images from "../../pages/Images.jsx";
import ComboDate from '../../data/Combo.json';
import Loader from "../Common/Loader.jsx";
import { HolidayListValidateField, LeaveReportValidateField } from "../Validations/Validate.jsx";
import { createOrUpdateHoliday, deleteHoliday, getHolidays } from '../../api/index.js';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, ToastContainer, Tab, Tabs, Button, Table } from 'react-bootstrap';

// Bootstrap imports

const ManageHolidaysAndLeave = () => {

    const [RestrictedHoliday, setRestrictedHoliday] = useState(ComboDate.RestrictedHoliday);

    const { loginUser } = useLoginUser();
    const [toastList, setToastList] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    /** ---------- HOLIDAY STATES ---------- **/
    const [holidayList, setHolidayList] = useState([]);
    const [holidayForm, setHolidayForm] = useState({
        //_id: "",
        holidayname: "",
        holidaydate: "",
        holidayday: "",
        restrictedHoliday: "",
        description: "",
    });
    const [holidayErrors, setHolidayErrors] = useState({});
    const [editingHoliday, setEditingHoliday] = useState(null);
    const [showHolidayCanvas, setShowHolidayCanvas] = useState(false);
    const [showHolidayModal, setShowHolidayModal] = useState(false);
    const [holidayToDelete, setHolidayToDelete] = useState(null);
    const [deleteHolidayIndex, setDeleteHolidayIndex] = useState(null);

    const handleHolidayClearClick = () => {
        setShowHolidayModal(false);
        setHolidayToDelete(null); // If you’re using employeeToDelete state
    };

    const validateHolidayForm = () => {
        const newErrors = {};
        Object.keys(holidayForm).forEach((field) => {
            const error = HolidayListValidateField(field, holidayForm[field]);
            if (error) newErrors[field] = error;
        });
        setHolidayErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleHolidayChange = (e) => {
        const { name, value } = e.target;
        setHolidayForm((p) => ({ ...p, [name]: value }));
        const error = HolidayListValidateField(name, value);
        setHolidayErrors((prev) => ({ ...prev, [name]: error }));
    };

    const resetHolidayForm = () => {
        setHolidayForm({
            _id: "",
            holidayname: "",
            holidaydate: "",
            holidayday: "",
            restrictedHoliday: "",
            description: "",
        });
        setHolidayErrors({});
        setEditingHoliday(null);
    };

    const handleHolidaySubmit = (e) => {
        e.preventDefault();
        if (!validateHolidayForm()) return;

        const newHoliday = { ...holidayForm };
        if (editingHoliday !== null) {
            setHolidayList((prev) =>
                prev.map((item, i) => (i === editingHoliday ? newHoliday : item))
            );
        } else {
            setHolidayList((prev) => [...prev, newHoliday]);
        }

        setToastList((prev) => [
            ...prev,
            {
                title: "Success",
                message: editingHoliday !== null ? "Holiday updated" : "Holiday added",
                type: "success",
            },
        ]);

        setHolidayForm({
            //_id: "",
            holidayname: "",
            holidaydate: "",
            holidayday: "",
            description: "",
        });
        setEditingHoliday(null);
        setShowHolidayCanvas(false);
    };

    const handleHolidaySaveAll = async () => {
        try {
            setSubmitting(true);

            if (holidayList.length === 0) {
                setToastList((prev) => [
                    ...prev,
                    { title: "Info", message: "No holiday records to save.", type: "info" },
                ]);
                return;
            }

            for (const h of holidayList) {
                // validate fields before API call
                if (!h.holidayname || !h.holidaydate) {
                    setToastList((prev) => [
                        ...prev,
                        { title: "Error", message: "Holiday name and date are required.", type: "error" },
                    ]);
                    return;
                }

                await createOrUpdateHoliday(h, loginUser.token);
            }

            setToastList((prev) => [
                ...prev,
                { title: "Success", message: "All holidays saved successfully!", type: "success" },
            ]);

        } catch (error) {
            console.error("Error saving holidays:", error);
            setToastList((prev) => [
                ...prev,
                {
                    title: "Error",
                    message:
                        error?.response?.data?.message ||
                        "Failed to save holidays. Please check the API request.",
                    type: "error",
                },
            ]);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteHoliday = async () => {
        const holiday = holidayList[deleteHolidayIndex];
        setHolidayList(prev => prev.filter((_, i) => i !== deleteHolidayIndex));
        setDeleteHolidayIndex(null);

        if (holiday._id) {
            try {
                await deleteHoliday(holiday._id, loginUser.token);
                setToastList(prev => [
                    ...prev,
                    {
                        title: holiday.holidayname,
                        message: 'Holiday deleted successfully',
                        type: 'success',
                    },
                ]);
            } catch (error) {
                console.error("Error deleting holiday:", error);
                setToastList(prev => [
                    ...prev,
                    {
                        title: holiday.holidayname,
                        message: 'Failed to delete holiday',
                        type: 'error',
                    },
                ]);
            }
        }
    };

    const fetchHolidays = async () => {
        try {
            const response = await getHolidays(loginUser.token); // <-- use your actual API here
            if (!response || !response.data) {
                console.log("No holiday data found");
                return;
            }
            setHolidayList(response.data.holidays || []);
        } catch (error) {
            console.error("Error fetching holidays:", error);
            setToastList((prev) => [
                ...prev,
                { title: "Error", message: "Failed to fetch holiday data.", type: "error" },
            ]);
        }
    };

    const handleHolidayEdit = (index) => {
        const holiday = holidayList[index];
        if (!holiday) return;

        setHolidayForm({
            _id: holiday._id || "",
            holidayname: holiday.holidayname || "",
            holidaydate: holiday.holidaydate || "",
            holidayday: holiday.holidayday || "",
            description: holiday.description || "",
        });

        setEditingHoliday(index);
        setShowHolidayCanvas(true); // Open the OffCanvas for editing
    };

    

    /** ---------- LEAVE REPORT STATES ---------- **/
    const [leaveList, setLeaveList] = useState([]);
    const [leaveForm, setLeaveForm] = useState({
        // _id: "",
        leaveType: "",
        leaveCount: "",
        description: "",
    });
    const [leaveErrors, setLeaveErrors] = useState({});
    const [editingLeave, setEditingLeave] = useState(null);
    const [showLeaveCanvas, setShowLeaveCanvas] = useState(false);
    const [showLeaveModal, setShowLeaveModal] = useState(false);
    const [leaveToDelete, setLeaveToDelete] = useState(null);
    const [deleteLeaveIndex, setDeleteLeaveIndex] = useState(null);

    /** ---------- TOAST ---------- **/
    const handleToastClose = (index) =>
        setToastList((prev) => prev.filter((_, i) => i !== index));

    const validateLeaveForm = () => {
        const newErrors = {};
        Object.keys(leaveForm).forEach((field) => {
            const error = LeaveReportValidateField(field, leaveForm[field]);
            if (error) newErrors[field] = error;
        });
        setLeaveErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLeaveChange = (e) => {
        const { name, value } = e.target;
        setLeaveForm((p) => ({ ...p, [name]: value }));
        const error = LeaveReportValidateField(name, value);
        setLeaveErrors((prev) => ({ ...prev, [name]: error }));
    };

    const resetLeaveForm = () => {
        setLeaveForm({
            _id: "",
            leaveType: "",
            leaveCount: "",
            description: "",
        });
        setLeaveErrors({});
        setEditingLeave(null);
    };

    const handleLeaveSubmit = (e) => {
        e.preventDefault();
        if (!validateLeaveForm()) return;

        const newLeave = { ...leaveForm };
        if (editingLeave !== null) {
            setLeaveList((prev) =>
                prev.map((item, i) => (i === editingLeave ? newLeave : item))
            );
        } else {
            setLeaveList((prev) => [...prev, newLeave]);
        }

        setToastList((prev) => [
            ...prev,
            {
                title: "Success",
                message: editingLeave !== null ? "Leave updated" : "Leave added Successfully",
                type: "success",
            },
        ]);

        setLeaveForm({
            // _id: "",
            leaveType: "",
            leaveCount: "",
            description: "",
        });
        setEditingLeave(null);
        setShowLeaveCanvas(false);
    };

    const handleDeleteLeave = () => {
        setLeaveList((prev) => prev.filter((_, i) => i !== deleteLeaveIndex));
        setShowLeaveModal(false);
        setToastList((prev) => [
            ...prev,
            { title: "Deleted", message: "Leave deleted", type: "success" },
        ]);
    };

    const handleLeaveSaveAll = async () => {
        try {
            setSubmitting(true);

            if (leaveList.length === 0) {
                setToastList((prev) => [
                    ...prev,
                    { title: "Info", message: "No leave records to save.", type: "info" },
                ]);
                return;
            }

            const apiData = {
                leaves: leaveList.map(l => ({
                    //_id: l._id || "",
                    leaveType: l.leaveType,
                    leaveCount: l.leaveCount,
                    description: l.description,
                })),
            };

            await createOrUpdateHoliday(apiData, loginUser.token); // Replace with actual Leave API if available

            setToastList((prev) => [
                ...prev,
                { title: "Success", message: "Leave report saved successfully!", type: "success" },
            ]);

        } catch (error) {
            console.error("Error saving leaves:", error);
            setToastList((prev) => [
                ...prev,
                { title: "Error", message: "Failed to save leave data.", type: "error" },
            ]);
        } finally {
            setSubmitting(false);
        }
    };

    // ---------- FETCH HOLIDAY AND LEAVE DATA ----------
    useEffect(() => {
        fetchHolidays();
        //fetchLeaves();
    }, [loginUser.token]);

    // Fetch leaves from DB
    // const fetchLeaves = async () => {
    //     try {
    //         const response = await getLeaveDetails(loginUser.token); // <-- use your actual API here
    //         if (!response || !response.data) {
    //             console.log("No leave data found");
    //             return;
    //         }
    //         setLeaveList(response.data.leaves || []);
    //     } catch (error) {
    //         console.error("Error fetching leaves:", error);
    //         setToastList((prev) => [
    //             ...prev,
    //             { title: "Error", message: "Failed to fetch leave data.", type: "error" },
    //         ]);
    //     }
    // };

    /** ---------- MAIN RETURN ---------- **/
    return (
        <>
            {submitting ? (
                <Loader />
            ) : (
                <Container fluid className="manage_holiday">
                    <Row>
                        <Col md={12} lg={12} xl={12} xxl={12}>
                            <Tabs defaultActiveKey="holiday" transition={false} id="noanim-tab-example" className="Secondary_tab mb-3">
                                <Tab eventKey="holiday" title="Holiday List">
                                    <CardForm
                                        onSubmit={handleHolidaySaveAll}
                                        footerButtonSubmit="Save Holiday"
                                        footerButtonSubmitClass="primary_form_btn btn_h_35"
                                    >
                                        <Col md={12} lg={12} xl={12} xxl={12}>
                                            <PrimaryGird
                                                cardTitle="Manage Holidays"
                                                buttonText="Add Holiday"
                                                showAddButton={true}
                                                showFilterButton={false}
                                                showDeleteButton={false}
                                                showFooter={false}
                                                onButtonClick={() => setShowHolidayCanvas(true)}
                                                tableHeaders={["Name", "Date", "Day", "Restricted Holiday", "Description", "Actions"]}
                                            >
                                                {holidayList.length > 0 ? (
                                                    holidayList.map((h, i) => (
                                                        <tr key={i}>
                                                            <td>{h.holidayname}</td>
                                                            <td>{h.holidaydate}</td>
                                                            <td>{h.holidayday}</td>
                                                            <td>{h.restricted ? "Yes" : "No"}</td>
                                                            <td>{h.description}</td>
                                                            <td className="table_action">
                                                                <Button
                                                                    className="btn_action"
                                                                    onClick={() => handleHolidayEdit(i)}
                                                                >
                                                                    <img src={Images.Edit} alt="edit" />
                                                                </Button>
                                                                <Button className="btn_action"
                                                                    onClick={() => {
                                                                        setHolidayToDelete(h);
                                                                        setDeleteHolidayIndex(i);
                                                                        setShowHolidayModal(true);
                                                                    }}
                                                                >
                                                                    <img src={Images.Delete} alt="delete" />
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="5" className="text-center">
                                                            No holidays added yet
                                                        </td>
                                                    </tr>
                                                )}
                                            </PrimaryGird>
                                        </Col>
                                    </CardForm>
                                </Tab>
                                <Tab eventKey="leave" title="Leave Report">
                                    <CardForm
                                        onSubmit={handleLeaveSaveAll}
                                        footerButtonSubmit="Save Leave"
                                        footerButtonSubmitClass="primary_form_btn btn_h_35"
                                    >
                                        <Col md={12} lg={12} xl={12} xxl={12}>
                                            <PrimaryGird
                                                cardTitle="Leave Report"
                                                buttonText="Add Leave"
                                                showAddButton={true}
                                                showFilterButton={false}
                                                showDeleteButton={false}
                                                showFooter={false}
                                                onButtonClick={() => setShowLeaveCanvas(true)}
                                                tableHeaders={[
                                                    "Leave Type",
                                                    "Leave Count",
                                                    "Description",
                                                    "Actions",
                                                ]}
                                            >
                                                {leaveList.length > 0 ? (
                                                    leaveList.map((l, i) => (
                                                        <tr key={i}>
                                                            <td>{l.leaveType}</td>
                                                            <td>{l.leaveCount}</td>
                                                            <td>{l.description}</td>
                                                            <td className="table_action">
                                                                <Button
                                                                    className="btn_action"
                                                                    onClick={() => {
                                                                        setLeaveForm(l);
                                                                        setEditingLeave(i);
                                                                        setShowLeaveCanvas(true);
                                                                    }}
                                                                >
                                                                    <img src={Images.Edit} alt="edit" />
                                                                </Button>
                                                                <Button
                                                                    className="btn_action"
                                                                    onClick={() => {
                                                                        setDeleteLeaveIndex(i);
                                                                        setShowLeaveModal(true);
                                                                    }}
                                                                >
                                                                    <img src={Images.Delete} alt="delete" />
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="6" className="text-center">
                                                            No leave report data
                                                        </td>
                                                    </tr>
                                                )}
                                            </PrimaryGird>
                                        </Col>
                                    </CardForm>
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Container>
            )}

            {/* ---------- Holiday OffCanvas ---------- */}
            <OffCanvas
                show={showHolidayCanvas}
                placement="end"
                onSubmit={handleHolidaySubmit}
                onHide={() => {
                    setShowHolidayCanvas(false);
                    resetHolidayForm();
                }}
                title={editingHoliday !== null ? "Edit Holiday" : "Add Holiday"}
                subtitle={editingHoliday !== null ? "Update the details of Holiday List." : "Add your Holiday List Here."}
                className='PrimaryCanvasModal'
                name={editingHoliday !== null ? "Update Holiday List" : "Add Holiday List"}
                footerButtonSubmit={editingHoliday !== null ? "Update Holiday List" : "Add Holiday List"}
                footerButtonCancel="Cancel"
                footerButtonSubmitClass="modal_primary_btn w-100"
                footerButtonCancelClass="modal_primary_border_btn w-100"
            >
                <Col md={6}>
                    <InputField
                        label="Holiday Name"
                        name="holidayname"
                        value={holidayForm.holidayname}
                        handleChange={handleHolidayChange}
                        error={holidayErrors.holidayname}
                        required
                    />
                </Col>
                <Col md={6}>
                    <InputField
                        label="Date"
                        type="date"
                        name="holidaydate"
                        value={holidayForm.holidaydate}
                        handleChange={handleHolidayChange}
                        error={holidayErrors.holidaydate}
                        required
                    />
                </Col>
                <Col md={6}>
                    <InputField
                        label="Day"
                        name="holidayday"
                        value={holidayForm.holidayday}
                        handleChange={handleHolidayChange}
                        error={holidayErrors.holidayday}
                        required
                    />
                </Col>
                <Col md={6}>
                    <SelectInput
                        label="Is this a Restricted Holiday?"
                        name="restrictedHoliday"
                        options={RestrictedHoliday}
                        placeholder="Select an option"
                        error={holidayErrors.restrictedHoliday}
                        value={holidayForm.restrictedHoliday}
                        handleChange={handleHolidayChange}
                        required
                    />
                </Col>
                <Col md={12}>
                    <InputField
                        label="Description"
                        name="description"
                        value={holidayForm.description}
                        handleChange={handleHolidayChange}
                        error={holidayErrors.description}
                        required
                    />
                </Col>
            </OffCanvas>

            {/* ---------- Leave OffCanvas ---------- */}
            <OffCanvas
                show={showLeaveCanvas}
                placement="end"
                onSubmit={handleLeaveSubmit}
                onHide={() => {
                    setShowLeaveCanvas(false);
                    resetLeaveForm();
                }}
                title={editingLeave !== null ? "Edit Leave" : "Add Leave"}
                subtitle={editingLeave !== null ? "Update the details of Leave Report." : "Add your Leave Report Here."}
                className='PrimaryCanvasModal'
                name={editingLeave !== null ? "Update Leave Report" : "Add Leave Report"}
                footerButtonSubmit={editingLeave !== null ? "Update Leave" : "Add Leave"}
                footerButtonCancel="Cancel"
                footerButtonSubmitClass="modal_primary_btn w-100"
                footerButtonCancelClass="modal_primary_border_btn w-100"
            >
                <Col md={6}>
                    <InputField
                        label="Leave Type"
                        name="leaveType"
                        value={leaveForm.leaveType}
                        handleChange={handleLeaveChange}
                        error={leaveErrors.leaveType}
                        required
                    />
                </Col>
                <Col md={6}>
                    <InputField
                        label="Leave Count"
                        type="text"
                        name="leaveCount"
                        value={leaveForm.leaveCount}
                        handleChange={handleLeaveChange}
                        error={leaveErrors.leaveCount}
                        required
                    />
                </Col>
                <Col md={12}>
                    <InputField
                        label="Description"
                        name="description"
                        value={leaveForm.description}
                        handleChange={handleLeaveChange}
                        error={leaveErrors.description}
                        required
                    />
                </Col>
            </OffCanvas>

            {/* ---------- Delete Confirmation ---------- */}
            <CustomModalConfirmDialog
                show={showHolidayModal}
                onHide={handleHolidayClearClick}
                title="Delete Holiday"
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
                                    <p>Are you sure you want to delete this Holiday <span>{`${holidayToDelete.holidayname}`}</span>? This action cannot be undo.</p>
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
            <CustomModalConfirmDialog
                show={showLeaveModal}
                onHide={() => setShowLeaveModal(false)}
                title="Delete Leave"
                bodyContent={<p>Are you sure you want to delete this leave record?</p>}
                onSubmit={handleDeleteLeave}
                footerButtonSubmit="Delete"
                footerButtonCancel="Cancel"
                footerButtonSubmitClass="modal_danger_btn"
            />

            {/* ---------- Toasts ---------- */}
            <ToastContainer position="top-end" className="p-3">
                {toastList.map((toast, i) => (
                    <CustomToast
                        key={i}
                        title={toast.title}
                        message={toast.message}
                        type={toast.type}
                        onClose={() => handleToastClose(i)}
                    />
                ))}
            </ToastContainer>
        </>
    );
};

export default ManageHolidaysAndLeave;
