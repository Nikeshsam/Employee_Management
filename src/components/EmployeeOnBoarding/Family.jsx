import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardForm, CustomToast, PrimaryGird, InputField, OffCanvas } from '../../pages/Props.jsx';
import { useLoginUser } from '../../context/LoginUserContext.jsx';
import Images from '../../pages/Images.jsx';
import { familyValidateField } from '../Validations/Validate.jsx';
import Loader from '../Common/Loader.jsx';
import { createOrUpdateDependentDetails, deleteDependentDetails, getDependentDetails } from '../../api/index.js';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, ToastContainer, Tab, Tabs, Button, Table } from 'react-bootstrap';

// Bootstrap imports


const Family = () => {

    // Canvas useState

    const [showFamilyCanvas, setShowFamilyCanvas] = useState(false);
    const handleShowFamilyCanvas = () => setShowFamilyCanvas(true);
    const handleCloseFamilyCanvas = () => setShowFamilyCanvas(false);

    const [submitting, setSubmitting] = useState(false);

    const [familymembers, setFamilyMembers] = useState([]);

    const { loginUser } = useLoginUser();

    const [toastList, setToastList] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);

    const handleToastClose = (index) => {
        const updatedList = toastList.filter((_, i) => i !== index);
        setToastList(updatedList);
    };

    // FormData Validations

    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        relationship: '',
        dob: '',
        education: '',
        occupation: '',
    });

    // Error useState

    const [errors, setErrors] = useState({});

    //  Validate Form with Error

    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach((field) => {
            const error = familyValidateField(field, formData[field]);
            if (error) newErrors[field] = error;
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    //  Handle Submit

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const newMember = {
            name: `${formData.fname} ${formData.lname}`.trim(),
            relationship: formData.relationship,
            dateOfBirth: formData.dob,
            education: formData.education,
            occupation: formData.occupation,
            dependentBenefit: true
        };

        if (editingIndex !== null) {
            setFamilyMembers((prev) =>
                prev.map((member, idx) => (idx === editingIndex ? newMember : member))
            );
        } else {
            setFamilyMembers((prev) => [...prev, newMember]);
        }

        setToastList((prev) => [
            ...prev,
            { title: "Success", message: "Dependent added to grid!", type: "success" },
        ]);

        setFormData({
            fname: '',
            lname: '',
            relationship: '',
            dob: '',
            education: '',
            occupation: '',
        });

        setEditingIndex(null);
        setShowFamilyCanvas(false);
    };

    useEffect(() => {
        const fetchFamilyMember = async () => {
            try {
                const response = await getDependentDetails(loginUser.token);
                if (!response) {
                    console.log("No Data Found");
                    return;
                }
                setFamilyMembers(response.data.dependents);
            } catch (error) {
                console.log(error);
            }
        };

        fetchFamilyMember();
    }, [loginUser.token]);

    const fetchDependents = async () => {
        try{
            const response = await getDependentDetails(loginUser.token);
            if (!response){
                console.log("No Data Found");
                return;
            }
            setFamilyMembers(response.data.dependents);
        }catch(error) {
            console.log(error);
        }
    }

    const handleSaveAll = async () => {
        try {
            setSubmitting(true);

            const newMembers = familymembers; // only new
            if (newMembers.length === 0) {
                setToastList((prev) => [
                    ...prev,
                    { title: "Info", message: "No new dependents to save", type: "info" },
                ]);
                return;
            }

            const apiData = {
                dependents: newMembers.map(member => ({
                    _id:member._id,
                    name: member.name,
                    relationship: member.relationship,
                    dateOfBirth: member.dateOfBirth,
                    education: member.education,
                    occupation: member.occupation,
                    dependentBenefit: true
                }))
            };
            console.log(apiData);
            //return;

            await createOrUpdateDependentDetails(apiData, loginUser.token);

            setToastList((prev) => [
                ...prev,
                { title: "Success", message: "New family members saved successfully!", type: "success" },
            ]);
            await fetchDependents();
        } catch (error) {
            console.error("Error saving dependents:", error);
        } finally {
            setSubmitting(false);
        }
    };


    //  Handle Change

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        const error = familyValidateField(name, value);
        setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
    };

    // 👉 Add below inside Family component (before return)

    const handleEdit = (index) => {
        const member = familymembers[index];

        // Split full name into first & last
        const [firstName, ...rest] = (member.name || "").split(" ");
        const lastName = rest.join(" ");

        setFormData({
            fname: firstName,
            lname: lastName,
            relationship: member.relationship,
            dob: member.dateOfBirth,
            education: member.education,
            occupation: member.occupation,
        });

        setEditingIndex(index);
        setShowFamilyCanvas(true); // Open the OffCanvas for editing
    };

    const handleDelete = (index) => {
        setFamilyMembers((prev) => prev.filter((_, i) => i !== index));

        setToastList((prev) => [
            ...prev,
            { title: "Deleted", message: "Family member removed from grid!", type: "error" },
        ]);
    };


    const navigate = useNavigate();

    return (
        <>
            {submitting ? <Loader /> : (
                <CardForm
                    footerButtonSubmit="Save"
                    footerButtonSubmitClass="primary_form_btn btn_h_35"
                    onSubmit={handleSaveAll} 
                >
                    <Col md={12} lg={12} xl={12} xxl={12}>
                        <PrimaryGird
                            cardTitle="Family"
                            buttonText="Add Family"
                            showAddButton={true}
                            showFilterButton={false}
                            showDeleteButton={false}
                            showFooter={false}
                            onButtonClick={handleShowFamilyCanvas}
                            tableHeaders={['First Name', 'Last Name', 'Relationship', 'Date of Birth', 'Education', 'occupation', 'Dependent in benefits', 'Actions']}
                        >
                            {submitting ? (
                                <Loader />
                            ) : (
                                familymembers.length > 0 ? (
                                    familymembers.map((member, index) => {
                                        // Split full name into first & last
                                        const [firstName, ...rest] = (member.name || "").split(" ");
                                        const lastName = rest.join(" ");

                                        return (
                                            <tr key={index}>
                                                <td>{firstName}</td>
                                                <td>{lastName}</td>
                                                <td>{member.relationship}</td>
                                                <td>{member.dateOfBirth}</td>
                                                <td>{member.education}</td>
                                                <td>{member.occupation}</td>
                                                <td>{member.dependentBenefit ? "Yes" : "No"}</td>
                                                <td className='table_action'>
                                                    <Button className="btn_action" onClick={() => handleEdit(index)}><img src={Images.Edit} alt="" /></Button>
                                                    <Button className="btn_action" onClick={() => handleDelete(index)}><img src={Images.Delete} alt="" /></Button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="8" style={{ textAlign: "center" }}>
                                            No Family Members Added
                                        </td>
                                    </tr>
                                )
                            )}


                        </PrimaryGird>
                    </Col>
                </CardForm>
            )}

            <OffCanvas
                show={showFamilyCanvas}
                placement="end"
                onSubmit={handleSubmit}
                onHide={handleCloseFamilyCanvas}
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
                    <InputField
                        label="First Name"
                        type="text"
                        placeholder="Enter your First Name"
                        controlId="fname"
                        name="fname"
                        error={errors.fname}
                        value={formData.fname}
                        handleChange={handleChange}
                        required
                    />
                </Col>
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <InputField
                        label="Last Name"
                        type="text"
                        placeholder="Enter your Last Name"
                        controlId="lname"
                        name="lname"
                        error={errors.lname}
                        value={formData.lname}
                        handleChange={handleChange}
                        required
                    />
                </Col>
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <InputField
                        label="Relationship"
                        type="text"
                        placeholder="Enter your Last Name"
                        controlId="relationship"
                        name="relationship"
                        error={errors.relationship}
                        value={formData.relationship}
                        handleChange={handleChange}
                        required
                    />
                </Col>
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <InputField
                        label="Date of Birth"
                        type="date"
                        placeholder="Enter your Last Name"
                        controlId="dob"
                        name="dob"
                        error={errors.dob}
                        value={formData.dob}
                        handleChange={handleChange}
                        required
                    />
                </Col>
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <InputField
                        label="Education"
                        type="text"
                        placeholder="Enter your Last Name"
                        controlId="education"
                        name="education"
                        error={errors.education}
                        value={formData.education}
                        handleChange={handleChange}
                        required
                    />
                </Col>
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <InputField
                        label="Occupation"
                        type="text"
                        placeholder="Enter your Last Name"
                        controlId="occupation"
                        name="occupation"
                        error={errors.occupation}
                        value={formData.occupation}
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
        </>
    )
}

export default Family
