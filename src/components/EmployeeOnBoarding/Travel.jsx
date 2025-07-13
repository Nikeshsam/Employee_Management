import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardForm, PrimaryGird, InputField } from '../../pages/Props.jsx';
import Images from '../../pages/Images.jsx';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, Tabs, Button, Table } from 'react-bootstrap';

// Bootstrap imports

const Travel = () => {
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

  const [formData, setFormData] = useState({
    passportno: '',
    issuedby: '',
    dateissue: '',
    dateexpiry: '',
  });

  // Error useState

  const [errors, setErrors] = useState({
    passportno: '',
    issuedby: '',
    dateissue: '',
    dateexpiry: '',
  });


  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'passportno':
        if (!value.trim()) error = 'Passport No is required';
        break;

      case 'issuedby':
        if (!value.trim()) error = 'Issued By is required';
        break;

      case 'dateissue':
        if (!value.trim()) error = 'Date of Issue is required';
        break;

      case 'dateexpiry':
        if (!value.trim()) error = 'Date Expiry is required';
        break;

      default:
        break;
    }

    return error;
  };

  //  Validate Form with Error

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //  Handle Submit

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      navigate('/Home'); // 
      console.log('Form submitted:', formData);
    }
  };

  //  Handle Change

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
  };

  const navigate = useNavigate();

  return (
    <CardForm
      onSubmit={handleSubmit}
      footerButtonSubmit="Submit"
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
          error={errors.passportno}
          value={formData.passportno}
          handleChange={handleChange}
          required
        />
      </Col>
      <Col md={3} lg={3} xl={3} xxl={3}>
        <InputField
          label="Issued By"
          name="issuedby"
          type="text"
          placeholder="Enter your Issued By"
          error={errors.issuedby}
          value={formData.issuedby}
          handleChange={handleChange}
          required
        />
      </Col>
      <Col md={3} lg={3} xl={3} xxl={3}>
        <InputField
          label="Date of Issue"
          name="dateissue"
          type="date"
          placeholder="Enter your Date of Issue"
          error={errors.dateissue}
          value={formData.dateissue}
          handleChange={handleChange}
          required
        />
      </Col>
      <Col md={3} lg={3} xl={3} xxl={3}>
        <InputField
          label="Date of Expiry"
          name="dateexpiry"
          type="date"
          placeholder="Enter your Date of Expiry"
          error={errors.dateexpiry}
          value={formData.dateexpiry}
          handleChange={handleChange}
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

          onButtonClick={() => console.log('Add Visa Clicked')}
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
  )
}

export default Travel