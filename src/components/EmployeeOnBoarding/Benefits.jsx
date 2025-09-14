import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardForm, CustomToast, PrimaryGird, CustomModalConfirmDialog, InputField, OffCanvas } from '../../pages/Props.jsx';
import { useLoginUser } from '../../context/LoginUserContext.jsx';
import Images from '../../pages/Images.jsx';
import {benefitsValidateField} from '../Validations/Validate.jsx';
import Loader from '../Common/Loader.jsx';
import { createOrUpdateEmployeeBenefits, deleteEmployeeBenefit, getEmployeeBenefits } from '../../api/index.js';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, ToastContainer, Tab, Tabs, Button, Table } from 'react-bootstrap';

// Bootstrap imports

const Benefits = () => {

  const [showWorkBenefitsCanvas, setShowBenefitsCanvas] = useState(false);
  const handleShowBenefitsCanvas = () => setShowBenefitsCanvas(true);
  const handleCloseBenefitsCanvas = () => setShowBenefitsCanvas(false);

  const [empBenefits, setEmpBenefits] = useState([])
  const [submitting, setSubmitting] = useState(false);

  const { loginUser } = useLoginUser();
  const [toastList, setToastList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [benefitToDelete, setBenefitToDelete] = useState(null);
  const [indexToDelete, setIndexToDelete] = useState(null);

  const handleToastClose = (index) => {
    const updatedList = toastList.filter((_, i) => i !== index);
    setToastList(updatedList);
  };

  const handleClearClick = () => {
    setModalShow(false);
    setBenefitToDelete(null); // If you’re using employeeToDelete state
  };

   // FormData Validations

  const [formData, setFormData] = useState({
    _id: '',
    name: '',
    relationship: '',
    gender: '',
    idNumber: '',
    DoB: '',
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
        name: formData.name,
        relationship: formData.relationship,
        gender: formData.gender,
        idNumber: formData.idNumber,
        DoB: formData.DoB
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
        _id: '',       // reset _id also
        name: '',
        relationship: '',
        gender: '',
        idNumber: '',
        DoB: '',
      });

      setEditingIndex(null);
      setShowBenefitsCanvas(false);
    }
  };

  useEffect(() => {
    const fetchBenefitDetial = async () => {
      try {
        const response = await getEmployeeBenefits(loginUser.token);
        if (!response.data.benefits) {
          console.log("No Data Found");
          return;
        }
        setEmpBenefits(response.data.benefits);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBenefitDetial();
  }, [loginUser.token]);

  const fetchBenefits = async () => {
    try {
      const response = await getEmployeeBenefits(loginUser.token);
      if (!response.data.experiences) {
        console.log("No Data Found");
        return;
      }
      setEmpBenefits(response.data.experiences);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSaveAll = async () => {
    try {
      setSubmitting(true);

      if (empBenefits.length === 0) {
        setToastList((prev) => [
          ...prev,
          { title: "Info", message: "No Benefit details to save", type: "error" },
        ]);
        return;
      }

      const apiData = {
        benefits: empBenefits.map(benefit => ({
          _id: benefit._id || undefined,  // ✅ keep id for update
          name: benefit.name,
          relationship: benefit.relationship,
          gender: benefit.gender,
          idNumber: benefit.idNumber,
          DoB: benefit.DoB
        }))
      };

      console.log("Payload sending to API:", apiData);

      await createOrUpdateEmployeeBenefits(apiData, loginUser.token);

      setToastList((prev) => [
        ...prev,
        { title: "Success", message: "Benefits saved successfully!", type: "success" },
      ]);

      await fetchBenefits(); // ✅ Refresh from DB so state matches server
    } catch (error) {
      //console.error("Error saving benefits:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    const error = benefitsValidateField(name, value);
    setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
  };

  const handleEdit = (index) => {
    const beni = empBenefits[index];

    setFormData({
      _id: beni._id || '',
      name: beni.name || '',
      relationship: beni.relationship || '',
      gender: beni.gender || '',
      idNumber: beni.idNumber || '',
      DoB: beni.DoB || '',
    });
    setEditingIndex(index);
    setShowBenefitsCanvas  (true);
  };

  const handleDeleteBenefit = async () => {
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


  const navigate = useNavigate();

  return (
    <>
      {submitting ? <Loader /> : (
        <CardForm
          onSubmit={handleSaveAll}
          footerButtonSubmit="Save"
          footerButtonSubmitClass="primary_form_btn btn_h_35"
        >
          <Col md={12} lg={12} xl={12} xxl={12}>
            <PrimaryGird
              cardTitle="Dependents"
              buttonText="Add Benefits"
              showAddButton={true}
              showFilterButton={false}
              showDeleteButton={false}
              showFooter={false}
              onButtonClick={handleShowBenefitsCanvas}
              tableHeaders={['Name', 'Relationship', 'Gender', 'ID Number', 'Date of Birth', 'Actions']}
            >
              {submitting ? (
                <Loader />
              ) : (
                Array.isArray(empBenefits) && empBenefits.length > 0 ? (
                  empBenefits.map((benefit, index) => {
                    return (
                      <tr key={benefit._id || index}>
                        <td>{benefit.name}</td>
                        <td>{benefit.relationship}</td>
                        <td>{benefit.gender}</td>
                        <td>{benefit.idNumber}</td>
                        <td>{benefit.DoB}</td>
                        <td className='table_action'>
                          <Button
                            className="btn_action"
                            onClick={() => handleEdit(index)}>
                            <img src={Images.Edit} alt="" />
                          </Button>
                          <Button
                            className="btn_action"
                            onClick={() => {
                              setBenefitToDelete(benefit);
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
                      No Experience Details Added
                    </td>
                  </tr>
                )
              )}
            </PrimaryGird>
          </Col>
        </CardForm>
      )}
      <OffCanvas
        show={showWorkBenefitsCanvas}
        placement="end"
        onSubmit={handleSubmit}
        onHide={handleCloseBenefitsCanvas}
        title={editingIndex !== null ? "Update Work Experience" : "Add Work Experience"}
        subtitle={editingIndex !== null ? "Update the details of your work experience." : "Add your past work experience."}
        className='PrimaryCanvasModal'
        name={editingIndex !== null ? "Update Experience" : "Add Experience"}
        footerButtonSubmit={editingIndex !== null ? "Update Experience" : "Add Experience"}
        footerButtonCancel="Cancel"
        footerButtonSubmitClass="modal_primary_btn w-100"
        footerButtonCancelClass="modal_primary_border_btn w-100"
      >
        <Col md={6} lg={6} xl={6} xxl={6}>
          <InputField
            label="Name"
            type="text"
            placeholder="Enter your Name"
            controlId="name"
            name="name"
            error={errors.name}
            value={formData.name}
            handleChange={handleChange}
            required
          />
        </Col>
        <Col md={6} lg={6} xl={6} xxl={6}>
          <InputField
            label="Relationship"
            type="text"
            placeholder="Enter your Relationship"
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
            label="Gender"
            type="text"
            placeholder="Enter your Gender"
            controlId="gender	"
            name="gender"
            error={errors.gender}
            value={formData.gender}
            handleChange={handleChange}
            required
          />
        </Col>
        <Col md={6} lg={6} xl={6} xxl={6}>
          <InputField
            label="ID Number"
            type="text"
            placeholder="Enter your ID Number"
            controlId="idNumber"
            name="idNumber"
            error={errors.idNumber}
            value={formData.idNumber}
            handleChange={handleChange}
            required
          />
        </Col>
        <Col md={6} lg={6} xl={6} xxl={6}>
          <InputField
            label="Date of Birth"
            type="date"
            placeholder="Enter your Date of Birth"
            controlId="DoB"
            name="DoB"
            error={errors.DoB}
            value={formData.DoB}
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
              {benefitToDelete && (
                <div className='ConfirmContent'>
                  <h5>Delete Benefit</h5>
                  <p>Are you sure you want to delete this Benefit <span>{`${benefitToDelete.name}`}</span>? This action cannot be undo.</p>
                </div>
              )}
            </div>
          </>
        }
        onSubmit={handleDeleteBenefit}
        footerButtonSubmit="Delete"
        footerButtonCancel="Cancel"
        footerButtonSubmitClass="modal_danger_btn"
        footerButtonCancelClass="modal_primary_border_btn"
      />
    </>
  )
}

export default Benefits