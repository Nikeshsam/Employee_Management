import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardForm, CustomToast, PrimaryGird, InputField, SelectInput } from '../../pages/Props.jsx';
import { contactValidateField } from '../Validations/Validate.jsx';
import Images from '../../pages/Images.jsx';
import { createOrUpdateEmployeeContactDetails, getEmployeeContactDetails } from '../../api/index.js';
import { useLoginUser } from '../../context/LoginUserContext.jsx';
import ComboDate from '../../data/Combo.json';
import Loader from '../Common/Loader.jsx';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, ToastContainer, Tab, Tabs, Button, Table } from 'react-bootstrap';

// Bootstrap imports

const Contact = () => {

    const [Country, setCountry] = useState(ComboDate.Country);
    const [State, setState] = useState(ComboDate.State);
    const [City, setCity] = useState(ComboDate.City);

    const { loginUser } = useLoginUser();
    const navigate = useNavigate();

    // FORM INPUT

    // FormData Validations

    const [formData, setFormData] = useState({
            currentAddress: {
                addressLine1: '',
                addressLine2: '',
                city: '',
                state: '',
                country: '',
                zipCode: ''
            },
            permanentAddress: {
                addressLine1: '',
                addressLine2: '',
                city: '',
                state: '',
                country: '',
                zipCode: ''
            },
            primaryMobileNo: '',
            secondaryMobileNo: '',
            email: '',
            relationName: '',
            relationship: '',
            relationContactNo: '',
            relationEmail: '',
            relationAddress: ''
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

    // Fetch existing employee details
    useEffect(() => {
        const fetchContactDetails = async () => {
            try {
                const res = await getEmployeeContactDetails(loginUser.token);
                if (res.data && res.data.data) {
                    const data = res.data.data;
                    // Pre-fill formData
                    setFormData({
                        currentAddress: {
                            addressLine1: data.currentAddress?.addressLine1 || '',
                            addressLine2: data.currentAddress?.addressLine2 || '',
                            city: data.currentAddress?.city || '',
                            state: data.currentAddress?.state || '',
                            country: data.currentAddress?.country || '',
                            zipCode: data.currentAddress?.zipCode || ''
                        },
                        permanentAddress: {
                        addressLine1: data.permanentAddress?.addressLine1 || '',
                        addressLine2: data.permanentAddress?.addressLine2 || '',
                        city: data.permanentAddress?.city || '',
                        state: data.permanentAddress?.state || '',
                        country: data.permanentAddress?.country || '',
                        zipCode: data.permanentAddress?.zipCode || ''
                    },
                    primaryMobileNo: data.primaryMobileNo || '',
                    secondaryMobileNo: data.secondaryMobileNo || '',
                    email: data.email || '',
                    relationName: data.relationName || '',
                    relationship: data.relationship || '',
                    relationContactNo: data.relationContactNo || '',
                    relationEmail: data.relationEmail || '',
                    relationAddress: data.relationAddress || ''
                });
                    setHasData(true);
                    setIsEditMode(false);
                } else {
                    // No data yet -> keep form empty & editable
                    setHasData(false);
                    setIsEditMode(true);    
            }
        } catch (error) {
            //console.error("Error fetching contact details:", error);
            // Only show toast for real network/server errors
            // if (err.response?.status !== 404) {
            //     setToastList(prev => [
            //         ...prev,
            //         {
            //             title: "Error",
            //             message: "Failed to fetch employee details",
            //             type: "error"
            //         }
            //     ]);
            // }
        }
    };

    fetchContactDetails();
}, [loginUser.token]);


    //  Validate Form with Error

    const validateForm = () => {
        const newErrors = {};

        const validateNested = (obj, parentKey = '') => {
            Object.keys(obj).forEach((key) => {
                const fieldName = parentKey ? `${parentKey}.${key}` : key;
                const value = obj[key];
                if (typeof value === 'object') {
                    validateNested(value, fieldName);
                } else {
                    const error = contactValidateField(fieldName, value);
                    if (error) {
                        const keys = fieldName.split('.');
                        let nested = newErrors;
                        keys.forEach((k, i) => {
                            if (i === keys.length - 1) {
                                nested[k] = error;
                            } else {
                                nested[k] = nested[k] || {};
                                nested = nested[k];
                            }
                        });
                    }
                }
            });
        };

        validateNested(formData);

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    //  Handle Submit

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setSubmitting(true);

        try {
            // ✅ Create or Update
            await createOrUpdateEmployeeContactDetails(formData, loginUser.token);

            setToastList((prev) => [
                ...prev,
                { title: "Success", message: "Contact details saved successfully!", type: "success" },
            ]);

            // ✅ Re-fetch updated data
            const updatedData = await getEmployeeContactDetails(loginUser.token);
            setHasData(true);
            setIsEditMode(false);

        } catch (error) {
            //console.error("Error saving data:", error);
            setToastList((prev) => [
                ...prev,
                { title: "Error", message: "Failed to save Contact details. Please try again.", type: "error" },
            ]);
        } finally {
            setSubmitting(false);
        }
    };

    //  Handle Change

    const handleChange = (e) => {
        const { name, value } = e.target;
        const keys = name.split('.');

        setFormData(prev => {
            const updated = { ...prev };
            let nested = updated;
            for (let i = 0; i < keys.length - 1; i++) {
                nested[keys[i]] = { ...nested[keys[i]] };
                nested = nested[keys[i]];
            }
            nested[keys[keys.length - 1]] = value;
            return updated;
        });

        const error = contactValidateField(name, value);
        setErrors(prevErrors => {
            const updatedErrors = { ...prevErrors };
            let nestedError = updatedErrors;
            for (let i = 0; i < keys.length - 1; i++) {
                nestedError[keys[i]] = nestedError[keys[i]] || {};
                nestedError = nestedError[keys[i]];
            }
            nestedError[keys[keys.length - 1]] = error;
            return updatedErrors;
        });
    };

    return (
        <>
            {submitting ? <Loader /> : (
                <CardForm
                    onSubmit={handleSubmit}
                    // 🔥 Dynamic button text
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
                    <Col md={12} lg={12} xl={12} xxl={12}>
                        <h5 className='MainTitle'>Current Address</h5>
                    </Col>
                    <Col md={6} lg={6} xl={6} xxl={6}>
                        <InputField
                            label="Address Line 1"
                            name="currentAddress.addressLine1"
                            type="text"
                            placeholder="Enter your Address"
                            error={errors?.currentAddress?.addressLine1}
                            value={formData.currentAddress.addressLine1}
                            handleChange={handleChange}
                            required
                            textarea        // 🔥 this makes it a textarea
                            rows={3}
                            disabled={!isEditMode}   //
                        />
                    </Col>
                    <Col md={6} lg={6} xl={6} xxl={6}>
                        <InputField
                            label="Address Line 2"
                            name="currentAddress.addressLine2"
                            type="text"
                            placeholder="Enter your Address"
                            error={errors?.currentAddress?.addressLine2}
                            value={formData.currentAddress.addressLine2}
                            handleChange={handleChange}
                            required
                            textarea        // 🔥 this makes it a textarea
                            rows={3}
                            disabled={!isEditMode}   //
                        />
                    </Col>
                    <Col md={3} lg={3} xl={3} xxl={3}>
                        <SelectInput
                            label="Country"
                            name="currentAddress.country"
                            options={Country}
                            placeholder="Select Country"
                            error={errors?.currentAddress?.country}
                            value={formData.currentAddress.country}
                            handleChange={handleChange}
                            required
                            disabled={!isEditMode}   //
                        />
                    </Col>
                    <Col md={3} lg={3} xl={3} xxl={3}>
                        <SelectInput
                            label="State"
                            name="currentAddress.state"
                            options={State}
                            placeholder="Select State"
                            error={errors?.currentAddress?.state}
                            value={formData.currentAddress.state}
                            handleChange={handleChange}
                            required
                            disabled={!isEditMode}   //
                        />
                    </Col>
                    <Col md={3} lg={3} xl={3} xxl={3}>
                        <SelectInput
                            label="City"
                            name="currentAddress.city"
                            options={City}
                            placeholder="Select City"
                            error={errors?.currentAddress?.city}
                            value={formData.currentAddress.city}
                            handleChange={handleChange}
                            required
                            disabled={!isEditMode}   //
                        />
                    </Col>
                    <Col md={3} lg={3} xl={3} xxl={3}>
                        <InputField
                            label="Zip Code"
                            name="currentAddress.zipCode"
                            type="text"
                            placeholder="Enter your Zip Code"
                            error={errors?.currentAddress?.zipCode}
                            value={formData.currentAddress.zipCode}
                            handleChange={handleChange}
                            required
                            disabled={!isEditMode}   //
                        />
                    </Col>
                    <Col md={12} lg={12} xl={12} xxl={12}>
                        <h5 className='MainTitle'>Permanent Address</h5>
                    </Col>
                    <Col md={6} lg={6} xl={6} xxl={6}>
                        <InputField
                            label="Address Line 1"
                            name="permanentAddress.addressLine1"
                            type="text"
                            placeholder="Enter your Address"
                            error={errors?.permanentAddress?.addressLine1}
                            value={formData.permanentAddress.addressLine1}
                            handleChange={handleChange}
                            required
                            textarea        // 🔥 this makes it a textarea
                            rows={3}
                            disabled={!isEditMode}   //
                        />
                    </Col>
                    <Col md={6} lg={6} xl={6} xxl={6}>
                        <InputField
                            label="Address Line 2"
                            name="permanentAddress.addressLine2"
                            type="text"
                            placeholder="Enter your Address"
                            error={errors?.permanentAddress?.addressLine2}
                            value={formData.permanentAddress.addressLine2}
                            handleChange={handleChange}
                            required
                            textarea        // 🔥 this makes it a textarea
                            rows={3}
                            disabled={!isEditMode}   //
                        />
                    </Col>
                    <Col md={3} lg={3} xl={3} xxl={3}>
                        <SelectInput
                            label="Country"
                            name="permanentAddress.country"
                            options={Country}
                            placeholder="Select Country"
                            error={errors?.permanentAddress?.country}
                            value={formData.permanentAddress.country}
                            handleChange={handleChange}
                            required
                            disabled={!isEditMode}   //
                        />
                    </Col>
                    <Col md={3} lg={3} xl={3} xxl={3}>
                        <SelectInput
                            label="State"
                            name="permanentAddress.state"
                            options={State}
                            placeholder="Select State"
                            error={errors?.permanentAddress?.state}
                            value={formData.permanentAddress.state}
                            handleChange={handleChange}
                            required
                            disabled={!isEditMode}   //
                        />
                    </Col>
                    <Col md={3} lg={3} xl={3} xxl={3}>
                        <SelectInput
                            label="City"
                            name="permanentAddress.city"
                            options={City}
                            placeholder="Select City"
                            error={errors?.permanentAddress?.city}
                            value={formData.permanentAddress.city}
                            handleChange={handleChange}
                            required
                            disabled={!isEditMode}   //
                        />
                    </Col>
                    <Col md={3} lg={3} xl={3} xxl={3}>
                        <InputField
                            label="Zip Code"
                            name="permanentAddress.zipCode"
                            type="text"
                            placeholder="Enter your Zip Code"
                            error={errors?.permanentAddress?.zipCode}
                            value={formData.permanentAddress.zipCode}
                            handleChange={handleChange}
                            required
                            disabled={!isEditMode}   //
                        />
                    </Col>
                    <Col md={12} lg={12} xl={12} xxl={12}>
                        <h5 className='MainTitle'>Contact Details</h5>
                    </Col>
                    <Col md={3} lg={3} xl={3} xxl={3}>
                        <InputField
                            label="Primary Phone Number"
                            name="primaryMobileNo"
                            type="number"
                            placeholder="Enter your Phone Number"
                            error={errors?.primaryMobileNo}
                            value={formData.primaryMobileNo}
                            handleChange={handleChange}
                            required
                            disabled={!isEditMode}   //
                        />
                    </Col>
                    <Col md={3} lg={3} xl={3} xxl={3}>
                        <InputField
                            label="Alternate Phone Number"
                            name="secondaryMobileNo"
                            type="number"
                            placeholder="Enter your Phone Number"
                            error={errors?.secondaryMobileNo}
                            value={formData.secondaryMobileNo}
                            handleChange={handleChange}
                            required
                            disabled={!isEditMode}   //
                        />
                    </Col>
                    <Col md={3} lg={3} xl={3} xxl={3}>
                        <InputField
                            label="Personal Email Address"
                            name="email"
                            type="text"
                            placeholder="Enter your Email Address"
                            error={errors?.email}
                            value={formData.email}
                            handleChange={handleChange}
                            required
                            disabled={!isEditMode}   //
                        />
                    </Col>
                    <Col md={12} lg={12} xl={12} xxl={12}>
                        <h5 className='MainTitle'>Emergency Contact Details</h5>
                    </Col>
                    <Col md={3} lg={3} xl={3} xxl={3}>
                        <InputField
                            label="Relation Name"
                            name="relationName"
                            type="text"
                            placeholder="Enter your Relation Name"
                            error={errors?.relationName}
                            value={formData.relationName}
                            handleChange={handleChange}
                            required
                            disabled={!isEditMode}   //
                        />
                    </Col>
                    <Col md={3} lg={3} xl={3} xxl={3}>
                        <InputField
                            label="Relationship"
                            name="relationship"
                            type="text"
                            placeholder="Enter your Relationship"
                            error={errors?.relationship}
                            value={formData.relationship}
                            handleChange={handleChange}
                            required
                            disabled={!isEditMode}   //
                        />
                    </Col>
                    <Col md={3} lg={3} xl={3} xxl={3}>
                        <InputField
                            label="Phone Number"
                            name="relationContactNo"
                            type="text"
                            placeholder="Enter your Phone Number"
                            error={errors?.relationContactNo}
                            value={formData.relationContactNo}
                            handleChange={handleChange}
                            required
                            disabled={!isEditMode}   //
                        />
                    </Col>
                    <Col md={3} lg={3} xl={3} xxl={3}>
                        <InputField
                            label="Email Address"
                            name="relationEmail"
                            type="text"
                            placeholder="Enter your Email Address"
                            error={errors?.relationEmail}
                            value={formData.relationEmail}
                            handleChange={handleChange}
                            required
                            disabled={!isEditMode}   //
                        />
                    </Col>
                    <Col md={3} lg={3} xl={3} xxl={3}>
                        <InputField
                            label="Address (optional but helpful)"
                            name="relationAddress"
                            type="text"
                            placeholder="Enter your Address"
                            error={errors?.relationAddress}
                            value={formData.relationAddress}
                            handleChange={handleChange}
                            required
                            disabled={!isEditMode}   //
                        />
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

export default Contact

// const BootstrapStyles = () => null