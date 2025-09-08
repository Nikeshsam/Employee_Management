import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CardForm,
  CustomToast,
  PrimaryGird,
  CustomModalConfirmDialog,
  InputField,
  SelectInput,
  OffCanvas
} from '../../pages/Props.jsx';
import { useLoginUser } from '../../context/LoginUserContext.jsx';
import Images from '../../pages/Images.jsx';
import { passportValidateField, visaValidateField } from '../Validations/Validate.jsx';
import Loader from '../Common/Loader.jsx';

// ✅ API calls (assumed imported)
import {
  getEmployeeTravelRecord,
  createOrUpdateEmployeeTravelDetails,
  deleteEmployeeVisaDetails
} from '../../api/index.js'; // replace with your actual api file

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, ToastContainer, Tab, Tabs, Button, Table } from 'react-bootstrap';

// Bootstrap imports

const Travel = () => {

  const navigate = useNavigate();
  const { loginUser } = useLoginUser();

  // canvas

  const [showVisaCanvas, setShowVisaCanvas] = useState(false);
  const handleShowVisaCanvas = () => setShowVisaCanvas(true);
  const handleCloseVisaCanvas = () => setShowVisaCanvas(false);

  const [Visas, setVisas] = useState([])
  const [submitting, setSubmitting] = useState(false);

  // FORM INPUT

  // FormData Validations

  const [PassportFormData, setPassportFormData] = useState({
    passportNo: '',
    issuedBy: '',
    issueDate: '',
    expiryDate: '',
  });

  const [VisaFormData, setVisaFormData] = useState({
    visaNumber: '',
    issuedDate: '',
    placeOfIssue: '',
    expiryDate: '',
    notes: '',
  });

  // errors

  const [PassportErrors, setPassportErrors] = useState({});
  const [VisaErrors, setVisaErrors] = useState({});

  // misc
  const [toastList, setToastList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [visaToDelete, setVisaToDelete] = useState(null);
  const [indexToDelete, setIndexToDelete] = useState(null);

  // --- Toast ---
  const handleToastClose = (index) => {
    setToastList((prev) => prev.filter((_, i) => i !== index));
  };

  //  Validate Form with Error

  const validatePassportForm = () => {
    const newErrors = {};
    Object.keys(PassportFormData).forEach((field) => {
      const error = passportValidateField(field, PassportFormData[field]);
      if (error) newErrors[field] = error;
    });
    setPassportErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateVisaForm = () => {
    const newErrors = {};
    Object.keys(VisaFormData).forEach((field) => {
      const error = visaValidateField(field, VisaFormData[field]);
      if (error) newErrors[field] = error;
    });
    setVisaErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //  Handle Submit

  const handleCanvasSubmit = (e) => {
    e.preventDefault();
    if (!validateVisaForm()) return;

    const newVisa = {
      _id: VisaFormData._id || '',
      visaNumber: VisaFormData.visaNumber,
      issuedDate: VisaFormData.issuedDate,
      placeOfIssue: VisaFormData.placeOfIssue,
      expiryDate: VisaFormData.expiryDate,
      notes: VisaFormData.notes,
    };

    if (editingIndex !== null) {
      setVisas((prev) =>
        prev.map((item, idx) => (idx === editingIndex ? newVisa : item))
      );
      setToastList((prev) => [
        ...prev,
        { title: "Success", message: "Vaccination updated successfully!", type: "success" }
      ]);
    } else {
      setVisas((prev) => [...prev, newVisa]);
      setToastList((prev) => [
        ...prev,
        { title: "Success", message: "Vaccination added successfully!", type: "success" }
      ]);
    }

    // reset form
    setVisaFormData({ _id: '', visaNumber: '', issuedDate: '', placeOfIssue: '', expiryDate: '', notes:'' });
    setEditingIndex(null);
    setShowVisaCanvas(false);
  };

  // --- Edit Vaccination ---
  const handleEdit = (index) => {
    const vacci = empVaccinations[index];
    setVisaFormData({
      _id: vacci._id || '',
      vaccinationName: vacci.vaccinationName || '',
      dateofDose: vacci.dateofDose || '',
    });
    setEditingIndex(index);
    setShowVisaCanvas(true);
  };

  // --- Delete Vaccination ---
  const handleDeleteVisa = async () => {
    const member = empVaccinations[indexToDelete];
    setVisas((prev) => prev.filter((_, i) => i !== indexToDelete));

    if (member._id) {
      try {
        await deleteEmployeeVisaDetails(member._id, loginUser.token);
        setToastList((prev) => [
          ...prev,
          { title: "Success", message: "Vaccination deleted successfully", type: "success" }
        ]);
      } catch (err) {
        console.error(err);
      }
    } else {
      setToastList((prev) => [
        ...prev,
        { title: "Info", message: "Vaccination deleted locally", type: "success" }
      ]);
    }

    setModalShow(false);
    setVisaToDelete(null);
    setIndexToDelete(null);
  };

  // --- Fetch from API ---

  useEffect(() => {

    const fetchVisa = async () => {
      try {
        const response = await getEmployeeHealthRecord(loginUser.token);
        if (response.data.passportFormData) {
          // Set health form fields if present
          setPassportFormData({
            passportNo: response.data.passportFormData.passportNo || '',
            issuedBy: !!response.data.passportFormData.issuedBy,
            issueDate: response.data.passportFormData.issueDate || '',
            expiryDate: response.data.passportFormData.expiryDate || '',
          });
          // Set vaccinations if present
          if (Array.isArray(response.data.passportFormData.empVisa)) {
            setEmpVaccination(response.data.passportFormData.empVisa);
          } else {
            setEmpVaccination([]);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchVisa();
  }, [loginUser.token]);

  // --- Save All to API ---
  const handleSaveAll = async () => {
    if (!validatePassportForm()) return;
    try {
      setSubmitting(true);

      const apiData = {
        ...PassportFormData,
        empVisa: Visas.map((v) => ({
          _id: v._id || undefined,
          visaNumber: v.visaNumber,
          issuedDate: v.issuedDate,
          placeOfIssue: v.placeOfIssue,
          expiryDate: v.expiryDate,
          notes: v.notes,
        })),
      };

      await createOrUpdateEmployeeTravelDetails(apiData, loginUser.token);
      setToastList((prev) => [
        ...prev,
        { title: "Success", message: "Health record saved successfully!", type: "success" }
      ]);
      await fetchVisa();
    } catch (err) {
      console.error("Error saving health record:", err);
    } finally {
      setSubmitting(false);
    }
  };

  //  Handle Passport Change

  const handlePassportChange = (e) => {
    const { name, value } = e.target;
    setPassportFormData(prev => ({ ...prev, [name]: value }));
    const error = passportValidateField(name, value);
    setPassportErrors(prevErrors => ({ ...prevErrors, [name]: error }));
  };

  const handleVisaChange = (e) => {
    const { name, value } = e.target;
    setVisaFormData(prev => ({ ...prev, [name]: value }));
    const error = visaValidateField(name, value);
    setVisaErrors(prevErrors => ({ ...prevErrors, [name]: error }));
  };



  return (
    <>
      <CardForm
        onSubmit={handleSaveAll}
        footerButtonSubmit="Save And Submit"
        footerButtonSubmitClass="primary_form_btn btn_h_35"
      >
        <Col md={12} lg={12} xl={12} xxl={12}>
          <h5 className='MainTitle'>Passport Details</h5>
        </Col>
        <Col md={3} lg={3} xl={3} xxl={3}>
          <InputField
            label="Passport No"
            name="passportno"
            type="text"
            placeholder="Enter your Passport No"
            error={PassportErrors.passportno}
            value={PassportFormData.passportno}
            handleChange={handlePassportChange}
            required
          />
        </Col>
        <Col md={3} lg={3} xl={3} xxl={3}>
          <InputField
            label="Issued By"
            name="issuedby"
            type="text"
            placeholder="Enter your Issued By"
            error={PassportErrors.issuedby}
            value={PassportFormData.issuedby}
            handleChange={handlePassportChange}
            required
          />
        </Col>
        <Col md={3} lg={3} xl={3} xxl={3}>
          <InputField
            label="Date of Issue"
            name="dateofissue"
            type="date"
            placeholder="Enter your Date of Issue"
            error={PassportErrors.dateofissue}
            value={PassportFormData.dateofissue}
            handleChange={handlePassportChange}
            required
          />
        </Col>
        <Col md={3} lg={3} xl={3} xxl={3}>
          <InputField
            label="Date of Expiry"
            name="dateexpiry"
            type="date"
            placeholder="Enter your Date of Expiry"
            error={PassportErrors.dateexpiry}
            value={PassportFormData.dateexpiry}
            handleChange={handlePassportChange}
            required
          />
        </Col>
        <Col md={12} lg={12} xl={12} xxl={12}>
          <PrimaryGird
            cardTitle="Visa Details"
            buttonText="Add Visa"
            showAddButton={true}
            showFilterButton={false}
            showDeleteButton={false}
            showFooter={false}
            onButtonClick={handleShowVisaCanvas}
            tableHeaders={['Visa Number', 'Issued Date', 'Place of Issue', 'Expiry Date', 'Notes', 'Action']}
          >
            {Array.isArray(Visas) && Visas.length > 0 ? (
              Visas.map((Visa, index) => (
                <tr key={Visa._id || index}>
                  <td>{Visa.visaNumber}</td>
                  <td>{Visa.issuedDate}</td>
                  <td>{Visa.placeOfIssue}</td>
                  <td>{Visa.expiryDate}</td>
                  <td>{Visa.notes}</td>
                  <td className='table_action'>
                    <Button className="btn_action" onClick={() => handleEdit(index)}>
                      <img src={Images.Edit} alt="" />
                    </Button>
                    <Button className="btn_action"
                      onClick={() => {
                        setVaccinationToDelete(vaccination);
                        setIndexToDelete(index);
                        setModalShow(true);
                      }}
                    >
                      <img src={Images.Delete} alt="" />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  No Vaccination Records Added
                </td>
              </tr>
            )}
          </PrimaryGird>
        </Col>
      </CardForm>

      <OffCanvas
        show={showVisaCanvas}
        placement="end"
        onSubmit={handleCanvasSubmit}
        onHide={handleCloseVisaCanvas}
        title="Add Vaccination"
        subtitle="Start your 7-day free trial."
        className='PrimaryCanvasModal'
        name="Add Vaccination"
        footerButtonSubmit="Add Vaccination"
        footerButtonCancel="Cancel"
        footerButtonSubmitClass="modal_primary_btn w-100"
        footerButtonCancelClass="modal_primary_border_btn w-100"
      >
        <Col md={6} lg={6} xl={6} xxl={6}>
          <InputField
            label="Visa Number"
            type="text"
            placeholder="Enter your Visa Number"
            controlId="visaNumber"
            name="visaNumber"
            error={VisaErrors.visaNumber}
            value={VisaFormData.visaNumber}
            handleChange={handleVisaChange}
            required
          />
        </Col>
        <Col md={6} lg={6} xl={6} xxl={6}>
          <InputField
            label="Issued Date"
            type="date"
            placeholder="Enter your Issued Date"
            controlId="issuedDate"
            name="issuedDate"
            error={VisaErrors.issuedDate}
            value={VisaFormData.issuedDate}
            handleChange={handleVisaChange}
            required
          />
        </Col>
        <Col md={6} lg={6} xl={6} xxl={6}>
          <InputField
            label="Place of Issue"
            type="text"
            placeholder="Enter your Place of Issue"
            controlId="placeOfIssue"
            name="placeOfIssue"
            error={VisaErrors.placeOfIssue}
            value={VisaFormData.placeOfIssue}
            handleChange={handleVisaChange}
            required
          />
        </Col>
        <Col md={6} lg={6} xl={6} xxl={6}>
          <InputField
            label="Expiry Date"
            type="date"
            placeholder="Enter your expirydate"
            controlId="expiryDate"
            name="expiryDate"
            error={VisaErrors.expiryDate}
            value={VisaFormData.expiryDate}
            handleChange={handleVisaChange}
            required
          />
        </Col>
        <Col md={6} lg={6} xl={6} xxl={6}>
          <InputField
            label="Notes"
            type="text"
            placeholder="Enter your Notes"
            controlId="notes"
            name="notes"
            error={VisaErrors.notes}
            value={VisaFormData.notes}
            handleChange={handleVisaChange}
            required
          />
        </Col>
      </OffCanvas>

      {/* --- Toast --- */}
      <ToastContainer position="top-end" className="p-3">
        {toastList.map((toast, index) => (
          <CustomToast
            key={index}
            title={toast.title}
            message={toast.message}
            type={toast.type}
            onClose={() => handleToastClose(index)}
          />
        ))}
      </ToastContainer>

      {/* --- Confirm Delete Modal --- */}
      <CustomModalConfirmDialog
        show={modalShow}
        onHide={() => setModalShow(false)}
        title="Delete Vaccination"
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
            {visaToDelete && (
              <div className="ConfirmContent">
                <h5>Delete Vaccination</h5>
                <p>
                  Are you sure you want to delete vaccination{" "}
                  <span>{visaToDelete.vaccinationName}</span>? This action cannot be undone.
                </p>
              </div>
            )}
          </div>
        }
        onSubmit={handleDeleteVisa}
        footerButtonSubmit="Delete"
        footerButtonCancel="Cancel"
        footerButtonSubmitClass="modal_danger_btn"
        footerButtonCancelClass="modal_primary_border_btn"
      />
    </>
  )
}

export default Travel