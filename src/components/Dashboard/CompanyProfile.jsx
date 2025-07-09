import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Bootstrap imports

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Form, Row, Col, Tab, Tabs, Button, Table } from 'react-bootstrap';
import { CardForm, CardFromTertiary, InlineInputField, InlineSelectField, RadioGroupField } from '../../pages/Props';

// Bootstrap imports

const CompanyProfile = () => {

  // Industry

  const [Industry, setIndustry] = useState([
    { key: '1', label: 'Agriculture' },
    { key: '2', label: 'Forestry' },
    { key: '3', label: 'Fishing' },
    { key: '4', label: 'Mining' },
    { key: '5', label: 'Oil & Gas Extraction' },
    { key: '6', label: 'Construction' },
    { key: '7', label: 'Manufacturing' },
    { key: '8', label: 'Utilities' },
    { key: '9', label: 'Insurance' },
    { key: '10', label: 'Healthcare & Pharmaceuticals' },
  ])

  const [selectIndustry, setSelectIndustry] = useState('');

  //////////////// Business Type

  const [BusinessType, setBusinessType] = useState([
    { key: '1', label: 'Sole Proprietorship' },
    { key: '2', label: 'Partnership' },
    { key: '3', label: 'Limited Liability Company (LLC)' },
    { key: '4', label: 'Corporation (C-Corp or S-Corp)' },
    { key: '5', label: 'Nonprofit Organization' },
    { key: '6', label: 'Franchise' },
    { key: '7', label: 'Cooperative' },
    { key: '8', label: 'Joint Venture' },
    { key: '9', label: 'Government-Owned Entity' },
    { key: '10', label: 'Holding Company' }
  ])

  const [selectBusinessType, setSelectBusinessType] = useState('');

  //////////////// Fiscal Year

  const [FiscalYear, setFiscalYear] = useState([
    { key: '1', label: 'January – December' },
    { key: '2', label: 'April – March' },
    { key: '3', label: 'July – June' },
    { key: '4', label: 'October – September' }
  ])

  const [selectFiscalYear, setSelectFiscalYear] = useState('');

  //////////////// Time Zone

  const [TimeZone, setTimeZone] = useState([
    { key: '1', label: '(UTC-12:00) International Date Line West', value: 'Etc/GMT+12' },
    { key: '2', label: '(UTC-11:00) Midway Island, Samoa', value: 'Pacific/Pago_Pago' },
    { key: '3', label: '(UTC-10:00) Hawaii', value: 'Pacific/Honolulu' },
    { key: '4', label: '(UTC-09:00) Alaska', value: 'America/Anchorage' },
    { key: '5', label: '(UTC-08:00) Pacific Time (US & Canada)', value: 'America/Los_Angeles' },
    { key: '6', label: '(UTC-07:00) Mountain Time (US & Canada)', value: 'America/Denver' },
    { key: '7', label: '(UTC-06:00) Central Time (US & Canada)', value: 'America/Chicago' },
    { key: '8', label: '(UTC-05:00) Eastern Time (US & Canada)', value: 'America/New_York' },
    { key: '9', label: '(UTC-04:00) Atlantic Time (Canada)', value: 'America/Halifax' },
    { key: '10', label: '(UTC-03:00) Buenos Aires', value: 'America/Argentina/Buenos_Aires' },
    { key: '11', label: '(UTC-02:00) Mid-Atlantic', value: 'Etc/GMT+2' },
    { key: '12', label: '(UTC-01:00) Azores', value: 'Atlantic/Azores' },
    { key: '13', label: '(UTC+00:00) Greenwich Mean Time: Dublin, London', value: 'Europe/London' },
    { key: '14', label: '(UTC+01:00) Central European Time: Berlin, Paris', value: 'Europe/Berlin' },
    { key: '15', label: '(UTC+02:00) Eastern European Time: Athens, Cairo', value: 'Europe/Athens' },
    { key: '16', label: '(UTC+03:00) Moscow, Nairobi', value: 'Europe/Moscow' },
    { key: '17', label: '(UTC+03:30) Tehran', value: 'Asia/Tehran' },
    { key: '18', label: '(UTC+05:30) India Standard Time: Mumbai, New Delhi', value: 'Asia/Kolkata' },
    { key: '19', label: '(UTC+07:00) Bangkok, Hanoi, Jakarta', value: 'Asia/Bangkok' },
    { key: '20', label: '(UTC+08:00) Beijing, Perth, Singapore', value: 'Asia/Shanghai' }
  ])

  const [selectTimeZone, setSelectTimeZone] = useState('');

  // Date Format

  const [DateFormat, setDateFormat] = useState([
    { key: '1', label: 'MM/DD/YYYY', value: 'MM/DD/YYYY' },
    { key: '2', label: 'DD/MM/YYYY', value: 'DD/MM/YYYY' },
    { key: '3', label: 'YYYY-MM-DD', value: 'YYYY-MM-DD' },
    { key: '4', label: 'DD MMM YYYY', value: 'DD MMM YYYY' },
    { key: '5', label: 'MMM DD, YYYY', value: 'MMM DD, YYYY' },
    { key: '6', label: 'DD.MM.YYYY', value: 'DD.MM.YYYY' },
    { key: '7', label: 'YYYY/MM/DD', value: 'YYYY/MM/DD' },
    { key: '8', label: 'dddd, MMMM D, YYYY', value: 'dddd, MMMM D, YYYY' }
  ])

  const [selectDateFormat, setSelectDateFormat] = useState('');

  // FormData useState

  const [formData, setFormData] = useState({
    organizationName: '',
    industry: '',
    businessType: '',
    companyAddress: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    contury: '',
    phoneNumber: '',
    faxNumber: '',
    website: '',
    fiscal: '',
    taxMethod: '',
    timeZone: '',
    dateFormat: '',
    companyID: '',
    taxID: '',
  });

  // Error useState

  const [errors, setErrors] = useState({
    organizationName: '',
    industry: '',
    businessType: '',
    companyAddress: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    contury: '',
    phoneNumber: '',
    faxNumber: '',
    website: '',
    fiscal: '',
    taxMethod: '',
    timeZone: '',
    dateFormat: '',
    companyID: '',
    taxID: '',
  });

  // Field Validations

  const validateField = (name, value) => {
    let error = '';

    switch (name) {

      case 'organizationName':
        if (!value.trim()) error = 'Organization Name is required';
        break;

      case 'industry':
        if (!value.trim()) error = 'Industry is required';
        break;

      case 'businessType':
        if (!value.trim()) error = 'Business Type is required';
        break;

      case 'companyAddress':
        if (!value.trim()) error = 'Company Address is required';
        break;

      case 'street':
        if (!value.trim()) error = 'Street is required';
        break;

      case 'city':
        if (!value.trim()) error = 'City is required';
        break;

      case 'state':
        if (!value.trim()) error = 'State is required';
        break;

      case 'zipCode':
        if (!value.trim()) error = 'Zip Code is required';
        else if (!/^\d{4,10}$/.test(value)) error = 'Invalid Zip Code';
        break;

      case 'contury':
        if (!value.trim()) error = 'Country is required';
        break;

      case 'phoneNumber':
        if (!value.trim()) error = 'Phone number is required';
        // Indian mobile number: 10 digits, starts with 6-9
        else if (!/^[6-9]\d{9}$/.test(value)) error = 'Invalid Indian mobile number';
        break;

      case 'faxNumber':
        if (!value.trim()) error = 'Fax number is required';
        else if (value && !/^[\d\s()+-]+$/.test(value)) error = 'Invalid fax number';
        break;

      case 'website':
        if (!value.trim()) error = 'Website URL is required';
        else if (value && !/^(https?:\/\/)?[\w.-]+\.[a-z]{2,}$/.test(value)) error = 'Invalid website URL';
        break;

      case 'fiscal':
        if (!value.trim()) error = 'Fiscal year is required';
        break;

      case 'taxMethod':
        if (!value.trim()) error = 'Tax Basis is required ';
        break;

      case 'timeZone':
        if (!value.trim()) error = 'Time zone is required';
        break;

      case 'dateFormat':
        if (!value.trim()) error = 'Date format is required';
        break;

      case 'companyID':
        if (!value.trim()) error = 'Company ID is required';
        break;

      case 'taxID':
        if (!value.trim()) error = 'Tax ID is required';
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

  const taxOptions = [
    {
      label: 'Accrual (you owe tax as of invoice date)',
      value: 'accrual',
    },
    {
      label: 'Cash (you owe tax upon receiving payments)',
      value: 'cash',
    },
  ];



  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      Navigate('/Home')
      console.log('Form submitted:', formData);
    }
  };

  //  Handle Change

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
  };

  const Navigate = useNavigate();


  return (
    <Container fluid>
      <Row>
        <Col md={12} lg={12} xl={12} xxl={12}>
          <CardFromTertiary
            onSubmit={handleSubmit}
            footerButtonSubmit="Submit"
            footerButtonSubmitClass="primary_form_btn btn_h_35"
          >

            <InlineInputField
              label="Organization Name"
              name="organizationName"
              placeholder="Organization Name"
              error={errors.organizationName}
              value={formData.organizationName}
              handleChange={handleChange}
              required
              labelCol={2}
              inputCol={6}
            />
            <InlineSelectField
              label="Industry"
              name="industry"
              placeholder="Select Industry"
              error={errors.industry}
              value={formData.industry}
              handleChange={handleChange}
              required
              options={Industry}
              labelCol={2}
              inputCol={6}
            />
            <InlineSelectField
              label="Business Type"
              name="businessType"
              placeholder="Select Business Type"
              error={errors.businessType}
              value={formData.businessType}
              handleChange={handleChange}
              required
              options={BusinessType}
              labelCol={2}
              inputCol={6}
            />
            <InlineInputField
              label="Company Address"
              name="companyAddress"
              placeholder="Company Address"
              error={errors.companyAddress}
              value={formData.companyAddress}
              handleChange={handleChange}
              required
              labelCol={2}
              inputCol={9}
            />
            <InlineInputField
              name="street"
              placeholder="Street"
              error={errors.street}
              value={formData.street}
              handleChange={handleChange}
              required
              inputCol={6}
            />
            <InlineInputField
              name="city"
              placeholder="City"
              error={errors.city}
              value={formData.city}
              handleChange={handleChange}
              required
              inputCol={3}
            />
            <InlineInputField
              name="state"
              placeholder="State"
              error={errors.state}
              value={formData.state}
              handleChange={handleChange}
              required
              inputCol={3}
            />
            <InlineInputField
              name="zipCode"
              placeholder="Zip Code"
              error={errors.zipCode}
              value={formData.zipCode}
              handleChange={handleChange}
              required
              inputCol={3}
            />
            <InlineInputField
              name="phoneNumber"
              placeholder="Phone Number"
              error={errors.phoneNumber}
              value={formData.phoneNumber}
              handleChange={handleChange}
              required
              inputCol={3}
            />
            <InlineInputField
              name="faxNumber"
              placeholder="Fax Number"
              error={errors.faxNumber}
              value={formData.faxNumber}
              handleChange={handleChange}
              required
              inputCol={3}
            />
            <InlineInputField
              name="website"
              placeholder="Website URL"
              value={formData.website}
              handleChange={handleChange}
              error={errors.website}
              required
              inputCol={3}
            />
            <InlineSelectField
              label="Fiscal Year"
              name="fiscal"
              placeholder="Select fiscal Year"
              value={formData.fiscal}
              handleChange={handleChange}
              error={errors.fiscal}
              required
              options={FiscalYear}
              labelCol={2}
              inputCol={6}
            />
            <RadioGroupField
              label="Tax Basis"
              name="taxMethod"
              options={taxOptions}
              value={formData.taxMethod}
              handleChange={handleChange}
              error={errors.taxMethod}
              required
              controlId="formPlaintextTaxBasis"
            />
            <InlineSelectField
              label="Time Zone"
              name="timeZone"
              placeholder="Select Time Zone"
              value={formData.timeZone}
              handleChange={handleChange}
              error={errors.timeZone}
              required
              options={TimeZone}
              labelCol={2}
              inputCol={6}
            />
            <InlineSelectField
              label="Date Format"
              name="dateFormat"
              placeholder="Select Date Format"
              value={formData.dateFormat}
              handleChange={handleChange}
              error={errors.dateFormat}
              required
              options={DateFormat}
              labelCol={2}
              inputCol={6}
            />
            <InlineInputField
              label="Tax ID"
              name="taxID"
              placeholder="Tax ID"
              value={formData.taxID}
              handleChange={handleChange}
              error={errors.taxID}
              required
              inputCol={6}
            />
            <InlineInputField
              label="Company ID"
              name="companyID"
              placeholder="Company ID"
              value={formData.companyID}
              handleChange={handleChange}
              error={errors.companyID}
              required
              inputCol={6}
            />

          </CardFromTertiary>
        </Col>
      </Row>
    </Container>
  )
}

export default CompanyProfile
