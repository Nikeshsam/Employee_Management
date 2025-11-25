// ManageHolidaysAndLeave.jsx
import React, { useEffect, useState } from "react";
import {
    CardForm,
    PrimaryGird,
    OffCanvas,
    InputField,
    SelectInput,
    CustomToast,
    RadioGroupField,
    CheckBoxGroup,
    CustomModalConfirmDialog,
} from "../../pages/Props.jsx";
import { useLoginUser } from "../../context/LoginUserContext.jsx";
import Images from "../../pages/Images.jsx";
import ComboDate from '../../data/Combo.json';
import Loader from "../Common/Loader.jsx";
import { HolidayListValidateField, LeaveReportValidateField } from "../Validations/Validate.jsx";
import {
    createOrUpdateHoliday,
    deleteHoliday,
    getHolidays,
    // below three are assumed — change names if your API differs:
    createOrUpdateLeave,
    deleteLeave,
    getLeave,
} from '../../api/index.js';

// Bootstrap imports
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, ToastContainer, Tab, Tabs, Button } from 'react-bootstrap';

const ManageHolidaysAndLeave = () => {
    const { loginUser } = useLoginUser();

    const [RestrictedHoliday] = useState(ComboDate.RestrictedHoliday);
    const [LeaveCategories] = useState(ComboDate.LeaveCategories);
    const [GenderOptions] = useState(ComboDate.GenderOptions);

    const monthlyAccrual = [
        { label: 'Yes (accrue leave monthly)', value: 'accrual' },
        { label: 'No (do not accrue leave monthly)', value: 'no-accrual' },
    ];

    const carryForwardAllowed = [
        { label: 'Yes (allow carry forward)', value: 'allow' },
        { label: 'No (do not allow carry forward)', value: 'not-allow' },
    ];

    const [toastList, setToastList] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    /** ---------- HOLIDAY STATES ---------- **/
    const [holidayList, setHolidayList] = useState([]);
    const [holidayForm, setHolidayForm] = useState({
        _id: "",
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

    // Save single holiday immediately (create or update)
    const handleHolidaySubmit = async (e) => {
        e.preventDefault();
        if (!validateHolidayForm()) return;

        try {
            setSubmitting(true);

            // Ensure payload shape matches your backend
            const payload = {
                ...holidayForm,
                restricted: holidayForm.restrictedHoliday === "true" || holidayForm.restrictedHoliday === true,
            };

            const resp = await createOrUpdateHoliday(payload, loginUser.token);
            // Optionally you can use resp to update local state; for reliability re-fetch
            await fetchHolidays();

            setToastList((prev) => [
                ...prev,
                {
                    title: "Success",
                    message: editingHoliday !== null ? "Holiday updated" : "Holiday added",
                    type: "success",
                },
            ]);

            resetHolidayForm();
            setShowHolidayCanvas(false);
        } catch (error) {
            console.error("Error saving holiday:", error);
            setToastList((prev) => [
                ...prev,
                {
                    title: "Error",
                    message: error?.response?.data?.message || "Failed to save holiday.",
                    type: "error",
                },
            ]);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteHoliday = async () => {
        // Close modal first
        setShowHolidayModal(false);

        const idx = deleteHolidayIndex;
        const holiday = holidayList[idx];
        // Optimistic UI removal
        setHolidayList(prev => prev.filter((_, i) => i !== idx));
        setDeleteHolidayIndex(null);

        if (holiday && holiday._id) {
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
                // fallback: re-fetch to get correct state
                fetchHolidays();
            }
        }
    };

    const fetchHolidays = async () => {
        try {
            const response = await getHolidays(loginUser.token);
            if (!response || !response.data) {
                setHolidayList([]);
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
            restrictedHoliday: holiday.restricted ? "true" : "false",
            description: holiday.description || "",
        });

        setEditingHoliday(index);
        setShowHolidayCanvas(true);
    };

    /** ---------- LEAVE STATES ---------- **/
    const [leaveList, setLeaveList] = useState([]);
    const [leaveForm, setLeaveForm] = useState({
        _id: "",
        leaveName: "",
        leaveCategory: "",
        description: "",
        genderEligibility: "",
        monthlyAccrual: "",
        carryForwardAllowed: "",
        maxCarryForward: "",
        allowHalfDay: false,
        validFrom: "",
        validTo: "",
    });
    const [leaveErrors, setLeaveErrors] = useState({});
    const [editingLeave, setEditingLeave] = useState(null);
    const [showLeaveCanvas, setShowLeaveCanvas] = useState(false);
    const [showLeaveModal, setShowLeaveModal] = useState(false);
    const [leaveToDelete, setLeaveToDelete] = useState(null);
    const [deleteLeaveIndex, setDeleteLeaveIndex] = useState(null);

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
        const { name, value, type, checked } = e.target || {};
        const finalValue = type === "checkbox" ? checked : value;
        setLeaveForm((p) => ({ ...p, [name]: finalValue }));
        const error = LeaveReportValidateField(name, finalValue);
        setLeaveErrors((prev) => ({ ...prev, [name]: error }));
    };

    const resetLeaveForm = () => {
        setLeaveForm({
            _id: "",
            leaveName: "",
            leaveCategory: "",
            description: "",
            genderEligibility: "",
            monthlyAccrual: "",
            carryForwardAllowed: "",
            maxCarryForward: "",
            allowHalfDay: false,
            validFrom: "",
            validTo: "",
        });
        setLeaveErrors({});
        setEditingLeave(null);
    };

    // Save single leave immediately (create or update)
    const handleLeaveSubmit = async (e) => {
        e.preventDefault();
        if (!validateLeaveForm()) return;

        try {
            setSubmitting(true);

            const payload = {
                ...leaveForm,
                allowHalfDay: Boolean(leaveForm.allowHalfDay),
            };

            // call leave API (assumed name)
            await createOrUpdateLeave(payload, loginUser.token);

            setToastList((prev) => [
                ...prev,
                {
                    title: "Success",
                    message: editingLeave !== null ? "Leave updated" : "Leave added",
                    type: "success",
                },
            ]);

            await fetchLeaves();

            resetLeaveForm();
            setShowLeaveCanvas(false);
        } catch (error) {
            console.error("Error saving leave:", error);
            setToastList((prev) => [
                ...prev,
                { title: "Error", message: error?.response?.data?.message || "Failed to save leave data.", type: "error" },
            ]);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteLeave = async () => {
        setShowLeaveModal(false);

        const idx = deleteLeaveIndex;
        const leave = leaveList[idx];
        setLeaveList(prev => prev.filter((_, i) => i !== idx));
        setDeleteLeaveIndex(null);

        if (leave && leave._id) {
            try {
                await deleteLeave(leave._id, loginUser.token);
                setToastList(prev => [
                    ...prev,
                    { title: "Deleted", message: "Leave deleted", type: "success" },
                ]);
            } catch (error) {
                console.error("Error deleting leave:", error);
                setToastList(prev => [
                    ...prev,
                    { title: "Error", message: "Failed to delete leave", type: "error" },
                ]);
                fetchLeaves();
            }
        } else {
            // if local-only, just toast
            setToastList(prev => [
                ...prev,
                { title: "Deleted", message: "Leave deleted", type: "success" },
            ]);
        }
    };

    const fetchLeaves = async () => {
        try {
            const response = await getLeave(loginUser.token);
            if (!response || !response.data) {
                setLeaveList([]);
                return;
            }
            setLeaveList(response.data.leaves || []);
        } catch (error) {
            console.error("Error fetching leaves:", error);
            setToastList((prev) => [
                ...prev,
                { title: "Error", message: "Failed to fetch leave data.", type: "error" },
            ]);
        }
    };

    const handleLeaveEdit = (index) => {
        const leave = leaveList[index];
        if (!leave) return;

        setLeaveForm({
            _id: leave._id || "",
            leaveName: leave.leaveName || "",
            leaveCategory: leave.leaveCategory || "",
            description: leave.description || "",
            genderEligibility: leave.genderEligibility || "",
            monthlyAccrual: leave.monthlyAccrual || "",
            carryForwardAllowed: leave.carryForwardAllowed || "",
            maxCarryForward: leave.maxCarryForward || "",
            allowHalfDay: Boolean(leave.allowHalfDay),
            validFrom: leave.validFrom || "",
            validTo: leave.validTo || "",
        });

        setEditingLeave(index);
        setShowLeaveCanvas(true);
    };

    /** ---------- TOAST ---------- **/
    const handleToastClose = (index) =>
        setToastList((prev) => prev.filter((_, i) => i !== index));

    // ---------- FETCH HOLIDAY AND LEAVE DATA ON MOUNT ----------
    useEffect(() => {
        if (!loginUser?.token) return;
        fetchHolidays();
        fetchLeaves();
    }, [loginUser?.token]);

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
                                        onSubmit={(e) => e.preventDefault()}
                                        footerButtonSubmit=""
                                        footerButtonSubmitClass=""
                                        showFooter={false}   // 🔥 Footer hidden
                                    >
                                        <Col md={12} lg={12} xl={12} xxl={12}>
                                            <PrimaryGird
                                                cardTitle="Manage Holidays"
                                                buttonText="Add Holiday"
                                                showAddButton={true}
                                                showFilterButton={false}
                                                showDeleteButton={false}
                                                showFooter={false}
                                                onButtonClick={() => {
                                                    resetHolidayForm();
                                                    setShowHolidayCanvas(true);
                                                }}
                                                tableHeaders={["Name", "Date", "Day", "Restricted Holiday", "Description", "Actions"]}
                                            >
                                                {holidayList.length > 0 ? (
                                                    holidayList.map((h, i) => (
                                                        <tr key={h._id || i}>
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
                                                        <td colSpan="6" className="text-center">
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
                                        onSubmit={(e) => e.preventDefault()}
                                        footerButtonSubmit=""
                                        footerButtonSubmitClass=""
                                        showFooter={false}   // 🔥 Footer hidden
                                    >
                                        <Col md={12} lg={12} xl={12} xxl={12}>
                                            <PrimaryGird
                                                cardTitle="Leave Report"
                                                buttonText="Add Leave"
                                                showAddButton={true}
                                                showFilterButton={false}
                                                showDeleteButton={false}
                                                showFooter={false}
                                                onButtonClick={() => {
                                                    resetLeaveForm();
                                                    setShowLeaveCanvas(true);
                                                }}
                                                tableHeaders={[
                                                    "Leave Name",
                                                    "Leave Category",
                                                    "Gender Eligibility",
                                                    "Monthly Accrual",
                                                    "Carry Forward Allowed",
                                                    "Max Carry Forward",
                                                    "Allow HalfDay",
                                                    "Valid From",
                                                    "Valid To",
                                                    "Action",
                                                ]}
                                            >
                                                {leaveList.length > 0 ? (
                                                    leaveList.map((l, i) => (
                                                        <tr key={l._id || i}>
                                                            <td>{l.leaveName}</td>
                                                            <td>{l.leaveCategory}</td>
                                                            <td>{l.genderEligibility}</td>
                                                            <td>{l.monthlyAccrual}</td>
                                                            <td>{l.carryForwardAllowed}</td>
                                                            <td>{l.maxCarryForward}</td>
                                                            <td>{l.allowHalfDay ? "Yes" : "No"}</td>
                                                            <td>{l.validFrom}</td>
                                                            <td>{l.validTo}</td>
                                                            <td className="table_action">
                                                                <Button
                                                                    className="btn_action"
                                                                    onClick={() => handleLeaveEdit(i)}
                                                                >
                                                                    <img src={Images.Edit} alt="edit" />
                                                                </Button>
                                                                <Button
                                                                    className="btn_action"
                                                                    onClick={() => {
                                                                        setLeaveToDelete(l);
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
                                                        <td colSpan="10" className="text-center">
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
                        textarea        // 🔥 this makes it a textarea
                        rows={3}
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
                <Col md={12}>
                    <Row>
                        <Col md={6}>
                            <InputField
                                label="Leave Name"
                                name="leaveName"
                                value={leaveForm.leaveName}
                                handleChange={handleLeaveChange}
                                error={leaveErrors.leaveName}
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
                                textarea        // 🔥 this makes it a textarea
                                rows={3}
                            />
                        </Col>
                        <Col md={6}>
                            <SelectInput
                                label="Leave Category"
                                name="leaveCategory"
                                options={LeaveCategories}
                                placeholder="Select an option"
                                error={leaveErrors.leaveCategory}
                                value={leaveForm.leaveCategory}
                                handleChange={handleLeaveChange}
                                required
                            />
                        </Col>
                        <Col md={6}>
                            <SelectInput
                                label="Gender Eligibility"
                                name="genderEligibility"
                                options={GenderOptions}
                                placeholder="Select an option"
                                error={leaveErrors.genderEligibility}
                                value={leaveForm.genderEligibility}
                                handleChange={handleLeaveChange}
                                required
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} className="normalRadio">
                            <RadioGroupField
                                label="Monthly Accrual"
                                name="monthlyAccrual"
                                options={monthlyAccrual}
                                value={leaveForm.monthlyAccrual}
                                handleChange={handleLeaveChange}
                                error={leaveErrors.monthlyAccrual}
                                required
                            />
                        </Col>
                        <Col md={12} className="normalRadio">
                            <RadioGroupField
                                label="Carry Forward Allowed"
                                name="carryForwardAllowed"
                                options={carryForwardAllowed}
                                value={leaveForm.carryForwardAllowed}
                                handleChange={(e) => {
                                    handleLeaveChange(e);
                                    if (e.target.value === "not-allow") {
                                        setLeaveForm((prev) => ({ ...prev, maxCarryForward: "" }));
                                    }
                                }}
                                error={leaveErrors.carryForwardAllowed}
                                required
                            />
                        </Col>
                        {leaveForm.carryForwardAllowed === "allow" && (
                            <Col md={6}>
                                <InputField
                                    label="Max Carry Forward"
                                    name="maxCarryForward"
                                    value={leaveForm.maxCarryForward}
                                    handleChange={handleLeaveChange}
                                    error={leaveErrors.maxCarryForward}
                                    required
                                />
                            </Col>
                        )}
                        <Col md={6}>
                            <CheckBoxGroup
                                label="Allow HalfDay"
                                name="allowHalfDay"
                                options={[{ label: "Yes", value: true }]}
                                value={leaveForm.allowHalfDay ? [true] : []}
                                onChange={(newValues) =>
                                    setLeaveForm((prev) => ({ ...prev, allowHalfDay: newValues.includes(true) }))
                                }
                                error={leaveErrors.allowHalfDay}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <InputField
                                label="Valid From"
                                name="validFrom"
                                type="date"
                                value={leaveForm.validFrom}
                                handleChange={handleLeaveChange}
                                error={leaveErrors.validFrom}
                                required
                            />
                        </Col>
                        <Col md={6}>
                            <InputField
                                label="Valid To"
                                name="validTo"
                                type="date"
                                value={leaveForm.validTo}
                                handleChange={handleLeaveChange}
                                error={leaveErrors.validTo}
                                required
                            />
                        </Col>
                    </Row>
                </Col>
            </OffCanvas>

            {/* ---------- Delete Confirmation ---------- */}
            <CustomModalConfirmDialog
                show={showHolidayModal}
                onHide={() => {
                    setShowHolidayModal(false);
                    setHolidayToDelete(null);
                }}
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
