import React, { useState } from "react";
import {
    CardForm,
    PrimaryGird,
    OffCanvas,
    InputField,
    CustomToast,
    CustomModalConfirmDialog,
} from "../../pages/Props.jsx";
import { useLoginUser } from "../../context/LoginUserContext.jsx";
import Images from "../../pages/Images.jsx";
import Loader from "../Common/Loader.jsx";
import { HolidayListValidateField, LeaveReportValidateField } from "../Validations/Validate.jsx";

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, ToastContainer, Tab, Tabs, Button, Table } from 'react-bootstrap';

// Bootstrap imports

const ManageHolidaysAndLeave = () => {
    const { loginUser } = useLoginUser();
    const [toastList, setToastList] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    /** ---------- HOLIDAY STATES ---------- **/
    const [holidayList, setHolidayList] = useState([]);
    const [holidayForm, setHolidayForm] = useState({
        _id: "",
        holidayname: "",
        holidaydate: "",
        holidayday: "",
        description: "",
    });
    const [holidayErrors, setHolidayErrors] = useState({});
    const [editingHoliday, setEditingHoliday] = useState(null);
    const [showHolidayCanvas, setShowHolidayCanvas] = useState(false);
    const [deleteHolidayIndex, setDeleteHolidayIndex] = useState(null);
    const [showHolidayModal, setShowHolidayModal] = useState(false);

    /** ---------- LEAVE REPORT STATES ---------- **/
    const [leaveList, setLeaveList] = useState([]);
    const [leaveForm, setLeaveForm] = useState({
        _id: "",
        leaveType: "",
        leaveCount: "",
        description: "",
    });
    const [leaveErrors, setLeaveErrors] = useState({});
    const [editingLeave, setEditingLeave] = useState(null);
    const [showLeaveCanvas, setShowLeaveCanvas] = useState(false);
    const [deleteLeaveIndex, setDeleteLeaveIndex] = useState(null);
    const [showLeaveModal, setShowLeaveModal] = useState(false);

    /** ---------- TOAST ---------- **/
    const handleToastClose = (index) =>
        setToastList((prev) => prev.filter((_, i) => i !== index));

    /** ---------- VALIDATE FORM (Common Pattern) ---------- **/
    const validateHolidayForm = () => {
        const newErrors = {};
        Object.keys(holidayForm).forEach((field) => {
            const error = HolidayListValidateField(field, holidayForm[field]);
            if (error) newErrors[field] = error;
        });
        setHolidayErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateLeaveForm = () => {
        const newErrors = {};
        Object.keys(leaveForm).forEach((field) => {
            const error = LeaveReportValidateField(field, leaveForm[field]);
            if (error) newErrors[field] = error;
        });
        setLeaveErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /** ---------- HANDLE CHANGE ---------- **/
    const handleHolidayChange = (e) => {
        const { name, value } = e.target;
        setHolidayForm((p) => ({ ...p, [name]: value }));
        const error = HolidayListValidateField(name, value);
        setHolidayErrors((prev) => ({ ...prev, [name]: error }));
    };

    const handleLeaveChange = (e) => {
        const { name, value } = e.target;
        setLeaveForm((p) => ({ ...p, [name]: value }));
        const error = LeaveReportValidateField(name, value);
        setLeaveErrors((prev) => ({ ...prev, [name]: error }));
    };

    /** ---------- HOLIDAY SUBMIT ---------- **/
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
            _id: "",
            holidayname: "",
            holidaydate: "",
            holidayday: "",
            description: "",
        });
        setEditingHoliday(null);
        setShowHolidayCanvas(false);
    };

    /** ---------- LEAVE SUBMIT ---------- **/
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
            _id: "",
            employee: "",
            leaveType: "",
            fromDate: "",
            toDate: "",
            reason: "",
        });
        setEditingLeave(null);
        setShowLeaveCanvas(false);
    };

    /** ---------- DELETE ACTIONS ---------- **/
    const handleDeleteHoliday = () => {
        setHolidayList((prev) => prev.filter((_, i) => i !== deleteHolidayIndex));
        setShowHolidayModal(false);
        setToastList((prev) => [
            ...prev,
            { title: "Deleted", message: "Holiday deleted", type: "success" },
        ]);
    };

    const handleDeleteLeave = () => {
        setLeaveList((prev) => prev.filter((_, i) => i !== deleteLeaveIndex));
        setShowLeaveModal(false);
        setToastList((prev) => [
            ...prev,
            { title: "Deleted", message: "Leave deleted", type: "success" },
        ]);
    };

    /** ---------- MAIN RETURN ---------- **/
    return (
        <>
            {submitting ? (
                <Loader />
            ) : (
                <Container fluid>
                    <Row>
                        <Col md={12} lg={12} xl={12} xxl={12}>
                            <CardForm
                                //onSubmit={handleSaveAll}
                                footerButtonSubmit="Save"
                                footerButtonSubmitClass="primary_form_btn btn_h_35"
                            >
                                <Tabs defaultActiveKey="holiday" transition={false} id="noanim-tab-example" className="Secondary_tab mb-3 pe-2 ps-2">
                                    <Tab eventKey="holiday" title="Holiday List">
                                        <PrimaryGird
                                            cardTitle="Manage Holidays"
                                            buttonText="Add Holiday"
                                            showAddButton={true}
                                            showFilterButton={false}
                                            showDeleteButton={false}
                                            showFooter={false}
                                            onButtonClick={() => setShowHolidayCanvas(true)}
                                            tableHeaders={["Name", "Date", "Day", "Description", "Actions"]}
                                        >
                                            {holidayList.length > 0 ? (
                                                holidayList.map((h, i) => (
                                                    <tr key={i}>
                                                        <td>{h.holidayname}</td>
                                                        <td>{h.holidaydate}</td>
                                                        <td>{h.holidayday}</td>
                                                        <td>{h.description}</td>
                                                        <td className="table_action">
                                                            <Button
                                                                className="btn_action"
                                                                onClick={() => {
                                                                    setHolidayForm(h);
                                                                    setEditingHoliday(i);
                                                                    setShowHolidayCanvas(true);
                                                                }}
                                                            >
                                                                <img src={Images.Edit} alt="edit" />
                                                            </Button>
                                                            <Button
                                                                className="btn_action"
                                                                onClick={() => {
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
                                    </Tab>
                                    <Tab eventKey="leave" title="Leave Report">
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
                                    </Tab>
                                </Tabs>
                            </CardForm>
                        </Col>
                    </Row>
                </Container>
            )}

            {/* ---------- Holiday OffCanvas ---------- */}
            <OffCanvas
                show={showHolidayCanvas}
                placement="end"
                onSubmit={handleHolidaySubmit}
                onHide={() => setShowHolidayCanvas(false)}
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
                <Col md={12}>
                    <InputField
                        label="Description"
                        name="description"
                        value={holidayForm.description}
                        handleChange={handleHolidayChange}
                    />
                </Col>
            </OffCanvas>

            {/* ---------- Leave OffCanvas ---------- */}
            <OffCanvas
                show={showLeaveCanvas}
                placement="end"
                onSubmit={handleLeaveSubmit}
                onHide={() => setShowLeaveCanvas(false)}
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
                        type="date"
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
                    />
                </Col>
            </OffCanvas>

            {/* ---------- Delete Confirmation ---------- */}
            <CustomModalConfirmDialog
                show={showHolidayModal}
                onHide={() => setShowHolidayModal(false)}
                title="Delete Holiday"
                bodyContent={<p>Are you sure you want to delete this holiday?</p>}
                onSubmit={handleDeleteHoliday}
                footerButtonSubmit="Delete"
                footerButtonCancel="Cancel"
                footerButtonSubmitClass="modal_danger_btn"
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
