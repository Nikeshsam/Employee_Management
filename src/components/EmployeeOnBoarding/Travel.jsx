import React, { useState, useEffect, useCallback } from 'react';
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

const Travel = () => {
  const navigate = useNavigate();
  const { loginUser } = useLoginUser();

  // canvas
  const [showVisaCanvas, setShowVisaCanvas] = useState(false);
  const handleShowVisaCanvas = () => setShowVisaCanvas(true);
  const handleCloseVisaCanvas = () => {
    setShowVisaCanvas(false);
    setVisaFormData({
      _id: '',
      visaNumber: '',
      issuedDate: '',
      placeOfIssue: '',
      expiryDate: '',
      notes: ''
    });
    setVisaErrors({});
    setEditingIndex(null);
  };

  const [Visas, setVisas] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  // FORM INPUT
  const [PassportFormData, setPassportFormData] = useState({
    passportNo: '',
    issuedBy: '',
    issueDate: '',
    expiryDate: ''
  });

  const [VisaFormData, setVisaFormData] = useState({
    _id: '',
    visaNumber: '',
    issuedDate: '',
    placeOfIssue: '',
    expiryDate: '',
    notes: ''
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

  // --- Fetch from API (extracted so other functions can call it) ---
  const fetchVisa = useCallback(async () => {
    try {
      const response = await getEmployeeTravelRecord(loginUser.token);
      const data = response?.data || {};
      if (data.passportFormData) {
        setPassportFormData({
          passportNo: data.passportFormData.passportNo || '',
          issuedBy: data.passportFormData.issuedBy || '',
          issueDate: data.passportFormData.issueDate || '',
          expiryDate: data.passportFormData.expiryDate || ''
        });
        if (Array.isArray(data.passportFormData.empVisa)) {
          setVisas(data.passportFormData.empVisa);
        } else {
          setVisas([]);
        }
      }
    } catch (err) {
      console.error('Error fetching travel record:', err);
    }
  }, [loginUser.token]);

  useEffect(() => {
    if (loginUser?.token) {
      fetchVisa();
    }
  }, [loginUser?.token, fetchVisa]);

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

  //  Handle Submit for Add/Edit Visa (canvas)
  const handleCanvasSubmit = (e) => {
    e.preventDefault();
    if (!validateVisaForm()) return;

    const newVisa = {
      _id: VisaFormData._id || '',
      visaNumber: VisaFormData.visaNumber,
      issuedDate: VisaFormData.issuedDate,
      placeOfIssue: VisaFormData.placeOfIssue,
      expiryDate: VisaFormData.expiryDate,
      notes: VisaFormData.notes
    };

    if (editingIndex !== null) {
      setVisas((prev) =>
        prev.map((item, idx) => (idx === editingIndex ? newVisa : item))
      );
      setToastList((prev) => [
        ...prev,
        { title: 'Success', message: 'Visa updated successfully!', type: 'success' }
      ]);
    } else {
      setVisas((prev) => [...prev, newVisa]);
      setToastList((prev) => [
        ...prev,
        { title: 'Success', message: 'Visa added successfully!', type: 'success' }
      ]);
    }

    // reset form & close
    setVisaFormData({ _id: '', visaNumber: '', issuedDate: '', placeOfIssue: '', expiryDate: '', notes: '' });
    setEditingIndex(null);
    setShowVisaCanvas(false);
  };

  // --- Edit Visa ---
  const handleEdit = (index) => {
    const visa = Visas[index];
    if (!visa) return;
    setVisaFormData({
      _id: visa._id || '',
      visaNumber: visa.visaNumber || '',
      issuedDate: visa.issuedDate || '',
      placeOfIssue: visa.placeOfIssue || '',
      expiryDate: visa.expiryDate || '',
      notes: visa.notes || ''
    });
    setEditingIndex(index);
    setShowVisaCanvas(true);
  };

  // --- Prepare Delete Visa (open modal) ---
  const prepareDeleteVisa = (index) => {
    const visa = Visas[index];
    setVisaToDelete(visa || null);
    setIndexToDelete(index);
    setModalShow(true);
  };

  // --- Delete Visa ---
  const handleDeleteVisa = async () => {
    const member = Visas[indexToDelete];
    // optimistically remove from UI
    setVisas((prev) => prev.filter((_, i) => i !== indexToDelete));

    if (member?._id) {
      try {
        await deleteEmployeeVisaDetails(member._id, loginUser.token);
        setToastList((prev) => [
          ...prev,
          { title: 'Success', message: 'Visa deleted successfully', type: 'success' }
        ]);
      } catch (err) {
        console.error(err);
        setToastList((prev) => [
          ...prev,
          { title: 'Error', message: 'Failed to delete visa on server', type: 'error' }
        ]);
      }
    } else {
      setToastList((prev) => [
        ...prev,
        { title: 'Info', message: 'Visa deleted locally', type: 'info' }
      ]);
    }

    setModalShow(false);
    setVisaToDelete(null);
    setIndexToDelete(null);
  };

  // --- Save All to API ---
  const handleSaveAll = async () => {
    if (!validatePassportForm()) return;
    try {
      setSubmitting(true);

      const apiData = {
        passportNo: PassportFormData.passportNo,
        issuedBy: PassportFormData.issuedBy,
        issueDate: PassportFormData.issueDate,
        expiryDate: PassportFormData.expiryDate,
        empVisa: Visas.map((v) => ({
          _id: v._id || undefined,
          visaNumber: v.visaNumber,
          issuedDate: v.issuedDate,
          placeOfIssue: v.placeOfIssue,
          expiryDate: v.expiryDate,
          notes: v.notes
        }))
      };

      await createOrUpdateEmployeeTravelDetails(apiData, loginUser.token);
      setToastList((prev) => [
        ...prev,
        { title: 'Success', message: 'Travel record saved successfully!', type: 'success' }
      ]);
      // re-fetch from server to keep local state authoritative
      await fetchVisa();
    } catch (err) {
      console.error('Error saving travel record:', err);
      setToastList((prev) => [
        ...prev,
        { title: 'Error', message: 'Failed to save travel record', type: 'error' }
      ]);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <CardForm
        onSubmit={handleSaveAll}
        footerButtonSubmit="Save And Submit"
        footerButtonSubmitClass="primary_form_btn btn_h_35"
      >
        <Col md={12}>
          <h5 className="MainTitle">Passport Details</h5>
        </Col>

        <Col md={3}>
          <InputField
            label="Passport No"
            name="passportNo"
            type="text"
            placeholder="Enter your Passport No"
            error={PassportErrors.passportNo}
            value={PassportFormData.passportNo}
            handleChange={handlePassportChange}
            required
          />
        </Col>

        <Col md={3}>
          <InputField
            label="Issued By"
            name="issuedBy"
            type="text"
            placeholder="Enter Issued By"
            error={PassportErrors.issuedBy}
            value={PassportFormData.issuedBy}
            handleChange={handlePassportChange}
            required
          />
        </Col>

        <Col md={3}>
          <InputField
            label="Date of Issue"
            name="issueDate"
            type="date"
            placeholder="Enter Date of Issue"
            error={PassportErrors.issueDate}
            value={PassportFormData.issueDate}
            handleChange={handlePassportChange}
            required
          />
        </Col>

        <Col md={3}>
          <InputField
            label="Date of Expiry"
            name="expiryDate"
            type="date"
            placeholder="Enter Date of Expiry"
            error={PassportErrors.expiryDate}
            value={PassportFormData.expiryDate}
            handleChange={handlePassportChange}
            required
          />
        </Col>

        <Col md={12}>
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
              Visas.map((visa, index) => (
                <tr key={visa._id || index}>
                  <td>{visa.visaNumber}</td>
                  <td>{visa.issuedDate}</td>
                  <td>{visa.placeOfIssue}</td>
                  <td>{visa.expiryDate}</td>
                  <td>{visa.notes}</td>
                  <td className="table_action">
                    <Button className="btn_action" onClick={() => handleEdit(index)}>
                      <img src={Images.Edit} alt="Edit" />
                    </Button>
                    <Button
                      className="btn_action"
                      onClick={() => {
                        prepareDeleteVisa(index);
                      }}
                    >
                      <img src={Images.Delete} alt="Delete" />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center' }}>
                  No Visa Records Added
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
        title={editingIndex !== null ? 'Edit Visa' : 'Add Visa'}
        subtitle=""
        className="PrimaryCanvasModal"
        name={editingIndex !== null ? 'Edit Visa' : 'Add Visa'}
        footerButtonSubmit={editingIndex !== null ? 'Update Visa' : 'Add Visa'}
        footerButtonCancel="Cancel"
        footerButtonSubmitClass="modal_primary_btn w-100"
        footerButtonCancelClass="modal_primary_border_btn w-100"
      >
        <Col md={6}>
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

        <Col md={6}>
          <InputField
            label="Issued Date"
            type="date"
            placeholder="Enter Issued Date"
            controlId="issuedDate"
            name="issuedDate"
            error={VisaErrors.issuedDate}
            value={VisaFormData.issuedDate}
            handleChange={handleVisaChange}
            required
          />
        </Col>

        <Col md={6}>
          <InputField
            label="Place of Issue"
            type="text"
            placeholder="Enter Place of Issue"
            controlId="placeOfIssue"
            name="placeOfIssue"
            error={VisaErrors.placeOfIssue}
            value={VisaFormData.placeOfIssue}
            handleChange={handleVisaChange}
            required
          />
        </Col>

        <Col md={6}>
          <InputField
            label="Expiry Date"
            type="date"
            placeholder="Enter Expiry Date"
            controlId="expiryDate"
            name="expiryDate"
            error={VisaErrors.expiryDate}
            value={VisaFormData.expiryDate}
            handleChange={handleVisaChange}
            required
          />
        </Col>

        <Col md={12}>
          <InputField
            label="Notes"
            type="text"
            placeholder="Enter Notes"
            controlId="notes"
            name="notes"
            error={VisaErrors.notes}
            value={VisaFormData.notes}
            handleChange={handleVisaChange}
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
        title="Delete Visa"
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
                <h5>Delete Visa</h5>
                <p>
                  Are you sure you want to delete visa{' '}
                  <span>{visaToDelete.visaNumber}</span>? This action cannot be undone.
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
  );
};

export default Travel;
