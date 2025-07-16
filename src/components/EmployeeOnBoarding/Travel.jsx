import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardForm, PrimaryGird, InputField, OffCanvas } from '../../pages/Props.jsx';
import Images from '../../pages/Images.jsx';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, Tabs, Button, Table } from 'react-bootstrap';

// Bootstrap imports

const Travel = () => {

  const [showWorkVaccinationCanvas, setShowVaccinationCanvas] = useState(false);
  const handleShowVaccinationCanvas = () => setShowVaccinationCanvas(true);
  const handleCloseVaccinationCanvas = () => setShowVaccinationCanvas(false);

  const [Visas, setVisas] = useState([
    {
      key: '1',
      VisaNumber: 'VISA10024578',
      IssuedDate: '2022-04-10',
      PlaceofIssue: 'New Delhi',
      ExpiryDate: '2025-04-09',
      Notes: 'Business Visa, Multiple Entry',
    },
    {
      key: '2',
      VisaNumber: 'VISA20317891',
      IssuedDate: '2023-07-01',
      PlaceofIssue: 'Mumbai',
      ExpiryDate: '2026-06-30',
      Notes: 'Tourist Visa, Single Entry',
    }
  ])

  // FORM INPUT


  // FormData Validations

  const [PassportFormData, setPassportFormData] = useState({
    passportno: '',
    issuedby: '',
    dateofissue: '',
    dateexpiry: '',
  });

  const [VisaFormData, setVisaFormData] = useState({
    visanumber: '',
    issueddate: '',
    placeofissue: '',
    expirydate: '',
    notes: '',
  });

  // Error useState

  const [PassportErrors, setPassportErrors] = useState({
    passportno: '',
    issuedby: '',
    dateofissue: '',
    dateexpiry: '',
  });

  const [VisaErrors, setVisaErrors] = useState({
    visanumber: '',
    issueddate: '',
    placeofissue: '',
    expirydate: '',
    notes: '',
  });


  const validatePassportField = (name, value) => {
    let error = '';
    switch (name) {
      case 'passportno':
        if (!value.trim()) error = 'Passport Number is required';
        break;

      case 'issuedby':
        if (!value.trim()) error = 'Issue By is required';
        break;

      case 'dateofissue':
        if (!value.trim()) error = 'Date of Issue is required';
        break;

      case 'dateexpiry':
        if (!value.trim()) error = 'Expiry Date is required';
        break;

      default:
        break;
    }

    return error;
  };

  const validateVisaField = (name, value) => {
    let error = '';
    switch (name) {
      case 'visanumber':
        if (!value.trim()) error = 'Visa Number No is required';
        break;

      case 'issueddate':
        if (!value.trim()) error = 'Issue Date is required';
        break;

      case 'placeofissue':
        if (!value.trim()) error = 'Place of Issue is required';
        break;

      case 'expirydate':
        if (!value.trim()) error = 'Expiry Date is required';
        break;

      case 'notes':
        if (!value.trim()) error = 'Notes is required';
        break;

      default:
        break;
    }

    return error;
  };

  //  Validate Form with Error

  const validatePassportForm = () => {
    const newErrors = {};
    Object.keys(PassportErrors).forEach((field) => {
      const error = validatePassportField(field, PassportErrors[field]);
      if (error) newErrors[field] = error;
    });
    setPassportErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateVisaForm = () => {
    const newErrors = {};
    Object.keys(VisaFormData).forEach((field) => {
      const error = validateVisaField(field, VisaFormData[field]);
      if (error) newErrors[field] = error;
    });
    setVisaErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //  Handle Submit

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validatePassportForm()) {
      navigate('/Home'); // 
      console.log('Form submitted:', formData);
    }
  };

  const handleCanvasSubmit = (e) => {
    e.preventDefault();
    if (validateVisaForm()) {
      navigate('/Home'); // 
      console.log('Form submitted:', formData);
    }
  };

  //  Handle Passport Change

  const handlePassportChange = (e) => {
    const { name, value } = e.target;
    setPassportFormData(prev => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setHealthErrors(prevErrors => ({ ...prevErrors, [name]: error }));
  };

  const handleVisaChange = (e) => {
    const { name, value } = e.target;
    setVisaFormData(prev => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setVaccinationErrors(prevErrors => ({ ...prevErrors, [name]: error }));
  };

  const navigate = useNavigate();

  return (
    <>
      <CardForm
        onSubmit={handleSubmit}
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
            onButtonClick={handleShowVaccinationCanvas}
            tableHeaders={['Visa Number', 'Issued Date', 'Place of Issue', 'Expiry Date', 'Notes', 'Action']}
          >
            {Visas.map((Visa) => (
              <tr key={Visa.key}>
                <td>{Visa.VisaNumber}</td>
                <td>{Visa.IssuedDate}</td>
                <td>{Visa.PlaceofIssue}</td>
                <td>{Visa.ExpiryDate}</td>
                <td>{Visa.Notes}</td>
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
            controlId="visanumber"
            name="visanumber"
            error={VisaErrors.visanumber}
            value={VisaFormData.visanumber}
            handleChange={handleVisaChange}
            required
          />
        </Col>
        <Col md={6} lg={6} xl={6} xxl={6}>
          <InputField
            label="Issued Date"
            type="text"
            placeholder="Enter your Issued Date"
            controlId="issueddate"
            name="issueddate"
            error={VisaErrors.issueddate}
            value={VisaFormData.issueddate}
            handleChange={handleVisaChange}
            required
          />
        </Col>
        <Col md={6} lg={6} xl={6} xxl={6}>
          <InputField
            label="Place of Issue"
            type="text"
            placeholder="Enter your Place of Issue"
            controlId="placeofissue"
            name="placeofissue"
            error={VisaErrors.placeofissue}
            value={VisaFormData.placeofissue}
            handleChange={handleVisaChange}
            required
          />
        </Col>
        <Col md={6} lg={6} xl={6} xxl={6}>
          <InputField
            label="Expiry Date"
            type="text"
            placeholder="Enter your expirydate"
            controlId="expirydate"
            name="expirydate"
            error={VisaErrors.expirydate}
            value={VisaFormData.expirydate}
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
    </>
  )
}

export default Travel