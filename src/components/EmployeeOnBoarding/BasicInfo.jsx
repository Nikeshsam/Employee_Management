import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardForm, CustomToast, PrimaryGird, InputField, SelectInput } from '../../pages/Props.jsx';
import { basicValidateField } from '../Validations/Validate.jsx';
import Images from '../../pages/Images.jsx';
import { createOrUpdateEmployeeBasicDetails, getEmployeeBasicDetails, getLoggedEmployee } from '../../api/index.js';
import { useLoginUser } from '../../context/LoginUserContext.jsx';
import ComboDate from '../../data/Combo.json';
import Loader from '../Common/Loader.jsx';
import Cropper from "react-easy-crop";

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, ToastContainer, Tab, Tabs, Button, Table } from 'react-bootstrap';
import { first } from 'lodash';

// Bootstrap imports

// import Props from 'Props.jsx';

const BasicInfo = ({ employeeProfile }) => {

    const [Nationality, setNationality] = useState(ComboDate.Nationality);
    const [Gender, setGender] = useState(ComboDate.Gender);
    const [MaritalStatus, setMaritalStatus] = useState(ComboDate.MaritalStatus);

    const [profileImage, setProfileImage] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [showCropper, setShowCropper] = useState(false);

    const { loginUser } = useLoginUser();
    const navigate = useNavigate();

    // FormData Validations

    const [formData, setFormData] = useState({
        firstName: employeeProfile?.firstName || '',
        lastName: employeeProfile?.lastName || '',
        dateOfBirth: '',
        age: '',
        nationality: '',
        gender: '',
        maritalStatus: '',
        dateOfMarriage: '',
    });

    const handleToastClose = (index) => {
        const updatedList = toastList.filter((_, i) => i !== index);
        setToastList(updatedList);
    };

    const [showToast, setShowToast] = useState(true);

    // Error useState

    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [toastList, setToastList] = useState([]);
    const [isEditMode, setIsEditMode] = useState(true); // 👉 by default editable if no data
    const [hasData, setHasData] = useState(false); // 👉 flag to check if data exists

    // Use Effect

    useEffect(() => {
        const fetchData = async () => {
            try {
                const empRes = await getLoggedEmployee(loginUser.token);
                //console.log(empRes);
                const { firstName, lastName } = empRes.data.data || {};
                setFormData(prev => ({ ...prev, firstName: firstName || '', lastName: lastName || '' }));

                const res = await getEmployeeBasicDetails(loginUser.token);
                const emp = res.data?.data || {};

                setFormData({
                    firstName: firstName || "",
                    lastName: lastName || "",
                    dateOfBirth: emp.dateOfBirth ? emp.dateOfBirth.split("T")[0] : "",
                    age: emp.age || "",
                    nationality: emp.nationality || "",
                    gender: emp.gender || "",
                    maritalStatus: emp.maritalStatus || "",
                    dateOfMarriage: emp.dateOfMarriage ? emp.dateOfMarriage.split("T")[0] : "",
                });

                setHasData(!!res.data?.data);
                setIsEditMode(false);
            } catch (err) {
                if (err.response?.status !== 404) {
                    setToastList(prev => [
                        ...prev,
                        { title: "Error", message: "Failed to fetch employee details", type: "error" }
                    ]);
                }
            }
        };

        fetchData();
    }, [loginUser.token]);

    //  Validate Form with Error

    const validateForm = () => {
        const newErrors = {};

        Object.keys(formData).forEach((field) => {
            if (field === "dateOfMarriage") {
                // Find selected marital status label
                const selectedStatus = ComboDate.MaritalStatus.find(
                    s => s.value === formData.maritalStatus
                );
                // Only validate dateOfMarriage if Married
                if (selectedStatus?.label !== "Married") {
                    return;
                }
            }

            const error = basicValidateField(field, formData[field]);
            if (error) newErrors[field] = error;
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setSubmitting(true);

        try {
            // ✅ exclude firstName & lastName from payload
            //const { firstName, lastName, ...payload } = formData;

            await createOrUpdateEmployeeBasicDetails(formData, loginUser.token);

            setToastList((prev) => [
                ...prev,
                { title: "Success", message: "Basic details saved successfully!", type: "success" },
            ]);

            // ✅ Re-fetch updated data
            const updatedData = await getEmployeeBasicDetails(loginUser.token);
            if (updatedData.data && updatedData.data.data) {
                setFormData({
                    firstName: formData.firstName,  // keep from existing state
                    lastName: formData.lastName,    // keep from existing state
                    dateOfBirth: updatedData.data.data.dateOfBirth
                        ? new Date(updatedData.data.data.dateOfBirth).toISOString().split("T")[0]
                        : "",
                    age: updatedData.data.data.age || "",
                    nationality: updatedData.data.data.nationality || "",
                    gender: updatedData.data.data.gender || "",
                    maritalStatus: updatedData.data.data.maritalStatus || "",
                    dateOfMarriage: updatedData.data.data.dateOfMarriage
                        ? new Date(updatedData.data.data.dateOfMarriage).toISOString().split("T")[0]
                        : "",
                });

                setHasData(true);
                setIsEditMode(false);
            }
        } catch (error) {
            console.error("Error saving data:", error);
            setToastList((prev) => [
                ...prev,
                { title: "Error", message: "Failed to save basic details. Please try again.", type: "error" },
            ]);
        } finally {
            setSubmitting(false);
        }
    };

    //  Handle Change

    const calculateAge = (dob) => {
        if (!dob) return "";
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    //  Handle Change

    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedForm = { ...formData, [name]: value };

        // Normalize date fields to YYYY-MM-DD
        if (name === "dateOfBirth" && value) {
            updatedForm.dateOfBirth = new Date(value).toISOString().split("T")[0];
            updatedForm.age = String(calculateAge(updatedForm.dateOfBirth));
        }

        if (name === "dateOfMarriage" && value) {
            updatedForm.dateOfMarriage = new Date(value).toISOString().split("T")[0];
        }

        if (name === "maritalStatus" && value !== "Married") {
            updatedForm.dateOfMarriage = ""; // 🔥 clear if not Married
        }

        setFormData(updatedForm);

        const error = basicValidateField(name, value);
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            setImageSrc(reader.result);
            setShowCropper(true);
        };
        reader.readAsDataURL(file);
    };

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const getCroppedImage = async () => {
        const croppedImage = await cropImage(imageSrc, croppedAreaPixels);
        setProfileImage(croppedImage);
        setShowCropper(false);
    };

    // Utility: Convert cropped area to final image
    function cropImage(imageSrc, pixelCrop) {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = imageSrc;
            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = pixelCrop.width;
                canvas.height = pixelCrop.height;
                const ctx = canvas.getContext("2d");

                ctx.drawImage(
                    img,
                    pixelCrop.x,
                    pixelCrop.y,
                    pixelCrop.width,
                    pixelCrop.height,
                    0,
                    0,
                    pixelCrop.width,
                    pixelCrop.height
                );

                resolve(canvas.toDataURL("image/jpeg"));
            };
        });
    }

    return (
        <>
            {submitting ? <Loader /> : (
                <CardForm
                    onSubmit={handleSubmit}
                    // Dynamic button text
                    footerButtonSubmit={hasData ? (isEditMode ? "Update" : "Update") : "Save"}
                    footerButtonSubmitClass="primary_form_btn btn_h_35"
                    footerButtonSubmitDisabled={hasData && !isEditMode}
                    footerExtraButton={
                        hasData && !isEditMode ? (
                            <Button
                                variant="secondary"
                                className="btn_h_35 secondary_btn ps-3 pe-3 ms-2"
                                onClick={() => setIsEditMode(true)} // ✅ Unlock fields
                            >
                                Edit
                            </Button>
                        ) : null
                    }
                >
                    <Col md={9} lg={9} xl={9} xxl={9}>
                        <Row className='gx-3'>
                            <Col md={4} lg={4} xl={4} xxl={4}>
                                <InputField
                                    label="First Name"
                                    name="firstName"
                                    type="text"
                                    placeholder="Enter your first name"
                                    error={errors.firstName}
                                    value={formData.firstName}
                                    handleChange={handleChange}
                                    required
                                    disabled={!isEditMode}   //
                                />
                            </Col>
                            <Col md={4} lg={4} xl={4} xxl={4}>
                                <InputField
                                    label="Last Name"
                                    name="lastName"
                                    type="text"
                                    placeholder="Enter your last name"
                                    error={errors.lastName}
                                    value={formData.lastName}
                                    handleChange={handleChange}
                                    required
                                    disabled={!isEditMode}   //
                                />
                            </Col>
                        </Row>
                        <Row className='gx-3'>
                            <Col md={4} lg={4} xl={4} xxl={4}>
                                <InputField
                                    label="Date of Birth"
                                    name="dateOfBirth"
                                    type="date"
                                    placeholder="Enter your Date of Birth"
                                    error={errors.dateOfBirth}
                                    value={formData.dateOfBirth}
                                    handleChange={handleChange}
                                    required
                                    disabled={!isEditMode}   //
                                />
                            </Col>
                            <Col md={4} lg={4} xl={4} xxl={4}>
                                <InputField
                                    label="Age"
                                    name="age"
                                    type="number"
                                    placeholder="Enter your Age"
                                    error={errors.age}
                                    value={formData.age}
                                    handleChange={handleChange}
                                    required
                                    disabled={!isEditMode}   //
                                />
                            </Col>
                            <Col md={4} lg={4} xl={4} xxl={4}>
                                <SelectInput
                                    label="Nationality"
                                    name="nationality"
                                    options={Nationality}
                                    placeholder="Select Nationality"
                                    error={errors.nationality}
                                    value={formData.nationality}
                                    handleChange={handleChange}
                                    required
                                    disabled={!isEditMode}   //
                                />
                            </Col>
                        </Row>
                        <Row className='gx-3'>
                            <Col md={4} lg={4} xl={4} xxl={4}>
                                <SelectInput
                                    label="Gender"
                                    name="gender"
                                    options={Gender}
                                    placeholder="Select Gender"
                                    error={errors.gender}
                                    value={formData.gender}
                                    handleChange={handleChange}
                                    required
                                    disabled={!isEditMode}   //
                                />
                            </Col>
                            <Col md={4} lg={4} xl={4} xxl={4}>
                                <SelectInput
                                    label="Marital Status"
                                    name="maritalStatus"
                                    options={MaritalStatus}
                                    placeholder="Marital Status"
                                    error={errors.maritalStatus}
                                    value={formData.maritalStatus}
                                    handleChange={handleChange}
                                    required
                                    disabled={!isEditMode}   //
                                />
                            </Col>
                            {formData.maritalStatus === "Married" && (
                                <Col md={4} lg={4} xl={4} xxl={4}>
                                    <InputField
                                        label="Date of Marriage"
                                        type="date"
                                        name="dateOfMarriage"
                                        placeholder="Enter your Date of Marriage"
                                        error={errors.dateOfMarriage}
                                        value={formData.dateOfMarriage}
                                        handleChange={handleChange}
                                        required
                                        disabled={!isEditMode}
                                    />
                                </Col>
                            )}
                        </Row>
                    </Col>
                    <Col md={3} lg={3} xl={3} xxl={3} className='d-flex justify-content-center'>
                        <div className="userProfile">
                            <img
                                className="img-fluid"
                                src={profileImage ||Images.UserName}
                                alt="Profile"
                                style={{ width: 120, height: 120, borderRadius: "50%", objectFit: "cover" }}
                            />
                            <Form.Control
                                type="file"
                                id="hiddenFileInput"
                                style={{ display: "none" }}
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                            <button
                                type="button"
                                className="UploadButton btn btn-primary"
                                onClick={() => document.getElementById("hiddenFileInput").click()}
                            >
                                Upload
                            </button>
                            <span>Supported only JPG, PNG, SVG</span>

                            {showCropper && (
                                <div className="cropperContainer">
                                    <Cropper
                                        image={imageSrc}
                                        crop={crop}
                                        zoom={zoom}
                                        aspect={1}
                                        onCropChange={setCrop}
                                        onZoomChange={setZoom}
                                        onCropComplete={onCropComplete}
                                    />
                                    <div className='Crop_btn_group'>
                                        <button className="btn btn-success" onClick={getCroppedImage}>
                                            Save Crop
                                        </button>
                                        <button className="btn btn-secondary" onClick={() => setShowCropper(false)}>
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Col>
                </CardForm>
            )}
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

export default BasicInfo;