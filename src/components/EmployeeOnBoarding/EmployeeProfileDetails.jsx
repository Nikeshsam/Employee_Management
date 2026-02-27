import React, { useState, useCallback } from 'react';
import Images from '../../pages/Images.jsx';
import ComboDate from '../../data/Combo.json';

import 'bootstrap/dist/css/bootstrap.css';
import { Form } from "react-bootstrap";
import Cropper from "react-easy-crop";

function EmployeeProfileCard({ employeeProfile, loading }) {

    // -----------------------
    // HOOKS (Must always be first)
    // -----------------------
    const [profileImage, setProfileImage] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [showCropper, setShowCropper] = useState(false);

    // -----------------------
    // SAFE CALLBACK HOOK
    // -----------------------
    const onCropComplete = useCallback((croppedArea, pixels) => {
        setCroppedAreaPixels(pixels);
    }, []);

    // -----------------------
    // IMAGE UPLOAD HANDLER
    // -----------------------
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

    // -----------------------
    // CROP IMAGE FUNCTION
    // -----------------------
    const cropImage = (imageSrc, pixelCrop) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
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
    };

    const getCroppedImage = async () => {
        const croppedImage = await cropImage(imageSrc, croppedAreaPixels);
        setProfileImage(croppedImage);
        setShowCropper(false);
    };

    // -----------------------
    // LABEL HELPERS
    // -----------------------
    const getDepartmentLabel = (val) => {
        const dept = ComboDate.Department.find(
            (d) => String(d.value) === String(val)
        );
        return dept?.label || val;
    };

    const getDesignationLabel = (val) => {
        const desig = ComboDate.Designation.find(
            (d) => String(d.value) === String(val)
        );
        return desig?.label || val;
    };

    // -----------------------
    // EARLY RETURNS (After hooks)
    // -----------------------
    if (loading) {
        return <p>Loading...</p>;
    }

    if (!employeeProfile) {
        return <p>No employee details found.</p>;
    }

    // -----------------------
    // UI
    // -----------------------
    return (
        <div className="employee_profile_container">

            {/* PROFILE IMAGE SECTION */}
            <div className='employee_profile_pic_content'>
                <div className='employee_profile_pic'>
                    <img
                        src={profileImage || employeeProfile.profilePic || Images.UserName}
                        alt="Profile"
                        className="img-fluid rounded-circle"
                    />

                    <Form.Control
                        type="file"
                        id="hiddenFileInput"
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={handleImageUpload}
                    />

                    <button
                        className="UploadButton"
                        onClick={() => document.getElementById("hiddenFileInput").click()}
                    >
                        <img src={Images.Edit} alt="" />
                    </button>

                    {/* CROPPER UI */}
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

                            <div className="Crop_btn_group">
                                <button className="CropBtn" onClick={getCroppedImage}>Save Crop</button>
                                <button className="CropBtn" onClick={() => setShowCropper(false)}>Cancel</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* BASIC INFO */}
                <div className='employee_profile_content'>
                    <h5 className="mb-0">
                        <label>{employeeProfile.firstName} {employeeProfile.lastName}</label>
                        <span className="badge">{employeeProfile.status}</span>
                    </h5>
                    <p>{getDesignationLabel(employeeProfile.designation)}</p>
                    <a href="#">{employeeProfile.employeeId}</a>
                </div>
            </div>

            {/* DETAILS */}
            <div className="employee_profile_details">
                <label>Department</label>
                <span>{getDepartmentLabel(employeeProfile.department)}</span>
            </div>

            <div className="employee_profile_details">
                <label>Joining Date</label>
                <span>{employeeProfile.joiningDate || "03-07-2025"}</span>
            </div>

            <div className="employee_profile_details">
                <label>Employment Type</label>
                <span>{employeeProfile.employmentType}</span>
            </div>

            <div className="employee_profile_details">
                <label>Manager</label>
                <span>{employeeProfile.manager || '-'}</span>
            </div>

            <div className="employee_profile_details">
                <label>Work Location</label>
                <span>{employeeProfile.workLocation}</span>
            </div>

            {employeeProfile.offerLetter && (
                <div className="employee_offer_letter">
                    <a href="#">
                        <img src={Images.OfferLetter} alt="Offer Letter" className="offer_letter_icon" />
                        Offer Letter
                    </a>
                </div>
            )}
        </div>
    );
}

export default EmployeeProfileCard;
