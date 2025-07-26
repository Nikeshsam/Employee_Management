import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardForm, PrimaryGird, InputField, SelectInput, OffCanvas } from '../../pages/Props.jsx';
import Images from '../../pages/Images.jsx';
import {healthValidateField} from '../Validations/Validate.jsx';
import {vaccinationValidateField} from '../Validations/Validate.jsx';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, Tabs, Button, Table } from 'react-bootstrap';

// Bootstrap imports

const HealthRecord = () => {

  const [showWorkVaccinationCanvas, setShowVaccinationCanvas] = useState(false);
  const handleShowVaccinationCanvas = () => setShowVaccinationCanvas(true);
  const handleCloseVaccinationCanvas = () => setShowVaccinationCanvas(false);

  const [vaccinations, setVaccination] = useState([
    {
      key: '1',
      VaccinationName: 'Covid',
      DateofDose: 'Nov 24, 1999'
    }
  ])

  const [BloodGroup, setBloodGroup] = useState([
    { key: '1', label: 'O positive' },
    { key: '2', label: 'O negative' },
    { key: '3', label: 'A positive' },
    { key: '4', label: 'B positive' },
    { key: '5', label: 'B negative' },
    { key: '6', label: 'AB positive' },
    { key: '7', label: 'AB negative' },
  ])

  // FORM INPUT

  // FormData Validations

  const [healthFormData, sethealthFormData] = useState({
    bloodgroup: '',
    blooddonor: '',
    allergyintolerance: '',
    preexisting: '',
  });

  const [vaccinationFormData, setVaccinationFormData] = useState({
    vaccinationname: '',
    dateofdose: '',
  });

  // Error useState

  const [healthErrors, setHealthErrors] = useState({});

  const [vaccinationErrors, setVaccinationErrors] = useState({});

  // Validation Error Message

  // Form Validation

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

  //  Handle Submit

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateHealthForm()) {
      console.log('Main form submitted:', healthFormData);
      navigate('/Home');
    }
  };

  const handleCanvasSubmit = (e) => {
    e.preventDefault();
    if (validateVaccinationForm()) {
      setVaccination(prev => [
        ...prev,
        {
          key: Date.now().toString(),
          VaccinationName: vaccinationFormData.vaccinationname,
          DateofDose: vaccinationFormData.dateofdose,
        },
      ]);
      console.log('Vaccination added:', vaccinationFormData);
      handleCloseVaccinationCanvas();
      setVaccinationFormData({ vaccinationname: '', dateofdose: '' });
    }
  };

  //  Handle Health Change

  const handleHealthChange = (e) => {
    const { name, value } = e.target;
    sethealthFormData(prev => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setHealthErrors(prevErrors => ({ ...prevErrors, [name]: error }));
  };

  const handleVaccinationChange = (e) => {
    const { name, value } = e.target;
    setVaccinationFormData(prev => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setVaccinationErrors(prevErrors => ({ ...prevErrors, [name]: error }));
  };

  const navigate = useNavigate();

  return (
    <>
      <CardForm
        onSubmit={handleSubmit}
        footerButtonSubmit="Save"
        footerButtonSubmitClass="primary_form_btn btn_h_35"
      >
        <Col md={12} lg={12} xl={12} xxl={12}>
          <h5 className='MainTitle'>Health Details</h5>
        </Col>
        <Col md={3} lg={3} xl={3} xxl={3}>
          <SelectInput
            label="Blood Group"
            name="bloodgroup"
            options={BloodGroup}
            placeholder="Select BloodGroup"
            error={healthErrors.bloodgroup}
            value={healthFormData.bloodgroup}
            handleChange={handleHealthChange}
            required
          />
        </Col>
        <Col md={3} lg={3} xl={3} xxl={3}>
          <div>
            <Form.Label>Blood Donor</Form.Label>
            <Form.Check // prettier-ignore
              type="switch"
              id="custom-switch"
              name="blooddonor"
              error={healthErrors.blooddonor}
              value={healthFormData.blooddonor}
              handleChange={handleHealthChange}
            />
          </div>
        </Col>
        <Col md={3} lg={3} xl={3} xxl={3}>
          <InputField
            label="Allergy Intolerance"
            name="allergyintolerance"
            type="text"
            placeholder="Allergy Intolerance"
            error={healthErrors.allergyintolerance}
            value={healthFormData.allergyintolerance}
            handleChange={handleHealthChange}
            required
          />
        </Col>
        <Col md={3} lg={3} xl={3} xxl={3}>
          <InputField
            label="Pre-Existing Illness"
            name="preexisting"
            type="text"
            placeholder="Pre-Existing Illness"
            error={healthErrors.preexisting}
            value={healthFormData.preexisting}
            handleChange={handleHealthChange}
            required
          />
        </Col>
        <Col md={12} lg={12} xl={12} xxl={12}>
          <PrimaryGird
            cardTitle="Vaccination"
            buttonText="Add Vaccination"
            showAddButton={true}
            showFilterButton={false}
            showDeleteButton={false}
            showFooter={false}
            onButtonClick={handleShowVaccinationCanvas}
            tableHeaders={['Vaccination Name', 'Date of Dose', 'Actions']}
          >
            {vaccinations.map((vaccination) => (
              <tr key={vaccination.key}>
                <td>{vaccination.VaccinationName}</td>
                <td>{vaccination.DateofDose}</td>
                <td className='table_action'>
                  <Button className="btn_action"><img src={Images.Edit} alt="" /></Button>
                  <Button className="btn_action"><img src={Images.Delete} alt="" /></Button>
                </td>
              </tr>
            ))}
          </PrimaryGird>
        </Col>
      </CardForm>

      <OffCanvas
        show={showWorkVaccinationCanvas}
        placement="end"
        onSubmit={handleCanvasSubmit}
        onHide={handleCloseVaccinationCanvas}
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
            label="Vaccination Name"
            type="text"
            placeholder="Enter your Vaccination Name"
            controlId="vaccinationname"
            name="vaccinationname"
            error={vaccinationErrors.vaccinationname}
            value={vaccinationFormData.vaccinationname}
            handleChange={handleVaccinationChange}
            required
          />
        </Col>
        <Col md={6} lg={6} xl={6} xxl={6}>
          <InputField
            label="Date of Dose"
            type="text"
            placeholder="Enter your Date of Dose"
            controlId="dateofdose"
            name="dateofdose"
            error={vaccinationErrors.dateofdose}
            value={vaccinationFormData.dateofdose}
            handleChange={handleVaccinationChange}
            required
          />
        </Col>
      </OffCanvas>
    </>
  )
}

export default HealthRecord