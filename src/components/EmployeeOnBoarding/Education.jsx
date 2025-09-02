import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardForm, CustomToast, CustomModalConfirmDialog, PrimaryGird, InputField, OffCanvas } from '../../pages/Props.jsx';
import { useLoginUser } from '../../context/LoginUserContext.jsx';
import Images from '../../pages/Images.jsx';
import {educationValidateField, certificationValidateField} from '../Validations/Validate.jsx';
import Loader from '../Common/Loader.jsx';
import { createOrUpdateDependentDetails, deleteDependentDetails, getDependentDetails } from '../../api/index.js';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, ToastContainer, Tab, Tabs, Button, Table } from 'react-bootstrap';

// Bootstrap imports

const Educations = () => {

    //Education Canvas useState

    const [showEducationCanvas, setShowEducationCanvas] = useState(false);
    const handleShowEducationCanvas = () => setShowEducationCanvas(true);
    const handleCloseEducationCanvas = () => setShowEducationCanvas(false);
    const [educations, setEducation] = useState([]);
    const [educationEditingIndex, setEducationEditingIndex] = useState(null);


   //Certification Canvas useState
    const [showCertificationCanvas, setShowCertificationCanvas] = useState(false);
    const handleShowCertificationCanvas = () => setShowCertificationCanvas(true);
    const handleCloseCertificationCanvas = () => setShowCertificationCanvas(false);
    const [certifications, setCertifications] = useState([]);
    const [certificationsEditingIndex, setCertificationsEditingIndex] = useState(null);

    const [submitting, setSubmitting] = useState(false);
    const {loginUser} = useLoginUser();
    const [toastList, setToastList] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [deleteType, setDeleteType] = useState(null); // "education" | "certification"
    const [indexToDelete, setIndexToDelete] = useState(null);
    const [formType, setFormType] = useState(null); // "education" | "certification"

    const [educationErrors, setEducationErrors] = useState({});
    const [certificationErrors, setCertificationErrors] = useState({});


    const handleToastClose = (index) => {
        const updatedList = toastList.filter((_, i) => i !== index);
        setToastList(updatedList);
    };

    const handleClearClick = () => {
        setModalShow(false);
        setItemToDelete(null);   // reset the selected item
        setDeleteType(null);     // clear type (education/certification)
        setIndexToDelete(null);  // clear index
    };


    // FormData Validations

    const [educationFormData, setEducationFormData] = useState({
        degree: '',
        major: '',
        university: '',
        year: '',
        percentage: '',
    });

    const [certificationsFormData, setCertificationsFormData] = useState({
        name: '',
        issuedBy: '',
        issuedDate: '',
        additionalInfo: '',
    });

    //  Validate Form with Error

    const validateForm = () => {
        if (formType === "education") {
            const newErrors = {};
            Object.keys(educationFormData).forEach((field) => {
                const error = educationValidateField(field, educationFormData[field]);
                if (error) newErrors[field] = error;
            });
            setEducationErrors(newErrors);
            return Object.keys(newErrors).length === 0;
        }

        if (formType === "certification") {
            const newErrors = {};
            Object.keys(certificationsFormData).forEach((field) => {
                const error = certificationValidateField(field, certificationsFormData[field]);
                if (error) newErrors[field] = error;
            });
            setCertificationErrors(newErrors);
            return Object.keys(newErrors).length === 0;
        }

        return false;
    };



    //  Handle Change

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (formType === "education") {
            setEducationFormData(prev => ({ ...prev, [name]: value }));
            const error = educationValidateField(name, value);
            setEducationErrors(prevErrors => ({ ...prevErrors, [name]: error }));
        }
        else if (formType === "certification") {
            setCertificationsFormData(prev => ({ ...prev, [name]: value }));
            const error = certificationValidateField(name, value);
            setCertificationErrors(prevErrors => ({ ...prevErrors, [name]: error }));
        }
    };


    /////////////////////////// Education Funcationally Start Here ///////////////////////////

    //  Handle Education Submit

    const handleEducationSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const newEducation = {
            _id: educationFormData._id,
            degree: educationFormData.degree,
            major: educationFormData.major,
            university: educationFormData.university,
            year: educationFormData.year,
            percentage: educationFormData.percentage,
        };

        if (educationEditingIndex !== null) {
            setEducation((prev) =>
                prev.map((member, idx) => (idx === educationEditingIndex ? newEducation : member))
            );
        } else {
            setEducation((prev) => [...prev, newEducation]);
        }

        setToastList((prev) => [
            ...prev,
            {
                title: "Success",
                message: educationEditingIndex !== null
                    ? "Educations updated successfully!"
                    : "Educations added successfully!",
                type: "success"
            },
        ]);

        setEducationFormData({
            degree: '',
            major: '',
            university: '',
            year: '',
            percentage: '',
        });

        setEducationEditingIndex(null);
        //resetForm();   // <-- clear everything here
        setShowEducationCanvas(false);
    };

    const handleEducationEdit = (index) => {
        const education = educations[index];

        setEducationFormData({
            _id: education._id,
            degree: education.degree,
            major: education.major,
            university: education.university,
            year: education.year,
            percentage: education.percentage,
        });

        setEducationEditingIndex(index);
        setShowEducationCanvas(true); // Open the OffCanvas for editing
    };

    const fetchEducation = async () => {
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
    }

    /////////////////////////// Education Funcationally Start Here ///////////////////////////

    //  Handle Education Submit

    const handleCertificationSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const newCertification = {
            _id: certificationsFormData._id,
            name: certificationsFormData.name,
            issuedBy: certificationsFormData.issuedBy,
            issuedDate: certificationsFormData.issuedDate,
            additionalInfo: certificationsFormData.additionalInfo,
        };

        if (certificationsEditingIndex !== null) {
            setCertifications((prev) =>
                prev.map((member, idx) => (idx === certificationsEditingIndex ? newCertification : member))
            );
        } else {
            setCertifications((prev) => [...prev, newCertification]);
        }

        setToastList((prev) => [
            ...prev,
            {
                title: "Success",
                message: certificationsEditingIndex !== null
                    ? "Family Member updated successfully!"
                    : "Family Member added successfully!",
                type: "success"
            },
        ]);

        setCertificationsFormData({
            name: '',
            issuedBy: '',
            issuedDate: '',
            additionalInfo: '',
        });

        setCertificationsEditingIndex(null);
        //resetForm();   // <-- clear everything here
        handleShowCertificationCanvas(false);
    };

    const handleCertificationEdit = (index) => {
        const education = educations[index];

        setCertificationsFormData({
            _id: education._id,
            name: education.name,
            issuedBy: education.issuedBy,
            issuedDate: education.issuedDate,
            additionalInfo: education.additionalInfo
        });

        setCertificationsEditingIndex(index);
        handleShowCertificationCanvas(true); // Open the OffCanvas for editing
    };

    const fetchCertification = async () => {
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
    }



    // useEffect(() => {
    //     const fetchEducation = async () => {
    //         try {
    //             const response = await getEducationDetails(loginUser.token);
    //             if (!response) {
    //                 console.log("No Data Found");
    //                 return;
    //             }
    //             setEducation(response.data.dependents);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };

    //     fetchEducation();
    // }, [loginUser.token]);

    const handleDelete = async () => {
        let member;

        if (deleteType === "education") {
            member = educations[indexToDelete];
            setEducation((prev) => prev.filter((_, i) => i !== indexToDelete));
        } else if (deleteType === "certification") {
            member = certifications[indexToDelete];
            setCertifications((prev) => prev.filter((_, i) => i !== indexToDelete));
        }

        if (member?._id) {
            try {
                let response;

                if (deleteType === "education") {
                    response = await deleteEmployeeEducation(member._id, loginUser.token);
                } else if (deleteType === "certification") {
                    response = await deleteEmployeeCertification(member._id, loginUser.token);
                }

                setToastList(prev => [
                    ...prev,
                    {
                        title: `${member.name || member.degree}`,
                        message: `${deleteType === "education" ? "Education" : "Certification"} deleted successfully`,
                        type: "success",
                    }
                ]);

                console.log(response);
            } catch (error) {
                console.log(error);
            }
        }

        setModalShow(false);
        setItemToDelete(null); // ✅ reset generic state
    };

    const handleSaveAll = async () => {
        try {
            setSubmitting(true);

            const newMembers = familymembers; // only new
            if (newMembers.length === 0) {
                setToastList((prev) => [
                    ...prev,
                    { title: "Info", message: "No new Family Member to save", type: "info" },
                ]);
                return;
            }

            const apiData = {
                dependents: newMembers.map(member => ({
                    _id: member._id,
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
                { title: "Success", message: "Family members saved successfully!", type: "success" },
            ]);
            await fetchEducation();
        } catch (error) {
            console.error("Error saving dependents:", error);
        } finally {
            setSubmitting(false);
        }
    };

    const navigate = useNavigate();

    return (
        <>
            <CardForm
                footerButtonSubmit="Save"
                footerButtonSubmitClass="primary_form_btn btn_h_35"
                onSubmit={handleSaveAll} 
            >
                <Col md={12} lg={12} xl={12} xxl={12}>
                    <PrimaryGird
                        cardTitle="Educations"
                        buttonText="Add Education"
                        showAddButton={true}
                        showFilterButton={false}
                        showDeleteButton={false}
                        showFooter={false}
                        onButtonClick={handleShowEducationCanvas}
                        tableHeaders={['Degree', 'Major', 'University', 'Year', 'CGPA', 'Actions']}
                    >
                        {submitting ? (
                            <Loader />
                        ) : (
                            educations.length > 0 ? (
                                educations.map((education, index) => {
                                    return (
                                        <tr key={education.key}>
                                            <td>{education.degree}</td>
                                            <td>{education.major}</td>
                                            <td>{education.university}</td>
                                            <td>{education.year}</td>
                                            <td>{education.percentage}</td>
                                            <td className='table_action'>
                                                <Button className="btn_action" onClick={() => handleEducationEdit(index)}><img src={Images.Edit} alt="" /></Button>
                                                <Button className="btn_action" onClick={() => {setItemToDelete(education); setIndexToDelete(index); setDeleteType("education"); setModalShow(true); }}><img src={Images.Delete} alt="" /></Button>
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

                <Col md={12} lg={12} xl={12} xxl={12}>
                    <PrimaryGird
                        cardTitle="Certifications"
                        buttonText="Add Certifications"
                        showAddButton={true}
                        showFilterButton={false}
                        showDeleteButton={false}
                        showFooter={false}
                        onButtonClick={handleShowCertificationCanvas}
                        tableHeaders={['Name', 'Issued by', 'Issued Date', 'Course Description', 'Actions']}
                    >
                        {submitting ? (
                            <Loader />
                        ) : (certifications.length > 0 ? (
                            certifications.map((certification, index) => {
                                return (
                                    <tr key={certification.key}>
                                        <td>{certification.name}</td>
                                        <td>{certification.issuedBy}</td>
                                        <td>{certification.issuedDate}</td>
                                        <td>{certification.additionalInfo}</td>
                                        <td className='table_action'>
                                            <Button className="btn_action" onClick={() => handleCertificationEdit(index)}><img src={Images.Edit} alt="" /></Button>
                                            <Button className="btn_action" onClick={() => {setItemToDelete(certification); setIndexToDelete(index); setDeleteType("certification"); setModalShow(true); }}><img src={Images.Delete} alt="" /></Button>
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

            <OffCanvas
                show={showEducationCanvas}
                placement="end"
                onSubmit={handleEducationSubmit}
                onHide={handleCloseEducationCanvas}
                title={educationEditingIndex !== null ? "Update Education Details" : "Add Education Details"}
                subtitle={educationEditingIndex !== null ? "Update the details of your Education." : "Start your 7-day free trial."}
                className='PrimaryCanvasModal'
                name={educationEditingIndex !== null ? "Update Education Details" : "Add Education Details"}
                footerButtonSubmit={educationEditingIndex !== null ? "Update Education Details" : "Add Education Details"}
                footerButtonCancel="Cancel"
                footerButtonSubmitClass="modal_primary_btn w-100"
                footerButtonCancelClass="modal_primary_border_btn w-100"
            >
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <InputField
                        label="Degree"
                        type="text"
                        placeholder="Enter your Degree"
                        controlId="degree"
                        name="degree"
                        error={educationErrors.degree}
                        value={educationFormData.degree}
                        handleChange={handleChange}
                        required
                    />
                </Col>
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <InputField
                        label="Major"
                        type="text"
                        placeholder="Enter your Major"
                        controlId="major"
                        name="major"
                        error={educationErrors.major}
                        value={educationFormData.major}
                        handleChange={handleChange}
                        required
                    />
                </Col>
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <InputField
                        label="University"
                        type="text"
                        placeholder="Enter your University"
                        controlId="university"
                        name="university"
                        error={educationErrors.university}
                        value={educationFormData.university}
                        handleChange={handleChange}
                        required
                    />
                </Col>
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <InputField
                        label="Year"
                        type="month"
                        placeholder="Enter your Year"
                        controlId="year"
                        name="year"
                        error={educationErrors.year}
                        value={educationFormData.year}
                        handleChange={handleChange}
                        required
                    />
                </Col>
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <InputField
                        label="Percentage"
                        type="text"
                        placeholder="Enter your Percentage"
                        controlId="percentage"
                        name="percentage"
                        error={educationErrors.percentage}
                        value={educationFormData.percentage}
                        handleChange={handleChange}
                        required
                    />
                </Col>
            </OffCanvas>

            <OffCanvas
                show={showCertificationCanvas}
                placement="end"
                onSubmit={handleCertificationSubmit}
                onHide={handleCloseCertificationCanvas}
                title={certificationsEditingIndex !== null ? "Update Certification Member" : "Add Certification Member"}
                subtitle={certificationsEditingIndex !== null ? "Update the details of your Certifications." : "Start your 7-day free trial."}
                className='PrimaryCanvasModal'
                name={certificationsEditingIndex !== null ? "Update Certification" : "Add Certification"}
                footerButtonSubmit={certificationsEditingIndex !== null ? "Update Certification" : "Add Certification"}
                footerButtonCancel="Cancel"
                footerButtonSubmitClass="modal_primary_btn w-100"
                footerButtonCancelClass="modal_primary_border_btn w-100"
            >
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <InputField
                        label="Certification Name"
                        type="text"
                        placeholder="Enter your Certification Name"
                        controlId="name"
                        name="name"
                        error={certificationErrors.name}
                        value={certificationsFormData.name}
                        handleChange={handleChange}
                        required
                    />
                </Col>
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <InputField
                        label="Issued By"
                        type="text"
                        placeholder="Enter your Last Name"
                        controlId="issuedBy"
                        name="issuedBy"
                        error={certificationErrors.issuedBy}
                        value={certificationsFormData.issuedBy}
                        handleChange={handleChange}
                        required
                    />
                </Col>
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <InputField
                        label="Issued Date"
                        type="date"
                        placeholder="Enter Your Issued Date"
                        controlId="issuedDate"
                        name="issuedDate"
                        error={certificationErrors.issuedDate}
                        value={certificationsFormData.issuedDate}
                        handleChange={handleChange}
                        required
                    />
                </Col>
                <Col md={6} lg={6} xl={6} xxl={6}>
                    <InputField
                        label="Course Description"
                        type="text"
                        placeholder="Enter your Course Description"
                        controlId="additionalInfo"
                        name="additionalInfo"
                        error={certificationErrors.additionalInfo}
                        value={certificationsFormData.additionalInfo}
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
                title="Delete Employee"
                size="md"
                subtitle="This action cannot be undone."
                className="ConfirmDialogModal delete"
                showSubmitButton={true}
                showCancelButton={true}
                bodyContent={
                    <div className="ConfirmContainer">
                        <div className="ConfirmIcon">
                            <img src={Images.ConfirmDelete} alt="Delete" />
                        </div>
                        {itemToDelete && (
                            <div className="ConfirmContent">
                                <h5>Delete Employee</h5>
                                <p>
                                    Are you sure you want to delete this{" "}
                                    {deleteType === "education" ? "Education" : "Certification"} details{" "}
                                    <span>{itemToDelete.degree || itemToDelete.name}</span>?
                                    This action cannot be undone.
                                </p>
                            </div>
                        )}
                    </div>
                }
                onSubmit={handleDelete}
                footerButtonSubmit="Delete"
                footerButtonCancel="Cancel"
                footerButtonSubmitClass="modal_danger_btn"
                footerButtonCancelClass="modal_primary_border_btn"
            />
        </>
    )
}

export default Educations
