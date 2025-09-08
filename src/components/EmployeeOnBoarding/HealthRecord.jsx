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
import { healthValidateField, vaccinationValidateField } from '../Validations/Validate.jsx';
import ComboDate from '../../data/Combo.json';
import 'bootstrap/dist/css/bootstrap.css';
import { Col, Form, ToastContainer, Button } from 'react-bootstrap';
import Loader from '../Common/Loader.jsx';

// ✅ API calls (assumed imported)
import {
  getEmployeeHealthRecord,
  createOrUpdateEmployeeHealthRecord,
  deleteEmployeeVaccinationRecord
} from '../../api/index.js'; // replace with your actual api file

const HealthRecord = () => {
  const navigate = useNavigate();
  const { loginUser } = useLoginUser();

  // canvas
  const [showVaccinationCanvas, setShowVaccinationCanvas] = useState(false);
  const handleShowVaccinationCanvas = () => setShowVaccinationCanvas(true);
  const handleCloseVaccinationCanvas = () => setShowVaccinationCanvas(false);

  // data
  const [empVaccinations, setEmpVaccination] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  // form states
  const [healthFormData, setHealthFormData] = useState({
    bloodGroup: '',
    isBloodDonor: '',
    allergies: '',
    preExistingIllnesses: '',
  });

  const [vaccinationFormData, setVaccinationFormData] = useState({
    _id: '',
    vaccinationName: '',
    dateofDose: '',
  });

  // errors
  const [healthErrors, setHealthErrors] = useState({});
  const [vaccinationErrors, setVaccinationErrors] = useState({});

  // misc
  const [toastList, setToastList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [vaccinationToDelete, setVaccinationToDelete] = useState(null);
  const [indexToDelete, setIndexToDelete] = useState(null);

  const [BloodGroup] = useState(ComboDate.BloodGroup);

  // --- Toast ---
  const handleToastClose = (index) => {
    setToastList((prev) => prev.filter((_, i) => i !== index));
  };

  // --- Validations ---
  const validateHealthForm = () => {
    const newErrors = {};
    Object.keys(healthFormData).forEach((field) => {
      const error = healthValidateField(field, healthFormData[field]);
      if (error) newErrors[field] = error;
    });
    setHealthErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateVaccinationForm = () => {
    const newErrors = {};
    Object.keys(vaccinationFormData).forEach((field) => {
      const error = vaccinationValidateField(field, vaccinationFormData[field]);
      if (error) newErrors[field] = error;
    });
    setVaccinationErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- Handle Top Form Change ---
  const handleHealthChange = (e) => {
    const { name, type, checked, value } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    setHealthFormData((prev) => ({ ...prev, [name]: fieldValue }));
    const error = healthValidateField(name, fieldValue);
    setHealthErrors((prev) => ({ ...prev, [name]: error }));
  };

  // --- Handle Vaccination Change ---
  const handleVaccinationChange = (e) => {
    const { name, value } = e.target;
    setVaccinationFormData((prev) => ({ ...prev, [name]: value }));
    const error = vaccinationValidateField(name, value);
    setVaccinationErrors((prev) => ({ ...prev, [name]: error }));
  };

  // --- Submit Vaccination Canvas ---
  const handleCanvasSubmit = (e) => {
    e.preventDefault();
    if (!validateVaccinationForm()) return;

    const newVaccination = {
      _id: vaccinationFormData._id || '',
      vaccinationName: vaccinationFormData.vaccinationName,
      dateofDose: vaccinationFormData.dateofDose,
    };

    if (editingIndex !== null) {
      setEmpVaccination((prev) =>
        prev.map((item, idx) => (idx === editingIndex ? newVaccination : item))
      );
      setToastList((prev) => [
        ...prev,
        { title: "Success", message: "Vaccination updated successfully!", type: "success" }
      ]);
    } else {
      setEmpVaccination((prev) => [...prev, newVaccination]);
      setToastList((prev) => [
        ...prev,
        { title: "Success", message: "Vaccination added successfully!", type: "success" }
      ]);
    }

    // reset form
    setVaccinationFormData({ _id: '', vaccinationName: '', dateofDose: '' });
    setEditingIndex(null);
    setShowVaccinationCanvas(false);
  };

  // --- Edit Vaccination ---
  const handleEdit = (index) => {
    const vacci = empVaccinations[index];
    setVaccinationFormData({
      _id: vacci._id || '',
      vaccinationName: vacci.vaccinationName || '',
      dateofDose: vacci.dateofDose || '',
    });
    setEditingIndex(index);
    setShowVaccinationCanvas(true);
  };

  // --- Delete Vaccination ---
  const handleDeleteVaccination = async () => {
    const member = empVaccinations[indexToDelete];
    setEmpVaccination((prev) => prev.filter((_, i) => i !== indexToDelete));

    if (member._id) {
      try {
        await deleteEmployeeVaccinationRecord(member._id, loginUser.token);
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
    setVaccinationToDelete(null);
    setIndexToDelete(null);
  };

  // --- Fetch from API ---

  useEffect(() => {

    const fetchVisa = async () => {
      try {
        const response = await getEmployeeHealthRecord(loginUser.token);
        if (response.data.healthRecord) {
          // Set health form fields if present
          setHealthFormData({
            bloodGroup: response.data.healthRecord.bloodGroup || '',
            isBloodDonor: !!response.data.healthRecord.isBloodDonor,
            allergies: response.data.healthRecord.allergies || '',
            preExistingIllnesses: response.data.healthRecord.preExistingIllnesses || '',
          });
          // Set vaccinations if present
          if (Array.isArray(response.data.healthRecord.vaccinations)) {
            setEmpVaccination(response.data.healthRecord.vaccinations);
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
    if (!validateHealthForm()) return;
    try {
      setSubmitting(true);

      const apiData = {
        ...healthFormData,
        vaccinations: empVaccinations.map((v) => ({
          _id: v._id || undefined,
          vaccinationName: v.vaccinationName,
          dateofDose: v.dateofDose,
        })),
      };

      await createOrUpdateEmployeeHealthRecord(apiData, loginUser.token);
      setToastList((prev) => [
        ...prev,
        { title: "Success", message: "Health record saved successfully!", type: "success" }
      ]);
      await fetchVaccination();
    } catch (err) {
      console.error("Error saving health record:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {submitting ? <Loader /> : (
        <CardForm
          onSubmit={handleSaveAll}
          footerButtonSubmit="Save"
          footerButtonSubmitClass="primary_form_btn btn_h_35"
        >
          {/* --- Health Form --- */}
          <Col md={12}><h5 className="MainTitle">Health Details</h5></Col>
          <Col md={3}>
            <SelectInput
              label="Blood Group"
              name="bloodGroup"
              options={BloodGroup}
              placeholder="Select Blood Group"
              error={healthErrors.bloodGroup}
              value={healthFormData.bloodGroup}
              handleChange={handleHealthChange}
              required
            />
          </Col>
          <Col md={3}>
            <div>
              <Form.Label>Blood Donor</Form.Label>
              <Form.Check
                type="switch"
                id="blooddonor-switch"
                name="isBloodDonor"
                checked={healthFormData.isBloodDonor === true}
                onChange={(e) =>
                  handleHealthChange({
                    target: { name: "isBloodDonor", value: e.target.checked },
                  })
                }
              />
              {healthErrors.isBloodDonor && <span className="text-danger">{healthErrors.isBloodDonor}</span>}
            </div>
          </Col>
          <Col md={3}>
            <InputField
              label="Allergy Intolerance"
              name="allergies"
              type="text"
              placeholder="Allergy Intolerance"
              error={healthErrors.allergies}
              value={healthFormData.allergies}
              handleChange={handleHealthChange}
              required
            />
          </Col>
          <Col md={3}>
            <InputField
              label="Pre-Existing Illness"
              name="preExistingIllnesses"
              type="text"
              placeholder="Pre-Existing Illness"
              error={healthErrors.preExistingIllnesses}
              value={healthFormData.preExistingIllnesses}
              handleChange={handleHealthChange}
              required
            />
          </Col>

          {/* --- Vaccination Grid --- */}
          <Col md={12}>
            <PrimaryGird
              cardTitle="Vaccinations"
              buttonText="Add Vaccination"
              showAddButton={true}
              showFilterButton={false}
              showDeleteButton={false}
              showFooter={false}
              onButtonClick={handleShowVaccinationCanvas}
              tableHeaders={['Vaccination Name', 'Date of Dose', 'Actions']}
            >
              {Array.isArray(empVaccinations) && empVaccinations.length > 0 ? (
                empVaccinations.map((vaccination, index) => (
                  <tr key={vaccination._id || index}>
                    <td>{vaccination.vaccinationName}</td>
                    <td>{vaccination.dateofDose}</td>
                    <td className="table_action">
                      <Button className="btn_action" onClick={() => handleEdit(index)}>
                        <img src={Images.Edit} alt="Edit" />
                      </Button>
                      <Button
                        className="btn_action"
                        onClick={() => {
                          setVaccinationToDelete(vaccination);
                          setIndexToDelete(index);
                          setModalShow(true);
                        }}
                      >
                        <img src={Images.Delete} alt="Delete" />
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
      )}

      {/* --- Vaccination OffCanvas --- */}
      <OffCanvas
        show={showVaccinationCanvas}
        placement="end"
        onSubmit={handleCanvasSubmit}
        onHide={handleCloseVaccinationCanvas}
        title={editingIndex !== null ? "Update Vaccination" : "Add Vaccination"}
        subtitle={editingIndex !== null ? "Update your vaccination details." : "Add your vaccination details."}
        className="PrimaryCanvasModal"
        name={editingIndex !== null ? "Update Vaccination" : "Add Vaccination"}
        footerButtonSubmit={editingIndex !== null ? "Update Vaccination" : "Add Vaccination"}
        footerButtonCancel="Cancel"
        footerButtonSubmitClass="modal_primary_btn w-100"
        footerButtonCancelClass="modal_primary_border_btn w-100"
      >
        <Col md={6} lg={6} xl={6} xxl={6}>
          <InputField
            label="Vaccination Name"
            type="text"
            placeholder="Enter Vaccination Name"
            name="vaccinationName"
            error={vaccinationErrors.vaccinationName}
            value={vaccinationFormData.vaccinationName}
            handleChange={handleVaccinationChange}
            required
          />
        </Col>
        <Col md={6} lg={6} xl={6} xxl={6}>
          <InputField
            label="Date of Dose"
            type="date"
            placeholder="Enter Date of Dose"
            name="dateofDose"
            error={vaccinationErrors.dateofDose}
            value={vaccinationFormData.dateofDose}
            handleChange={handleVaccinationChange}
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
            {vaccinationToDelete && (
              <div className="ConfirmContent">
                <h5>Delete Vaccination</h5>
                <p>
                  Are you sure you want to delete vaccination{" "}
                  <span>{vaccinationToDelete.vaccinationName}</span>? This action cannot be undone.
                </p>
              </div>
            )}
          </div>
        }
        onSubmit={handleDeleteVaccination}
        footerButtonSubmit="Delete"
        footerButtonCancel="Cancel"
        footerButtonSubmitClass="modal_danger_btn"
        footerButtonCancelClass="modal_primary_border_btn"
      />
    </>
  );
};

export default HealthRecord;
